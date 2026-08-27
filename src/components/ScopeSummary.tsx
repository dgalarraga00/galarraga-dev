import { contentScope, deliveryScope, scopeFor } from "@/content/scope";

type ScopeSummaryProps = {
  answers: Record<string, string>;
};

/**
 * Restates what the chosen configuration includes — and what it does not.
 *
 * The exclusions are shown as prominently as the inclusions, and on purpose.
 * A client who reads "no incluye sesión de fotos" before writing is a client
 * who will not ask for one afterwards; the awkward conversation happens here,
 * in writing, instead of halfway through the project.
 */
export function ScopeSummary({ answers }: ScopeSummaryProps) {
  const scope = scopeFor(answers.tipo);
  if (!scope) return null;

  const delivery = deliveryScope[answers.alcance] ?? [];
  const content = contentScope[answers.contenido];

  const includes = [...scope.includes, ...delivery, ...(content?.includes ?? [])];
  const excludes = [...scope.excludes, ...(content?.excludes ?? [])];

  return (
    <div className="border-poso mt-6 rounded-xl border p-5">
      <p className="text-vapor font-mono text-xs">qué entra en tu pedido</p>

      <ul className="mt-4 space-y-2">
        {includes.map((item) => (
          <li key={item} className="text-leche flex gap-3 text-sm leading-relaxed">
            <span aria-hidden="true" className="text-ambar shrink-0">
              +
            </span>
            {item}
          </li>
        ))}
      </ul>

      {excludes.length > 0 ? (
        <>
          <p className="text-vapor border-poso mt-5 border-t pt-5 font-mono text-xs">
            qué no entra
          </p>
          <ul className="mt-4 space-y-2">
            {excludes.map((item) => (
              <li
                key={item}
                className="text-vapor flex gap-3 text-sm leading-relaxed"
              >
                <span aria-hidden="true" className="shrink-0">
                  −
                </span>
                {item}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}
