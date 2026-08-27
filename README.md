# galarraga.dev

Portafolio y sitio comercial de **David Galarraga**, desarrollador web.

Construido desde cero, sin plantillas: el concepto de marca es una cafetería de
especialidad, y esa metáfora baja hasta la estructura del layout en lugar de
quedarse en los títulos.

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS 4

---

## Decisiones técnicas

Las que explican por qué el código es como es.

### La carta resuelve dos audiencias en una sola fila

El sitio recibe dos públicos con intereses opuestos: quien contrata lee qué
resuelve el servicio, y quien evalúa el perfil escanea el stack. Una rejilla de
tarjetas obliga a priorizar a uno de los dos.

La solución es una carta de cafetería. Nombre a la izquierda, línea punteada,
"precio" a la derecha: cada lector toma lo que vino a buscar de la misma fila,
sin que ninguna columna quede relegada. La guía punteada es un `border-bottom`
sobre un separador flexible, no glifos repetidos, así que se mantiene nítida a
cualquier ancho y ningún lector de pantalla la narra.

### Contraste medido, no estimado

La paleta es cálida y oscura, y cada par de color se calculó con la fórmula de
luminancia relativa de WCAG antes de escribirlo:

| Uso | Ratio |
|---|---|
| Texto principal | 14.4:1 · AAA |
| Texto secundario | 8.9:1 · AAA |
| Acento ámbar | 7.7:1 · AAA |
| Etiquetas terciarias | 7.4:1 · AAA |

El color terciario se corrigió al descubrir que sostenía etiquetas de 12px:
declararlo "decorativo" no lo exime del umbral de texto pequeño.

### El movimiento tiene reglas, no improvisación

Curvas y duraciones salen de una tabla fija en `globals.css`. `ease-in` está
deliberadamente ausente de la interfaz: arranca lento y retrasa justo el
instante que el usuario está mirando.

Todas las animaciones usan solo `opacity` y `transform` —nunca propiedades que
disparen layout— y el sistema completo se apaga bajo `prefers-reduced-motion`,
incluido el scroll con inercia.

Los desplegables animan con `grid-template-rows: 0fr → 1fr`, que anima la
altura real del contenido sin medirla en JavaScript, sin `ResizeObserver` y sin
saltos cuando el texto se recompone.

### La calculadora publica un rango, no un precio

Una pregunta por pantalla, y la estimación aparece solo cuando están todas las
respuestas: un número que cambia mientras el visitante todavía decide se lee
como una tragamonedas, no como un presupuesto. Volver atrás nunca borra una
respuesta.

El resultado es un rango con su descargo explícito. Los productos de precio
cerrado cortocircuitan el cálculo y saltan al formulario, porque preguntar por
alcance y plazo sobre una auditoría de alcance fijo no tiene sentido.

### El formulario valida dos veces

La validación del cliente es una comodidad para quien actúa de buena fe; no es
una defensa, porque cualquiera puede hacer `POST` directo al endpoint. El
servidor vuelve a validar todo e incorpora un campo trampa para bots, que
responde `200` para no enseñarle al bot que fue detectado.

Sin configuración de envío responde `503` y ofrece el correo directo, en lugar
de fingir que el mensaje salió.

### Sin librería de componentes, a propósito

Cada pieza —la fila de carta, el asistente, la cabecera— es a medida. Añadir
shadcn/ui habría estampado sus tokens sobre una paleta calculada a mano para
entregar un botón de treinta líneas.

---

## Estructura

```
src/
├─ app/            rutas, layout y el endpoint de la comanda
├─ components/     interfaz; sections/ agrupa los bloques de la home
├─ content/        TODO el texto, los precios y el alcance comercial
└─ lib/            utilidades
```

Todo el contenido visible vive en `src/content`. Editar el sitio no requiere
tocar JSX.

| Archivo | Qué contiene |
|---|---|
| `content/site.ts` | Copy, proyectos, stack, preguntas frecuentes |
| `content/pricing.ts` | Productos, multiplicadores y cálculo del rango |
| `content/scope.ts` | Qué incluye y qué no incluye cada servicio |

---

## Desarrollo

```bash
npm install
npm run dev
```

Para activar el envío de la comanda, copia la plantilla y complétala:

```bash
cp .env.example .env.local
```

Las instrucciones están dentro del propio archivo. Sin esas variables el
formulario valida y luego rechaza con honestidad, ofreciendo el correo directo.

```bash
npm run build        # compilación de producción
npx eslint src       # análisis estático
```

---

© David Galarraga
