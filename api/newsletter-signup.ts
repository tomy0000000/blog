import { VercelRequest, VercelResponse } from "@vercel/node"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { email, first_name, last_name } = req.body

  if (!email) {
    return res.status(400).json({ error: "Email is required" })
  }
  if (!first_name) {
    return res.status(400).json({ error: "First name is required" })
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" })
  }

  try {
    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (!audienceId) {
      return res.status(500).json({ error: "Server configuration error" })
    }

    // Create contact in Resend
    const contact = await resend.contacts.create({
      email,
      firstName: first_name || undefined,
      lastName: last_name || undefined,
      audienceId,
    })

    if (contact.error) {
      console.error("Resend API error:", contact.error)
      return res
        .status(500)
        .json({ error: "Failed to subscribe to newsletter" })
    }

    return res.status(201).json({
      message: "Successfully subscribed to newsletter",
      id: contact.data?.id,
    })
  } catch (error) {
    console.error("Newsletter signup error:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
