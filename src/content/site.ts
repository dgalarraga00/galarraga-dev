/**
 * Single source of truth for every piece of copy on the site.
 *
 * Components stay dumb: they receive this data and render it. Editing the
 * portfolio means editing this file — no JSX changes required.
 */

export const profile = {
  name: "David Galarraga",
  /** Typed out once in the nav on first load. */
  wordmark: "dev.galarraga",
  role: "Desarrollador web",

  /**
   * Portrait, shown in "Quién está detrás" — not in the hero, where it would
   * compete with the headline for the first three seconds of attention.
   *
   * The frame is 4:5. The source here is 1170×2080 (a taller 9:16), so
   * `position` decides which part survives the crop: it maps straight to CSS
   * object-position. Use "center" (default), "top" if the head is being cut,
   * or a pair like "50% 30%" to fine-tune.
   *
   * Set to `null` to hide it — the section then renders as a single column
   * rather than showing a broken image.
   */
  photo: {
    src: "/david.jpeg",
    alt: "David Galarraga",
    position: "50% 25%",
  } as { src: string; alt: string; position?: string } | null,

  /**
   * The headline.
   *
   * "Nada instantáneo" says there are no templates and no generated pages
   * without claiming it — and it only works because the brand is coffee, which
   * is what makes it impossible to copy. Two words, so the type can be huge.
   *
   * Alternatives already considered, if this one stops fitting:
   *   "Software de origen"           — plays on single-origin coffee
   *   "Se prepara, no se sirve de sobre"
   *
   * Avoid "La web que tu negocio/marca merece": that is, word for word, the
   * headline of notfound404.es.
   */
  headline: "Nada",
  headlineAccent: "instantáneo.",

  /**
   * The deck. Same h1, much smaller — one heading, a hard scale jump.
   *
   * "De origen" is specialty-coffee vocabulary (single origin: traceable, one
   * source) and it brushes against "código fuente" without saying it. Avoid
   * "de calidad": nobody advertises low quality, so the phrase carries no
   * information and blunts the line above it.
   *
   * "Sirviendo" over "moliendo" — grinding is a step in the back room, serving
   * is the moment the client receives something. It also rhymes with the rest
   * of the page: La carta, La barra, La comanda.
   */
  headlineDeck: "Sirviendo código de origen.",

  /** Sits under the rule, left column. Explains the headline in plain terms. */
  lede:
    "Cada proyecto empieza desde cero: arquitectura, código y puesta en " +
    "producción. Cero plantillas, cero generadores, sin atajos que se pagan después.",

  /** Right column of the hero: the terminal voice, with a rotating value. */
  brewLabel: "preparando",
  brewWords: [
    "aplicaciones web",
    "paneles de gestión",
    "integraciones",
    "e-commerce",
    "APIs a medida",
  ],

  /** Used for the page description in metadata. */
  subheadline:
    "Desarrollador enfocado en aplicaciones web a medida: arquitectura limpia, " +
    "código testeado y productos que llegan a producción y se mantienen.",

  /**
   * "Quién está detrás". One paragraph per entry. Write it as if le estuvieras
   * contando a alguien en persona — es la única sección donde tu voz importa
   * más que tu stack.
   */
  bio: [
    "Soy David Galarraga: desarrollador backend con oficio de frontend, " +
      "freelance, y un obsesivo de la programación.",
    "Reviso cada píxel antes de dar algo por terminado. Me metí de lleno en " +
      "esto por pura frustración: me harté de ver negocios buenos estancados " +
      "por tecnología mediocre. Plantillas copiadas y pegadas, agencias que " +
      "cobran fortunas y entregan meses tarde, herramientas que se rompen con " +
      "solo mirarlas. Decidí que se podía hacer mucho mejor, y a eso me dedico.",
  ],

  email: "dgalarraga00@gmail.com",
} as const;

/* -------------------------------------------------------------------------- */
/* Social links                                                               */
/* -------------------------------------------------------------------------- */

