import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

// Zod v4: z.email() is a standalone validator, not z.string().email()
const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.email(),
  message: z.string().min(10).max(2000),
  _trap: z.string().optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: "Validation failed." }, { status: 400 });
  }

  const { name, email, message, _trap } = result.data;

  // Honeypot: bots fill hidden fields; real users never see this field
  if (_trap) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;

  if (!to) {
    console.error("CONTACT_EMAIL env var is not set");
    return NextResponse.json({ error: "Server configuration error." }, { status: 503 });
  }

  if (!apiKey || apiKey === "re_your_api_key_here") {
    console.warn("RESEND_API_KEY is not configured");
    return NextResponse.json(
      {
        error:
          "Email service is not configured yet. Please reach out directly at vkrishnan2309@gmail.com.",
      },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: [`Name: ${name}`, `Email: ${email}`, "", "Message:", message].join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
