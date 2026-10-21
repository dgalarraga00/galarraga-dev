import Image from "next/image";
import { ButtonLink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { SocialLinks } from "@/components/SocialLinks";
import { TechMarquee } from "@/components/TechMarquee";
import { Hero } from "@/components/sections/Hero";
import { CartaBento } from "@/components/sections/CartaBento";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Preparation } from "@/components/sections/Preparation";
import { ProjectList } from "@/components/sections/ProjectList";
import { StackGrid } from "@/components/sections/StackGrid";
import { profile, sections } from "@/content/site";

const container = "mx-auto w-full max-w-6xl px-6";
const section = "py-24 sm:py-32";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Moving strip of the stack — the first hit of colour on the page. */}
      <TechMarquee />

      {/* ---------------------------------------------------------------- */}
      {/* 03 · La barra — projects                                         */}
      {/* ---------------------------------------------------------------- */}
      <section id="barra" className={`${container} ${section} scroll-mt-24`}>
        <SectionHeader {...sections.barra} />
        <ProjectList />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 02 · La carta — services as an actual menu                       */}
      {/* ---------------------------------------------------------------- */}
      <section id="carta" className={`${container} ${section} scroll-mt-24`}>
        <SectionHeader {...sections.carta} />

        <CartaBento />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 04 · Cómo trabajo                                                */}
      {/* ---------------------------------------------------------------- */}
      <section id="metodo" className={`${container} ${section} scroll-mt-24`}>
        <SectionHeader {...sections.metodo} />
        <Preparation />
      </section>

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
      {/* 05 · El molido — the stack, in full colour                       */}
      {/* ---------------------------------------------------------------- */}
      <section id="molido" className={`${container} ${section} scroll-mt-24`}>
        <SectionHeader {...sections.molido} />
        <StackGrid />
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 06 · Preguntas frecuentes                                        */}
      {/* ---------------------------------------------------------------- */}
      <section id="dudas" className={`${container} ${section} scroll-mt-24`}>
        <SectionHeader
          title="FAQs."
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
            title="Arma tu pedido."
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
