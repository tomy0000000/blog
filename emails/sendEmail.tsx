import { Temporal } from "@js-temporal/polyfill"
import { Resend } from "resend"
import Newsletter from "./newsletter"
import * as React from "react"

const resend = new Resend(process.env.RESEND_API_KEY)
const sender = "Tomy Hsieh <newsletter@tomy.me>"

const title = "2025 年 5 月報報"
const subtitle = "The moment that defines the ones who do."
const summary =
  "發現寫部落格有一個有趣現象：這個月沒什麼大事，會因為沒有題材，所以不好寫。但反過來，太多行程，太多東西可以寫，也會很頭疼。另一方面，太多事要做的時候，要抽出時間和心情來寫，其實也不是一件容易的事。"
const postUrl = "https://blog.tomy.me/zh-tw/posts/2025-may-dump/"
const imageUrl =
  "https://blog.tomy.me/zh-tw/posts/2025-may-dump/cmu-commencement-with-taiwanese_hu_8681a2eabc9f99f8.webp"
const imageAlt =
  "一排畢業生在現代建築外牆前排隊合照，穿著學士袍與紅黃飾帶，氣氛歡樂。"

async function sendEmail() {
  // Create broadcast
  const createResponse = await resend.broadcasts.create({
    name: title,
    audienceId: process.env.RESEND_AUDIENCE_ID ?? "",
    from: sender,
    subject: `Tomy's Blog - ${title}`,
    react: (
      <Newsletter
        title={title}
        subtitle={subtitle}
        summary={summary}
        postUrl={postUrl}
        imageUrl={imageUrl}
        imageAlt={imageAlt}
      />
    ),
  })
  if (createResponse.error !== null || createResponse.data === null) {
    console.error(
      `Failed to create broadcast: ${createResponse.error?.message}`
    )
    return
  }
  const broadcastId = createResponse.data.id
  console.log(`Broadcast created: ${broadcastId}`)

  // Schedule send
  const taipeiNow = Temporal.Now.zonedDateTimeISO("Asia/Taipei")
  const taipeiNext8AM = taipeiNow
    .round({ smallestUnit: "day", roundingMode: "floor" })
    .add({ days: taipeiNow.hour >= 8 ? 1 : 0 })
    .with({ hour: 8 })
  const localSendTime = taipeiNext8AM.withTimeZone(Temporal.Now.timeZoneId())
  const sendResponse = await resend.broadcasts.send(broadcastId, {
    scheduledAt: taipeiNext8AM.toString(),
  })
  if (sendResponse.error !== null || sendResponse.data === null) {
    console.error(`Failed to schedule send: ${sendResponse.error?.message}`)
    return
  }
  const sendId = sendResponse.data.id
  console.log(`Send is scheduled at ${localSendTime.toString()}: ${sendId}`)
}

sendEmail()
