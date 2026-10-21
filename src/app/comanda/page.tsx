import type { Metadata } from "next";
import { Comanda } from "@/components/Comanda";

export const metadata: Metadata = {
  title: "Arma tu pedido",
  description:
    "Cuatro preguntas y un rango orientativo al instante. El precio final se cierra hablando.",
};

export default function ComandaPage() {
  // The order pad is written against the espresso palette. Rather than keep
  // two themes in one component, the whole page sits on a dark block — the
  // pill header floats over it and the footer closes it on the light ground.
  return (
    <div className="surface-dark bg-espresso text-crema">
      <Comanda />
    </div>
  );
}
