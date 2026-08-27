import { NextResponse } from "next/server";
import { profile } from "@/content/site";
import { estimate, fixedChoice, formatAmount, steps } from "@/content/pricing";

/**
 * Receives a completed order and emails it.
 *
 * Everything is validated here, again. The client already checks the same
 * fields, but client validation is a convenience for honest users — it is not a
 * defence, because anyone can POST straight to this endpoint.
 *
 * Delivery goes through Resend's REST API over plain fetch, so the project
 * carries no extra dependency. To switch providers, replace `deliver()`.
 */

const MAX = { name: 120, email: 200, company: 200, phone: 40, brief: 4000 };

type Payload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  phone?: unknown;
  brief?: unknown;
  consent?: unknown;
  answers?: unknown;
  /** Honeypot. Real users never see this field, so a value means a bot. */
  website?: unknown;
};

function asString(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/**
 * Deliberately permissive. Over-strict email regexes reject valid addresses,
 * and the real proof of an address is whether the message arrives.
 */
function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function renderOrder(answers: Record<string, string>): string[] {
  // A fixed-price product only ever answers the first question; listing the
  // other three as "sin responder" would read like an incomplete form.
  const relevant = fixedChoice(answers) ? steps.slice(0, 1) : steps;

  return relevant.map((step) => {
    const choice = step.choices.find((c) => c.id === answers[step.id]);
    return `${step.question} — ${choice?.label ?? "sin responder"}`;
  });
}

async function deliver(subject: string, body: string, replyTo: string) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.COMANDA_FROM;

  if (!key || !from) {
    // Configuration is missing, not a user error. Say so plainly instead of
    // pretending the message was sent.
    return { ok: false as const, reason: "not_configured" as const };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [profile.email],
      reply_to: replyTo,
      subject,
      text: body,
    }),
  });

  if (!response.ok) {
    return { ok: false as const, reason: "provider_error" as const };
  }

  return { ok: true as const };
}

export async function POST(request: Request) {
  let payload: Payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // A filled honeypot is a bot. Answer 200 so it never learns it was caught.
  if (asString(payload.website, 100)) {
    return NextResponse.json({ ok: true });
  }

  const name = asString(payload.name, MAX.name);
  const email = asString(payload.email, MAX.email);
  const company = asString(payload.company, MAX.company);
  const phone = asString(payload.phone, MAX.phone);
  const brief = asString(payload.brief, MAX.brief);

  const fields: Record<string, string> = {};
  if (!name) fields.name = "Falta tu nombre.";
  if (!email) fields.email = "Falta tu email.";
  else if (!looksLikeEmail(email)) fields.email = "Ese email no parece válido.";
  if (payload.consent !== true) {
    fields.consent = "Necesito tu permiso para guardar estos datos.";
  }

  if (Object.keys(fields).length > 0) {
    return NextResponse.json({ error: "invalid", fields }, { status: 422 });
  }

  const answers =
    payload.answers && typeof payload.answers === "object"
      ? (payload.answers as Record<string, string>)
      : {};

  const range = estimate(answers);

  const body = [
    `Nombre:  ${name}`,
    `Email:   ${email}`,
    company ? `Empresa: ${company}` : null,
    phone ? `Teléfono: ${phone}` : null,
    "",
    "— El pedido —",
    ...renderOrder(answers),
    "",
    range
      ? range.low === range.high
        ? `Precio cerrado: ${formatAmount(range.low)}`
        : `Rango orientativo: ${formatAmount(range.low)} – ${formatAmount(range.high)}`
      : "Rango orientativo: no calculado",
    brief ? `\n— Su mensaje —\n${brief}` : null,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  const result = await deliver(`Nuevo pedido — ${name}`, body, email);

  if (!result.ok) {
    // 503, not 500: the request was fine, the mail path is unavailable.
    return NextResponse.json({ error: result.reason }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
