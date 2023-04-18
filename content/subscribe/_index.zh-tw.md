---
title: "📰 訂閱"
layout: "simple"
---

## 🗄️ 分類

這個部落格的文章分為三種，可以在置底的 [🗄️ 分類]({{< ref "/categories" >}}) 找到：

- [🤖 開發]({{< ref "/categories/開發" >}})：關於寫程式、新技術的文章
- [📱 科技]({{< ref "/categories/科技" >}})：可能是開箱文，或是使用某些工具、服務、平台的經驗或小撇步。可能會參雜一些些 CLI 指令，但文章的主要內容會儘量讓沒有程式經驗的人也可以看得懂
- [🍫 生活]({{< ref "/categories/生活" >}})：不屬於上面兩個分類的其他文章。就是我想寫什麼就寫什麼的~~垃圾~~心情抒發

另外也有主題式的 [📖 系列]({{< ref "/series" >}}) 文章。

## 📰 電子報

🍅 讓新文章每日新鮮直送到你的收件夾！

<link
  href="//cdn-images.mailchimp.com/embedcode/classic-071822.css"
  rel="stylesheet"
  type="text/css"
/>
<div id="mc_embed_signup">
  <form
    action="https://tomy.us21.list-manage.com/subscribe/post?u=3dabb780c14182dc8d99faeec&amp;id=a7830419da&amp;f_id=00fa87e1f0"
    method="post"
    id="mc-embedded-subscribe-form"
    name="mc-embedded-subscribe-form"
    class="validate"
    target="_self"
  >
    <div id="mc_embed_signup_scroll">
      <div class="indicates-required">
        <span class="asterisk">*</span> 為必填
      </div>
      <div class="mc-field-group">
        <label for="mce-EMAIL"
          >Email <span class="asterisk">*</span>
        </label>
        <input
          type="email"
          value=""
          name="EMAIL"
          class="required email"
          id="mce-EMAIL"
          required
        />
        <span id="mce-EMAIL-HELPERTEXT" class="helper_text"></span>
      </div>
      <div class="mc-field-group">
        <label for="mce-FNAME">名字 </label>
        <input type="text" value="" name="FNAME" class="" id="mce-FNAME" />
        <span id="mce-FNAME-HELPERTEXT" class="helper_text"></span>
      </div>
      <p>
        <a
          href="https://us21.campaign-archive.com/home/?u=3dabb780c14182dc8d99faeec&id=a7830419da"
          title="View previous campaigns"
          >👀 偷看前幾期的電子報</a
        >
      </p>
      <div id="mce-responses" class="clear foot">
        <div
          class="response"
          id="mce-error-response"
          style="display: none"
        ></div>
        <div
          class="response"
          id="mce-success-response"
          style="display: none"
        ></div>
      </div>
      <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
      <div style="position: absolute; left: -5000px" aria-hidden="true">
        <input
          type="text"
          name="b_3dabb780c14182dc8d99faeec_a7830419da"
          tabindex="-1"
          value=""
        />
      </div>
      <div class="optionalParent">
        <div class="clear foot">
          <input
            type="submit"
            value="Subscribe"
            name="subscribe"
            id="mc-embedded-subscribe"
            class="button"
          />
          <p class="brandingLogo">
            <a
              href="http://eepurl.com/ilRBAk"
              title="Mailchimp - email marketing made easy and fun"
              ><img
                src="https://eep.io/mc-cdn-images/template_images/branding_logo_text_dark_dtp.svg"
            /></a>
          </p>
        </div>
      </div>
    </div>
  </form>
</div>

## 🌱 RSS 種子

主要的 RSS 種子在[這裡]({{< ref path="/" outputFormat="rss" >}})：

```xml
{{< ref path="/" outputFormat="rss" >}}
```

你也可以在分類、系列、標籤的連結後面加上 `index.xml` 來找到個別的 RSS 種子

如 [📱 科技]({{< ref "/categories/科技" >}})的頁面連結為

```xml
{{< ref "/categories/科技" >}}
```

則它的 RSS 種子則為

```xml
{{< ref path="/categories/科技" outputFormat="rss" >}}
```

其他例子：

- [🍳 料理]({{< ref path="/series/料理" outputFormat="rss" >}}) (系列)
- [🌟 產品體驗]({{< ref path="/tags/產品體驗" outputFormat="rss" >}}) (標籤)
