---
title: "ELI5: 如何在自家後院打造一台自駕車"
date: 2024-09-05T02:44:53-04:00
lastmod: 2024-09-08T13:52:31-04:00
description: "不就是放大一點的遙控車嗎，應該不難吧 (?)"
categories: ["📱 科技"]
series: ["🙋🏻 ELI5"]
tags: ["🛞 自駕車"]
---

實習最後幾天有幸跟做自駕車核心演算法的同事聊了一下，學到不少。

這篇文就把大家當 5 歲小孩，簡單教大家如何在自己家的後院造一台自駕車吧！

## 🛠️ 給西

如果你要蓋一間小木屋，你可以去 Home Depot 或特力屋買到所有你需要的材料和工具。但絕大部分需要用來打造自駕車系統的工具，都是各家公司自己打造的，所以你需要的各種工具，也都需要自己打造。 [^1]比方說 Cruise 打造了這個叫 [Worldview](https://medium.com/cruise/introducing-worldview-749aaf98112d) 的套件。好不好用......我也不知道，但看看他們放在部落格上的圖片，簡直酷斃了。

說起來簡單，但打造這些工具和平台的工作量，其實完全不小於寫自駕車算法本身。加上前面提到，目前沒有公用或對外開放的工具似乎也隱示了這或許會是一個不錯的創業主題，畢竟淘金熱最後真正賺錢的，似乎都是賣鏟子的 (?)

[^1]: 顯然即便是造車的公司，還是有可能不懂不要[重複造輪子](https://zh.wikipedia.org/zh-hant/%E9%87%8D%E9%80%A0%E8%BD%AE%E5%AD%90)的概念 (?)

## 🚙 造車

大部分自駕車公司會選擇跟現有的車廠買車，然後拖回家爆改。或是像現在在舊金山市區跑的 Waymo 是 Jaguar 為他們客製化的。也有些公司，對於自駕車有不同的想像，那可能就會選擇自己從頭把車子造起來，比方說 [Zoox](https://zoox.com/vehicle) 認為自駕車的真諦是讓買不起車子的人也能便宜的使用公用的車，所以他們的車會更像高級版的計程車。

---

接下來終於到重頭戲：核心的自駕車演算法

用一個人開車來比喻的話，一般駕駛的流程大概是：

1. 駕駛觀察周圍環境
2. 預測周圍的車、行人、環境接下來的變化
3. 做出相對反應的操作

自駕車的運作邏輯也差不多，就一個一個按順序介紹：

## 👀 Perception

第一步對應的步驟叫做 <abbr title="感知">Perception</abbr>，車子會透過 <abbr title="光學雷達">Lidar</abbr>、鏡頭、或是其他感測器來偵測周圍的環境。這些訊號進到系統之後，還要經過一系列的程序，把訊號轉換成有用的資訊，比方說：

- 前面的這個寬 3 公尺的方塊正在向前移動，他可能是台車子，不可撞。
- 路邊有一塊半透明的不明物體漸漸往路中間移動，可能是塑膠袋，可以嚕過去。

關於感測器的一個著名的路線之爭就是

> 自駕車要不要用 Lidar?

開車經驗稍微豐富的人就會知道，有時候在高速公路上，即便我們正前方的車沒有減速，但我們可能會透過看到更前面的路況，因此預先踩煞車。一般來說，現在的攝影鏡頭能感知到的範圍很有限，一方面受限於鏡頭解析度 (拍攝畫面清不清楚)，另一方面也受限於系統資源 (電腦沒辦法即時處理大量的影像畫面)。Lidar 的訊號則可以輕鬆的收集更遠的環境資訊，準確度也較高，缺點就是造價昂貴、還有裝在車上非常突兀，不符合 Elon Musk 對車子的審美觀。這也是為什麼 (目前) [Tesla](https://www.tesla.com/support/transitioning-tesla-vision) 主張他們不會採用 Lidar 車子也可以開的好好的，未來能不能跟 Lidar 派平起平坐，還有待觀察。

除了即時偵測環境，有些自駕車公司也會收集某些特定的區域的[高精準度地圖](https://waymo.com/blog/2020/09/the-waymo-driver-handbook-mapping/)，比方說一條路上哪裡有標線、路樹、停車格、消防栓、紅綠燈。預先知道這些物件，可以降低不穩定性、提前決策。但收集這種地圖的資料也非常耗費時間、人力成本，另外，如果車子開到的這條路今天剛好在施工，跟預期的道路長的不一樣的時候，應該要相信偵測到的訊號，還是懷疑下水道的煙霧阻擋了相機？

## 🧠 Prediction

車子不只要能夠看到右前方有一個人，在做出決策前，還要知道他接下來會不會走到車子前面。換句話說，還要能夠預測每個周圍物件的下一步。

而且預測的範圍是：車子周圍的每一個物件。因為當車子偵測到行人即將走到車子前面時，車子對於應該煞車，左轉，還是右轉，也取決於左右兩邊、後面其他環境可能的反應。

另外，演算法對於預測的結果有多少把握？有沒有可能失準？決策要怎麼跟預測結果配合？都會是很複雜的問題。

對於 L3、L4 的自駕車演算法，有時甚至還得產生多種不同的情境，來應付可能的複雜場景。

## 📢 Decision

現在車子的腦海裡有接下來幾秒可能會發生的事，下一步就是生成對應的決策，比方說要煞車還是轉彎？

這個步驟其實就跟[《超急快遞》中的一個片段](https://youtu.be/UMQwFhYMlqY?si=Dr4yIfF4nI2V7dUL&t=114)非常相似，先產生很多決策，然後從中間選擇一個最合理的來執行。同時，這些決策也會被儲存下來，這樣出車禍的時候才能夠回頭檢驗，車子當時在「想什麼」。

這一步考慮的不只是安全，也可能會考量乘客的舒適度等其他更複雜，難以想像的因素。比方說，前面突然有障礙物，雖然車子覺得煞得住，但可能會對乘客產生強大的後座力，那轉向右邊的空地會不會更好一點? [^2]

[^2]: 如果要減少這個「突然」的機率，就又會回到前面是否要採用 Lidar 的問題

## 🛞 Motion & Control

現在車子知道要在接下來的 2 秒內從 40km/hr 減速到停止，煞車踩太用力，乘客不舒服，踩太慢，可能會煞不住。理想的煞車曲線是先輕輕踩，慢慢加深，降低到一定速度之後，再跟著慢慢鬆開，減少完全停止時的頓挫感。這時就需要複雜的數學計算，把這條煞車曲線換算成一張圖表，再進一步決定每一個毫秒具體是採多少 cm 的煞車。

不同廠牌的車子可能也有不一樣的邏輯，沒辦法用同一套標準來執行，有些車的方向盤打一圈是轉 90°，有些車得打兩圈。

要怎麼真的踩煞車、打方向盤，硬體、機械控制組件要怎麼配合又是另外一回事了......

最後一個問題，行車電腦當機了怎麼辦？

---

當你成功解決上述所有的難題之後，一輛自駕車就誕生囉！
