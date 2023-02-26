---
title: "Yubikey 硬體金鑰"
date: 2023-02-26T22:14:33+08:00
lastmod: 2023-02-26T22:14:33+08:00
description: "邁向無密碼的時代"
images:
  [
    "https://og.tomy.tech/api/blog?title=Yubikey%20%E5%BF%AB%E9%80%9F%E6%8C%87%E5%8D%97",
  ]
videos: ["https://www.dailymotion.com/video/x8in4qr"]
series: ["📱 科技", "🌟 產品體驗"]
feature: "feature.jpg"
featureAlt: "YubiKey 5Ci Launch Edition"
coverCaption: "YubiKey 5Ci 上市限定版"
---

雖然早早就買了 YubiKey 的硬體金鑰，但是礙於之前一直沒有時間好好的給他來研究一下。今天突然想到來玩了一下，但是發現好像有蠻多複雜的細節，所以不如就寫給有需要的人 (a.k.a. 以後的 me XDDDD) 可以參考一下。

## 💾 軟體

| 名稱                        |                                                                                   |
| --------------------------- | --------------------------------------------------------------------------------- |
| Yubikey Manager             | 功能最完整，裝這個就好                                                            |
| YubiKey Personalization GUI | UI 有點醜但跟 Yubikey Manager 有點像。反正目前沒發現只有這個才有的功能，不用裝    |
| YubiKey PIV Manager         | 管理 PIV 功能用的，其實 Yubikey Manager 就有提供了，不用裝                        |
| Yubico Authenticator        | 提供網頁登入時的各項功能，細節下面 [FIDO2]({{< ref "#fido2--otp" >}}) 會講，有需要再裝 |
| `pkman` CLI                 | 選配，維護還不錯的 CLI。不想跟 GUI 鬼扯的時候，這個還不錯用                       |

不想看那麼多的話，下面這個貼到終端機就對了：

```shell
brew install --cask yubico-yubikey-manager
pipx install yubikey-manager
```

## *️⃣ PIN 碼

