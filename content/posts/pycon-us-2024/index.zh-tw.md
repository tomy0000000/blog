---
title: "PyCon US 2024"
date: 2024-05-28T00:08:01-07:00
description: "PyCon US 初體驗 🫶🏻"
categories: ["🤖 開發"]
tags: ["🎪 PyCon", "🐍 Python"]
feature: "tomy-at-pycon-us.jpg"
featureAlt: "我在 PyCon US 2024"
---

沒綽！在體驗 🇹🇼 PyCon TW 和 🇩🇪 PyCon DE 之後，當然要來體驗地表最大的 PyCon：🇺🇸 PyCon US。

也剛好今年 PyCon US 辦在匹茲堡，也就是 CMU 所在的城市。也因此省下我不少的摳摳，也不需要大老遠飛到別的城市。

那就馬上來聊聊今年有些什麼吧

## 🐍 Python 3.13

即將在今年年底發布啦！

### 🔖 型別標識

型別標識應該是 Python 近 10 年來最巨大的改變之一，重要到有一個專門的委員會在 PyCon 期間舉行了一個高峰會，用來討論和主導這個議題接下來的走向。

今年總共有 4 個 PEP 被接受並且實作。雖然這些變動乍看之下很難理解，但如果善加使用，編輯器和語法檢查的工具會能夠更理解你的程式，然後進一步在寫程式的時候提供更好的自動完成選項。

### 🔓 移除 GIL

GIL 應該是 Python 最重要的元件，它會透過確保同一時間只有一個線程在執行，來避免程式出現 race condition，在大部分情境下其實非常好用。但是對於需要高速平行化運算的使用情境，GIL 反而成了一個嚴重的累贅，因為他會導致程式在同一時間只使用 CPU 的其中一顆核心，然後放著其他核心在旁邊閒著。但是 GIL 同時又是一個幾乎從 Python 誕生的時候就存在的東西，導致現在要移除它變得格外困難，因為有很多其他重要的核心元件也會使用或需要 GIL。

為了解決這個需求，Python 3.12 推出了 [sub-interpreter](https://docs.python.org/3.12/whatsnew/3.12.html#pep-684-a-per-interpreter-gil)，就是為了讓某些程式能夠分割成多個小塊，然後讓它們在不同的 sub-interpreter 中執行，就不會受到 GIL 的限制。

但這仍舊只是一個臨時的解決方案，沒有真的從根源解決問題。社群裡的大家想要的，還是完全的把 GIL 移除，來解放 Python 所有的潛在性能，也就是所謂的 [Free-threaded](https://docs.python.org/3.13/whatsnew/3.13.html#free-threaded-cpython)。

去年，有一群 Meta 的工程師就這個問題[討論](https://discuss.python.org/t/a-fast-free-threading-python/27903/99)了一陣子，並且得到公司的支持來全力實作這個巨大的變動。

於是乎，路線圖、[PEP 703](https://peps.python.org/pep-0703/)、[第一支 PR](https://github.com/python/cpython/pull/116338)被陸續接受和實作。而 Python 3.13 即將成為第一版能夠在沒有 GIL 的情況下運行的官方 Python。

但要能夠在這個模式下運行，還是有很多限制，非常、非常多的限制。所以如果想要嘗試這個版本的 Python 可以看看[這個演講的筆記](https://gist.github.com/tonybaloney/24d545ed855a3c90f844209152835f07)。

### 📅 CalVer?

Hugo，也就是 Python 3.14 和 3.15 的發行主管在語言高峰會提出了一個新 Idea——把 Python 的版本命名改為 [CalVer](https://calver.org/)。

也就是說，如果這個提案最後成了，Python 3.14 和 3.15 會分別變成 3.25 和 3.26。

Python 長年以來一直依照 [SemVer](https://semver.org/) 的方式在上版本號，但其實 Python 推出的時候，SemVer 根本就還不存在。當時的 Python 並沒有穩定的發行週期，也因此上版號的方式意外的跟 SemVer 的概念不謀而合。

但如今，Python 變成每年固定會發行一次，因此如果改成 CalVer 將會有更多額外的方便之處。如果有興趣的話，可以去看看 [Hugo 的演講](https://hugovk.github.io/python-calver/)。

## 🌅 幾個熱門的新 package

雖然這些 package 已經存在一段時間了，但他們攻下了今年諸多 Talk 的主題，值得在這邊留名。

- [PyScript](https://github.com/pyscript/pyscript)：隨著 WebAssembly 漸漸流行起來，越來越多人開始使用 PyScript 來直接在瀏覽器裡嵌入 Python 的程式碼。純 Python 的 package 現在也可以像 JavaScript 一樣，直接在文件的網站上放上一個 playground 或沙盒，讓使用者直接試用 API。
- [PyO3](https://github.com/PyO3/pyo3)：PyO3 的流行幾乎是隨著 Rust 而來。透過把 Rust 程式包裝成介面，現有的 Python package 可以把底層的邏輯用 Rust 改寫，然後馬上就可以提升不少執行效率。
- [DuckDB](https://github.com/duckdb/duckdb)：SQLite 的目標是要成為一個像是 MySQL 和 Postgres 的簡易版的 RDBMS，而 DuckDB 就是要在 Analytical 資料庫界扮演同樣的角色。雖然目前還沒有太多把 DuckDB 在正式環境佈署的案例，但初期的開發者回饋似乎還不錯。同時也宣布了未來會有雲端版的 DuckDB，而這個雲端版不會單單只是一個託管的服務，而是透過在雲端檢索海量資料，然後讓部分資料處理在本機運算，來提昇整體效能。聽起來還挺有意思的，值得未來再多關注。

## 🍭 雜談

再隨便寫些我覺得挺有趣的想法...

### 🥗 食物

我 2021 年在歐洲交換的時候有去 🇩🇪 PyCon DE。德國跟美國有一個共同點就是，即便他們有標示午餐的菜名是什麼，但我永遠都看不懂。至於美味程度的話，就是天壤之別了。不太確定這麼難吃的食物是誰的責任，有可能 PSF 沒有足夠的資金或時間來安排餐點 (其實沒有毛病，我也沒有要責怪的意思)，又或是美國人已經完全習慣食物很難吃，導致他們也不打算再努力了。

但總之我真心期許他們明年能證明我錯了，嗯

### 👖 為什麼都沒有褲紙

逛了一圈贊助商攤位，我拿到超多有的沒的品牌紀念品，像是 T 恤、帽子、甚至是襪子。但我就在想：為什麼沒有公司在發褲子？是怎樣，工程師都在家工作，所以不用穿褲子嗎：）

## 🌯 就醬

明年的 PyCon US 一樣會在匹茲堡舉辦。雖然我那時候應該也差不多要畢業，然後高歌離席了，但是這個日期挺接近我的畢業典禮，所以我想應該會一趟一口氣跑兩個行程吧。

那就明年見啦！

---

## 🎀 鳴謝

特別感謝 CMU Office of Graduate and Postdoctoral Affairs 透過 Professional Engagement Funding 贊助我這次的門票。
