---
title: "Self-Hosting Email Is a Vote"
date: 2026-09-20T03:58:15-07:00
description: "More than a formality. Five years and counting."
categories: ["📱 Tech"]
tags: ["🚩 Self Hosting", "✉️ Email"]
feature: "redbox.webp"
featureAlt: "A bright red U.S. Mail mailbox with its flag raised, mounted on a weathered wooden post at the end of a driveway. A white two-story suburban house with a covered porch sits blurred in the background among green trees."
---

## ⚡️ TL;DR

If you're linked here, it's likely because you're looking for my email address.

I have stopped using one general-purpose email address. Every address I own now exists for a single purpose. I hand them out personally, and I delete them once that purpose is done.

To reach me, you can find my social contacts on the [about page]({{< relref "tomy" >}}).

If you're interested in the reasoning and the logistics, read on.

## 🏰 Ownership

Before email was a thing, we had mailboxes. A real mailbox, red or yellow, sitting in front of the courtyard. With a piece of paper, a stamp, and an address, anyone can send a message to anyone.

Now here's a deal for you: I offer a completely FREE service where every day I go to your mailbox, read through the letters, categorize them into folders for you, and throw the unwanted ads directly into the bin. So on a freezing winter morning or a burning hot afternoon, all you have to do is sit back, relax, and stay inside. Organized mail comes to you, so you can focus on things that matter more.

What a terrible idea, isn't it? Choosing to provide a free service to the public does not automatically grant you permission to read people's mail. And FYI:

> In the US, intentionally opening, destroying, or stealing someone else's mail can lead to up to five years in federal prison and fines up to $250,000

Well, that's basically the email we have today. People rarely actually own their email. Their medical bills, bank statements, and conversations with the people they love are all just queryable data, up for grabs by tech monopolies, so they can sell you ads.

By the way, I've always found it mesmerizing that the general public criticizes third party cookies so much because a trail of breadcrumbs reveals their habits, yet nobody seems to care that their private conversations, written evidence that speaks far better for their daily life, are being read by tech companies.

## 🫱🏻‍🫲🏿 The Handshake Problem

Take another look at the story we started with. There's one more problem yet to be solved:

> With a piece of paper, a stamp, and the address, anyone can send a message to anyone.

So technically, with enough paper and stamps, anyone can flood any mailbox. The reason this never became an actual issue is that paper and stamps cost money, which makes the technique unscalable. Bad news: sending email costs almost nothing, which is why spam has haunted us for 50 years and is still counting.

Attend a handful of Luma events in SF and your inbox bloats with twenty-something VC-backed startups, all craving to pitch you their B2B-AI-SaaS.

Here's how a legitimate communication channel works:

1. Both parties proactively exchange contact.
2. Both consent to establishing the channel.
3. Communicate.
4. When one or both parties are done and want to end the conversation, the channel gets closed.

Most modernized systems are fully equipped with the above characteristics. Email can do none of them, except communicate:

- You don't need the recipient to give you their email address. You just need to find it.
- You don't need the recipient's consent to send them an email.
- Even when the recipient doesn't want to hear from you anymore, there's no unilateral way for them to stop receiving messages from a certain address. The best option is to filter and mark as spam, and that still sucks.

In general, once your email address is out in the wild, you have little to no control over what comes in.

## 🧠 Solution

In case you don't know this yet: by suffixing your Gmail username with `+<anything>`, like `john.doe+apple@gmail.com`, you can create an unlimited number of alias addresses. Gmail still routes the incoming mail to `john.doe@gmail.com`, while websites treat each one as a different address.

![Animated meme of two cartoon penguins in an airplane cockpit, one giving a thumbs-up gesture with its flipper while the other stands on the dashboard. Bold white caption reads 'PROBLEMO SOLVED.'](problemo-solved.gif)

