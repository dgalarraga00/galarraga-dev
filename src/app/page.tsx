import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import { CoffeeCup } from "@/components/icons/CoffeeCup";
import { MenuRow } from "@/components/MenuRow";
import { Reveal } from "@/components/Reveal";
import { ScrambleText } from "@/components/ScrambleText";
import { SectionHeader } from "@/components/SectionHeader";
import { SocialLinks } from "@/components/SocialLinks";
import { TechMarquee } from "@/components/TechMarquee";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { ProcessAccordion } from "@/components/sections/ProcessAccordion";
import { ProjectList } from "@/components/sections/ProjectList";
import { StackGrid } from "@/components/sections/StackGrid";
import { menu, profile, sections } from "@/content/site";

const container = "mx-auto w-full max-w-6xl px-6";
const section = "py-24 sm:py-32";

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                             */}
      {/* ---------------------------------------------------------------- */}
      {/* Editorial hero, not the SaaS template.
          The template is: pill badge, left headline, subheadline, two buttons —
          stacked in one column. This instead lets the type run to the full
          width, cuts it with a rule, and hangs the supporting information off a
          two-column row underneath, the way a printed board is set. The scale
          jump between the headline and the mono labels is what does the work. */}
      <section className={`${container} pt-20 pb-20 sm:pt-28 sm:pb-24`}>
        <Reveal>
          {/* One heading, three lines, a hard scale jump between the statement
              and the deck. Keeping the deck inside the h1 gives the heading
              real descriptive content — "Nada instantáneo" alone says nothing
              to a search engine — without adding a competing h1. */}
          <h1 className="font-display text-[3.5rem] leading-[0.92] font-semibold tracking-[-0.03em] sm:text-[7rem] lg:text-[9.5rem]">
            <span className="block">{profile.headline}</span>
            {/* Flat colour, never a gradient: this is the LCP element and the
                single most important word on the page. */}
            <span className="text-ambar block">{profile.headlineAccent}</span>
            <span className="text-leche mt-7 block text-xl leading-snug font-normal tracking-normal sm:mt-9 sm:text-3xl">
              {profile.headlineDeck}
              {/* The house mark closes the sentence. Decorative, so it is
                  hidden from assistive tech — the heading still reads as
                  clean text. The nbsp keeps it from ever wrapping alone
                  onto a line of its own. */}
              <span className="whitespace-nowrap">
                {" "}
                <CoffeeCup className="text-ambar inline-block size-[0.95em] translate-y-[0.08em]" />
              </span>
            </span>
          </h1>
        </Reveal>

        <Reveal delay={80}>
          <hr className="border-poso mt-12 border-t sm:mt-16" />
        </Reveal>

        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_auto] md:items-start md:gap-16">
          <Reveal delay={120}>
            <p className="text-leche max-w-xl text-base leading-relaxed sm:text-lg">
              {profile.lede}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="/comanda">Arma tu pedido</ButtonLink>
              <ButtonLink href="#barra" variant="outline">
                Ver el trabajo
              </ButtonLink>
            </div>
          </Reveal>

          {/* The rotating value lives here, well away from the h1. */}
          <Reveal delay={180}>
            <p className="text-vapor font-mono text-xs tracking-[0.15em] uppercase md:text-right">
              <span aria-hidden="true" className="text-ambar">
                &gt;{" "}
              </span>
              {profile.brewLabel}
            </p>
            <p className="text-crema mt-2 font-mono text-sm sm:text-base md:text-right">
              <ScrambleText words={[...profile.brewWords]} />
            </p>
          </Reveal>
        </div>
      </section>

      {/* Moving strip of the stack — the first hit of colour on the page. */}
      <TechMarquee />

      {/* ---------------------------------------------------------------- */}
      {/* 01 · El origen                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section id="origen" className={`${container} ${section} scroll-mt-24`}>
        <SectionHeader {...sections.origen} />

        {/* The portrait sits here rather than in the hero: this is where the
            page is explaining who you are, so a face adds credibility instead
            of competing with the headline. Collapses to one column when no
            photo is configured. */}
        {/* The photo column needs a DEFINITE width. With `auto` the track sizes
            to its content, the content asks for 100% of the track, and the
            resolution is circular — the column collapses to zero on desktop
            while mobile (no grid) renders fine. 20rem also matches the `sizes`
            hint on the image below. */}
        <div
          className={
            "mt-12 grid gap-12 " +
            (profile.photo ? "lg:grid-cols-[1fr_20rem] lg:gap-16" : "")
          }
        >
          <div>
            <div className="max-w-2xl space-y-6">
              {profile.bio.map((paragraph, i) => (
                <Reveal key={i} delay={i * 60}>
                  <p className="text-leche text-base leading-relaxed sm:text-lg">
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
          </div>

          {profile.photo ? (
            <Reveal delay={80}>
              <figure className="lg:sticky lg:top-28">
                {/* 4:5 frame. The source is taller than that, so object-cover
                    crops it — `position` from the config decides what survives
                    the crop, without touching this file. */}
                <div className="border-poso relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-2xl border lg:max-w-none">
                  <Image
                    src={profile.photo.src}
                    alt={profile.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 20rem, 100vw"
                    className="object-cover"
                    style={{ objectPosition: profile.photo.position ?? "center" }}
                  />
                </div>
              </figure>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 02 · La carta — services as an actual menu                       */}
      {/* ---------------------------------------------------------------- */}
      <section id="carta" className={`${container} ${section} scroll-mt-24`}>
        <SectionHeader
          {...sections.carta}
          lead="Cada servicio lleva el nombre del café que se le parece. No es un chiste: la carga, la intensidad y el tiempo de preparación son los mismos."
        />

        <div className="mt-14">
          {menu.map((item) => (
            <Reveal key={item.name}>
              <MenuRow
                name={item.name}
                price={item.coffee}
                description={item.description}
                productId={item.productId}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 03 · La barra — projects                                         */}
      {/* ---------------------------------------------------------------- */}
      <section id="barra" className={`${container} ${section} scroll-mt-24`}>
        <SectionHeader
          {...sections.barra}
          lead="Proyectos que llegaron a producción, con el contexto que explica cada decisión técnica."
        />
        <ProjectList />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 04 · Cómo trabajo                                                */}
      {/* ---------------------------------------------------------------- */}
      <section id="metodo" className={`${container} ${section} scroll-mt-24`}>
        <SectionHeader
          {...sections.metodo}
          lead="Cuatro pasos. Sabes en qué punto está tu proyecto en todo momento, y hablas siempre con quien programa."
        />
        <div className="mt-12">
          <ProcessAccordion />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 05 · El molido — the stack, in full colour                       */}
      {/* ---------------------------------------------------------------- */}
      <section id="molido" className={`${container} ${section} scroll-mt-24`}>
        <SectionHeader
          {...sections.molido}
          lead="La selección de origen con la que preparo cada proyecto. Tostado y probado en producción."
        />
        <StackGrid />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 06 · Preguntas frecuentes                                        */}
      {/* ---------------------------------------------------------------- */}
      <section id="dudas" className={`${container} ${section} scroll-mt-24`}>
        <SectionHeader
          {...sections.dudas}
          lead="Lo que más me preguntan sobre precios, plazos, código y forma de trabajar. Si te queda una duda, escríbeme."
        />
        <div className="mt-12">
          <FaqAccordion />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 07 · La comanda                                                  */}
      {/* ---------------------------------------------------------------- */}
      {/* The wine band. It is DARKER than the page, so the closing section
          drops instead of lifting — the page settles into the call to action
          rather than flashing at it. Every ink colour gains contrast here
          (crema 13:1, ámbar 8.25:1), so nothing needs adjusting inside. */}
      <section id="comanda" className="bg-vino scroll-mt-24">
        <div className={`${container} py-24 text-center sm:py-32`}>
          <SectionHeader
            {...sections.comanda}
            align="center"
            lead="Cuatro preguntas y te doy un rango orientativo al instante. Sin formularios eternos y sin esperar un email."
          />

          <Reveal delay={120}>
            <div className="mt-10 flex justify-center">
              <ButtonLink href="/comanda">Calcular mi pedido</ButtonLink>
            </div>
            <p className="text-vapor mt-6 font-mono text-xs">
              {"// la primera consulta es cortesía de la casa"}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
