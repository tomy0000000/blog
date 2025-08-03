import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    })
  }

  try {
    const { email, first_name, last_name } = await req.json()

    if (!email) {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (!audienceId) {
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
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
      return new Response(
        JSON.stringify({ error: "Failed to subscribe to newsletter" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      )
    }

    return new Response(
      JSON.stringify({
        message: "Successfully subscribed to newsletter",
        id: contact.data?.id,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
    console.error("Newsletter signup error:", error)
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
