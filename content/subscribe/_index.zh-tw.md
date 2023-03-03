---
title: "📰 訂閱"
layout: "simple"
---

## 🗄️ 分類

這個部落格的文章分為三種，可以在置底的 [🗄️ 分類]({{< ref "/categories" >}}) 找到：

- [🤖 開發]({{< ref "/categories/開發" >}})：關於寫程式、新技術的文章
- [📱 科技]({{< ref "/categories/科技" >}})：可能是開箱文，或是使用某些工具、服務、平台的經驗或小撇步。可能會參雜一些些 CLI 指令，但文章的主要內容會儘量讓沒有程式經驗的人也可以看得懂
- [🍫 生活]({{< ref "/categories/生活" >}})：不屬於上面兩個分類的其他文章。就是我想寫什麼就寫什麼的~~垃圾~~心情抒發

另外也有主題式的 [📖 系列]({{< ref "/series" >}}) 文章。

## 📰 電子報

🏗 籌備中

## 🌱 RSS 種子

主要的 RSS 種子在

```xml
{{< ref path="/" outputFormat="rss" >}}
```

你也可以在分類、系列、標籤的連結後面加上 `index.xml` 來找到個別的 RSS 種子，如：

- [🤖 開發]({{< ref "/categories/科技" >}})：`{{< ref path="/categories/科技" outputFormat="rss" >}}`
- [🍳 料理]({{< ref "/series/料理" >}})：`{{< ref path="/series/料理" outputFormat="rss" >}}`
- [🌟 產品體驗]({{< ref "/tags/產品體驗" >}})：`{{< ref path="/tags/產品體驗" outputFormat="rss" >}}`
