# 🪄 Customization

This README outlines some modifications explicitly made for this blog that differ from upstream.

## Quick Reference

| File Path                                                                              | Fork Version                                                                                                                        | Link                                                                       |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [`archetypes/default.md`](../archetypes/default.md)                                    | [Congo v2.6.1](https://github.com/jpanther/congo/blob/v2.6.1/archetypes/default.md)                                                 | [#custom-post-template](#custom-post-template)                             |
| [`assets/css/custom.css`](../assets/css/custom.css)                                    | -                                                                                                                                   | [#custom-css](#custom-css)                                                 |
| [`i18n/zh-TW.yaml`](../i18n/zh-TW.yaml)                                                | [Congo v2.9.0](https://github.com/jpanther/congo/blob/v2.9.0/i18n/zh-Hant.yaml)                                                     | [#custom-i18n](#custom-i18n)                                               |
| [`layouts/_default/_markup/render-link.html`](_default/_markup/render-link.html)       | [Congo v2.8.2](https://github.com/jpanther/congo/blob/v2.8.2/layouts/_default/_markup/render-link.html)                             | [#custom-css](#custom-css)                                                 |
| [`layouts/_default/rss.xml`](_default/rss.xml)                                         | [Hugo v0.112.3](https://github.com/gohugoio/hugo/blob/v0.112.3/tpl/tplimpl/embedded/templates/_default/rss.xml)                     | [#custom-rss-template](#custom-rss-template)                               |
| [`layouts/_default/single.html`](_default/single.html)                                 | [Congo v2.8.1](https://github.com/jpanther/congo/blob/v2.8.1/layouts/_default/single.html)                                          | [#show-post-description-as-subtitles](#show-post-description-as-subtitles) |
| [`layouts/partials/article-link.html`](partials/article-link.html)                     | [Congo v2.8.1](https://github.com/jpanther/congo/blob/v2.8.1/layouts/partials/article-link.html)                                    | [#custom-post-listing](#custom-post-listing)                               |
| [`layouts/partials/head.html`](partials/head.html)                                     | [Congo v2.8.1](https://github.com/jpanther/congo/blob/v2.8.1/layouts/partials/head.html)                                            | [#custom-head](#custom-head)                                               |
| [`layouts/partials/_funcs/get-page-images.html`](partials/_funcs/get-page-images.html) | [Hugo v0.135.0](https://github.com/gohugoio/hugo/blob/v0.135.0/tpl/tplimpl/embedded/templates/partials/_funcs/get-page-images.html) | [#custom-open-graph-snippets](#custom-open-graph-snippets)                 |
| [`layouts/partials/opengraph.html`](partials/opengraph.html)                           | [Hugo v0.135.0](https://github.com/gohugoio/hugo/blob/v0.135.0/tpl/tplimpl/embedded/templates/opengraph.html)                       | [#custom-open-graph-snippets](#custom-open-graph-snippets)                 |
| [`layouts/partials/twitter_cards.html`](partials/twitter_cards.html)                   | [Hugo v0.135.0](https://github.com/gohugoio/hugo/blob/v0.135.0/tpl/tplimpl/embedded/templates/twitter_cards.html)                   | [#custom-twitter-metas](#custom-twitter-metas)                             |

## Custom post template

Extended from [Congo's default front matter](https://jpanther.github.io/congo/docs/front-matter/).

## Custom CSS

- Show `<abbr>` in tooltip on click
- Add icons indicating external links

Custom CSS is loaded and compiled with Tailwind CSS according to [Congo's Documentation](https://jpanther.github.io/congo/docs/advanced-customisation/#overriding-the-stylesheet).

## Custom i18n

Congo change `zh-TW` to `zh-Hant` on version 2.9.0 ([Release Note](https://github.com/jpanther/congo/releases/tag/v2.9.0), [Commit](https://github.com/jpanther/congo/commit/f0f9ec268fa81c11766750bc0296b445b7665b50)).

The ideal solution would be changing the language code but keep the original URL Path by customize the language tag used when building the site, which is also [not supported by Hugo](https://github.com/gohugoio/hugo/issues/9404) at the moment.

Currently, we will stick to the old language tag by copying the i18n translation in our own codebase.

## Custom RSS template

TODO

## Custom `<head>`

to include the customized Open Graph elements and Twitter `<meta>`s

## Custom Get Page Image snippets partial

To suppport Open Graph snippets

See [this commit](https://github.com/tomy0000000/blog/commit/cd94690832c78134d2c4299971966a1c0648452f)

## Custom Open Graph snippets

- Refined how locale tag is generated
- Add `og:locale:alternate`
- Add `article:expiration_time`
- Add `og:image:type`
- Add `og:image:width`
- Add `og:image:height`

See [this commit](https://github.com/tomy0000000/blog/commit/132148bc41971b10921edba1eaac0e1976a94040)

## Custom Twitter `<meta>`s

Add an additional line of

```html
<meta name="twitter:creator" content="{{ $content }}" />
```

See [this commit](https://github.com/tomy0000000/blog/commit/f402c42209264e395a4321071e5eb59dc8c9e276)

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
{{< gallery caption="左：如果沒有了機車，和路邊的垃圾桶，西貢的街景其實挺美的<br />右：書街充滿書香，也充滿樹香
(X" >}} {{< figure src="street-with-trees.jpg" alt="招牌林立的街頭夜景" >}} {{<
figure src="trees-in-book-street.jpg" alt="招牌林立的街頭夜景" >}} {{< /gallery
>}}
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