[參考文檔](https://support.yubico.com/hc/en-us/articles/4402836718866-Understanding-YubiKey-PINs)

一把 YubiKey 有 3 種 PIN 碼：

|         | 預設     |
| ------- | -------- |
| FIDO2   | (無)     |
| PIV     | `123456` |
| OpenPGP | `123456` |

記住幾個簡單的原則：

1. 不知道的不用亂動
2. 當你不知道要輸入哪一個的時候，優先試 FIDO2
3. 不用擔心 PIN 碼忘記，反正隨時可以重設。只是原本用來登入的服務要重新設定，當然如果硬體金鑰是唯一登入的方法，就只能上香了 \\|/

## 💡 複習知識

在進入功能之前，先複習一下現在的網站登入流程：

1. 輸入帳號密碼
2. 如果支援的話，會要求第二驗證方式，有以下幾種
   1. 簡訊 (SMS) 驗證
   2. 電子信箱 (Email) 驗證
   3. OTP 驗證
   4. 電話驗證：用綁定的電話打到某個號碼驗證
   5. 授權裝置驗證：在已經登入的裝置點確認
   6. Security Key
   7. PassKey
   8. Backup Codes：固定的備用碼
3. 登入成功

關於哪些網站支援哪些協定，可以查詢 [2FA Directory](https://2fa.directory)

礙於那些發明規格的人喜歡咬文嚼字，幫大家整理以下幾個常見的詞：

### 二步驟驗證

- <abbr title="2-factor authentication">2FA</abbr>
- <abbr title="Multi-factor authentication">MFA</abbr>
- 2-step verification

指的是整個步驟二，M 只是代表多個的意思

### 一次性密碼

- <abbr title="One-Time Password">OTP</abbr>
- <abbr title="Time-based One-Time Password">TOTP</abbr>

狹義來說指的是步驟二的第 3 項，也就是實作 [TOTP](https://zh.wikipedia.org/wiki/%E5%9F%BA%E4%BA%8E%E6%97%B6%E9%97%B4%E7%9A%84%E4%B8%80%E6%AC%A1%E6%80%A7%E5%AF%86%E7%A0%81%E7%AE%97%E6%B3%95) 協定的二步驟認證。

廣義來說的話，任何一次性使用的密碼都算，也就是步驟二的 1~3 項。像台灣的銀行常用 OTP 來指刷卡或轉帳時的簡訊或 Email 的驗證碼。只是國外不常這樣用。

### 通用第二因素

- <abbr title="Universal 2nd Factor">U2F</abbr>
- <abbr title="Web Authentication">WebAuthn</abbr>
- FIDO2

包含步驟二 6~7 項的協定。如果你使用的是 Chromium 系列的瀏覽器，可以在在網址列輸入`chrome://settings/passkeys`查詢目前瀏覽器有儲存的 PassKey

FIDO2 是一個專案 (或協定、標準)，<abbr title="Fast IDentity Online">FIDO</abbr> 是負責制定的聯盟 (由眾家廠商組合而成)

如果你懂網頁開發的話，可以參考[ArvinH 大大的文章](https://blog.techbridge.cc/2019/08/17/webauthn-intro/)來實作

## ✨ 功能

### FIDO2 & OTP

可能是這支金鑰最大的用處 xDDDD：在支援硬體金鑰的網站上，可以用來驗證身分。

最近的大新聞是 Apple 終於在 iOS 16.3 和 macOS Ventura 13.2 [支援](https://support.apple.com/zh-tw/HT213154)了，而且還一口氣往前推進到要求至少 2 把硬體金鑰，看起來是挺認真研究過這個生態系的。

詳細的設定和使用大概長這樣：

{{< youtube id="PeF0Y8pT7UQ" >}}

需要注意的是，有的網站 (比如 Microsoft 和 Mailcow) 會在使用硬體金鑰的時候要求進一步驗證，這時候就會用到 FIDO2 PIN 碼，而在登入的同時，網站和帳號也會寫入這支金鑰。至於有哪些帳號登錄在金鑰上，可以在 Yubico Authenticator 中的 WebAuthn 分頁中查看。

Yubico Authenticator 的另外一個功能就是可以把 [OTP 密碼]({{< ref "#一次性密碼" >}}) 存入金鑰裡，然後這個金鑰在任何裝有 Yubico Authenticator 的地方都可以存取這些 OTP，缺點是最多只支援 32 個帳號。

但我很滿意我目前使用的 1Password，所以 pass

### Yubico OTP

{{< alert >}}
**注意** 這裡的 OTP 指的跟前面段落提到 OTP 不是同一個東西！
{{< /alert >}}

一個 YubiKey 最多可以同時支援 2 種 OTP 密碼，一個是短按、一個長按

![Yubikey Manager OTP 截圖](otp.png)

可以從下面 4 種來選擇：

|                    | 技術文檔                                                                                     | 設定教學影片                        |
| ------------------ | -------------------------------------------------------------------------------------------- | ----------------------------------- |
| Yubico OTP         | [Yubico](https://docs.yubico.com/yesdk/users-manual/application-otp/yubico-otp.html)         | [Vimeo](https://vimeo.com/77862029) |
| Challenge-Response | [Yubico](https://docs.yubico.com/yesdk/users-manual/application-otp/challenge-response.html) | [Vimeo](https://vimeo.com/94353666) |
| Static password    | [Yubico](https://docs.yubico.com/yesdk/users-manual/application-otp/static-password.html)    | [Vimeo](https://vimeo.com/73619336) |
| OATH-HOTP          | [Yubico](https://docs.yubico.com/yesdk/users-manual/application-otp/hotp.html)               | [Vimeo](https://vimeo.com/94352853) |

目前實作這些協定的地方似乎很有限，或是我看不懂他在幹嘛。

唯一一個我看的懂的是 Static password，我是把裡面的密碼設定為系統管理者密碼，這樣遇到需要輸入系統管理者密碼的時候，可以透過觸碰金鑰的方式來輸入。

<script src="https://geo.dailymotion.com/player/xc41k.js" data-video="x8in4qr"></script>

需要注意的是，它在輸入之後會自動按 `enter/return ⏎`，還有就是在一般沒有隱藏輸入的地方 (比方說一般的文字輸入框或是文字編輯器) 也會觸發，所以我是這個功能設定在 slot 2 (長按) 的欄位，避免誤觸。

### PIV (Smart Card)

目前已知最大的功能是用來做 macOS 登入，詳細可以參考[官方文檔](https://support.yubico.com/hc/en-us/articles/360016649059-Using-Your-YubiKey-as-a-Smart-Card-in-macOS)，可是我目前對使用 Touch ID 很滿意，所以一樣 pass

### OpenPGP

{{< alert >}}
**注意** 這一 part 的內容會超出一般使用者的使用範圍，如果你不知道什麼是 OpenPGP 可以直接跳過
{{< /alert >}}

詳細的教學可以參考下面這支影片，雖然這支是在 Windows 上操作，但基本上跟在 macOS/Linux 上大同小異。

{{< youtube id="fEftwheNMm8" >}}

GPG 的開發群真的把安全的規格推的很頂，這個協定的作法本身是把整個 key + certificate 全部都存到金鑰上，讓這些資料跟著金鑰在不同的硬體上穿梭。

但 GPG 對我來說最大的用途就是用來簽署我的 git commit，所以我其實比較喜歡的作法是：把加密後的 key 留在本機上，透過 agent 去向硬體金鑰要求 authenticate，通過之後再一次性的把 key 解密簽署。

所以總而言之，這部分雖然是有點意思，蛋跟我目前的 workflow 不太合，再度 pass

## 結論

好像能玩的都玩過一遍了，但是並沒有真的走進我最常使用的那些使用場景，再加上 PassKey 就快要全面上路了，我想不到有了 passkey 之後，硬體金鑰的價值還剩下哪些。

也許等時候到了再來好好研究一下吧。

Q: 這東西會提升安全性嗎？<br>
A: 當你把硬體金鑰設定為唯一的登入方式之後，會。但實際上通常不會這麼做，因為如果不小心把金鑰弄丟了，就 GG 思密達

Q: 推薦買嗎 ?<br>
A: 為了好玩的話可以買，雖然這個價格可以拿去買更好玩的東西。為了安全的話就不用了。
