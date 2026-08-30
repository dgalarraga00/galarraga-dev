/**
 * Pricing model for "La comanda".
 *
 * Produces an orienting RANGE, never a closed price — except for products that
 * are sold at a fixed price, which short-circuit the whole calculation.
 *
 * The multipliers are deliberately kept rather than flattened: a rush job with
 * no content and full deployment genuinely is closer to double the work. Making
 * every combination cost the same means overcharging the easy job or
 * undercharging the hard one.
 */

export const currency = "$";

/** Widens the result into a range: ±15%. */
export const spread = 0.15;

export type Choice = {
  id: string;
  /** Two-digit label rendered before the option, menu-style. */
  index: string;
  label: string;
  hint?: string;
  /** Multiplied into the running total. 1 = neutral. */
  factor: number;
  /** Added before multipliers, in currency units. */
  base?: number;
  /**
   * Added AFTER multipliers, in currency units. For real costs that don't
   * scale with project size or urgency — a domain doesn't cost more because
   * the client is in a hurry.
   */
  flat?: number;
  /**
   * Closed price. When present the estimate returns exactly this number, the
   * multipliers are ignored, and the wizard skips straight to the contact step
   * — asking "how do you want it?" about a fixed-scope audit makes no sense.
   */
  fixed?: number;
};

export type Step = {
  id: string;
  question: string;
  choices: Choice[];
};

export const steps: Step[] = [
  {
    id: "tipo",
    question: "¿Qué vas a tomar?",
    choices: [
      {
        id: "cortado-express",
        index: "01",
        label: "Cortado Express",
        hint: "auditoría + 3 arreglos · precio cerrado",
        factor: 1,
        fixed: 149,
      },
      {
        id: "landing",
        index: "02",
        label: "Landing page",
        hint: "1–3 secciones",
        base: 260,
        factor: 1,
      },
      {
        id: "corporativa",
        index: "03",
        label: "Web corporativa",
        hint: "5–8 páginas",
        base: 560,
        factor: 1,
      },
      {
        id: "tienda",
        index: "04",
        label: "Tienda online",
        hint: "catálogo, carrito y pagos",
        base: 700,
        factor: 1,
      },
      {
        id: "panel",
        index: "05",
        label: "Panel de gestión o CRM",
        hint: "con usuarios y roles",
        base: 950,
        factor: 1,
      },
      {
        id: "app",
        index: "06",
        label: "Aplicación web a medida",
        hint: "custom",
        base: 1500,
        factor: 1,
      },
    ],
  },
  {
    id: "alcance",
    question: "¿Cómo lo quieres?",
    choices: [
      {
        id: "solo-dev",
        index: "01",
        label: "Solo el desarrollo",
        hint: "te entrego el código, tú lo publicas",
        factor: 1,
      },
      {
        id: "dev-deploy",
        index: "02",
        label: "Desarrollo y puesta online",
        hint: "lo dejo funcionando en internet",
        factor: 1.12,
      },
      {
        id: "todo",
        index: "03",
        label: "Todo incluido",
        // The year is stated in the option itself, not buried in the fine
        // print: "dominio incluido" with no limit is read as "for life", and
        // that is an argument you lose in writing.
        hint: "y el dominio, pagado el primer año",
        // Same deploy effort as "dev-deploy" — the only thing this tier adds
        // is the domain itself, so it's a flat surcharge, not another
        // multiplier on top of the whole project.
        factor: 1.12,
        flat: 20,
      },
    ],
  },
  {
    id: "contenido",
    question: "¿Traes los granos?",
    choices: [
      {
        id: "listo",
        index: "01",
        label: "Sí, tengo textos e imágenes",
        factor: 1,
      },
      {
        id: "parcial",
        index: "02",
        label: "Parcialmente, necesito ayuda con algo",
        hint: "reescribo tus textos y busco imágenes de banco",
        factor: 1.12,
      },
      {
        id: "nada",
        index: "03",
        // NOT "copy y diseño". Promising original photography or a logo for a
        // 28% surcharge means subcontracting at a loss or delivering something
        // poor — see contentScope in scope.ts for what this really covers.
        label: "No, necesito textos e imágenes",
        hint: "los escribo contigo; fotos de banco, no sesión propia",
        factor: 1.28,
      },
    ],
  },
  {
    id: "plazo",
    question: "¿Para cuándo lo necesitas?",
    choices: [
      {
        id: "urgente",
        index: "01",
        label: "Urgente",
        // The hints here are intentionally empty: the real figure depends on
        // the product chosen in step one, so the wizard fills them in at
        // render time from scope.ts. A generic "2 a 6 semanas" was wrong for
        // a landing and wrong for a web app at the same time.
        factor: 1.25,
      },
      {
        id: "normal",
        index: "02",
        label: "Normal",
        factor: 1,
      },
      {
        id: "flexible",
        index: "03",
        label: "Sin prisa",
        // No figure on purpose: a date you never committed to is a date you
        // cannot miss.
        hint: "sin fecha fija, entra cuando haya hueco",
        factor: 0.95,
      },
    ],
  },
];

/** Returns the fixed-price choice for a set of answers, if one was picked. */
export function fixedChoice(answers: Record<string, string>): Choice | null {
  const first = steps[0];
  const choice = first.choices.find((c) => c.id === answers[first.id]);
  return choice?.fixed != null ? choice : null;
}

/** Rounds to a readable figure so the range never looks machine-generated. */
function round(value: number): number {
  const magnitude = value >= 1000 ? 50 : 10;
  return Math.round(value / magnitude) * magnitude;
}

/**
 * Returns the orienting range, or null while any required step is unanswered —
 * an incomplete estimate is worse than no estimate.
 *
 * A fixed-price product returns the same number twice, so callers can render it
 * as a single closed figure.
 */
export function estimate(
  answers: Record<string, string>,
): { low: number; high: number } | null {
  const fixed = fixedChoice(answers);
  if (fixed?.fixed != null) {
    return { low: fixed.fixed, high: fixed.fixed };
  }

  let base = 0;
  let multiplier = 1;
  let flat = 0;

  for (const step of steps) {
    const choiceId = answers[step.id];
    if (!choiceId) return null;

    const choice = step.choices.find((c) => c.id === choiceId);
    if (!choice) return null;

    base += choice.base ?? 0;
    multiplier *= choice.factor;
    flat += choice.flat ?? 0;
  }

  const total = base * multiplier + flat;
  return { low: round(total * (1 - spread)), high: round(total * (1 + spread)) };
}

export function formatAmount(value: number): string {
  return `${currency}${value.toLocaleString("es-ES")}`;
}
