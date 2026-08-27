import type { Metadata } from "next";
import { Comanda } from "@/components/Comanda";

export const metadata: Metadata = {
  title: "Arma tu pedido",
  description:
    "Cuatro preguntas y un rango orientativo al instante. El precio final se cierra hablando.",
};

export default function ComandaPage() {
  return <Comanda />;
}