export type SocialKey = "github" | "linkedin" | "instagram" | "email";

export const socials: { key: SocialKey; label: string; href: string }[] = [
  { key: "github", label: "GitHub", href: "https://github.com/dgalarraga00" },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/davidgalarraga",
  },
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/dev.galarraga/",
  },
  { key: "email", label: "Email", href: `mailto:${profile.email}` },
];

/* -------------------------------------------------------------------------- */
/* 02 · LA CARTA — services, named like a coffee menu                         */
/* -------------------------------------------------------------------------- */

export type MenuItem = {
  name: string;
  coffee: string;
  description: string;
  /**
   * Links the row to pricing.ts and scope.ts. When present the row can be
   * expanded to show what the product includes and excludes.
   *
   * Omit it for services quoted case by case — those have no fixed scope, and
   * inventing one would be a promise nobody checked.
   */
  productId?: string;
};

/**
 * Ordered by intensity, which happens to be the same order as price: the
 * strength of the coffee is doing real work here, not decoration.
 */
export const menu: MenuItem[] = [
  {
    productId: "cortado-express",
    name: "Auditoría exprés y tres arreglos",
    coffee: "Cortado Express · $149",
    description:
      "Reviso tu web actual y arreglo los tres problemas de mayor impacto en 72 horas, con informe de antes y después. Precio cerrado. La forma más barata de probar cómo trabajo.",
  },
  {
    productId: "landing",
    name: "Landing pages",
    coffee: "Cortado",
    description:
      "Una página, directa, pensada para convertir. Poca cantidad, mucho cuerpo y sabor.",
  },
  {
    productId: "corporativa",
    name: "Webs corporativas",
    coffee: "Americano",
    description:
      "De cinco a ocho páginas para presentar tu negocio completo. Mismo fondo, servido largo.",
  },
  {
    productId: "tienda",
    name: "Tiendas online",
    coffee: "Latte",
    description:
      "Catálogo, carrito y pagos, construido a medida. Sin las comisiones por venta ni los límites de las plataformas cerradas.",
  },
  {
    productId: "panel",
    name: "Paneles y sistemas de gestión",
    coffee: "Flat white",
    description:
      "Dashboards, CRMs y back-offices. Denso, sin espuma, para el uso diario.",
  },
  {
    productId: "app",
    name: "Aplicaciones web a medida",
    coffee: "Doble espresso",
    description:
      "El producto completo, desde la arquitectura hasta el deploy. Concentrado y sin relleno.",
  },
  {
    // No productId: these two are quoted case by case, so they have no fixed
    // scope to disclose.
    name: "Integraciones y automatizaciones",
    coffee: "Capuchino",
    description:
      "Una mezcla espumosa: conectar las herramientas que hoy no se hablan entre sí.",
  },
  {
    name: "Mantenimiento y evolución",
    coffee: "Refill ∞",
    description:
      "El proyecto sigue vivo después del lanzamiento. Yo también, como todo buen café.",
  },
];

/* -------------------------------------------------------------------------- */
/* 03 · LA BARRA — projects                                                   */
/* -------------------------------------------------------------------------- */

export type Project = {
  slug: string;
  name: string;
  /** One line: the problem it solves. */
  tagline: string;
  /** The context — what the client had before, and what was needed. */
  context: string;
  /** Rendered as brand-coloured chips. Slugs must exist in simple-icons. */
  stack: { name: string; slug: string }[];
  liveUrl?: string;
  repoUrl?: string;
  year: string;
};

