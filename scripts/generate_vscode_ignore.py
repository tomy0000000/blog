#!/usr/bin/env python

from pathlib import Path
import json5
import json
import frontmatter
from datetime import datetime, timedelta

PROJECT_ROOT = Path(__file__).parent.parent
PROJECT_SETTINGS = PROJECT_ROOT / ".vscode" / "settings.json"
MONTH_AGO = datetime.now() - timedelta(days=30)

def keep(post_dir: Path) -> bool:
    drafts = post_dir.glob("index.*.md")
    for draft in drafts:
        meta = frontmatter.load(draft)
        if "draft" in meta and meta["draft"] == True:
            return True

        if "date" in meta and meta["date"] > MONTH_AGO:
            return True

    return False

def update_ignore_list(ignored: dict) -> None:
    with open(PROJECT_SETTINGS, "r") as f:
        settings = json5.load(f)

    if "files.exclude" not in settings:
        settings["files.exclude"] = {}

    for existing in settings["files.exclude"]:
        if not existing.startswith("content/posts/"):
            ignored[f"{existing}"] = settings["files.exclude"][existing]

    settings["files.exclude"] = {}
    for post in ignored:
        settings["files.exclude"][post] = True

    with open(PROJECT_SETTINGS, "w") as f:
        json.dump(settings, f, indent=2, sort_keys=True)

def main() -> None:
    posts = list(PROJECT_ROOT.glob("content/posts/*"))
    posts.sort()
    ignored = {}
    for post in posts:
        if not keep(post):
            print(f"[IGNORED] {post.name}")
            ignored[str(post.relative_to(PROJECT_ROOT))] = True
        else:
            print(f"[KEEP   ] {post.name}")
    update_ignore_list(ignored)

if __name__ == "__main__":
    main()
