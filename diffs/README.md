# 🪄 Customization

This README outlines modifications explicitly made for this blog that differ from upstream.

## Create Customizations

1. Copy the upstream file to the same path.
2. Modify the file as needed.
3. Create a diff in this directory for future reference.

   ```shell
   diff upstream modified > modified.diff
   ```

4. Document the changes in this README.

## Rebase Customizations

1. Remove the modified file.
2. Place the latest upstream file.
3. Reapply the diff to the new file.

   ```shell
   patch new_upstream < modified.diff
   ```

4. Manually check if the changes are still valid
5. Recreate the diff.

## Quick Reference

| File Path                                                                                           | Link                                                                                                                                        |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [`archetypes/default.md`](../archetypes/default.md)                                                 | [Custom post template](#custom-post-template)                                                                                               |
| [`i18n/zh-TW.yaml`](../i18n/zh-TW.yaml)                                                             | [Custom i18n](#custom-i18n)                                                                                                                 |
| [`layouts/_default/rss.xml`](../layouts/_default/rss.xml)                                           | [Custom RSS template](#custom-rss-template)                                                                                                 |
| [`layouts/_markup/render-link.html`](../layouts/_markup/render-link.html)                           | [Custom CSS](#custom-css)                                                                                                                   |
| [`layouts/_partials/_funcs/get-page-images.html`](../layouts/_partials/_funcs/get-page-images.html) | [Custom Open Graph snippets](#custom-open-graph-snippets)                                                                                   |
| [`layouts/_partials/article-link.html`](../layouts/_partials/article-link.html)                     | [Custom post listing](#custom-post-listing)                                                                                                 |
| [`layouts/_partials/head.html`](../layouts/_partials/head.html)                                     | [Custom `<head>`](#custom-head)                                                                                                             |
| [`layouts/_partials/opengraph.html`](../layouts/_partials/opengraph.html)                           | [Custom Open Graph snippets](#custom-open-graph-snippets)                                                                                   |
| [`layouts/_partials/twitter_cards.html`](../layouts/_partials/twitter_cards.html)                   | [Custom Twitter `<meta>`s](#custom-twitter-metas)                                                                                           |
| [`layouts/single.html`](../layouts/single.html)                                                     | [Show post description as subtitles](#show-post-description-as-subtitles)<br/>[Fetch feature image from CDN](#fetch-feature-image-from-cdn) |

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

## Fetch feature image from CDN

If the feature image is not found in the directory, try fetching from the remote configured in `params.toml`.

e.g. With config

```
[services]
  img = "https://img.tomy.me/blog"
```

- Post: `prescription-sunglasses-in-the-us`
- Feature image: `ray-ban-rb3025-front.jpg`

Will fetch image from `https://img.tomy.me/blog/prescription-sunglasses-in-the-us/ray-ban-rb3025-front.jpg`

## Custom post listing

- Do not show feature image
- Show post description when there is no summary for post

## Custom footer

- Made with Love in Taiwan badge

See [Congo's documentation](https://jpanther.github.io/congo/docs/partials/#head-and-footer) for how the extended footer works.

## Shortcodes

### Gallery

Support multiple images in the same row

<!-- prettier-ignore -->
```html
{{< gallery caption="左：如果沒有了機車，和路邊的垃圾桶，西貢的街景其實挺美的<br />右：書街充滿書香，也充滿樹香(X" >}}
  {{< figure src="street-with-trees.jpg" alt="招牌林立的街頭夜景" >}}
  {{< figure src="trees-in-book-street.jpg" alt="招牌林立的街頭夜景" >}}
{{< /gallery >}}
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
