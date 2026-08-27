"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button, ButtonLink } from "@/components/Button";
import { CoffeeCup } from "@/components/icons/CoffeeCup";
import {
  estimate,
  fixedChoice,
  formatAmount,
  steps,
  type Choice,
} from "@/content/pricing";
import { ScopeSummary } from "@/components/ScopeSummary";
import { scopeFor } from "@/content/scope";
import { profile, socials } from "@/content/site";

/**
 * "La comanda" — a four-question order pad, a contact step, and a receipt.
 *
 * Design decisions worth keeping through any refactor:
 *
 * - One question per screen. Two per screen halves completion for no gain.
 * - The estimate only appears once every question is answered. A number that
 *   moves while you are still deciding reads as a slot machine, not a quote.
 * - The output is a range with an explicit disclaimer. Publishing a closed
 *   figure you cannot honour costs more trust than it buys clicks.
 * - Going back never clears an answer.
 * - The confirmation replaces the form in place instead of navigating. A
 *   redirect that fails mid-flight loses everything the visitor just typed.
 */

type Phase = "questions" | "form" | "sent";
type Fields = Record<string, string>;

const inputBase =
  "w-full rounded-lg border bg-tostado px-4 py-3 text-base text-crema " +
  "placeholder:text-vapor outline-none transition-colors duration-[--dur-control] ease-[--ease-out]";

