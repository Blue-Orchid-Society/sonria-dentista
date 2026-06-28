import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  location?: unknown;
  service?: unknown;
  insuranceStatus?: unknown;
  preferredTime?: unknown;
  message?: unknown;
  consent?: unknown;
  website?: unknown;
  locale?: unknown;
};

const DEFAULT_RECIPIENT = "info@sonriadentista.com";
const DEFAULT_FROM = "Sonria Website <onboarding@resend.dev>";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as ContactPayload;

  const name = clean(body.name);
  const email = clean(body.email);
  const phone = clean(body.phone);
  const location = clean(body.location);
  const service = clean(body.service);
  const insuranceStatus = clean(body.insuranceStatus);
  const preferredTime = clean(body.preferredTime);
  const message = clean(body.message);
  const consent = clean(body.consent);
  const locale = clean(body.locale);
  const website = clean(body.website);

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !phone || !location || !service || !insuranceStatus || !message || consent !== "yes") {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!isEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact:config-missing]", {
      missing: "RESEND_API_KEY",
      location,
      service,
      locale,
      at: new Date().toISOString(),
    });
    return NextResponse.json({ error: "Email delivery is not configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const to = process.env.CONTACT_RECIPIENT ?? DEFAULT_RECIPIENT;
  const from = process.env.CONTACT_FROM ?? DEFAULT_FROM;
  const subject = `Sonria lead: ${humanize(location)} - ${humanize(service)}`;

  try {
    const result = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text: buildTextEmail({
        name,
        email,
        phone,
        location,
        service,
        insuranceStatus,
        preferredTime,
        message,
        locale,
      }),
      html: buildHtmlEmail({
        name,
        email,
        phone,
        location,
        service,
        insuranceStatus,
        preferredTime,
        message,
        locale,
      }),
    });

    if (result.error) {
      throw result.error;
    }
  } catch (error) {
    console.error("[contact:send-failed]", {
      location,
      service,
      locale,
      hasName: Boolean(name),
      hasEmail: Boolean(email),
      hasPhone: Boolean(phone),
      error: error instanceof Error ? error.message : "Unknown Resend error",
      at: new Date().toISOString(),
    });
    return NextResponse.json({ error: "Email delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, 2000) : "";
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function humanize(value: string): string {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildTextEmail(fields: Record<string, string>): string {
  return [
    "New Sonria Dentista website inquiry",
    "",
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone}`,
    `Preferred location: ${humanize(fields.location)}`,
    `Service needed: ${humanize(fields.service)}`,
    `Insurance status: ${humanize(fields.insuranceStatus)}`,
    `Preferred appointment time: ${fields.preferredTime || "Not provided"}`,
    `Locale: ${fields.locale || "Not provided"}`,
    "",
    "Message:",
    fields.message,
  ].join("\n");
}

function buildHtmlEmail(fields: Record<string, string>): string {
  const rows = [
    ["Name", fields.name],
    ["Email", fields.email],
    ["Phone", fields.phone],
    ["Preferred location", humanize(fields.location)],
    ["Service needed", humanize(fields.service)],
    ["Insurance status", humanize(fields.insuranceStatus)],
    ["Preferred appointment time", fields.preferredTime || "Not provided"],
    ["Locale", fields.locale || "Not provided"],
  ];

  return `
    <div style="font-family: Arial, sans-serif; color: #2D2A24; line-height: 1.5;">
      <h1 style="font-size: 22px; margin: 0 0 16px;">New Sonria Dentista website inquiry</h1>
      <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <th style="border: 1px solid #E6DDC9; background: #FBF7EE; padding: 10px; text-align: left; width: 190px;">${escapeHtml(label)}</th>
                  <td style="border: 1px solid #E6DDC9; padding: 10px;">${escapeHtml(value)}</td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
      <h2 style="font-size: 16px; margin: 20px 0 8px;">Message</h2>
      <p style="white-space: pre-wrap; border: 1px solid #E6DDC9; padding: 12px; max-width: 640px;">${escapeHtml(fields.message)}</p>
    </div>
  `;
}
