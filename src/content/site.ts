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
   * Portrait, shown as a sticker beside the headline in the hero.
   *
   * The frame is 4:5. The source here is 1170×2080 (a taller 9:16), so
   * `position` decides which part survives the crop: it maps straight to CSS
   * object-position. Use "center" (default), "top" if the head is being cut,
   * or a pair like "50% 30%" to fine-tune.
   *
   * Set to `null` to hide it — the hero then renders without the sticker
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

  /** Washi-tape label above the headline. */
  heroTape: "Desarrollo web a medida · freelance",

  /** Handwritten sticker stuck to the portrait, and the round badge on it. */
  heroSticker: "hola, soy David ☕︎",
  heroBadge: ["recién", "tostado"],

  /** Third block of the hero band. */
  heroCodeCard: {
    title: "El código es tuyo",
    body: "Te entrego proyecto, accesos y documentación. Sin ataduras.",
  },

  /** Amber block of the hero band: the terminal voice, with a rotating value. */
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

export type MenuGroup = {
  id: string;
  /** Mono line above the title: the coffees this group maps to. */
  coffees: string;
  title: string;
  description: string;
  /** Dark cards use the espresso palette; the rest sit on the light card. */
  tone: "light" | "dark";
  /** Wide cards hold a browser screenshot; narrow ones a small illustration. */
  size: "wide" | "narrow";
  /** Screenshot under the text, shown in a browser frame (wide cards). */
  preview?: { src: string; alt: string; url: string };
  /** Mini cart illustration (store card). Placeholder labels, not real products. */
  cart?: { items: { name: string; qty: string }[]; pay: string };
  /** Short chain of chips (integrations card). */
  flow?: string[];
};

/**
 * The eight services of the menu, regrouped into four cards. Order here is the
 * order on the page: wide, narrow, wide, narrow.
 *
 * Prices are intentionally absent: the only fixed price on the home is the
 * express audit below. Everything else is quoted in /comanda.
 */
export const menuGroups: MenuGroup[] = [
  {
    id: "webs",
    coffees: "Cortado · Americano",
    title: "Webs",
    description:
      "Landing pages que convierten y webs corporativas de cinco a ocho páginas.",
    tone: "light",
    size: "wide",
    preview: {
      src: "/projects/twonutris-desktop.png",
      alt: "Ejemplo de web: TwoNutris",
      url: "home.twonutris.net",
    },
  },
  {
    id: "tiendas",
    coffees: "Latte",
    title: "Tiendas",
    description: "Catálogo, carrito y pagos a medida. Sin comisiones por venta.",
    tone: "light",
    size: "narrow",
    cart: {
      items: [
        { name: "Producto 1", qty: "x2" },
        { name: "Producto 2", qty: "x1" },
      ],
      pay: "Pagar",
    },
  },
  {
    id: "sistemas",
    coffees: "Flat white · Doble espresso",
    title: "Sistemas y apps",
    description:
      "Paneles, CRMs y aplicaciones web completas, de la arquitectura al deploy.",
    tone: "dark",
    size: "wide",
    preview: {
      src: "/projects/kuna-desktop.png",
      alt: "Ejemplo de sistema: KUNA",
      url: "kuna-seven.vercel.app",
    },
  },
  {
    id: "integraciones",
    coffees: "Capuchino · Refill ∞",
    title: "Integraciones y soporte",
    description:
      "Conecto las herramientas que hoy no se hablan, y el proyecto sigue vivo después del lanzamiento.",
    tone: "light",
    size: "narrow",
    flow: ["WhatsApp", "Tu sistema", "Email"],
  },
];

/** The entry offer. Its price is the only one shown on the home page. */
export const auditOffer = {
  kicker: "Cortado Express · precio cerrado",
  title: "Auditoría exprés y tres arreglos",
  description:
    "Reviso tu web actual y arreglo los tres problemas de mayor impacto en 72 horas, con informe de antes y después. La forma más barata de probar cómo trabajo.",
  price: "$149",
  cta: "Pedir auditoría",
  /** Label of the "Cotizar" buttons. */
  quoteCta: "Cotizar",
};

