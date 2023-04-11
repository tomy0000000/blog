---
# https://gohugo.io/content-management/front-matter/
# https://jpanther.github.io/congo/docs/front-matter/
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
lastmod: {{ .Date }}
draft: true  # Delete this line to publish
# For og:description
description: ""
# For og:image, feature image is auto-included, supports 6 other images
images: ["https://og.tomy.tech"]
# For og:audio, only support one audio
audio: ""
# For og:video, support multiple videos
videos: []
# Categories taxonomy, choose only from the list (idealy, just one)
categories: ["🍫 生活", "📱 科技", "🤖 開發"]
# Series taxonomy, and og:see_also (first 6 links will be used)
series: []
# Tags taxonomy
tags: []
# Feature image for thumbnail in list page and top of the content
feature: ""
# Alt text (non-visible) for feature image
featureAlt: ""
# Description (visible) for feature image
coverCaption: ""
---

![Intro](hero.jpg "Intro")