export const projects: Project[] = [
  {
    slug: "twonutris",
    name: "TwoNutris",
    tagline: "Su menú vivía en un PDF. Ahora vende solo.",
    context:
      "Mandaban el menú semanal en un PDF mal armado y sin fotos. Les construí " +
      "una web con el menú de cinco días y varias opciones por jornada, donde " +
      "cada plato muestra su información nutricional al detalle. Sumé la " +
      "sección de planes con precios, conectada directo a WhatsApp: el cliente " +
      "elige y escribe sin pasos intermedios.",
    stack: [
      { name: "Next.js", slug: "nextdotjs" },
      { name: "TypeScript", slug: "typescript" },
      { name: "React", slug: "react" },
    ],
    liveUrl: "https://home.twonutris.net",
    repoUrl: "https://github.com/dgalarraga00/TwoNutris-Web",
    year: "2025",
  },
  {
    slug: "kuna",
    name: "KUNA Nutrición",
    tagline: "La consulta del nutricionista, sin planillas sueltas.",
    context:
      "Una aplicación de gestión para nutricionistas: alta rápida de " +
      "pacientes, registro de medidas a lo largo del tiempo, armado de menús " +
      "personalizados y seguimiento de comidas. Los cálculos nutricionales " +
      "salen solos, así que la consulta se dedica al paciente y no a la " +
      "calculadora.",
    stack: [
      { name: "React", slug: "react" },
      { name: "Django REST", slug: "django" },
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "Supabase", slug: "supabase" },
      { name: "Tailwind", slug: "tailwindcss" },
    ],
    liveUrl: "https://kuna-seven.vercel.app/",
    repoUrl: "https://github.com/dgalarraga00/Kuna",
    year: "2026",
  },
];

/* -------------------------------------------------------------------------- */
/* 04 · CÓMO TRABAJO — four steps, as a disclosure list                       */
/* -------------------------------------------------------------------------- */

export type ProcessStep = {
  id: string;
  /** Maps to an icon in components/icons/ui.tsx */
  icon: "chat" | "document" | "code" | "rocket";
  title: string;
  body: string;
};

export const process: ProcessStep[] = [
  {
    id: "consulta",
    icon: "chat",
    title: "Consulta",
    body:
      "Me cuentas tu idea y qué necesitas, sin compromiso y sin coste. " +
      "Lo dejamos por escrito: alcance, plazos realistas y aterrizamos la idea.",
  },
  {
    id: "propuesta",
    icon: "document",
    title: "Propuesta",
    body:
      "Te llega un presupuesto detallado por escrito: alcance funcional, " +
      "calendario por fases, entregables concretos y precio cerrado. Sin letra chica, sin costes adicionales ni sorpresas de ultimo minuto..",
  },
  {
    id: "desarrollo",
    icon: "code",
    title: "Desarrollo",
    body:
      "Construyo por fases con revisiones cada pocos días. Ves cómo " +
      "avanza, no esperas un mes para descubrir si vamos bien. En cada paso importante tienes la decision. ",
  },
  {
    id: "entrega",
    icon: "rocket",
    title: "Entrega",
    body:
      "Te entrego  el proyecto funcionando y desplegado, con código, accesos " +
      "y documentación. Si quieres seguir conmigo, perfecto. Si prefieres llevarlo " +
      "a otro equipo, también: el código es tuyo.",
  },
];

/* -------------------------------------------------------------------------- */
/* 05 · EL MOLIDO — stack grid, brand-coloured                                */
/* -------------------------------------------------------------------------- */

export type Tech = { name: string; slug: string };

export const stackGroups: { group: string; items: Tech[] }[] = [
  {
    group: "Frontend",
    items: [
      { name: "React", slug: "react" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Tailwind", slug: "tailwindcss" },
      { name: "Vite", slug: "vite" },
      { name: "shadcn/ui", slug: "shadcnui" },
    ],
  },
  {
    group: "Backend y base de datos",
    items: [
      { name: "Python", slug: "python" },
      { name: "Django REST", slug: "django" },
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "Supabase", slug: "supabase" },
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Docker", slug: "docker" },
    ],
  },
  {
    group: "Herramientas y deploy",
    items: [
      { name: "Git", slug: "git" },
      { name: "GitHub", slug: "github" },
      { name: "Vercel", slug: "vercel" },
      { name: "Render", slug: "render" },
      { name: "Claude", slug: "claude" },
      { name: "Linux", slug: "linux" },
    ],
  },
];

