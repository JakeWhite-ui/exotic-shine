import { NextResponse } from "next/server";

type LeadPayload = {
  name?: string;
  phone?: string;
  email?: string;
  vehicle?: string;
  service?: string;
  message?: string;
  /** Hidden field; real people leave it empty. */
  website?: string;
  pageUrl?: string;
  locale?: string;
};

export async function POST(request: Request) {
  let body: LeadPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  // Silently accept and drop anything that fills the honeypot, so bots get a
  // success response and don't retry with a different shape.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  if (!body.name?.trim() || !(body.phone?.trim() || body.email?.trim())) {
    return NextResponse.json({ error: "missing_fields" }, { status: 422 });
  }

  const webhook = process.env.GHL_WEBHOOK_URL;

  if (!webhook) {
    // Without the webhook there is nowhere for this lead to go. Rather than
    // pretend it sent, tell the client so it can point the visitor at
    // WhatsApp — a lost enquiry is worse than an ugly error.
    console.error(
      "[lead] GHL_WEBHOOK_URL is not set — enquiry could not be delivered:",
      JSON.stringify({ name: body.name, phone: body.phone, email: body.email }),
    );
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: body.name,
        phone: body.phone,
        email: body.email,
        source: "exoticshine.ae",
        page: body.pageUrl,
        locale: body.locale,
        vehicle: body.vehicle,
        service: body.service,
        message: body.message,
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.error("[lead] GoHighLevel rejected the payload:", response.status);
      return NextResponse.json({ error: "upstream" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[lead] delivery failed:", error);
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }
}
