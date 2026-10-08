#!/usr/bin/env python3
"""機械式文章檢查，供 post-reviewer skill 使用。

用法: python analyze.py path/to/index.zh-tw.md

檢查項目: 贅詞統計、「我」字比例（含全站基準）、中英文空格、
半形標點、破折號與分號、footnote 對應、front matter、長段落。
輸出為人類可讀的報告，行號對應原始檔案。
"""

import re
import sys
from pathlib import Path

STOPWORDS = [
    "覺得", "其實", "然後", "後來", "所以", "的部分", "就算", "也",
    "即便", "應該", "可能", "還有", "差不多", "大部分", "老實說", "或許",
]

CJK = r"一-鿿"
LONG_PARAGRAPH_CHARS = 200


def split_front_matter(content: str) -> tuple[str, list[tuple[int, str]]]:
    """回傳 (front matter 區塊, [(原始行號, 內文行)])。"""
    lines = content.split("\n")
    if lines[0].strip() != "---":
        return "", list(enumerate(lines, start=1))
    end = next(i for i, line in enumerate(lines[1:], start=1) if line.strip() == "---")
    front = "\n".join(lines[1:end])
    body = list(enumerate(lines[end + 1:], start=end + 2))
    return front, body


def clean_line(line: str) -> str:
    """移除會造成誤判的 markdown 語法: 行內 code、連結網址、footnote 標記。"""
    line = re.sub(r"`[^`]*`", "", line)
    line = re.sub(r"\]\([^)]*\)", "]", line)
    line = re.sub(r"\[\^[^\]]+\]:?", "", line)
    return line


def clean_body(body: list[tuple[int, str]]) -> list[tuple[int, str]]:
    """移除 code fence 區塊，其餘每行做 clean_line。"""
    cleaned = []
    in_fence = False
    for lineno, line in body:
        if line.strip().startswith("```"):
            in_fence = not in_fence
            continue
        if not in_fence:
            cleaned.append((lineno, clean_line(line)))
    return cleaned


def me_ratio(text: str) -> tuple[int, float]:
    count = text.count("我")
    return count, count / len(text) if text else 0.0


def corpus_me_baseline(target: Path) -> list[tuple[str, float]]:
    """全站每篇 zh-tw 文章的「我」字比例，找不到 posts 目錄就回傳空列表。"""
    posts_dir = None
    for parent in target.resolve().parents:
        candidate = parent / "content" / "posts"
        if candidate.is_dir():
            posts_dir = candidate
            break
    if posts_dir is None:
        return []
    ratios = []
    for post in sorted(posts_dir.glob("*/index.zh-tw.md")):
        _, body = split_front_matter(post.read_text())
        text = "\n".join(line for _, line in clean_body(body))
        _, ratio = me_ratio(text)
        ratios.append((post.parent.name, ratio))
    return ratios


def fmt_lines(linenos: list[int]) -> str:
    return "行 " + ", ".join(str(n) for n in linenos)


def section(title: str, findings: list[str]) -> None:
    print(f"\n## {title}")
    if findings:
        for f in findings:
            print(f"- {f}")
    else:
        print("- 無")


def main() -> None:
    target = Path(sys.argv[1])
    content = target.read_text()
    front, body = split_front_matter(content)
    cleaned = clean_body(body)
    text = "\n".join(line for _, line in cleaned)

    print(f"# 機械式檢查報告: {target}")

    # 贅詞
    findings = []
    for word in STOPWORDS:
        linenos = [n for n, line in cleaned if word in line]
        count = text.count(word)
        if count:
            findings.append(f"「{word}」{count} 次（{fmt_lines(linenos)}）")
    section("贅詞（逐一判斷是否在工作，非零容忍）", findings)

    # 我字比例
    count, ratio = me_ratio(text)
    print("\n## 「我」字比例")
    print(f"- 本篇: {count} 次，佔全文 {ratio:.2%}")
    corpus = corpus_me_baseline(target)
    if corpus:
        avg = sum(r for _, r in corpus) / len(corpus)
        rank = sum(1 for _, r in corpus if r < ratio) + 1
        print(f"- 全站基準: 平均 {avg:.2%}（共 {len(corpus)} 篇，本篇由低到高排第 {rank} 名）")

    # 中英文空格
    findings = []
    pattern = re.compile(rf"[{CJK}][A-Za-z0-9]|[A-Za-z0-9][{CJK}]")
    for lineno, line in cleaned:
        for m in pattern.finditer(line):
            start = max(0, m.start() - 6)
            findings.append(f"行 {lineno}: …{line[start:m.end() + 6]}…")
    section("中英文之間缺少空格", findings)

    # 半形標點緊鄰中文
    findings = []
    pattern = re.compile(rf"[{CJK}][,.;:!?]|[,.;:!?][{CJK}]")
    for lineno, line in cleaned:
        for m in pattern.finditer(line):
            start = max(0, m.start() - 6)
            findings.append(f"行 {lineno}: …{line[start:m.end() + 6]}…")
    section("半形標點緊鄰中文", findings)

    # 破折號與分號
    findings = []
    for symbol in ["——", "；"]:
        linenos = [n for n, line in cleaned if symbol in line]
        if linenos:
            total = sum(line.count(symbol) for _, line in cleaned)
            findings.append(f"「{symbol}」{total} 次（{fmt_lines(linenos)}）")
    section("破折號與分號（避免濫用）", findings)

    # Footnotes
    findings = []
    refs, defs = [], []
    for lineno, line in body:
        defs.extend(re.findall(r"^\[\^([^\]]+)\]:", line))
        stripped = re.sub(r"^\[\^[^\]]+\]:", "", line)
        refs.extend(re.findall(r"\[\^([^\]]+)\]", stripped))
    for ref in refs:
        if ref not in defs:
            findings.append(f"[^{ref}] 有引用但沒有定義")
    for d in defs:
        if d not in refs:
            findings.append(f"[^{d}] 有定義但沒有引用")
    if refs != sorted(refs, key=lambda x: (not x.isdigit(), x.zfill(4))):
        findings.append(f"引用順序非遞增: {refs}")
    section(f"Footnotes（引用 {len(refs)}、定義 {len(defs)}）", findings)

    # Front matter
    findings = []
    def fm_value(key: str) -> str:
        m = re.search(rf"^{key}:\s*(.*?)\s*(#.*)?$", front, re.MULTILINE)
        return m.group(1).strip() if m else ""
    if fm_value("description") in ('""', "''", ""):
        findings.append("description 未填寫（og:description 會是空的）")
    categories = re.findall(r'"[^"]+"', fm_value("categories"))
    if not categories:
        findings.append("categories 未選")
    elif len(categories) > 1:
        findings.append(f"categories 選了 {len(categories)} 個，理想上只選一個")
    if fm_value("tags") in ("[]", ""):
        findings.append("tags 是空的，視內容補上")
    if fm_value("feature") in ('""', "''", ""):
        findings.append("feature 圖未設定")
    if "draft: true" in front:
        findings.append("draft: true 仍在，發佈時記得刪除該行")
    section("Front matter", findings)

    # 長段落
    findings = []
    for lineno, line in cleaned:
        if len(line) > LONG_PARAGRAPH_CHARS:
            findings.append(f"行 {lineno}: {len(line)} 字，考慮拆分")
    section(f"長段落（超過 {LONG_PARAGRAPH_CHARS} 字）", findings)


if __name__ == "__main__":
    main()
