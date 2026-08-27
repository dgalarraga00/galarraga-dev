import Link from "next/link";
import { ButtonLink } from "./Button";
import { Typewriter } from "./Typewriter";
import { profile } from "@/content/site";

const links = [
  { href: "/#origen", label: "Origen" },
  { href: "/#carta", label: "Carta" },
  { href: "/#barra", label: "Trabajo" },
  { href: "/#metodo", label: "Método" },
];

export function SiteHeader() {
  return (
    <header className="border-poso bg-espresso/85 sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <Link
          href="/"
          aria-label={`${profile.wordmark} — inicio`}
          // shrink-0 matters: the typed wordmark measures itself with an
          // invisible copy of the full string, and a shrinkable flex item
          // clips that measurement on narrow screens.
          className="text-crema shrink-0 font-mono text-sm tracking-tight whitespace-nowrap"
        >
          <Typewriter text={profile.wordmark} />
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-leche hover:text-crema text-sm transition-colors duration-[--dur-hint] ease-[--ease-out]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ButtonLink href="/comanda" className="px-5 text-xs sm:text-sm">
          Arma tu pedido
        </ButtonLink>
      </div>
    </header>
  );
}
