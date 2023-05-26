# Customized

This README outlines some modifications explicitly made for this blog that differ from upstream.

## Quick Reference

| File Path | Upstream Hash | Modifications |      |
| --------- | ------------- | ------------- | ---- |
|           |               |               |      |

## Plausible Analytics

A partial snippet [`partials/analytics.html`](partials/analytics.html) is added to collect data for plausible analytics. See [Congo's documentation](https://jpanther.github.io/congo/docs/partials/#custom-analytics-providers) for more.

## Custom post template

[`archetypes/default.md`](../archetypes/default.md), extended from Congo's default ([0208406](https://github.com/jpanther/congo/blob/02084066c7f64f256d3373bc0540c29b7a1ed313/archetypes/default.md)).

## Custom RSS template

M [layouts/_default/rss.xml](https://github.com/gohugoio/hugo/blob/9906c1ae52e44f2e8ed45873ea36cd83a9e9bcc0/tpl/tplimpl/embedded/templates/_default/rss.xml)

## Custom `<head>`

to include the customized Open Graph elements and Twitter `<meta>`s

M [layouts/partials/head.html](https://github.com/jpanther/congo/blob/02084066c7f64f256d3373bc0540c29b7a1ed313/layouts/partials/head.html)

## Custom Open Graph snippets

M [layouts/partials/opengraph.html](https://github.com/gohugoio/hugo/blob/9906c1ae52e44f2e8ed45873ea36cd83a9e9bcc0/tpl/tplimpl/embedded/templates/opengraph.html)

## Custom Twitter `<meta>`s

M [layouts/partials/twitter_cards.html](https://github.com/gohugoio/hugo/blob/f6745ad3588a7b3aaae228fec18fe0027affd566/tpl/tplimpl/embedded/templates/twitter_cards.html)

## Show post description as subtitles

M [layouts/_default/single.html](https://github.com/jpanther/congo/blob/7e970f4c9718a690a61845eb109817446339fb92/layouts/_default/single.html)

## Custom post listing

- Do not show feature image
- Show post description when there is no summary for post

M [layouts/partials/article-link.html](https://github.com/jpanther/congo/blob/02084066c7f64f256d3373bc0540c29b7a1ed313/layouts/partials/article-link.html)

## Custom footer

- Align items to left in the small viewport
- Translation dropdown in footer
- Disable Congo's translation in header
- Made with Love in Taiwan badge

See [Congo's documentation](https://jpanther.github.io/congo/docs/partials/#head-and-footer) for how extended footer works.

M [layouts/partials/footer.html](https://github.com/jpanther/congo/blob/02084066c7f64f256d3373bc0540c29b7a1ed313/layouts/partials/footer.html)
M [layouts/partials/header/hybrid.html](https://github.com/jpanther/congo/blob/c3cf869ab209b8eeec8846d2bb2e1882d1cd70c2/layouts/partials/header/hybrid.html)

## Shortcodes

### Asciinema

### Dailymotion

### Gallery

### Reddit

### Video

