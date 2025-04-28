---
title: "我的 Terminal + Zsh 心法"
date: 2025-04-12T17:10:38-07:00
description: "Edition 2025, 保證瞎趴，但不保證好用 (???????"
categories: ["🤖 開發"]
tags: ["📟 終端機", "📟 CLI"]
---

自從 2 月開始工作之後，新的專案開始更頻繁的使用 `kubectl` 來操作公司內部的 Kubernetes，可是我的 terminal 一直沒辦法使用 `kubectl` 的 Completion，即便照著官方的 document 設定還是沒辦法正常使用。拖延 2 個月之後，才終於發現是我長年使用的 Zsh 框架 Antigen 有一個[長年未解的 bug](https://github.com/zsh-users/antigen/issues/603)，會導致這個問題，於是終於來正視這個問題，然後順便通盤整理一下我的 Terminal + Zsh。

有鑑於網路上已經有[太多](https://www.google.com/search?q=Zsh+Terminal+%E6%95%99%E5%AD%B8) Terminal / Zsh / Oh My Zsh / Powerlevel9k / Powerlevel10k 的文章了，所以我不打算再重新介紹一遍這些工具。作為 N 年前也曾經照著這些文章無腦往 Terminal 複製貼上的人，我覺得更有意義的是去理解這些工具究竟是什麼，還有試著去理解它們想嘗試解決的問題。

所以，這篇文會作為一篇「導論」，讓 N 年前的我自己還有現在正在看這篇的你，可以有一份清晰的指南去遵循，理解這些東西之後，再到實作課裡面照著前面我說的這些文章，實際操作設定適合自己的 Terminal！

## 📛 名詞定義

首先先來幾個基本的名詞定義

這些只是一些我喔粗略的劃分，大部分跟 Terminal 有關的工具都歸納進以下的其中的一項或多項，我在自己的 [Docs](https://docs.tomy.me/zsh) 裡整理了一些常見的工具，但也是有一些工具可能同時支援其他的功能，比方説 Oh My Zsh 雖然最主要的功能是作為 Library 提供各種 Plugin，但它也有提供簡單的 Prompt 客製化功能。

### 📟 Terminal

終端機，也就是你會打開使用的應用程式。我目前使用的是 iTerm。

雖然網路上每隔一陣子就會有新的 macOS Terminal 發布，但大部分最後都很難持續下去，iTerm 雖然有點老，但使用人數還是很多，所以遇到的雷大部分都有人踩過了，再加上它的外觀設定支援無邊際 + 自動 Dark/Light ，我對他沒什麼好抱怨的。

如果你是用 macOS，有興趣試試其他的 Terminal，可以在[我的 Docs](https://docs.tomy.me/mac-app) 裡搜尋 Terminal。

### 🐚 Shell

終端機在開啟之後啟動的程式，作為你與電腦之間交互的介面，我目前使用的是 Zsh。

雖然一度曾經考慮過 Fish，但網路上看過去，社群最活躍的依舊是 Zsh，再加上大部分 Linux 系統的預設 Shell 還是 Bash，而 Zsh 的語法基本上跟 Bash 高度相容，我短期內應該是離不開 Zsh。

### 📚 Library

函式庫，有很多別人寫好的小工具，主要提供各式各樣的功能，可以混著使用，但我目前只有使用 Oh My Zsh。如果之後有空可能會去看看 Prezto 裡面有什麼好玩的東西。

過來人衷心建議大家安裝 Plugin 的時候好好看一下裡面有哪些功能，不然裝了等於沒裝。

### 🏭 Framework

框架，主要提供系統化的方式去管理各種工具的設定或腳本。以前使用的是 [Antigen](https://github.com/zsh-users/antigen)，但已經有長達 6 年沒維護了。這個月試了 [Zinit](https://github.com/zdharma-continuum/zinit), [Zim](https://github.com/zimfw/zimfw) 還有 [Sheldon](https://github.com/rossmacarthur/sheldon)，最終是選了 Zinit，主要的考量有兩點：

- 主設定檔就是 Zsh 腳本，所以我可以在裡面放 if-else 來根據執行的環境動態決定我要載入哪些 plugin
- 支援 Completion 管理，這功能我沒在其他 framework 看過，又潮又實用
- 可以透過 pre-compile plugin 腳本來大幅加快載入速度
- 有 reporting/investigating 的功能，如果有任何奇怪的問題，可以透過這個功能來 debug

### λ Prompt

有點難以翻譯，總之就是你在 Terminal 中每執行完一個指令會重新印出來的指標。網路上最流行的應該是 [Powerlevel9k](https://github.com/Powerlevel9k/powerlevel9k) 和 [Powerlevel10k](https://github.com/romkatv/powerlevel10k)，我用的是 [Starship](https://github.com/starship/starship)，因為這個是 Rust 寫的，速度極快，而且設定起來非常簡單，不如 Powerlevel10k 那麼複雜。

我的建議是，去預設的範本裡找一個順眼的抄來直接用，美觀這種的東西，在你沒有真的感覺到很不順眼之前，不值得花太多時間設定。

## ⏳ RC File

通常 Shell 在啟動之後先執行一系列的設定檔，俗稱「RC File」，根據你的 Shell 和作業系統的不同，執行順序可能會[很不一樣](https://blog.flowblok.id.au/2013-02/shell-startup-scripts.html)，身為把這個議題研究的~~算是有點~~透徹的過來人，我強烈不推薦大家去研究這東西，反正你的作業系統有極高的機率不會照著文檔上的描述運作 ¯\\\_(ツ)\_\/¯

我後來統整出來一個 Zsh 中可以應付 90% 使用場景的簡單做法是：

- 只設定兩個設定檔：`.zshenv` 還有 `.zshrc`
- `.zshenv` 設定好大部分重要的環境變數，像是 `PATH`, `ZDOTDIR` 還有 `XDG_CONFIG_HOME`
- 剩下的全部放到 `.zshrc`

實務上，我會把我的各項設定檔備份到我的 [dotfiles Git Repo](https://github.com/tomy0000000/dotfiles) 然後 Clone 到 `~/.dotfiles` 下，所以除了 `.zshenv` 需要真的 Soft Link 到 `~/.zshenv` 之外，其他的設定檔可以直接放在原本的地方，最後用 `ZDOTDIR` 和 `XDG_CONFIG_HOME` 這兩個特殊的環境變數來指向實際的設定檔，這樣可以有效保持 Home 目錄底下的整潔。

## ⚡️ 速度 \>\> ✨ 功能 \>\>\>\>\> 🦄 美觀

Terminal 是一個工具，目的是提供一個舒服的環境把事情做完，然後 Move On 到其他更重要的事情。秉持著這個觀點，如果因為使用了某個工具，導致 Terminal 反應速度變的遲緩，我是絕對不會接受的。

我的建議是，如果你用的某些工具有類似的問題，應該好好去研究一下，他有沒有加速的功能，比如：

- Zinit 的 [Turbo / Lucid](https://github.com/zdharma-continuum/zinit?tab=readme-ov-file#turbo-and-lucid)
- Powerlevel10k 的 [Instant Prompt](https://github.com/romkatv/powerlevel10k?tab=readme-ov-file#instant-prompt)

這些功能大部分都是以異步的方式去載入速度比較慢的 plugin，雖然聽起來有點 Overkill，但真的在辦正事的時候，這些毫秒級的差異，感受其實會異常明顯。

## 🛣️ `PATH` 的順序

雖然這部分我也還沒完全整理乾淨，但理想上是這樣：

1. `pyenv`, `rbenv`, `goenv` 等等版本管理器的 `PATH`，比方説 `~/.pyenv/shims`
2. 個別使用者層級的 Binary：通常我會放在 `~/.local/bin` ，`pip` 安裝的東西也會預設在這裡
3. 多個使用者共用的 Binary：我會放在 `/opt/some-shared-cli`，Homebrew 決定放在這個路徑，我大致的看了一下他們的決策過程，大致認同，所以跟隨了他們的腳步。放在 Homebrew 前面這樣才可以優先使用這些另外安裝的工具。
4. Homebrew：在 Apple Silicon 的話會在 `/opt/homebrew`
5. `/usr/local/bin` 是 Homebrew 在 Intel 時期的預設位置，有些工具也會傾向安裝在這裡，為了相容這些工具會把這個也加上。
6. 作業系統提供給使用者的 Binary，比方説 `/usr/bin` 和 `/bin`
7. 系統本身要用的 Binary，比方説 `/usr/sbin` 和 `/sbin`

## 🌈 顏色要在哪裡設定

以我使用的 [Dracula](https://draculatheme.com/) 主題來說，你可以選擇在這些地方安裝主題

- [iTerm](https://draculatheme.com/iterm)
- [Zsh / Oh My Zsh](https://draculatheme.com/zsh)
- [Starship](https://draculatheme.com/starship)

不論你選擇在哪裡安裝，這個主題都會生效，但我發現最合理的選項只有 Terminal，因為其他層級的控制範圍都只包含到文字的顏色，只有 Terminal 可以同時修改視窗 + 背景的顏色。比方説 iTerm 支援自動跟隨系統的 Dark/Light 模式切換背景色，所以文字的顏色自然也就必須要跟著切換，不然 Dark Mode 下的螢光色文字放到 Light Mode 真的會瞎掉：）但當然如果你有其他的 Terminal，比方説在 VS Code，那那邊就也要安裝一次

---

好了差不多就這樣，其他改天想到再補充。我的各種設定都有在 dotfiles 裡，歡迎大家~~抄作業~~觀摩，祝大家玩 Terminal 玩的開心！有問題也可以在下面留言跟我討論 (๑•̀ㅂ•́)و✧
