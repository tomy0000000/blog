---
title: "📰 訂閱"
layout: "simple"
---

## 🗄️ 分類

這個部落格的文章分為三種，可以在置底的 [🗄️ 分類]({{< relref "/categories" >}}) 找到：

- [🤖 開發]({{< relref "/categories/開發" >}})：關於寫程式、新技術的文章
- [📱 科技]({{< relref "/categories/科技" >}})：可能是開箱文，或是使用某些工具、服務、平台的經驗或小撇步。可能會參雜一些些 CLI 指令，但文章的主要內容會儘量讓沒有程式經驗的人也可以看得懂
- [🍫 生活]({{< relref "/categories/生活" >}})：不屬於上面兩個分類的其他文章。就是我想寫什麼就寫什麼的~~垃圾~~心情抒發

另外也有主題式的 [📖 系列]({{< relref "/series" >}}) 文章。

## 📰 電子報

<!-- 🍅 讓新文章每日新鮮直送到你的收件夾！ -->

🚧 改版中！近期回歸！

## 🏪 閱讀平台

- [Google News](https://news.google.com/publications/CAAqBwgKMLOAywsw45viAw)
- [Feedly](https://feedly.com/i/subscription/feed%2F{{< relref path="/" outputFormat="rss" >}})
  - 如果你想要使用 Feedly 訂閱特定分類的文章，可以參考下面的指南找到個別的 RSS 種子

## 🌱 RSS 種子

主要的 RSS 種子在[這裡]({{< relref path="/" outputFormat="rss" >}})：

```xml
{{< ref path="/" outputFormat="rss" >}}
```

你也可以在分類、系列、標籤的連結後面加上 `index.xml` 來找到個別的 RSS 種子

如 [📱 科技]({{< relref "/categories/科技" >}})的頁面連結為

```xml
{{< ref "/categories/科技" >}}
```

則它的 RSS 種子則為

```xml
{{< ref path="/categories/科技" outputFormat="rss" >}}
```

其他例子：

- [🍳 料理]({{< ref path="/series/料理" outputFormat="rss" >}}) (系列)
- [🌟 產品體驗]({{< ref path="/tags/產品體驗" outputFormat="rss" >}}) (標籤)
