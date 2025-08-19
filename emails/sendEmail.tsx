import { Temporal } from "@js-temporal/polyfill"
import { Resend } from "resend"
import Newsletter, { NewsletterProps } from "./newsletter"
import * as React from "react"
import * as fs from "fs"
import * as path from "path"
import matter from "gray-matter"

const SENDER = "Tomy Hsieh <newsletter@tomy.me>"
const JSON_INDEX = "public/zh-tw/index.json"
const POST_SECTION = "寫作"
const POST_DIR = "content/posts"
const POST_MARKDOWN = "index.zh-tw.md"

async function main() {
  // Get the latest blog post
  const rootDir = path.dirname(__dirname)
  const post = getLatestPost(rootDir)
  console.info("Sending post", post)

  // Create Resend client
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY not defined")
  }
  const resend = new Resend(RESEND_API_KEY)

  // Send a preview email
  await sendEmail(post, resend, SENDER, "Tomy Hsieh <tomy0000000@gmail.com>")

  // Schedule official email
  const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID
  if (!RESEND_AUDIENCE_ID) {
    throw new Error("RESEND_AUDIENCE_ID not defined")
  }
  await sendEmailToAudience(post, resend, SENDER, RESEND_AUDIENCE_ID as string)
}

function getLatestPost(rootPath: string): NewsletterProps {
  // Read index from json
  const indexPath = path.join(rootPath, JSON_INDEX)
  const indexJson = JSON.parse(fs.readFileSync(indexPath, "utf-8"))

  // Find the latest post slug
  const latestPost = indexJson.find(
    (item: { section: string; title: string }) =>
      item.section === POST_SECTION && item.title !== POST_SECTION
  )
  if (!latestPost) {
    throw new Error(`No post found in section ${POST_SECTION}`)
  }
  const BLOG_HOST = process.env.BLOG_HOST
  if (!BLOG_HOST) {
    throw new Error("BLOG_HOST not defined")
  }
  const permalink = new URL(latestPost.permalink, BLOG_HOST)
  const slug = permalink.pathname.split("/").filter(Boolean).pop()
  if (!slug) {
    throw new Error("Could not extract slug from permalink")
  }

  // Parse post markdown
  const markdownPath = path.join(rootPath, POST_DIR, slug, POST_MARKDOWN)
  const fileContent = fs.readFileSync(markdownPath, "utf-8")
  const { data, content } = matter(fileContent)
  const summary = content.slice(
    content.indexOf("\n") + 1,
    content.indexOf("\n", content.indexOf("\n") + 1)
  )

  return {
    title: data.title,
    subtitle: data.description,
    summary,
    postUrl: permalink.toString(),
    imageUrl: buildImageURL(slug, data.feature).toString(),
    imageAlt: data.featureAlt,
  }
}

function buildImageURL(postSlug: string, imageSlug: string): URL {
  const baseUrl = process.env.IMG_HOST
  if (!baseUrl) {
    throw new Error("IMG_HOST not defined")
  }
  return new URL(`${postSlug}/${imageSlug}`, baseUrl)
}

async function sendEmail(
  post: NewsletterProps,
  resend: Resend,
  sender: string,
  testingEmail: string
) {
  const createResponse = await resend.emails.send({
    from: sender,
    to: testingEmail,
    subject: `Tomy's Blog - ${post.title}`,
    react: (
      <Newsletter
        title={post.title}
        subtitle={post.subtitle}
        summary={post.summary}
        postUrl={post.postUrl}
        imageUrl={post.imageUrl}
        imageAlt={post.imageAlt}
      />
    ),
  })
  if (createResponse.error !== null || createResponse.data === null) {
    console.error(`Failed to send email: ${createResponse.error?.message}`)
    return
  }
  const sendId = createResponse.data.id
  console.log(`Preview Email sent: ${sendId}`)
}

async function sendEmailToAudience(
  post: NewsletterProps,
  resend: Resend,
  sender: string,
  audienceId: string
) {
  // Create broadcast
  const createResponse = await resend.broadcasts.create({
    name: post.title,
    audienceId,
    from: sender,
    subject: `Tomy's Blog - ${post.title}`,
    react: (
      <Newsletter
        title={post.title}
        subtitle={post.subtitle}
        summary={post.summary}
        postUrl={post.postUrl}
        imageUrl={post.imageUrl}
        imageAlt={post.imageAlt}
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

main()
