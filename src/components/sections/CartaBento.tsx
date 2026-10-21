import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import { IconArrowRight, IconArrowUpRight } from "@/components/icons/ui";
import { Reveal } from "@/components/Reveal";
import { auditOffer, menuGroups, type MenuGroup } from "@/content/site";

const dots = (
  <>
    <span className="size-2.5 rounded-full bg-[#ff5f57]" />
    <span className="size-2.5 rounded-full bg-[#febc2e]" />
    <span className="size-2.5 rounded-full bg-[#28c840]" />
  </>
);

/** Screenshot cropped at the bottom edge of the card, like a window peeking in. */
function Peek({ group }: { group: MenuGroup }) {
  const { preview } = group;
  if (!preview) return null;
  const dark = group.tone === "dark";

  return (
    <div
      className={
        "mt-4 -mb-px overflow-hidden rounded-t-[14px] " +
        (dark
          ? "bg-card"
          : "bg-espresso shadow-[0_-8px_30px_rgba(36,28,23,0.12)]")
      }
    >
      <div
        aria-hidden="true"
        className={"flex items-center gap-[7px] px-3.5 py-2.5 " + (dark ? "bg-tape" : "")}
      >
        {dots}
        <span
          className={
            "mx-10 flex-1 truncate rounded-md px-2.5 py-1 text-center font-mono text-[11px] " +
            (dark ? "bg-ground text-ink-2" : "bg-tostado text-leche")
          }
        >
          {preview.url}
        </span>
      </div>
      <Image
        src={preview.src}
        alt={preview.alt}
        width={1440}
        height={900}
        sizes="(min-width: 1152px) 560px, (min-width: 640px) 60vw, calc(100vw - 80px)"
        className="block h-[260px] w-full object-cover object-top"
      />
    </div>
  );
}

function CartIllustration({ cart }: { cart: NonNullable<MenuGroup["cart"]> }) {
  return (
    <div
      aria-hidden="true"
      className="bg-ground mt-auto flex -rotate-2 flex-col gap-2.5 rounded-[18px] p-4"
    >
      {cart.items.map((item, i) => (
        <div
          key={item.name}
          className="flex items-center gap-3 rounded-xl bg-white px-3 py-2.5"
        >
          <span
            className={"size-10 rounded-[10px] " + (i === 0 ? "bg-tape" : "bg-[#e9c9a0]")}
          />
          <span className="flex-1 text-sm">{item.name}</span>
          <span className="font-mono text-[13px]">{item.qty}</span>
        </div>
      ))}
      <span className="bg-espresso text-crema rounded-full p-3 text-center text-sm font-semibold">
        {cart.pay}
      </span>
    </div>
  );
}

function Flow({ steps }: { steps: string[] }) {
  return (
    <ul className="mt-auto flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          {i > 0 ? <IconArrowRight aria-hidden className="text-copper size-[18px]" /> : null}
          <span className="bg-ground border-line rounded-full border px-3.5 py-2 text-sm">
            {step}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * La carta as a bento: four grouped service cards plus the amber entry offer.
 *
 * "Cotizar" goes to /comanda without a preselected product — the order pad has
 * no URL parameter for that, and inventing one here would be a silent no-op.
 */
export function CartaBento() {
  return (
    <div className="mt-12 flex flex-wrap gap-5">
      {menuGroups.map((group, i) => {
        const dark = group.tone === "dark";
        const wide = group.size === "wide";

        return (
          <Reveal
            key={group.id}
            delay={(i % 2) * 70}
            className={wide ? "min-w-0 flex-[999_1_35rem]" : "min-w-0 flex-[1_1_21rem]"}
          >
            <article
              className={
                "flex h-full flex-col gap-2.5 overflow-hidden rounded-[28px] p-7 " +
                (wide ? "pb-0 " : "") +
                (dark
                  ? "surface-dark bg-espresso text-crema"
                  : "bg-card border-line border")
              }
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span
                    className={
                      "font-mono text-[13px] " + (dark ? "text-ambar" : "text-copper")
                    }
                  >
                    {group.coffees}
                  </span>
                  <h3
                    className={
                      "font-display mt-1.5 leading-none font-semibold tracking-[-0.02em] " +
                      (group.id === "integraciones" ? "text-[40px]" : "text-5xl")
                    }
                  >
                    {group.title}
                  </h3>
                </div>
                {group.id !== "integraciones" ? (
                  <ButtonLink
                    href="/comanda"
                    variant={dark ? "solid" : "ink"}
                    className="shrink-0 px-[18px] font-semibold"
                  >
                    {auditOffer.quoteCta}
                    <IconArrowUpRight className="size-3.5" />
                  </ButtonLink>
                ) : null}
              </div>

              <p
                className={
                  "text-base leading-normal " + (dark ? "text-leche" : "text-ink-2")
                }
              >
                {group.description}
              </p>

              <Peek group={group} />
              {group.cart ? <CartIllustration cart={group.cart} /> : null}
              {group.flow ? (
                <>
                  <Flow steps={group.flow} />
                  <ButtonLink
                    href="/comanda"
                    variant="outlineInk"
                    className="mt-3 self-start px-[18px] font-semibold"
                  >
                    {auditOffer.quoteCta}
                    <IconArrowUpRight className="size-3.5" />
                  </ButtonLink>
                </>
              ) : null}
            </article>
          </Reveal>
        );
      })}

      {/* The entry offer: the only fixed price on the page. */}
      <Reveal className="w-full">
        <article className="bg-ambar text-espresso flex flex-wrap items-center justify-between gap-6 rounded-[28px] p-8">
          <div className="min-w-0 flex-[999_1_30rem]">
            <span className="font-mono text-[13px]">{auditOffer.kicker}</span>
            <h3 className="font-display mt-2 text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-semibold tracking-[-0.02em]">
              {auditOffer.title}
            </h3>
            <p className="mt-2.5 max-w-xl text-[17px] leading-normal">
              {auditOffer.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <span className="font-display text-6xl leading-none font-bold">
              {auditOffer.price}
            </span>
            <ButtonLink href="/comanda" variant="ink" className="min-h-12 px-6 text-base font-semibold">
              {auditOffer.cta}
            </ButtonLink>
          </div>
        </article>
      </Reveal>
    </div>
  );
}