Nope, because they're easily flagged and banned. Reddit users report that GitHub, Adobe, Amazon, and many more don't accept alias addresses. [LeetCode](https://leetcode.com/problems/unique-email-addresses/) even ranks this problem as easy.

The counter solution is also simple: get your own custom domain, and make the entire username an alias. Now there's no way for Amazon to tell `amazon@johndoe.com` and `amazon2@johndoe.com` apart, because those could genuinely be two different users holding two different addresses.

That solves who can reach me. It does nothing about who can read me.

## 🛒 What's Out There

So if you've got your domain and are ready to start setting up your own email, here's a [doc page](https://docs.tomy.me/email/) that collects paid email services. A few good choices here:

- 🇦🇺 [Fastmail](https://www.fastmail.com/): Perhaps the best integrated solution. Allows 600 custom domain aliases
- 🇨🇭 [Proton](https://proton.me/mail): Allows 10 custom domain aliases[^1], though catch-all addresses are supported[^2]
- 🇩🇪 [Tuta](https://tuta.com/): Servers reside in Germany. The €3/mo Revolutionary plan comes with unlimited custom domain aliases, which seems pretty solid
- 🇩🇪 [Mailbox.org](https://mailbox.org/): The €3/mo Standard plan comes with 50 custom domain aliases

One thing that I want to bring to your attention here is:

> If you are not paying for it, you’re not the customer; you’re the product being sold.

Interesting that all of them reside outside of the U.S. I wonder why ;-)

[^1]: The pricing table calls these addresses, but they don't come with a dedicated mailbox and instead forward to one that does, so they are aliases for sure.
[^2]: A catch-all address means any made-up address on your domain ends up in a primary inbox. So instead of creating `hertz@johndoe.com` on the platform before using it, John can just hand it over at the rental counter hassle-free and the system will still forward it. The downside is that if anyone finds out your domain has catch-all enabled, they can spam you by shooting mail at random addresses, and your only option is to turn it off.

## 💭 Requirements

So to summarize, here's a list of all my requirements for an email service:

- Support custom domain
- Near unlimited alias addresses[^3]
- Send / Reply from alias address
- Own my email

I've personally tried Proton and Fastmail for about a month each. Even though both provide a great user experience that does compete with Gmail, and both are actively evolving their products to be privacy-proof, I simply can't overlook that last unticked box.

So in the winter of 2021, I spent a weekend just doing some exploration on how to self-host my own email server with [Mailcow](https://mailcow.email/). The initial setup was so simple that it didn't take long before I realized, "Oh, this playground is now the production environment for me."

[^3]: Fastmail's 600 limit is more than enough to start with, even though I surpassed it eventually.

## 🏗️ Deploy

There's really only one thing to do at this point, which is changing the email on all my accounts and contacts. It's slow and drawn out, but it isn't as tedious as it sounds.

Re-examine the earlier flow:

- I hand each address out privately, in one context. This is the proactive exchange.
- I create an address for that purpose. This is a scoped consent.
- Communicate as before.
- When the purpose is completed, I can come back and deactivate or delete that address unilaterally, with no filter rules involved.

At this point, alias addresses fix all four of the issues I laid out earlier.

This is also the moment my email finally gained independence, and I no longer carry one god-email address that anyone can use to bug me.

As of today, I have a little over a thousand purpose-created alias addresses, and this paradigm has scaled way better than I would have expected.

## ⚠️ The Down Side

Definitely, I can't oversell an approach without stating the potential consequences.

The server is exposed to the wild Internet by design, since that's how you receive mail. That means it will receive random traffic, and potential malicious intrusion if not properly defended, but as long as you don't stray too far from Mailcow's built-in fail2ban, that wouldn't be a concern.

On deliverability, Mailcow comes with Rspamd to flag inbound spam, and honestly, as long as an address isn't exposed publicly on the Internet, I usually just leave it off.

Regarding system uptime, I have to run system and Mailcow upgrades once in a while, so there is unavoidable downtime. Luckily, the email protocol is designed to retry sending on its own (usually for about 4 days), so unless there's a major incident that lasts for a long time, this wouldn't be a concern. In the past five years I've been running it, I've had no trouble missing any grad school admissions or job offer letters.

For outbound mail, that's a different story. Since this is a freshly installed system, we need to establish a good reputation for the domain as well as the IP, and that could take years. For me, this is usually not a problem, as most of the email I send out is customer support or replies, so these are usually picked up in time. However, I can imagine that if I were to use this server to send out cold emails selling my AI-B2B-SaaS service, it's gonna have a high bounce rate.[^4]

[^4]: Especially for email that goes to Microsoft/Outlook servers. Not gonna dive into how painful it is, but there's an [HN discussion](https://news.ycombinator.com/item?id=45435780) specifically for it if you're interested.

## 🤔 Is it worth it?

Let's recap the goal: own your email, so that it does not become some asset that's queryable by platforms.

The truth is, if you're writing back and forth with people who use Gmail, Outlook, and Yahoo, then basically they will still have a huge portion of your email anyway. One guy ran the numbers and found Gmail has 57% of his emails.[^5]

So what's the point? Why spend $15 every month to rent a VPS, plus the management overhead, when Fastmail is just $5/month and provides a similar (if not better) user experience, and Gmail provides most of it free of charge?

[^5]: Check out [this article](https://mako.cc/copyrighteous/google-has-most-of-my-email-because-it-has-all-of-yours) by Benjamin Mako Hill that went viral on Hacker News, three times.

## 🗽 The Faith

To me, the answer is more than just belief.

Email is the last open federated protocol that normal people still use every day, and it will only stay independent if there's an unignorably huge community that still actively uses it. If not, it will be quietly consumed.

Back in 2018, Google attempted to "modernize" email by pushing forward AMP for Email, a specification which renders interactive content directly in the inbox. From the user's perspective, this is no doubt a huge UX improvement. However, the way that the spec is defined gives the remote content owner (in most cases, Google) great power to decide what gets to be in the email, and to collect more data than it should.

The community [fought](https://news.ycombinator.com/item?id=16372234) [back](https://news.ycombinator.com/item?id=20255484) hard, and after strong opposition and a low adoption rate, the initiative slowly [went into the grave](https://buttondown.com/blog/whatever-happened-to-amp-email).

Just like many others, I used to think Google backed off because it was facing criticism. But if you really think about it, Google never backs down just because public opinion disagrees. Just look at how stubbornly they insisted on deprecating Manifest V2, which uBlock Origin depends on. The real deal breaker here is not outrage, but the low adoption rate. If a sender has to choose between an AMP email that can only be viewed on Gmail and a plain email that any client can view, why take the risk? It is my server, along with a great number of others, choosing not to support it, that makes this evil specification a hard sell to marketers.

So... on the personal level, self-hosting an email server is no good for almost any individual, but on the macro view, consider this as my personal initiative to keep email independent, and to keep a Gmail-only spec a bad idea.

---

## 💬 FAQs

Q: I have little to no tech background, how do I start?
A: Fastmail and Proton start at $5 and $3.99 per month, and in terms of privacy they are far better than Gmail in many senses.

Q: Is it really necessary to have your own domain?
A: A `.com` domain costs ~$10/year. Even if you don't want to do alias addresses, having your own domain eliminates the risk that [Google can ban your account and refuse any appeal](https://www.theguardian.com/technology/2022/aug/22/google-csam-account-blocked).

Q: Custom domain sounds cool, but I want to keep using Gmail to send and receive email.
A: You can set up your domain on Google Workspace for ~$5/month, or use a forwarding service like [Mailcast](https://mailcast.io/) to forward email to your existing Gmail address.

Q: But I'm too lazy to change the email on all my accounts.
A: What I did back then was set up auto-forwarding on the old email, and spend 1 hour every week changing them in small batches. Again, it's not as tedious as it may sound.

Q: I have some technical background but am hesitant to start.
A: Email is maybe one of the simplest applications one can possibly self-host:
  - There are [so many](https://docs.tomy.me/self-hosting-email/) integrated solutions out there, most matured over years if not decades.
  - Even if you mess up, SMTP retry gives you a tolerance of 4 days.
  - Claude and Codex are gonna figure out most problems for you anyway ¯\\\_(ツ)\_/¯


## 🔖 Appendix

Email is such an interesting topic that HN simply can't shy away from discussing it, and I'm always interested in learning what founders and builders think about this ancient protocol.

Here are a few interesting ones that I find worth reading (and worth revisiting in the future myself):

- [Giulio Magnifico](https://giuliomagnifico.blog/post/2025-08-18-leaving-gmail/) moved from Gmail to Mailbox.org in 2025 for privacy
- [JP](https://moddedbear.com/gmail-thinks-im-stupid-so-i-left/) moved from Gmail to Fastmail in 2026 because Gmail started shipping useless AI features, with some [follow up](https://moddedbear.com/an-update-on-leaving-gmail-for-fastmail/).
  - [HN's discussion about the follow up article](https://news.ycombinator.com/item?id=49334409) explains why it is way simpler than you think to move your email to your own domain.
- [Victor Adossi](https://vadosware.io/post/its-never-been-easier-or-harder-to-self-host-email)'s advocacy for self-hosting an email server, with a simple road map to get started.
- [Jeremy Evans](https://code.jeremyevans.net/2021-07-29-running-my-own-email-server.html) runs a self-hosted email server and gets around bounced outbound email by using SendGrid, later switching to SMTP2GO.
