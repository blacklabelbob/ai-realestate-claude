import { NextResponse } from "next/server";

export const runtime = "nodejs";

interface LeadPayload {
  email?: string;
  source?: string;
  address?: string;
  reportSlug?: string;
  ref?: string; // partner attribution id from a ?ref= deep-link
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 422 });
  }

  const lead = {
    email,
    source: body.source ?? "unknown",
    address: body.address ?? null,
    reportSlug: body.reportSlug ?? null,
    ref: body.ref ?? null, // partner attribution
    ts: new Date().toISOString(),
    ua: request.headers.get("user-agent") ?? null,
  };

  // 1) Forward to GHL / n8n if configured (the real CRM persistence).
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch (err) {
      // Never fail the user-facing unlock because the CRM hook hiccuped.
      console.error("[lead] webhook forward failed:", err);
    }
  }

  // 2) Best-effort local append in dev (Vercel fs is read-only outside /tmp).
  if (!process.env.VERCEL) {
    try {
      const { appendFile, mkdir } = await import("node:fs/promises");
      const { join } = await import("node:path");
      const dir = join(process.cwd(), ".leads");
      await mkdir(dir, { recursive: true });
      await appendFile(join(dir, "leads.jsonl"), JSON.stringify(lead) + "\n");
    } catch (err) {
      console.error("[lead] local append failed:", err);
    }
  }

  console.log("[lead] captured:", lead.email, "via", lead.source);
  return NextResponse.json({ ok: true });
}
