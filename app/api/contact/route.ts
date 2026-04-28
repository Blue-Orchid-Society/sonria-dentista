import { NextResponse } from "next/server";

// TODO(uncle-confirm): wire to Resend once we have the API key + recipient email confirmed.
// Set RESEND_API_KEY + CONTACT_RECIPIENT in Vercel env.
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const { name, email, phone, message, locale } = body ?? {};

  if (!name || !email) {
    return NextResponse.json({ error: "Missing name or email" }, { status: 400 });
  }

  // Stub — log only until Resend is configured.
  console.log("[contact]", { name, email, phone, message, locale, at: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}
