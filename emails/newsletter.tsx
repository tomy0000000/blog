import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"
import React from "react"

export interface NewsletterProps {
  title: string
  subtitle: string
  summary: string
  postUrl: string
  imageUrl: string
  imageAlt: string
}

Newsletter.PreviewProps = {
  title: "2025 年 5 月報報",
  subtitle: "The moment that defines the ones who do.",
  summary:
    "發現寫部落格有一個有趣現象：這個月沒什麼大事，會因為沒有題材，所以不好寫。但反過來，太多行程，太多東西可以寫，也會很頭疼。另一方面，太多事要做的時候，要抽出時間和心情來寫，其實也不是一件容易的事。",
  postUrl: "https://blog.tomy.me/zh-tw/posts/2025-may-dump/",
  imageUrl:
    "https://blog.tomy.me/zh-tw/posts/2025-may-dump/cmu-commencement-with-taiwanese_hu_8681a2eabc9f99f8.webp",
  imageAlt:
    "一排畢業生在現代建築外牆前排隊合照，穿著學士袍與紅黃飾帶，氣氛歡樂。",
} satisfies NewsletterProps

export default function Newsletter(props: Readonly<NewsletterProps>) {
  // Add UTM tags
  const postUrl = new URL(props.postUrl)
  postUrl.searchParams.set("utm_source", "email")
  postUrl.searchParams.set("utm_medium", "newsletter")
  postUrl.searchParams.set("utm_campaign", "latest")

  return (
    <Html>
      <Head />
      <Preview>
        {props.subtitle}
        {"\n"}
        {props.summary}
      </Preview>
      <Tailwind>
        <Body className="py-[40px]" style={body}>
          <Container
            className="font-sans rounded-lg mx-auto my-0 p-6 max-w-2xl"
            style={container}
          >
            <Section className="my-[16px]">
              <Img
                className="w-full rounded-xl object-cover"
                src={props.imageUrl}
                alt={props.imageAlt}
              />
              <Section className="mt-[32px] text-center">
                <Text
                  className="my-[16px] text-[18px] font-semibold leading-[28px]"
                  style={purpleText}
                >
                  {new Date().toLocaleDateString("zh-tw")}
                </Text>
                <Heading
                  as="h1"
                  className="m-0 mt-[8px] text-[36px] font-semibold leading-[36px]"
                  style={pinkText}
                >
                  {props.title}
                </Heading>
                <Heading
                  as="h2"
                  className="text-[18px] font-semibold leading-[28px]"
                  style={grayText}
                >
                  {props.subtitle}
                </Heading>
                <Text className="text-[16px] leading-[24px]">
                  {props.summary}
                </Text>
                <Button
                  className="mt-[16px] rounded-lg px-[40px] py-[12px] font-semibold"
                  style={purpleButton}
                  href={postUrl.toString()}
                >
                  閱讀全文 🤓
                </Button>
              </Section>
            </Section>

            {/* Footer */}
            <Section className="text-center border-t pt-[24px]" style={footer}>
              <Text className="text-sm">
                © {new Date().getFullYear()} Tomy Hsieh. All rights reserved.
              </Text>

              <Text className="text-xs">
                你會收到這封郵件是因為你曾經在 Tomy's Blog 上訂閱電子報 🫶🏻
                <br />
                不想再收到這個電子報了嗎？{" "}
                <Link href="{{{RESEND_UNSUBSCRIBE_URL}}}" style={redText}>
                  取消訂閱 😢
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

const baseBackground = "#454158"
const containerBackground = "#22212C"
const foreground = "#f8f8f2"
const purple = "#9580ff"
const pink = "#ff80bf"
const red = "#ff9580"
const gray = "#7970a9"

const body = { background: baseBackground }
const container = { background: containerBackground, color: foreground }
const purpleText = { color: purple }
const pinkText = { color: pink }
const grayText = { color: gray }
const redText = { color: red }
const purpleButton = { background: purple, color: foreground }
const footer = { color: gray }
