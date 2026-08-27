/**
 * What each product includes and — more importantly — what it does not.
 *
 * THESE ARE COMMERCIAL TERMS. Everything written here is what a client will
 * hold you to, so read every line before publishing. The exclusions are not
 * pessimism: an undefined scope is the single most common way a fixed price
 * turns into unpaid work.
 *
 * `id` matches the product id in pricing.ts.
 */

export type Scope = {
  id: string;
  includes: string[];
  excludes: string[];
  /**
   * Delivery windows for this product. "Sin prisa" deliberately has no figure:
   * a date you did not commit to is not a date you can miss.
   */
  timeline: { normal: string; urgent: string };
};

export const scopes: Scope[] = [
  {
    id: "cortado-express",
    includes: [
      "Auditoría completa de la web actual: rendimiento, móvil, SEO y accesibilidad",
      "Los tres arreglos de mayor impacto, implementados",
      "Informe con métricas de antes y después",
    ],
    excludes: [
      "Rediseño: son tres arreglos concretos, no una web nueva",
      "Contenido nuevo, secciones nuevas o funcionalidades nuevas",
      "Cambios ilimitados: al cuarto arreglo pasa a ser un proyecto",
    ],
    timeline: { normal: "72 horas", urgent: "72 horas" },
  },
  {
    id: "landing",
    includes: [
      "Una página, de 1 a 3 secciones",
      "Diseño responsive verificado en móvil, tablet y escritorio",
      "Formulario de contacto o botón directo a WhatsApp",
      "SEO técnico básico: títulos, descripciones, sitemap y datos para compartir en redes",
      "Rendimiento y accesibilidad medidos antes de entregar",
    ],
    excludes: [
      "Reservas, calendarios o pasarela de pago",
      "Panel de administración: los cambios de contenido pasan por mí",
      "Blog o secciones que se actualicen solas",
      "Varios idiomas",
    ],
    timeline: { normal: "7 a 10 días", urgent: "4 a 5 días" },
  },
  {
    id: "corporativa",
    includes: [
      "De 5 a 8 páginas: inicio, servicios, sobre nosotros, contacto y las que hagan falta",
      "Todo lo de la landing, aplicado a cada página",
      "Formularios, integración con WhatsApp y calendario de reservas si lo necesitás",
      "Páginas legales adaptadas a tu país y a los datos que recojas",
      "Alta en Google Search Console con el sitemap enviado",
    ],
    excludes: [
      "Tienda con carrito y cobros",
      "Panel para editar el contenido sin tocar código",
      "Varios idiomas",
    ],
    timeline: { normal: "2 a 3 semanas", urgent: "10 a 12 días" },
  },
  {
    id: "tienda",
    includes: [
      "Catálogo de productos con variantes y stock",
      "Carrito y pasarela de pago integrada",
      "Panel para dar de alta y editar productos",
      "Emails automáticos de confirmación de pedido",
      "Todo lo de la web corporativa",
    ],
    excludes: [
      "Las comisiones de la pasarela de pago, que las cobra el proveedor",
      "Carga del catálogo inicial si son más de 20 productos",
      "Integración con sistemas de facturación o ERP",
      "Logística y gestión de envíos",
    ],
    timeline: { normal: "3 a 4 semanas", urgent: "2 semanas" },
  },
  {
    id: "panel",
    includes: [
      "Usuarios con roles y permisos",
      "Los módulos de gestión que acordemos en la propuesta",
      "Base de datos diseñada desde cero para tu operación",
      "Exportación de datos e informes básicos",
      "Documentación de uso y traspaso",
    ],
    excludes: [
      "Migrar datos de un sistema anterior, que se cotiza aparte",
      "Aplicación móvil nativa",
      "Integraciones con software de terceros no acordadas en la propuesta",
    ],
    timeline: { normal: "5 a 7 semanas", urgent: "4 semanas" },
  },
  {
    id: "app",
    includes: [
      "Producto a medida definido en la propuesta",
      "Arquitectura, base de datos, API y frontend",
      "Autenticación y control de accesos",
      "Tests de la lógica crítica",
      "Documentación técnica y traspaso completo",
    ],
    excludes: [
      "Todo lo que no esté escrito en la propuesta: los cambios de alcance se cotizan aparte",
      "Aplicación móvil nativa",
      "Mantenimiento posterior, que va como Refill",
    ],
    timeline: { normal: "8 a 10 semanas", urgent: "6 semanas" },
  },
];

export function scopeFor(id: string | undefined): Scope | null {
  if (!id) return null;
  return scopes.find((s) => s.id === id) ?? null;
}

/* -------------------------------------------------------------------------- */
/* What "how do you want it" actually buys                                    */
/* -------------------------------------------------------------------------- */

/**
 * The domain line is the important one.
 *
 * "Dominio incluido" with no time limit is read by some clients as "for life",
 * and that is an argument you lose in writing. It is stated as one year, and
 * registered in the client's own name so there is no lock-in and no ambiguity
 * about who owns it afterwards.
 */
export const deliveryScope: Record<string, string[]> = {
  "solo-dev": [
    "Te entrego el repositorio con el código y la documentación",
    "La publicación corre por tu cuenta o la de tu equipo",
  ],
  "dev-deploy": [
    "Todo lo anterior",
    "Publico el proyecto y lo dejo funcionando en línea",
    "Configuro el despliegue automático y el certificado HTTPS",
    "Queda en un subdominio gratuito del proveedor si todavía no tenés dominio",
  ],
  todo: [
    "Todo lo anterior",
    "Dominio pagado por el PRIMER AÑO, registrado a tu nombre",
    "Configuración de DNS y del correo profesional",
    "La renovación del dominio, a partir del segundo año, corre por tu cuenta",
  ],
};

/**
 * Content scope.
 *
 * Deliberately narrow. A developer is not a photographer and not a brand
 * designer: promising original photography or a logo for a 28% surcharge means
 * either subcontracting at a loss or delivering something poor. Both cost more
 * than saying no.
 */
export const contentScope: Record<string, { includes: string[]; excludes: string[] }> = {
  listo: {
    includes: ["Maqueto el contenido que me entregues, tal cual"],
    excludes: [],
  },
  parcial: {
    includes: [
      "Reescribo y ordeno los textos que ya tenés",
      "Busco y adapto imágenes de banco con licencia comercial",
    ],
    excludes: ["Sesión de fotos propia", "Diseño de logotipo o identidad"],
  },
  nada: {
    includes: [
      "Escribo los textos a partir de una entrevista de una hora",
      "Selecciono imágenes de banco con licencia comercial",
      "Defino la estructura y la jerarquía de cada sección",
    ],
    excludes: [
      "Fotografía original: no soy fotógrafo, y te recomiendo a alguien",
      "Diseño de logotipo o manual de identidad",
      "Redacción de textos legales, que requiere criterio profesional",
    ],
  },
};
