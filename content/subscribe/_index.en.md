---
title: "📰 Subscribe"
layout: "simple"
---

## 🗄️ Categories

The articles in this blog are divided into three categories, which can be found at the bottom of the [🗄️ Categories]({{< relref "/categories" >}}) page:

- [🤖 Development]({{< relref "/categories/development" >}}): Technical articles about programming and development
- [📱 Tech]({{< ref "/categories/tech" >}}): It may be an unboxing article, or experience sharing, tips of using tools, services, or platforms. Some CLI commands may be involved, but the main content of the article requires no programming experience.
- [🍫 Life]({{< ref "/categories/life" >}}): Any other articles that do not belong to the above two categories. Basically anything that pops into my mind.

There are also [📖 Series]({{< relref "/series" >}}) articles that circle around a specific topic.

## 📰 Newsletter

🏗 Under construction

## 🌱 RSS Feed

The main RSS feed is located [here]({{< relref path="/" outputFormat="rss" >}})

```xml
{{< ref path="/" outputFormat="rss" >}}
```

You can also find the RSS feed of each category, series, or tag by adding `index.xml` to the end of the URL.

For example, the URL of the [🤖 Development]({{< relref "/categories/development" >}}) page is

```xml
{{< ref "/categories/development" >}}
```

Then its RSS feed is

```xml
{{< ref path="/categories/development" outputFormat="rss" >}}
```
