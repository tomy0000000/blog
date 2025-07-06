---
title: "我的 Terminal + Zsh 心法"
date: 2025-04-27T19:06:29-07:00
lastmod: 2025-04-28T16:23:46-07:00
description: "Edition 2025, 保證瞎趴，但不保證好用 (???????"
categories: ["🤖 開發"]
tags: ["📟 終端機", "📟 CLI"]
---

自從 2 月開始工作之後，新的專案開始更頻繁的使用 `kubectl` 來操作公司內部的 Kubernetes，可是我的 terminal 一直沒辦法使用 `kubectl` 的 Completion，即便照著官方的 document 設定還是沒辦法正常使用。拖延 2 個月之後，才終於發現是我長年使用的 Zsh 框架 Antigen 有一個[長年未解的 bug](https://github.com/zsh-users/antigen/issues/603)，導致他們會打架，幾經考量之後，決定順便通盤整理一下我的 Terminal + Zsh。

有鑑於網路上已經有[太多](https://www.google.com/search?q=Zsh+Terminal+%E6%95%99%E5%AD%B8) Terminal / Zsh / Oh My Zsh / Powerlevel9k / Powerlevel10k 的文章了，所以我不打算再重新介紹一遍這些工具。作為 N 年前也曾經照著這些教學無腦往 Terminal 複製貼上的人，更有意義的是分享一下要用什麼 mindset 去理解這些工具，還有理解它們想嘗試解決的問題。

所以，這篇文會作為一篇「導論」，讓 N 年前的我自己，還有現在正在讀這篇文章的你，有一份清晰的指南可以在被設定檔搞到昏頭轉向的時候，有一些基本的原則去遵循。掌握關鍵的想法，再回到實作課裡面照著前面說的這些教學，實際操作設定適合自己的 Terminal！

## 📛 名詞定義

首先先來幾個基本的名詞定義

我姑且在這篇文章以及我的 [Docs](https://docs.tomy.me/zsh) 中粗暴的把這些跟 Terminal 有關的工具以主要的功能歸納進以下的分類，但部分工具也是有可能同時支援其他的功能，比方説 Oh My Zsh 雖然最主要的功能是作為 Library 提供各種 Plugin，但它也有提供簡單的 Prompt 客製化功能。

### 📟 Terminal

終端機，也就是你會打開使用的應用程式。我目前使用的是 [iTerm](https://iterm2.com/)。

雖然網路上每隔一陣子就會有新的 macOS Terminal 發布，但大部分最後都很難持續下去，iTerm 即便老，但社群還是很活躍，大部分我碰到過的問題都有人踩過了，再加上它的外觀設定支援無邊際 + 自動 Dark/Light 模式的切換，說實在沒什麼值得抱怨的。

如果你對其他小眾的 macOS Terminal 有興趣，可以在我的 [Docs](https://docs.tomy.me/mac-app) 裡搜尋 Terminal。

### 🐚 Shell

終端機在開啟之後啟動的程式，作為你與電腦之間交互的介面，我目前使用的是 Zsh。

雖然一度曾經考慮過 Fish，但網路上看過去，社群最活躍的依舊是 Zsh，再加上大部分 Linux 系統都還是使用 Bash 來寫腳本，而 Zsh 的語法基本上跟 Bash 高度相容，短期內沒有打算離開這個舒適圈。

### 📚 Library

函式庫，有很多別人寫好的小工具，主要提供各式各樣的功能，可以混著使用，但我目前只有使用 [Oh My Zsh](https://ohmyz.sh/)。如果之後有空可能會去看看 [Prezto](https://github.com/sorin-ionescu/prezto) 裡面有什麼好玩的東西。

過來人衷心建議大家安裝 Plugin 的時候好好看一下裡面有哪些功能，不然裝了等於沒裝。

### 🏭 Framework

框架，主要提供系統化的方式去管理各種工具的設定或腳本。以前使用的是 [Antigen](https://github.com/zsh-users/antigen)，但前言有提到，這框架已經有長達 6 年沒維護了。這個月試了 [Zinit](https://github.com/zdharma-continuum/zinit), [Zim](https://github.com/zimfw/zimfw) 還有 [Sheldon](https://github.com/rossmacarthur/sheldon)，最終選了 Zinit，主要的考量有以下原因：

- 主設定檔就是 Zsh 腳本，所以我可以在裡面放 if-else 來根據執行的環境動態決定我要載入哪些 plugin
- 支援 Completion 管理，這功能我沒在其他 framework 看過，又潮又實用
- 可以透過 pre-compile plugin 腳本來大幅加快載入速度
- 有 reporting/investigating 的功能，如果有任何奇怪的問題，可以透過這個功能來 debug

### λ Prompt

有點難以翻譯，總之就是你在 Terminal 中每執行完一個指令會重新印出來的指標。網路上最流行的應該是 [Powerlevel9k](https://github.com/Powerlevel9k/powerlevel9k) 和 [Powerlevel10k](https://github.com/romkatv/powerlevel10k)，我用的是 [Starship](https://github.com/starship/starship)，因為這個是 Rust 寫的，速度極快，而且設定起來非常簡單，不如 Powerlevel10k 那麼複雜。

我的建議是，去預設的範本裡找一個順眼的抄來直接用，美觀這種的東西，在你沒有真的感覺到很不順眼之前，不值得花太多時間設定。

## ⏳ RC File

通常 Shell 在啟動之後先執行一系列的設定檔，俗稱「RC File」，根據你的 Shell 和作業系統的不同，執行順序可能會[很不一樣](https://blog.flowblok.id.au/2013-02/shell-startup-scripts.html)，身為把這個議題研究的~~算是有點~~透徹的過來人，我強烈不推薦大家去研究這東西，反正你的作業系統有極高的機率不會照著文檔上的描述運作 ¯\\\_(ツ)\_\/¯ 只要知道有這回事，然後真的需要 debug 的時候再回來看看就好。

我自己統整出來一個在 Zsh 中可以應付 90% 使用場景的簡單做法是：

- 只設定兩個設定檔：`.zshenv` 還有 `.zshrc`
- `.zshenv` 設定好大部分重要的環境變數，像是 `PATH`, `ZDOTDIR` 還有 `XDG_CONFIG_HOME`
- 剩下的全部放到 `.zshrc`

實務上我會：

- 把我的各項設定檔備份到我的 [dotfiles repo](https://github.com/tomy0000000/dotfiles)
- 把 repo clone 到 `~/.dotfiles` 下
- Soft Link `.zshenv` 到 `~/.zshenv`
- 在 `.zshenv` 裡用 `ZDOTDIR` 和 `XDG_CONFIG_HOME` 這兩個特殊的環境變數來指向 repo 裡的設定檔
- 其他的設定檔可以繼續放在 `~/.dotfiles/zsh`

這樣可以有效保持 Home 目錄底下的整潔，有任何改動也可以 commit 到 repo 同步到其他環境。

## ⚡️ 速度 \>\> ✨ 功能 \>\>\>\>\> 🦄 美觀

Terminal 是一個工具，目的是提供一個舒服的環境把事情做完，然後 move on 到其他更重要的事情。秉持著這個觀點，如果因為使用了某個工具，導致 Terminal 反應速度變的遲緩，我是絕對不會接受的。

我的建議是，如果你用的某些工具有類似的問題，可以去查查看有沒有加速的功能，比如：

- Zinit 的 [Turbo / Lucid](https://github.com/zdharma-continuum/zinit?tab=readme-ov-file#turbo-and-lucid)
- Powerlevel10k 的 [Instant Prompt](https://github.com/romkatv/powerlevel10k?tab=readme-ov-file#instant-prompt)

這些功能大部分都是以異步的方式去載入速度比較慢的 plugin，雖然聽起來有點 overkill，但真的在辦正事的時候，這些毫秒級的差異，感受其實會異常明顯。

## 🛣️ `PATH` 的順序

雖然這部分我也還沒完全整理乾淨，但理想上是按照這個順序：

1. `pyenv`, `rbenv`, `goenv` 等等版本管理器的 `PATH`，比方説 `~/.pyenv/shims`
2. 個別使用者層級的 Binary：通常我會放在 `~/.local/bin` ，`pip` 安裝的東西也會預設在這裡
3. 多個使用者共用的 Binary：我會放在 `/opt/some-shared-cli`，這個靈感來自 Homebrew，我大致看了一下他們的決策過程，覺得這是一個合理的做法，所以跟隨了他們的腳步。放在 Homebrew 前面這樣才可以優先使用這些另外安裝的工具。
4. Homebrew：在 Apple Silicon 的話會在 `/opt/homebrew`
5. `/usr/local/bin` 是 Homebrew 在 Intel 時期的預設位置，有些工具也會傾向安裝在這裡，為了相容這些工具會把這個也加上。
6. 作業系統提供給使用者的 Binary，比方説 `/usr/bin` 和 `/bin`
7. 系統本身要用的 Binary，比方説 `/usr/sbin` 和 `/sbin`

## 🌈 顏色要在哪裡設定

以我使用的 [Dracula](https://draculatheme.com/) 主題來說，你可以選擇在這些地方安裝主題

- [iTerm](https://draculatheme.com/iterm)
- [Zsh / Oh My Zsh](https://draculatheme.com/zsh)
- [Starship](https://draculatheme.com/starship)

不論你選擇在哪裡安裝，這個主題都會生效，但我發現最合理的選項只有 Terminal，因為其他層級的控制範圍都只包含到文字的顏色，只有 Terminal 可以同時修改視窗 + 背景的顏色。比方説 iTerm 會自動切換 Dark/Light 模式下的背景顏色，所以文字的顏色自然也就必須要跟著切換，不然 Dark Mode 下的螢光色文字放到 Light Mode 真的會瞎掉：）但缺點就是如果你有其他的 Terminal，比方説 VS Code，那兩邊就需要分開設定。

---

好了差不多就這樣，其他改天想到再補充。我的各種設定都有在 [dotfiles](https://github.com/tomy0000000/dotfiles) 裡，歡迎大家~~抄作業~~觀摩，祝大家玩 Terminal 玩的開心！有問題也可以在下面留言跟我討論 (๑•̀ㅂ•́)و✧
