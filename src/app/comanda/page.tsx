import type { Metadata } from "next";
import { Comanda } from "@/components/Comanda";

export const metadata: Metadata = {
  title: "Arma tu pedido",
  description:
    "Cuatro preguntas y un rango orientativo al instante. El precio final se cierra hablando.",
};

export default function ComandaPage() {
  // The order pad is written against the espresso palette. Rather than keep
  // two themes in one component, it sits on an inset dark card, like the
  // espresso blocks of the home, so the light ground frames it and the pill
  // header never merges into a full-bleed dark page.
  return (
    <div className="px-4 pt-8 pb-16 sm:px-6">
      <div className="surface-dark bg-espresso text-crema mx-auto max-w-6xl rounded-[28px]">
        <Comanda />
      </div>
    </div>
  );
}