export function Comanda() {
  const [phase, setPhase] = useState<Phase>("questions");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    brief: "",
    consent: false,
    website: "", // honeypot
  });

  const [errors, setErrors] = useState<Fields>({});
  const [sending, setSending] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);

  const step = steps[stepIndex];
  const range = useMemo(() => estimate(answers), [answers]);

  /**
   * A fixed-price product has no scope, content or deadline multiplier, so the
   * remaining questions do not apply. The wizard collapses to one question plus
   * the contact step, and the progress bar shrinks with it — showing four empty
   * segments the visitor will never reach is a lie about how long this takes.
   */
  const fixed = useMemo(() => fixedChoice(answers), [answers]);

  const questionCount = fixed ? 1 : steps.length;
  const totalSegments = questionCount + 1;
  const segmentIndex = phase === "questions" ? stepIndex : questionCount;
  const isLastQuestion = stepIndex >= questionCount - 1;

  /** Only the questions that actually applied get restated in the summary. */
  const answeredSteps = fixed ? steps.slice(0, 1) : steps;

  /** Scope for the product picked in step one, once it has been picked. */
  const scope = scopeFor(answers.tipo);

  /**
   * The deadline options carry no figure of their own, because "2 a 6 semanas"
   * is wrong for a landing and wrong for a web app at the same time. The real
   * window comes from the chosen product and is filled in here.
   */
  function hintFor(stepId: string, choice: Choice): string | undefined {
    if (stepId !== "plazo" || !scope) return choice.hint;
    if (choice.id === "normal") return scope.timeline.normal;
    if (choice.id === "urgente") return scope.timeline.urgent;
    return choice.hint;
  }

  /** A closed price is one figure, not a range of one number repeated. */
  const priceLabel = range
    ? range.low === range.high
      ? `${formatAmount(range.low)} · precio cerrado`
      : `${formatAmount(range.low)} – ${formatAmount(range.high)}`
    : null;

  function choose(stepId: string, choiceId: string) {
    setAnswers((prev) => ({ ...prev, [stepId]: choiceId }));
  }

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clearing on edit, not on blur: an error that lingers while you are
    // fixing it reads as if the fix did not work.
    setErrors((prev) => {
      if (!prev[key as string]) return prev;
      const next = { ...prev };
      delete next[key as string];
      return next;
    });
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setFailure(null);

    const next: Fields = {};
    if (!form.name.trim()) next.name = "Falta tu nombre.";
    if (!form.email.trim()) next.email = "Falta tu email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      next.email = "Ese email no parece válido.";
    }
    if (!form.consent) next.consent = "Necesito tu permiso para contactarte.";

    if (Object.keys(next).length > 0) {
      setErrors(next);
      // Focus moves to the first problem, so a keyboard user is not left
      // hunting for what went wrong.
      document.getElementById(Object.keys(next)[0])?.focus();
      return;
    }

    setSending(true);
    try {
      const response = await fetch("/api/comanda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, answers }),
      });

      if (response.ok) {
        setPhase("sent");
        return;
      }

      const data = await response.json().catch(() => ({}));
      if (response.status === 422 && data.fields) {
        setErrors(data.fields as Fields);
        return;
      }

      setFailure(
        data.error === "not_configured"
          ? "El envío todavía no está configurado."
          : "No pude enviarlo. Inténtalo de nuevo en un momento.",
      );
    } catch {
      setFailure("No pude enviarlo. Revisa tu conexión e inténtalo de nuevo.");
    } finally {
      setSending(false);
    }
  }

  /* ---------------------------------------------------------------------- */
  /* Receipt                                                                */
  /* ---------------------------------------------------------------------- */
  if (phase === "sent") {
    return (
      <div className="mx-auto w-full max-w-2xl px-6 py-24 text-center sm:py-32">
        <CoffeeCup className="text-ambar mx-auto size-12" />

        <h1 className="font-display text-crema mt-8 text-4xl font-semibold text-balance sm:text-5xl">
          Pedido tomado.
        </h1>

        <p className="text-leche mx-auto mt-5 max-w-md text-lg leading-relaxed">
          Te respondo en menos de 24 horas. Mientras tanto, el café corre por
          cuenta de la casa.
        </p>

        <div className="border-poso bg-tostado mt-10 rounded-xl border p-6 text-left">
          <p className="text-vapor font-mono text-xs">tu pedido</p>
          <dl className="mt-4 space-y-3">
            {answeredSteps.map((s) => {
              const choice = s.choices.find((c) => c.id === answers[s.id]);
              return (
                <div key={s.id} className="flex flex-wrap justify-between gap-2">
                  <dt className="text-leche text-sm">{s.question}</dt>
                  <dd className="text-crema font-mono text-sm">
                    {choice?.label ?? "—"}
                  </dd>
                </div>
              );
            })}
          </dl>

          {priceLabel ? (
            <p className="border-poso text-crema mt-5 border-t pt-5 font-mono text-sm">
              {fixed ? "" : "Rango orientativo: "}
              {priceLabel}
            </p>
          ) : null}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Volver al inicio</ButtonLink>
          <ButtonLink
            href={socials.find((s) => s.key === "github")?.href ?? "/"}
            variant="outline"
          >
            Ver mi GitHub
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16 sm:py-24">
      <ol className="flex gap-2" aria-label="Progreso del pedido">
        {Array.from({ length: totalSegments }).map((_, i) => (
          <li
            key={i}
            aria-current={i === segmentIndex ? "step" : undefined}
            className={
              "h-0.5 flex-1 rounded-full transition-colors duration-[--dur-control] ease-[--ease-out] " +
              (i <= segmentIndex ? "bg-ambar" : "bg-poso-strong")
            }
          />
        ))}
      </ol>

      <p className="text-vapor mt-6 font-mono text-xs">
        {String(segmentIndex + 1).padStart(2, "0")} /{" "}
        {String(totalSegments).padStart(2, "0")}
      </p>

      {/* -------------------------------------------------------------- */}
      {/* Questions                                                      */}
      {/* -------------------------------------------------------------- */}
      {phase === "questions" && step ? (
        <>
          <fieldset className="mt-3">
            <legend className="font-display text-crema text-2xl font-semibold text-balance sm:text-3xl">
              {step.question}
            </legend>

            <div className="mt-8 space-y-3">
              {step.choices.map((choice) => {
                const selected = answers[step.id] === choice.id;

                return (
                  <label
                    key={choice.id}
                    className={
                      "flex min-h-16 cursor-pointer items-center gap-4 rounded-lg border px-5 py-4 " +
                      "transition-[background-color,border-color] duration-[--dur-control] ease-[--ease-out] " +
                      (selected
                        ? "border-ambar bg-tostado"
                        : "border-poso hover:border-poso-strong")
                    }
                  >
                    <input
                      type="radio"
                      name={step.id}
                      value={choice.id}
                      checked={selected}
                      onChange={() => choose(step.id, choice.id)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={
                        "font-mono text-xs transition-colors duration-[--dur-control] " +
                        (selected ? "text-ambar" : "text-vapor")
                      }
                    >
                      {choice.index}
                    </span>
                    <span className="flex-1">
                      <span className="text-crema block text-base">
                        {choice.label}
                      </span>
                      {hintFor(step.id, choice) ? (
                        <span className="text-vapor mt-0.5 block font-mono text-xs">
                          {hintFor(step.id, choice)}
                        </span>
                      ) : null}
                    </span>
                    {selected ? (
                      <span aria-hidden="true" className="text-ambar text-sm">
                        ✓
                      </span>
                    ) : null}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="mt-10 flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
              disabled={stepIndex === 0}
              className="px-5"
            >
              <span aria-hidden="true">←</span> Anterior
            </Button>

            <Button
              onClick={() => {
                if (!isLastQuestion) setStepIndex((i) => i + 1);
                else setPhase("form");
              }}
              disabled={!answers[step.id]}
            >
              Siguiente <span aria-hidden="true">→</span>
            </Button>
          </div>
        </>
      ) : null}

      {/* -------------------------------------------------------------- */}
      {/* Contact                                                        */}
      {/* -------------------------------------------------------------- */}
      {phase === "form" ? (
        <form onSubmit={submit} noValidate className="mt-3">
          <h1 className="font-display text-crema text-2xl font-semibold sm:text-3xl">
            ¿A nombre de quién lo dejo?
          </h1>

          {/* The order so far, restated. Nobody should have to remember what
              they chose four screens ago in order to trust the number. */}
          <div className="border-poso bg-tostado mt-8 rounded-xl border p-5">
            <p className="text-vapor font-mono text-xs">tu pedido</p>
            <p className="text-crema mt-2 text-sm">
              {answeredSteps
                .map(
                  (s) =>
                    s.choices.find((c) => c.id === answers[s.id])?.label ?? "—",
                )
                .join(" · ")}
            </p>
            {priceLabel ? (
              <p className="font-display text-crema mt-4 text-xl font-semibold">
                {priceLabel}
              </p>
            ) : null}
            {/* The disclaimer has to match the number above it. Calling a
                closed price "a reference" would undercut the one thing that
                makes the entry product attractive. */}
            <p className="text-vapor mt-2 font-mono text-xs">
              {fixed
                ? "// precio cerrado, sin sorpresas"
                : "// una referencia, no una factura"}
            </p>
          </div>

          {/* Scope, stated before the visitor writes. The uncomfortable part
              of the conversation belongs here, in writing, not halfway through
              the project. */}
          <ScopeSummary answers={answers} />

          <div className="mt-8 space-y-6">
            <Field
              id="name"
              label="Nombre"
              required
              value={form.name}
              error={errors.name}
              onChange={(v) => update("name", v)}
              autoComplete="name"
            />

            <Field
              id="email"
              label="Email"
              type="email"
              required
              value={form.email}
              error={errors.email}
              onChange={(v) => update("email", v)}
              autoComplete="email"
            />

            <Field
              id="company"
              label="Empresa o web"
              hint="opcional"
              value={form.company}
              onChange={(v) => update("company", v)}
              autoComplete="organization"
            />

            <Field
              id="phone"
              label="Teléfono"
              hint="opcional"
              type="tel"
              value={form.phone}
              onChange={(v) => update("phone", v)}
              autoComplete="tel"
            />

            <div>
              <label
                htmlFor="brief"
                className="text-crema block text-sm font-medium"
              >
                Cuéntame el proyecto
                <span className="text-vapor ml-2 font-mono text-xs">
                  opcional
                </span>
              </label>
              <textarea
                id="brief"
                rows={5}
                value={form.brief}
                onChange={(e) => update("brief", e.target.value)}
                placeholder="En dos o tres frases…"
                className={`${inputBase} border-poso focus:border-ambar mt-2`}
              />
            </div>

            {/* Honeypot. Hidden from people and from assistive tech; only a bot
                that fills every input will touch it. */}
            <div aria-hidden="true" className="absolute -left-[9999px]">
              <label htmlFor="website">No completar</label>
              <input
                id="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(e) => update("website", e.target.value)}
              />
            </div>

            <div>
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  id="consent"
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => update("consent", e.target.checked)}
                  className="accent-ambar mt-0.5 size-5 shrink-0"
                />
                <span className="text-leche text-sm leading-relaxed">
                  Acepto que uses estos datos para responderme.{" "}
                  <span className="text-vapor">
                    No los comparto con nadie ni te mando newsletters.
                  </span>
                </span>
              </label>
              {errors.consent ? <FieldError>{errors.consent}</FieldError> : null}
            </div>
          </div>

          {failure ? (
            <p
              role="alert"
              className="border-poso-strong text-crema mt-8 rounded-lg border px-4 py-3 text-sm"
            >
              {failure}{" "}
              <a
                href={`mailto:${profile.email}`}
                className="text-ambar underline underline-offset-4"
              >
                Escríbeme directo
              </a>
              .
            </p>
          ) : null}

          <p className="text-vapor mt-8 font-mono text-xs">
            {"// respondo en menos de 24 h"}
          </p>

          <div className="mt-4 flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={() => setPhase("questions")}
              className="px-5"
            >
              <span aria-hidden="true">←</span> Anterior
            </Button>

            <Button type="submit" disabled={sending}>
              {sending ? "Enviando…" : "Enviar el pedido"}
              {sending ? null : <span aria-hidden="true">→</span>}
            </Button>
          </div>

          <p className="text-vapor mt-8 text-xs">
            ¿Preferís hablar directo?{" "}
            <Link
              href={`mailto:${profile.email}`}
              className="text-leche underline underline-offset-4"
            >
              {profile.email}
            </Link>
          </p>
        </form>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="text-ambar mt-2 text-sm">
      {children}
    </p>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  hint?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
};

/**
 * Labels are always visible. A placeholder is not a label: it disappears the
 * moment someone starts typing, which is exactly when they need it.
 */
function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  hint,
  required,
  error,
  autoComplete,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="text-crema block text-sm font-medium">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-ambar ml-1">
            *
          </span>
        ) : null}
        {hint ? (
          <span className="text-vapor ml-2 font-mono text-xs">{hint}</span>
        ) : null}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputBase} mt-2 ${
          error ? "border-ambar" : "border-poso focus:border-ambar"
        }`}
      />

      {/* The message sits next to the field it belongs to, not in a summary
          at the top of the form. */}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-ambar mt-2 text-sm">
          {error}
        </p>
      ) : null}
    </div>
  );
}
