# 🪄 Customization

This README outlines some modifications explicitly made for this blog that differ from upstream.

## Quick Reference

| File Path                                                            | Fork Version                                                                                                      | Link                                                                       |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [`archetypes/default.md`](../archetypes/default.md)                  | [Congo v2.6.1](https://github.com/jpanther/congo/blob/v2.6.1/archetypes/default.md)                               | [#custom-post-template](#custom-post-template)                             |
| [`assets/css/custom.css`](../assets/css/custom.css)                  | -                                                                                                                 | [#custom-css](#custom-css)                                                 |
| [`layouts/_default/rss.xml`](_default/rss.xml)                       | [Hugo v0.112.3](https://github.com/gohugoio/hugo/blob/v0.112.3/tpl/tplimpl/embedded/templates/_default/rss.xml)   | [#custom-rss-template](#custom-rss-template)                               |
| [`layouts/partials/head.html`](partials/head.html)                   | [Congo v2.8.1](https://github.com/jpanther/congo/blob/v2.8.1/layouts/partials/head.html)                          | [#custom-head](#custom-head)                                               |
| [`layouts/partials/opengraph.html`](partials/opengraph.html)         | [Hugo v0.112.3](https://github.com/gohugoio/hugo/blob/v0.112.3/tpl/tplimpl/embedded/templates/opengraph.html)     | [#custom-open-graph-snippets](#custom-open-graph-snippets)                 |
| [`layouts/partials/twitter_cards.html`](partials/twitter_cards.html) | [Hugo v0.112.3](https://github.com/gohugoio/hugo/blob/v0.112.3/tpl/tplimpl/embedded/templates/twitter_cards.html) | [#custom-twitter-metas](#custom-twitter-metas)                             |
| [`layouts/_default/single.html`](_default/single.html)               | [Congo v2.8.1](https://github.com/jpanther/congo/blob/v2.8.1/layouts/_default/single.html)                        | [#show-post-description-as-subtitles](#show-post-description-as-subtitles) |
| [`layouts/partials/article-link.html`](partials/article-link.html)   | [Congo v2.8.1](https://github.com/jpanther/congo/blob/v2.8.1/layouts/partials/article-link.html)                  | [#custom-post-listing](#custom-post-listing)                               |

## Custom post template

Extended from [Congo's default front matter](https://jpanther.github.io/congo/docs/front-matter/).

## Custom CSS

- Show `<abbr>` in tooltip on click
- Add icons indicating external links

Custom CSS are loaded and compiled with Tailwind CSS according to [Congo's Documentation](https://jpanther.github.io/congo/docs/advanced-customisation/#overriding-the-stylesheet).

## Custom RSS template

TODO

## Custom `<head>`

to include the customized Open Graph elements and Twitter `<meta>`s

## Custom Open Graph snippets

TODO

## Custom Twitter `<meta>`s

TODO

## Show post description as subtitles

`description` front matter act as sub-title for each post in this blog, the modification add a line under the post title as follow.

![subtitle](https://github.com/tomy0000000/blog/assets/23290356/28726984-9eba-4a85-9c23-a5e87be1c517)

## Custom post listing

- Do not show feature image
- Show post description when there is no summary for post

## Custom footer

- Made with Love in Taiwan badge

See [Congo's documentation](https://jpanther.github.io/congo/docs/partials/#head-and-footer) for how the extended footer works.

## Shortcodes

### Gallery

Support multiple images in the same row

```html
{{< gallery >}}
    {{< figure src="street-with-trees.jpg" alt="招牌林立的街頭夜景" >}}
    {{< figure src="trees-in-book-street.jpg" alt="招牌林立的街頭夜景" >}}
{{< /gallery >}}
<figcaption class="text-center">左：如果沒有了機車，和路邊的垃圾桶，西貢的街景其實挺美的<br/>右：書街充滿書香，也充滿樹香 (X</figcaption>
```

![Gallery Example](https://github.com/tomy0000000/blog/assets/23290356/0d47be61-89d0-432f-81c3-310814d1ae9c)

### Figure

- Add `mx-auto my-0 rounded-md` classes for standard figures (See jpanther/congo#828)
- Add `mx-1 rounded-md` classes for figure nested in gallery shortcode

### Asciinema

### Dailymotion

### Gallery

### Reddit

### Video
