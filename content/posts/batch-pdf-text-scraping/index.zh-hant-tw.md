---
title: "批次從 PDF 轉檔出文字來"
date: 2023-02-22T01:12:23+08:00
lastmod: 2023-02-22T01:12:23+08:00
description: "全自動家庭手工代工業開張啦 (?)"
videos: ["https://www.dailymotion.com/video/x8ii41a"]
categories: ["📱 科技"]
tags: ["📟 CLI"]
featureAlt: "批次從 PDF 轉檔出文字來"
---

之前寫信去財政部調了我電子發票載具所有的歷史發票資料，之後要倒進我自己寫的記帳系統裡。可惜經過一輪死纏爛打，他們就是不肯提供 PDF 以外的檔案格式，再加上資料量又很大 (大約 185 頁 A2)，所以要自己想辦法 parse 這些資料。

## Step 1 - ✅ 確認

先用一般的 PDF Reader 打開，用滑鼠選取看看，確定裡面的文字是用文字的方式儲存。如果是影像 (比方說掃描) 的話就不適用這個方法，請左轉 Google 「OCR PDF」這個關鍵字。

## Step 2 - 📑 分頁

我猜等一下一口氣把文字撈出來的時候格式應該是亂到不行，所以如果我可以一頁一頁處理，那至少可以確定在校對資料的時候，錯誤的最大範圍只會限縮在那一頁。

簡單 Google 一下找到了 [StackExchange](https://superuser.com/a/997424/1232107) 上有人推薦的 CLI 叫 `pdfseparate`：

在 macOS 上可以用 Homebrew 安裝 `poppler` 這個 formulae，`pdfseparate` 會包在這個裡面

```shell
brew install poppler
```

然後就可以把 PDF 拆成一頁一個檔案

```shell
pdfseparate document.pdf export/%d.pdf
```

## Step 3 - 🖨️ 讀取文字

接下來要使用 `pdfminer` 這個 Python CLI 來把文字從 PDF 轉成純文字

先安裝

```shell
pipx install pdfminer  # You can use pip if you want
```

通常一般的用法是 `pdf2txt.py 1.pdf > 1.txt`。可是因為有太多檔案了，所以接下來有三種選項：

1. 白痴一點：手動修改數字，頁數少的話可以省事一點
2. 裝逼一點：寫一個 Bash for loop，可是我真的好討厭 shell script
3. 想不到吧：用 modern editor 產生 commands

聽起來是不是有點抽象，請看影片：

{{< dailymotion id="x8ii41a" >}}

## 🎉 完成

根據頁數的多寡可能會跑很久，反正產生出來的資料就是按頁數編碼的 `.txt` 檔案了。後面詳細的 parsing 反正不同檔案內容方法也不一樣就不寫啦。