/** Decorative strip. Order is chosen for colour rhythm, not importance. */
export const marqueeTech: Tech[] = [
  { name: "React", slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "Tailwind", slug: "tailwindcss" },
  { name: "Python", slug: "python" },
  { name: "Django", slug: "django" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Supabase", slug: "supabase" },
  { name: "Docker", slug: "docker" },
  { name: "Vite", slug: "vite" },
  { name: "Vercel", slug: "vercel" },
  { name: "Git", slug: "git" },
];

/* -------------------------------------------------------------------------- */
/* FAQ                                                                        */
/* -------------------------------------------------------------------------- */

export type Faq = { id: string; question: string; answer: string };

/**
 * Answers written by David. The questions are the standard ones any freelance
 * dev gets; the answers state HIS prices, HIS delivery times and HIS services.
 *
 * When concatenating strings across lines, watch the trailing space: without
 * it the two fragments join with no gap, and the seam only shows in the
 * browser — never in the editor.
 */
export const faqs: Faq[] = [
  {
    id: "precio",
    question: "¿Cuánto cuesta una web a medida?",
    answer:
      "Depende de la preparación que necesites: una landing, un e-commerce, " +
      "una web corporativa o una aplicación web a medida. En la sección " +
      "«Arma tu pedido» encuentras un rango orientativo en cuatro preguntas. " +
      "El precio se cierra por escrito antes de empezar, sin sorpresas.",
  },
  {
    id: "plazo",
    question: "¿Cuánto te demoras en entregar mi proyecto?",
    answer:
      "Depende del proyecto: una landing entre 7 y 10 días, una web " +
      "corporativa unas 2 semanas, un e-commerce de 2 a 3 semanas. " +
      "Si necesitas que salga del horno más rápido, existe la opción de " +
      "plazo acelerado.",
  },
  {
    id: "wordpress",
    question: "¿Son páginas originales o usas plantillas?",
    answer:
      "Cada proyecto es único, como un buen café. Cero plantillas y cero " +
      "WordPress: el código se escribe desde la primera línea para tu negocio.",
  },
  {
    id: "codigo",
    question:
      "Una vez terminado el proyecto, ¿la página es mía o hay mensualidades obligatorias?",
    answer:
      "Tuya al 100%. Una vez cancelado el proyecto y finalizada la " +
      "producción, te entrego todo: el repositorio, la documentación y los " +
      "accesos. Sin pagos adicionales, sin mensualidades y sin permanencia.",
  },
  {
    id: "proceso",
    question:
      "¿Cómo nos organizamos en el día a día? ¿Quién será mi único punto de contacto?",
    answer:
      "Siempre conmigo. Soy tu desarrollador y durante todo el proyecto " +
      "hablas directamente con quien programa, sin intermediarios. El proceso " +
      "es: consulta sin coste, propuesta con precio cerrado, desarrollo por " +
      "fases con revisiones cada pocos días, y entrega con todo documentado.",
  },
];

/* -------------------------------------------------------------------------- */
/* Section headers — the coffee-shop spine of the page                        */
/* -------------------------------------------------------------------------- */

export const sections = {
  origen: { n: "01", kicker: "El origen", title: "Quién está detrás" },
  carta: { n: "02", kicker: "La carta", title: "En qué puedo ayudarte" },
  barra: { n: "03", kicker: "La barra", title: "Lo que ya serví" },
  metodo: { n: "04", kicker: "El método", title: "Cómo trabajo" },
  molido: { n: "05", kicker: "El molido", title: "Con qué lo preparo" },
  dudas: { n: "06", kicker: "La sobremesa", title: "Preguntas frecuentes" },
  comanda: { n: "07", kicker: "La comanda", title: "Arma tu pedido" },
} as const;
