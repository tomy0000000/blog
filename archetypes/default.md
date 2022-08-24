---
# https://gohugo.io/content-management/front-matter/
# https://jpanther.github.io/congo/docs/front-matter/
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
description: ""  # For og:description
images: ["https://og-image.tomy.tech/**Hello**%20World.png?theme=dracula&md=1&fontSize=100px&images=https%3A%2F%2Ftomy.me%2Ftomy-circle-white.png"]  # For og:image, supports maximum of 6 images
audio: ""  # For og:audio, only support one audio
videos: [""]  # For og:video, support multiple videos
series: [""]  # For 
draft: true  # Delete this line to publish
---

![Intro](hero.jpg "Intro")
