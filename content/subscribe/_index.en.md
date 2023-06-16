---
title: "📰 Subscribe"
layout: "simple"
---

## 🗄️ Categories

The articles in this blog are divided into three categories, which can be found at the bottom of the [🗄️ Categories]({{< relref "/categories" >}}) page: 

- [🤖 Development]({{< relref "/categories/development" >}}): Technical articles about programming and development

There are also [📖 Series]({{< relref "/series" >}}) articles that circle around a specific topic.

## 📰 Newsletter

🏗 Under construction

## 🌱 RSS Feed

The main RSS feed is located at

```xml
{{< relref path="/" outputFormat="rss" >}}
```

You can also find the RSS feed of each category, series, or tag by adding `index.xml` to the end of the URL.

For example, the URL of the [🤖 Development]({{< relref "/categories/development" >}}) page is

```xml
{{< relref "/categories/development" >}}
```

Then its RSS feed is

```xml
{{< relref path="/categories/development" outputFormat="rss" >}}
```
