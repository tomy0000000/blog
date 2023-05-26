# 🪄 Customization

This README outlines some modifications explicitly made for this blog that differ from upstream.

## Quick Reference

| File Path                                                            | Upstream Hash                                           | Last Updated | Link                                                                       |
| -------------------------------------------------------------------- | ------------------------------------------------------- | ------------ | -------------------------------------------------------------------------- |
| [`partials/analytics.html`](partials/analytics.html)                 | -                                                       |              | [#plausible-analytics](#plausible-analytics)                               |
| [`archetypes/default.md`](../archetypes/default.md)                  | jpanther/congo@02084066c7f64f256d3373bc0540c29b7a1ed313 | 2023/05/27   | [#custom-post-template](#custom-post-template)                             |
| [`layouts/\_default/rss.xml`](_default/rss.xml)                      | gohugoio/hugo@9906c1ae52e44f2e8ed45873ea36cd83a9e9bcc0  |              | [#custom-rss-template](#custom-rss-template)                               |
| [`layouts/partials/head.html`](partials/head.html)                   | jpanther/congo@02084066c7f64f256d3373bc0540c29b7a1ed313 |              | [#custom-head](#custom-head)                                               |
| [`layouts/partials/opengraph.html`](partials/opengraph.html)         | gohugoio/hugo@9906c1ae52e44f2e8ed45873ea36cd83a9e9bcc0  |              | [#custom-open-graph-snippets](#custom-open-graph-snippets)                 |
| [`layouts/partials/twitter_cards.html`](partials/twitter_cards.html) | gohugoio/hugo@f6745ad3588a7b3aaae228fec18fe0027affd566  |              | [#custom-twitter-metas](#custom-twitter-metas)                             |
| [`layouts/_default/single.html`](_default/single.html)               | jpanther/congo@7e970f4c9718a690a61845eb109817446339fb92 |              | [#show-post-description-as-subtitles](#show-post-description-as-subtitles) |
| [`layouts/partials/article-link.html`](partials/article-link.html)   | jpanther/congo@02084066c7f64f256d3373bc0540c29b7a1ed313 |              | [#custom-post-listing](#custom-post-listing)                               |
| [`layouts/partials/footer.html`](partials/footer.html)               | jpanther/congo@02084066c7f64f256d3373bc0540c29b7a1ed313 |              | [#custom-footer](#custom-footer)                                           |
| [`layouts/partials/header/hybrid.html`](partials/header/hybrid.html) | jpanther/congo@c3cf869ab209b8eeec8846d2bb2e1882d1cd70c2 |              | [#custom-footer](#custom-footer)                                           |

## Plausible Analytics

A partial snippet is added to collect data for plausible analytics. See [Congo's documentation](https://jpanther.github.io/congo/docs/partials/#custom-analytics-providers) for more.

## Custom post template

Extended from [Congo's default front matter](https://jpanther.github.io/congo/docs/front-matter/).

## Custom RSS template

TODO

## Custom `<head>`

to include the customized Open Graph elements and Twitter `<meta>`s

## Custom Open Graph snippets

TODO

## Custom Twitter `<meta>`s

TODO

## Show post description as subtitles

TODO

## Custom post listing

- Do not show feature image
- Show post description when there is no summary for post

## Custom footer

- Align items to left in the small viewport
- Translation dropdown in footer
- Disable Congo's translation in header
- Made with Love in Taiwan badge

See [Congo's documentation](https://jpanther.github.io/congo/docs/partials/#head-and-footer) for how extended footer works.

## Shortcodes

### Asciinema

### Dailymotion

### Gallery

### Reddit

### Video
