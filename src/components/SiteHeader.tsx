import Link from "next/link";
import { ButtonLink } from "./Button";
import { CoffeeCup } from "./icons/CoffeeCup";
import { IconArrowRight } from "./icons/ui";
import { Typewriter } from "./Typewriter";
import { profile } from "@/content/site";

const links = [
  { href: "/#barra", label: "Trabajo" },
  { href: "/#carta", label: "Carta" },
  { href: "/#metodo", label: "Método" },
  { href: "/#origen", label: "Origen" },
];

/**
 * Floating espresso pill. The wrapper ignores pointer events so the strip of
 * page beside the pill stays clickable; only the pill itself takes them.
 */
export function SiteHeader() {
  return (
    <header className="surface-dark pointer-events-none sticky top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5">
      <div className="bg-espresso text-crema border-poso pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border py-2 pr-2 pl-5 shadow-[0_12px_32px_rgba(36,28,23,0.18)] sm:pl-7">
        <Link
          href="/"
          aria-label={`${profile.wordmark} — inicio`}
          // shrink-0 matters: the typed wordmark measures itself with an
          // invisible copy of the full string, and a shrinkable flex item
          // clips that measurement on narrow screens.
          className="text-crema flex shrink-0 items-center gap-2.5 font-mono text-sm tracking-tight whitespace-nowrap"
        >
          <CoffeeCup className="text-ambar size-5" />
          <Typewriter text={profile.wordmark} />
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-leche hover:text-crema inline-flex min-h-11 items-center text-[15px] transition-colors duration-[--dur-hint] ease-[--ease-out]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ButtonLink href="/comanda" className="px-4 text-xs whitespace-nowrap sm:px-5 sm:text-sm">
          Arma tu pedido
          <IconArrowRight className="hidden size-4 sm:block" />
        </ButtonLink>
      </div>
    </header>
  );
}
