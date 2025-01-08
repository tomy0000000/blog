---
# https://gohugo.io/content-management/front-matter/
# https://jpanther.github.io/congo/docs/front-matter/
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
lastmod: {{ .Date }}
draft: true  # Delete this line to publish
# For og:description, markdown is NOT supported
description: ""
# For og:image, images are auto-included, only lists external images here
images: []
# For og:audio, only support one audio
audio: ""
# For og:video, support multiple videos
videos: []
# Categories taxonomy, choose only from the list (idealy, just one)
categories: ["🍫 生活", "📱 科技", "🤖 開發"]
# Series taxonomy, and og:see_also (first 6 links will be used)
series: []
# Tags taxonomy, and article:tag (first 6 links will be used)
tags: []
# Feature image for thumbnail in list page, RSS, and top of the content
feature: ""
# Alt text (non-visible) for feature image
featureAlt: ""
# Description (visible) for feature image
coverCaption: ""
---

![Intro](hero.jpg "Intro")