/* -------------------------------------------------------------------------- */
/* 03 · LA BARRA — projects                                                   */
/* -------------------------------------------------------------------------- */

export type ProjectImage = { src: string; alt: string };

export type Project = {
  slug: string;
  name: string;
  /** Short label for the viewer's project switcher. */
  shortName: string;
  /** Mono line above the name, after "N.º 0X · year". */
  kind: string;
  /** One line: the problem it solves. */
  tagline: string;
  /** Two sentences for the card on the home page. */
  summary: string;
  /** The context — what the client had before, and what was needed. Shown in the viewer. */
  context: string;
  /**
   * Screenshots, both 1440×900 (desktop) and 390×844 (mobile) PNGs in
   * /public/projects. The intrinsic sizes live in the viewer and the card, so
   * keep these proportions when swapping an image.
   */
  images: { desktop: ProjectImage; mobile: ProjectImage };
  /** Rendered as brand-coloured chips. Slugs must exist in simple-icons. */
  stack: { name: string; slug: string }[];
  liveUrl?: string;
  repoUrl?: string;
  year: string;
};

/** Copy of the "next project" placeholder at the end of La barra. */
export const nextProjectSlot = {
  title: "El próximo puede ser el tuyo.",
  body: "Cuatro preguntas y te doy un rango orientativo al instante.",
  cta: "Calcular mi pedido",
};

export const projects: Project[] = [
  {
    slug: "twonutris",
    name: "TwoNutris",
    shortName: "TwoNutris",
    kind: "Web de negocio",
    tagline: "Su menú vivía en un PDF. Ahora vende solo.",
    summary:
      "Menú semanal con información nutricional por plato y planes conectados directo a WhatsApp.",
    images: {
      desktop: {
        src: "/projects/twonutris-desktop.png",
        alt: "Página de inicio de TwoNutris en escritorio",
      },
      mobile: {
        src: "/projects/twonutris-mobile.png",
        alt: "TwoNutris en celular",
      },
    },
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
    shortName: "KUNA",
    kind: "Sistema de gestión",
    tagline: "La consulta del nutricionista, sin planillas sueltas.",
    summary:
      "Pacientes, medidas en el tiempo y menús personalizados. Los cálculos nutricionales salen solos.",
    images: {
      desktop: {
        src: "/projects/kuna-desktop.png",
        alt: "Panel de pacientes de KUNA en escritorio",
      },
      mobile: {
        src: "/projects/kuna-mobile.png",
        alt: "KUNA en celular",
      },
    },
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
      "calendario por fases, entregables concretos y precio cerrado. Sin letra chica, sin costes adicionales ni sorpresas de último minuto.",
  },
  {
    id: "desarrollo",
    icon: "code",
    title: "Desarrollo",
    body:
      "Construyo por fases con revisiones cada pocos días. Ves cómo " +
      "avanza, no esperas un mes para descubrir si vamos bien. En cada paso importante tienes la decisión.",
  },
  {
    id: "entrega",
    icon: "rocket",
    title: "Entrega",
    body:
      "Te entrego el proyecto funcionando y desplegado, con código, accesos " +
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
  barra: {
    title: "La barra.",
    tape: "recién servidos, en producción",
    lead: "Proyectos reales que llegaron a producción. Toca uno para verlo en escritorio y celular.",
  },
  carta: {
    title: "La carta.",
    tape: "elige tu café",
    lead: "Cada servicio lleva el nombre del café que se le parece: misma carga, misma intensidad.",
  },
  metodo: {
    title: "Cómo trabajo.",
    lead: "Sabes en qué punto está tu proyecto en todo momento, y hablas siempre con quien programa.",
  },
  origen: {
    title: "El origen.",
    tape: "quién está detrás",
  },
  molido: {
    title: "El molido.",
    tape: "con qué lo preparo",
    lead: "La selección de origen con la que preparo cada proyecto. Tostado y probado en producción.",
  },
} as const;
