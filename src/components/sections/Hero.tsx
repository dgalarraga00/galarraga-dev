import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import { IconArrowUpRight, IconCode } from "@/components/icons/ui";
import { Reveal } from "@/components/Reveal";
import { ScrambleText } from "@/components/ScrambleText";
import { profile } from "@/content/site";

/**
 * Hero: oversized headline on the light ground, the portrait stuck on like a
 * sticker, and one espresso band underneath that carries the lede, the CTAs
 * and two small cards.
 *
 * The h1 keeps the whole statement ("Nada instantáneo. Sirviendo código de
 * origen.") so the heading has descriptive content for a search engine and a
 * screen reader. The amber underline is a flat decorative bar behind the word,
 * never a gradient.
 */
export function Hero() {
  const { photo } = profile;

  return (
    <section className="mx-auto w-full max-w-6xl px-6 pt-14 sm:pt-20">
      <div className="flex flex-wrap items-end gap-x-10 gap-y-14">
        <Reveal className="min-w-0 flex-[999_1_30rem]">
          <span className="bg-tape text-ink-2 inline-block -rotate-[1.5deg] px-3 py-1.5 font-mono text-sm shadow-[0_2px_0_rgba(36,28,23,0.08)]">
            {profile.heroTape}
          </span>

          <h1 className="font-display mt-7 text-[clamp(3.5rem,10vw,9.5rem)] leading-[0.9] font-semibold tracking-[-0.035em]">
            <span className="block">{profile.headline}</span>
            <span className="relative z-0 inline-block">
              {profile.headlineAccent}
              <span
                aria-hidden="true"
                className="bg-ambar absolute right-[4%] -bottom-1.5 left-0 -z-10 h-2.5 rounded-full"
              />
            </span>
            <span className="text-ink-2 mt-8 block text-[clamp(1.4rem,2.4vw,2rem)] leading-tight font-normal tracking-normal">
              {profile.headlineDeck}
            </span>
          </h1>
        </Reveal>

        {photo ? (
          <Reveal delay={120} className="flex flex-[1_1_18rem] justify-center">
            <div className="relative w-full max-w-80 pb-2">
              <div className="relative aspect-[4/5] w-full rotate-3 overflow-hidden rounded-[18px] border-[10px] border-white shadow-[0_24px_48px_rgba(36,28,23,0.22)]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  preload
                  sizes="320px"
                  className="object-cover"
                  style={{ objectPosition: photo.position ?? "center" }}
                />
              </div>

              <span className="text-ink font-hand absolute bottom-9 -left-2 -rotate-6 bg-white px-4 py-1.5 text-[26px] whitespace-nowrap shadow-[0_6px_16px_rgba(36,28,23,0.16)] sm:-left-9">
                {profile.heroSticker}
              </span>
              <span
                aria-hidden="true"
                className="bg-ambar text-espresso absolute -top-3.5 -right-2 flex size-[76px] rotate-[10deg] flex-col items-center justify-center rounded-full text-center font-mono text-[11px] leading-tight shadow-[0_6px_16px_rgba(36,28,23,0.18)] sm:-right-3.5"
              >
                {profile.heroBadge.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </span>
            </div>
          </Reveal>
        ) : null}
      </div>

      {/* Espresso band */}
      <Reveal delay={80}>
        <div className="surface-dark bg-espresso text-crema mt-12 flex flex-wrap items-stretch gap-6 rounded-[32px] p-6 sm:p-9">
          <div className="flex min-w-0 flex-[999_1_26rem] flex-col justify-between gap-8">
            <p className="max-w-[32.5rem] text-[19px] leading-relaxed text-[#e9dfcf]">
              {profile.lede}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <ButtonLink href="/comanda" className="min-h-12 px-6">
                Arma tu pedido
              </ButtonLink>
              <a
                href="#barra"
                className="text-crema hover:text-ambar inline-flex min-h-12 items-center gap-2 px-2 font-medium transition-colors duration-[--dur-hint] ease-[--ease-out]"
              >
                Ver el trabajo
                <IconArrowUpRight className="size-4" />
              </a>
            </div>
          </div>

          {/* The rotating value lives here, well away from the h1. */}
          <div className="bg-ambar text-espresso flex min-h-[12.5rem] min-w-0 flex-[1_1_16rem] flex-col justify-between gap-6 rounded-[22px] p-7">
            <span className="font-mono text-[13px]">
              <span aria-hidden="true">&gt; </span>
              {profile.brewLabel}
            </span>
            <span className="font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-none font-semibold">
              <ScrambleText words={[...profile.brewWords]} />
              <span aria-hidden="true" className="animate-caret">
                _
              </span>
            </span>
          </div>

          <div className="bg-card text-ink flex min-w-0 flex-[1_1_16rem] flex-col gap-3.5 rounded-[22px] p-7">
            <IconCode className="text-copper size-7" strokeWidth={1.8} />
            <span className="font-display text-[28px] leading-[1.05] font-semibold">
              {profile.heroCodeCard.title}
            </span>
            <span className="text-ink-2 text-[15px] leading-normal">
              {profile.heroCodeCard.body}
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
