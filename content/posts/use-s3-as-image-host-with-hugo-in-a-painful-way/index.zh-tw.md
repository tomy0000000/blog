---
title: "如何 (非常折騰的) 在 Hugo 使用外部圖床"
date: 2025-08-24T20:29:53-07:00
description: "部落格的第一個大更新"
categories: ["🤖 開發"]
series: ["✍🏻 部落格"]
---

趁著 7 月報報上之前把部落格做了一個內部的大改版，雖然是內部的更新，讀者應該不會感受到，但還是一次有點些微複雜的重構，覺得挺有意思的，想說可以難得寫點技術的東西，記錄之餘也順便分享一下。

## 狀況

這個部落格的原始碼和內容全部都有公開在我的 [GitHub](https://github.com/tomy0000000/blog) 上，但還是簡單快速的帶過一下：

- 內容全部都是 Markdown 編寫的
- 使用 Hugo 在 GitHub Action 上來靜態生成網站
- 部署在 GitHub Pages 上

Hugo 作為一個框架，不單單只是做 Markdown 轉成 HTML，對於文章內使用的資源，比方説圖片，也有很多[內建](https://gohugo.io/functions/images/)的優化選項，比方説放大縮小，或是最佳化處理，但這也造成一些後續的問題。

在部落格剛開張的時候就知道，把文章使用到的圖片 check in 進 git 不是一個好主意，長期下來會有很多問題，但當時決定秉持著 Move fast, Break thing 的思維，我只想儘快的讓網站上線，於是決定先硬著頭皮這麼做，把這個問題留到之後再解決 [^1]，而寫了兩年部落格之後，這個問題也像滾雪球一樣，漸漸變的大到難以忽視。

所以在 git 裡 check in 圖片 (或者更廣泛的來說：任何大檔案) 到底有什麼問題？

- git 的壓縮演算法偏好優化純文字，binary 格式的檔案壓縮效果不好
- 也就是說 `git clone`, 或是 `git pull` 速度會漸漸被拖慢
- 只要曾經 check in 過，之後就算再移除，這些曾經存在的檔案仍然會佔據使用空間

而在 Hugo 這邊，因為我使用的主題 Congo 會自動在網站生成的時候，事先把一份圖片轉成不同大小，來加速網站在不同尺寸的螢幕下的載入時間，所以圖片一但變多，也就代表 Hugo 在生成網站的時間會隨著圖片數量跟著增加。

[^1]: 反正如果部落格半路出家了，這問題也就不用處理了 (?)

## 解決方法

解方也很簡單：所有的圖片一律遷移到外部獨立的圖床託管，然後部落格直接把所有的圖片指向那個圖床。

我簡單研究了一下市面上的圖片代管服務，整理了[一份筆記](https://docs.tomy.me/image-hosting)，想到了最簡單的做法是：開一個 S3 的 bucket，然後把整個目錄結構複製過去。

比方説原本有一張圖片在

```
https://blog.tomy.me/zh-tw/posts/
2025-may-dump/cmu-commencement-with-taiwanese.jpg
```

在遷移之後就會變成

```
https://img.tomy.me/blog/
2025-may-dump/cmu-commencement-with-taiwanese.jpg
```

這樣有幾個好處：

- 跟其他相對複雜的方案比起來沒有很複雜，未來如果要再二度遷移比較不會遇到太大的問題。
- 流量小的時候不用錢，就算未來真的流量暴漲應該也不會燒多少錢 (反正我的部落格沒什麼人在看 嘻嘻)

缺點的話：

- 每次寫完文章，要再另外手動上傳這些照片。但其實如果有 S3 Client 的話，也不是多麻煩的事
- 失去 Hugo 內建的圖片最佳化處理，載入速度會慢一點點。但也真的就是一點點，而且未來有機會再弄回來

實務上來說，我最後 S3 沒有在 AWS 開。太複雜了，花了大把時間只搞定了大概 90%，剩下 10% 的問題難以解決，為了避免未來遇到 [only god knows](https://img.tomy.me/blog/use-s3-as-image-host-with-hugo-in-a-painful-way/only-god-knows.webp) 的場景發生，我決定換到一個相對簡單的 S3 —— Cloudflare R2。

同時所有的圖片都是在 `/blog` 之下，所以如果未來有別的專案需要圖床，也可以再開一個新的目錄，就可以共用這個圖床！！

## 修改文章

圖片全部轉移過去之後，接下來就要修改原始的文章。原本的如果我的文章裡需要用到圖片，我可以用以下幾種方式來指向本地的圖片：

```html
![alt](dodgers-win-giants.jpg "Some figure caption")
```

```go-html-template
{{ figure src="ajr-at-shoreline-amphitheater.jpg" alt="alt" caption="Some figure caption" >}}
```

主要的重點是，這些圖片都是使用相對路徑來指向跟文章 Markdown 同目錄下的圖片。最直覺、暴力的方式就是我手動或自動把所有圖片連結全部改成 hard-coded 的連結，但我找到了一個更好的做法：當我在 Markdown 裡使用上面這兩個語法來插入圖片時，Hugo 底層的生成邏輯是去使用主題裡提供的 shortcode，也就是説我可以魔改這個 shortcode 來自動修改圖片的連結。比方說我使用的 Congo 主題 shortcode 有這麼一段：

```go-html-template {linenos=inline hl_lines=[7]}
<figure>
  {{- with $img -}}
    {{ $lazy := $.Page.Site.Params.enableImageLazyLoading | default true }}
    {{ $webp := $.Page.Site.Params.enableImageWebp | default true }}
    {{ partial "picture.html" (dict "img" . "alt" $altText "class" $class "x2" $x2 "lazy" $lazy "webp" $webp) }}
  {{- else -}}
    <img src="{{ .Destination | safeURL }}" alt="{{ $altText }}" class="{{ $class }}" />
  {{- end -}}
  {{ with $caption }}<figcaption class="text-center">{{ . | markdownify }}</figcaption>{{ end }}
</figure>
```

簡單來說就是如果有找到本地圖片，就使用本地圖片，如果沒有，就把它當作外部圖片連結。所以我可以這麼改：

```go-html-template {linenos=inline hl_lines=["7-8"]}
<figure>
  {{ $lazy := $.Page.Site.Params.enableImageLazyLoading | default true }}
  {{- with $img -}}
    {{ $webp := $.Page.Site.Params.enableImageWebp | default true }}
    {{ partial "picture.html" (dict "img" . "alt" $altText "class" $class "x2" $x2 "lazy" $lazy "webp" $webp) }}
  {{- else -}}
    {{ $path := printf "%s/%s" $.Page.File.ContentBaseName $file }}
    {{ partial "tomy-picture.html" (dict "path" $path "alt" $altText "class" $class "lazy" $lazy) }}
  {{- end -}}
  {{ with $caption }}<figcaption class="text-center">{{ . | markdownify }}</figcaption>{{ end }}
</figure>
```

在這裡拼出一個圖片的相對路徑，然後呼叫我自己的模板：

```go-html-template
{{ with $path }}
  {{ $remoteSrc := printf "%s/%s" site.Params.services.img . }}
  <picture {{ with $class }} class="{{ . }}" {{ end }}>
    <img
      src="{{ $remoteSrc }}"
      {{ with $class }}class="{{ . }}"{{ end }}
      {{ with $alt }}alt="{{ . }}"{{ end }}
      {{ with $lazy }}loading="lazy" decoding="async"{{ end }}
    />
  </picture>
{{ end }}
```

注意到我這裡並沒有 hard-code 我的圖床連結，而是把它放在 hugo 的 config 裡：

```toml
# config/_default/params.toml
[services]
  img = "https://img.tomy.me/blog"
```

這麼一來，不但不需要修改任何舊文章中的圖片連結，即使未來要再搬家，也只要修改 config 就好 👍🏻

當然中間還有很多細節就不贅述了，有興趣的可以去看看[這個 GitHub issue](https://github.com/tomy0000000/blog/issues/37) 還有裡面提到相關的 commit。

## 移除圖片

到這裡，所有圖片已經正式用上了外部的圖床。最後一步就是，把現有的圖片移除。我簡單 Google + 跟 ChatGPT 聊完的結論是，只能用 `git filter-repo` 來把圖片全部清掉，沒辦法保留原本的 commit。實務上來說是使用了另外一個工具叫 [`git-filter-repo`](https://github.com/newren/git-filter-repo)，具體步驟我也寫成了[一份筆記](https://docs.tomy.me/git/#wipe-files-from-the-history)，這裡就不再寫一次了。

## 結果

現在重新 `git clone` 下來的大小從原本的 1.3 GB 一口氣減少到了 3.5 MB。不止如此，原本每次發新的文章，整個網站重新生成要在 GitHub Action 上跑 8 分鐘，現在只要不到 1 分鐘就好了！

{{< chart >}}
type: 'bar',
data: {
  labels: ['34f18f0', '80c2d58', '13efd8c', '92c3565', '35c1995', '48ac371', 'b342a01', '0b44cdd', '89327c0', '1279c71', 'b3f115a', '51a0d2b', '2a8294e'],
  datasets: [{
    label: 'Github Action 部署時間 (秒)',
    data: [528, 525, 507, 527, 507, 539, 507, 512, 522, 504, 39, 38, 40],
  }]
}
{{< /chart >}}
<figcaption class="text-center"> 真是太神奇了，傑克！</figcaption>

---

前前後後從研究到真的完全實現花了不少時間，但整個搬遷做完也是挺有成就感的，感覺又對 Hugo 更上手了一些！
