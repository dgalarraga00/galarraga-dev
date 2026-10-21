import Link from "next/link";
import { IconArrowDown, IconArrowUpRight } from "@/components/icons/ui";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { SocialLinks } from "@/components/SocialLinks";
import { TechMarquee } from "@/components/TechMarquee";
import { CartaBento } from "@/components/sections/CartaBento";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Hero } from "@/components/sections/Hero";
import { Preparation } from "@/components/sections/Preparation";
import { ProjectList } from "@/components/sections/ProjectList";
import { StackGrid } from "@/components/sections/StackGrid";
import { closing, faqIntro, profile, sections } from "@/content/site";

const container = "mx-auto w-full max-w-6xl px-6";
const section = "pt-32 sm:pt-36";

/** Home order: hero, work, services, method, origin, stack, FAQs, closing CTA. */
export default function Home() {
  return (
    <>
      <Hero />

      {/* Moving strip of the stack, right under the hero. */}
      <TechMarquee />

      <section id="barra" className={`${container} ${section} scroll-mt-24`}>
        <SectionHeader {...sections.barra} />
        <ProjectList />
      </section>

      <section id="carta" className={`${container} ${section} scroll-mt-24`}>
        <SectionHeader {...sections.carta} />
        <CartaBento />
      </section>

      <section id="metodo" className={`${container} ${section} scroll-mt-24`}>
        <SectionHeader {...sections.metodo} />
        <Preparation />
      </section>

      {/* The portrait lives in the hero now, so this is text only. */}
      <section id="origen" className={`${container} ${section} scroll-mt-24`}>
        <SectionHeader {...sections.origen} />
        <div className="mt-12 max-w-3xl space-y-6">
          {profile.bio.map((paragraph, i) => (
            <Reveal key={i} delay={i * 60}>
              <p
                className={
                  i === 0
                    ? "font-display text-[clamp(1.5rem,2.6vw,2rem)] leading-snug"
                    : "text-ink-2 text-lg leading-relaxed"
                }
              >
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <div className="mt-10">
            <SocialLinks />
          </div>
        </Reveal>
      </section>

      <section id="molido" className={`${container} ${section} scroll-mt-24`}>
        <SectionHeader {...sections.molido} />
        <StackGrid />
      </section>

      <section
        id="dudas"
        className={`${container} ${section} flex scroll-mt-24 flex-wrap items-start gap-x-16 gap-y-12`}
      >
        <Reveal className="flex min-w-0 flex-[1_1_21rem] flex-col gap-6">
          <span className="font-hand text-ink self-start -rotate-3 bg-white px-3.5 py-0.5 text-[26px] shadow-[0_6px_16px_rgba(36,28,23,0.12)]">
            {faqIntro.tape}
          </span>
          <h2 className="font-display text-[clamp(5rem,10vw,9.25rem)] leading-[0.85] font-bold tracking-[-0.04em]">
            {faqIntro.title}
            <span className="text-ambar" aria-hidden="true">
              .
            </span>
          </h2>
          <p className="text-ink-2 max-w-sm text-lg leading-relaxed">
            {faqIntro.lead}
          </p>
          <Link
            href="#comanda"
            className="group mt-4 inline-flex items-center gap-5 self-start"
          >
            <span className="font-display text-[clamp(1.6rem,3vw,2.1rem)] font-semibold">
              {faqIntro.cta}
            </span>
            <span className="bg-espresso text-ambar flex h-12 w-16 items-center justify-center rounded-full transition-transform duration-[--dur-control] ease-[--ease-out] group-hover:translate-y-0.5 group-active:scale-[0.96]">
              <IconArrowDown className="size-5" />
            </span>
          </Link>
        </Reveal>

        <Reveal className="min-w-0 flex-[999_1_35rem]">
          <FaqAccordion />
        </Reveal>
      </section>

      {/* Closing band: the one full-bleed espresso block. */}
      <section
        id="comanda"
        className="surface-dark bg-espresso text-crema mt-32 scroll-mt-0 sm:mt-36"
      >
        <div className={`${container} flex flex-wrap items-end justify-between gap-10 py-24 sm:py-32`}>
          <Reveal className="min-w-0 flex-[999_1_30rem]">
            <span className="font-hand bg-ground text-ink inline-block -rotate-2 px-3.5 py-0.5 text-[26px]">
              {closing.tape}
            </span>
            <h2 className="font-display mt-6 text-[clamp(4rem,10vw,9.5rem)] leading-[0.9] font-semibold tracking-[-0.035em]">
              {closing.title}
              <span className="text-ambar" aria-hidden="true">
                .
              </span>
            </h2>
          </Reveal>

          <Reveal delay={100} className="flex min-w-0 flex-[1_1_21rem] flex-col gap-3">
            <Link
              href="/comanda"
              className="bg-card text-ink hover:bg-white flex items-center justify-between gap-4 rounded-[20px] px-7 py-6 transition-colors duration-[--dur-hint] ease-[--ease-out]"
            >
              <span className="flex flex-col gap-1.5">
                <span className="text-ink-2 font-mono text-[13px]">
                  {closing.order.kicker}
                </span>
                <span className="font-display text-[28px] font-semibold">
                  {closing.order.title}
                </span>
              </span>
              <IconArrowUpRight className="size-7 shrink-0" strokeWidth={1.8} />
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="border-poso text-crema hover:border-ambar flex flex-col gap-1.5 rounded-[20px] border px-7 py-5 transition-colors duration-[--dur-hint] ease-[--ease-out]"
            >
              <span className="text-vapor font-mono text-[13px]">
                {closing.mail.kicker}
              </span>
              <span className="text-lg break-all">{profile.email}</span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
