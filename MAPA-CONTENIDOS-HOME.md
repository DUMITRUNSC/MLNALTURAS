# Mapa de contenidos de la home — Fase 0

Fecha: 22/09/2026 · Proyecto: `~/Desktop/mlnweb` (Next.js) · Estado: **pendiente de revisión por Dimitri**

Este documento es la referencia para ejecutar las fases 1, 2 y 3. Quien lo ejecute (persona o modelo) no tiene que decidir nada: cada bloque dice qué se queda en la home, qué se va a una página nueva, qué se borra y con qué texto. Los textos entre comillas son literales: se copian tal cual.

## 0. Decisiones que fijan todo lo demás

- La web pasa de una sola página a un **multipágina ligero**: home + `/administradores` + `/arquitectos` + `/zonas`. Las páginas legales y `/trabaja-con-nosotros` no cambian.
- **Tres copys son intocables**: «Tu edificio tiene un problema. Nosotros sabemos cómo llegar.», «Tú respondes ante la comunidad. Nosotros respondemos ante ti.» y «Cinco pasos. Ninguna improvisación.»
- **Cada dato se dice una sola vez en la home.** Los 20 años, la supervisión del gerente, las 24–48 h y la visita gratuita viven en la franja de confianza y en ningún otro sitio de la home. Las zonas viven en la sección de zonas y en el pie, no en Contacto.
- **Nada inventado.** Sin reseñas hasta que exista la ficha de Google, sin obras hasta que haya tres reales con foto, sin cifras que parezcan estadística («100 %», «0 €»).
- **Una foto por sitio** (`lib/fotos.ts`). Las páginas nuevas no reutilizan fotos de la home; hasta la sesión de fotos van sin imagen, como ya hace la sección de arquitectos.
- No se tocan tokens, tipografías ni el sistema de botones (`Boton.tsx`). Se reutilizan los componentes existentes.

## 1. Arquitectura final de la home

| # | Sección | Componente | Cambio |
|---|---------|------------|--------|
| 1 | Hero | `Hero.tsx` | Subtítulo y CTAs (fase 1) |
| 2 | Franja de confianza | `TrustBar.tsx` | 2×2 en móvil (fase 1) |
| 3 | Servicios | `Services.tsx` | Línea «También resolvemos» y aire en móvil (fase 1) |
| 4 | CTA azul | `CTABlock.tsx` | **Se mueve aquí** desde el final, botón a WhatsApp (fase 1) |
| 5 | Administradores (teaser) | `Administradores.tsx` | Se recorta a titular + párrafo + enlace + foto (fase 2) |
| 6 | Arquitectos (teaser) | `Arquitectos.tsx` | Se recorta a titular + párrafo + enlace (fase 2) |
| 7 | Obras | `Obras.tsx` | Sigue oculto hasta tener tres obras reales (fase 4) |
| 8 | Proceso | `Process.tsx` | Copy intacto; cinco columnas en escritorio (fase 3) |
| 9 | Empresa | `WhyMLN.tsx` | Copy nuevo, fuera las cifras (fase 1) |
| 10 | Reseñas | *(nuevo, futuro)* | Solo cuando haya ficha de Google con reseñas (fase 4) |
| 11 | Preguntas frecuentes | `Faq.tsx` | Sin cambios |
| 12 | Zonas (resumen) | `Zonas.tsx` | Se recorta a titular + párrafo + línea de municipios + enlace (fase 2) |
| 13 | Contacto | `Contact.tsx` | Fuera zonas, contador y cajetín; menos campos (fase 1) |
| — | Pie | `Footer.tsx` | Enlaces a páginas nuevas (fase 2) |

Orden en `app/page.tsx` cuando todo esté hecho:

```
<Hero /> <TrustBar /> <Services /> <CTABlock /> <Administradores /> <Arquitectos />
<Obras /> <Process /> <WhyMLN /> <Faq /> <Zonas /> <Contact />
```

Objetivo de altura: de ~15 pantallas de escritorio a 8–9.

## 2. Sección por sección

### 2.1 Hero (`components/Hero.tsx`) — fase 1

| Elemento | Ahora | Decisión |
|---|---|---|
| Etiqueta | «Trabajos verticales · Madrid» | Se queda |
| H1 | «Tu edificio tiene un problema. / Nosotros sabemos cómo llegar.» | Se queda, intocable |
| Subtítulo | «Reparamos fachadas, cubiertas y filtraciones en Madrid mediante trabajos verticales cuando son la solución más eficiente.» | **Sustituir** por: «Reparamos fachadas, cubiertas y filtraciones mediante trabajos verticales. Sin andamio cuando no hace falta.» |
| Botón primario | «Cuéntanos qué ocurre» → `#contacto` | **Sustituir** por «Pedir visita gratuita» → `#contacto` |
| Botón secundario | «Enviar fotos» → `#contacto` (mismo destino que el primario: error) | **Sustituir** por «Enviar fotos por WhatsApp» → `whatsappUrl("Hola, os escribo desde la web de MLN. Os mando fotos del problema.")`, con `target="_blank" rel="noopener noreferrer"` |
| «Madrid / a otra / altura» + coordenadas | Solo escritorio, en gris claro | Se queda como está (es secundario, no compite) |
| «MLN / 01» | Cota en la esquina | Se queda |

Móvil: el orden actual (texto arriba, banda de foto abajo) **se mantiene**. No poner la foto primero: sacaría el H1 de la primera pantalla. Comprobar que en un viewport de 390×844 se ven etiqueta, H1, subtítulo y el botón primario sin hacer scroll.

Escritorio: no añadir rótulos superpuestos en la foto («20 años de oficio», etc.): la franja de confianza está justo debajo.

### 2.2 Franja de confianza (`components/TrustBar.tsx`) — fase 1

Textos: se quedan los cuatro tal cual («20 años de oficio en altura», «Supervisión directa del gerente», «Primera respuesta en 24–48 h», «Visita técnica gratuita»).

Maquetación: en móvil y tableta, `grid grid-cols-2` con `gap-y-3` (ahora el cuarto dato se descuelga solo a una segunda línea, incluso a 1190 px). En `lg` se queda la fila. Sin iconos, sin cajas, sin números gigantes: es texto en `.eyebrow`, como ahora.

### 2.3 Servicios (`components/Services.tsx`, `lib/servicios.ts`) — fase 1

- Etiqueta, H2 («Qué podemos reparar / en tu edificio.»), párrafo lateral y los seis servicios con sus descripciones: **se quedan sin cambiar una palabra**. Las descripciones actuales son más precisas que las alternativas propuestas («sellado de juntas, reposición de mortero» dice más que «juntas, mortero»).
- Índice + foto con marcadores en escritorio: se queda.
- Móvil: reducir el aire de cada fila de `py-7` a `py-5` y el tamaño del título de `--d-1` a `--t5` (o el paso inmediatamente inferior de la escala). La descripción se muestra entera, sin acordeón: es contenido que lee Google.
- Párrafo final «También resolvemos humedades por fachada, limpieza técnica de cristaleras y placas solares, antigraffiti y mantenimiento preventivo. ¿No ves tu problema? Envíanos unas fotos →»: **sustituir** por una sola banda de una línea, separada por filete arriba:

  > **¿No encuentras tu problema?** <span class="tecnico">Humedades · Cristaleras · Placas solares · Antigraffiti · Mantenimiento</span> — Envíanos unas fotos →

  El enlace va a WhatsApp (mismo `whatsappUrl` que el hero), no a `#contacto`.

### 2.4 CTA azul (`components/CTABlock.tsx`) — fase 1

- **Se mueve** en `app/page.tsx` de después de `<Faq />` a después de `<Services />`. Razón: al final estaba pegado al formulario (dos llamadas a la acción seguidas); a mitad de página llega cuando el visitante ya sabe si le encaja.
- Etiqueta «Primera valoración clara · Madrid», H2 «Enséñanos el problema. / Te diremos cómo abordarlo.»: se quedan.
- Enlace: «Enviar fotos del problema» → **sustituir** por «Enviar fotos por WhatsApp» → `whatsappUrl(...)` (misma URL que el hero). Debajo, en texto pequeño: «O pide una visita técnica gratuita →» → `#contacto`.

### 2.5 Administradores (`components/Administradores.tsx`) — fase 2

En la home se queda solo el teaser:

- Etiqueta «Administradores de fincas».
- H2 «Tú respondes ante la comunidad. / Nosotros respondemos ante ti.» (intocable).
- Párrafo nuevo: «Un interlocutor, presupuesto por escrito que aguanta la junta y obra documentada de principio a fin. Sin centralitas ni cambios a mitad de obra.»
- Enlace: «Cómo trabajamos con administradores →» → `/administradores`.
- Foto `fotos.administradores` (se queda en la home).

**Se van a `/administradores`** (sin borrar nada): el párrafo «Gestionas varias fincas y el problema no suele ser la obra: es el proveedor que no responde, el presupuesto que cambia a mitad de obra y la documentación que se retrasa.», los cuatro puntos numerados (01 Un interlocutor, no una centralita · 02 Presupuesto que aguanta la junta · 03 Subsanación de deficiencias de la ITE · 04 Obra documentada de principio a fin, con sus descripciones actuales), el bloque «ITE en Madrid» con su texto, y el enlace «Pedir visita para una finca».

Recomendación de implementación: sacar `puntos` y el texto de ITE a `lib/administradores.ts` para que la página y el teaser lean del mismo sitio.

### 2.6 Arquitectos (`components/Arquitectos.tsx`) — fase 2

Teaser en la home:

- Etiqueta «Arquitectos e ingenierías».
- H2 «El equipo de campo / que ejecuta lo que proyectas.» (se queda literal).
- Párrafo nuevo: «Contrata especializada en altura para inspección, toma de datos y ejecución, con la documentación que necesita la dirección de obra.»
- Enlace: «Trabajar con MLN →» → `/arquitectos`.
- Sin foto (como ahora).

**Se van a `/arquitectos`**: el párrafo «Entramos como contrata especializada en altura dentro de tu obra, o como apoyo puntual para llegar a lo que no se inspecciona desde el suelo.», los cuatro bloques (01 Acceso para inspección y toma de datos · 02 Ejecución fiel al proyecto · 03 Documentación para la dirección de obra · 04 Coordinación de seguridad y salud, con sus descripciones actuales), y los enlaces «Enviar proyecto o mediciones» (`/?perfil=arquitecto#contacto`) y «Llámanos: 643 08 60 71».

Mismo patrón: `bloques` a `lib/arquitectos.ts`.

### 2.7 Zonas (`components/Zonas.tsx`, `lib/zonas.ts`) — fase 2

En la home, resumen:

- Etiqueta «Zonas de trabajo».
- H2 «Madrid y Comunidad. / Para obras completas, llegamos más lejos.» (se queda).
- Párrafo «Trabajamos en Madrid capital y toda la Comunidad. Para intervenciones de mayor alcance, valoramos otros destinos antes de confirmar la visita.» (se queda).
- Línea en `.tecnico`: «Madrid · Alcobendas · San Sebastián de los Reyes · Pozuelo · Majadahonda · Las Rozas · Getafe · Leganés · Fuenlabrada · Alcalá de Henares · Corredor del Henares».
- Enlace: «Ver zonas de trabajo →» → `/zonas`. El enlace «Dinos dónde está el edificio» se va a la página.

**Se van a `/zonas`**: las seis zonas con su descripción (`lib/zonas.ts` ya es la fuente única; no se toca) y la frase de cierre «Antes de confirmar una visita, te decimos si podemos atenderla y en qué condiciones.»

Posición en la home: **después de FAQ y antes de Contacto**. Es información de comprobación («¿llegan a mi pueblo?»), no de persuasión; va cerca del formulario.

### 2.8 Proceso (`components/Process.tsx`) — fase 3

- Etiqueta, H2 «Cinco pasos. / Ninguna improvisación.», párrafo y los cinco pasos con sus notas: **sin tocar una palabra**.
- Escritorio: los cinco pasos en **cinco columnas visibles a la vez** sobre el fondo negro actual, número grande arriba, título, descripción y nota abajo. **Sin pestañas ni clic**: los cinco textos son de lo mejor de la web y esconder cuatro para enseñar uno es perder.
- Móvil: vertical como ahora, reduciendo el aire entre pasos aproximadamente a la mitad.

### 2.9 Empresa (`components/WhyMLN.tsx`) — fase 1

| Elemento | Ahora | Decisión |
|---|---|---|
| Etiqueta | «La empresa» | Se queda |
| H2 | «20 años de oficio. / Cada proyecto, supervisado de cerca.» | **Sustituir** por «20 años de oficio. / Cada obra, supervisada de cerca.» |
| Párrafo 1 | «MLN Construcciones en Altura S.L. es una empresa madrileña especializada en trabajos verticales y rehabilitación de edificios. Su gerente acumula 20 años de oficio en altura: trabajó 17 años como autónomo antes de poner en marcha MLN.» | **Sustituir** por: «MLN Construcciones en Altura S.L. es una empresa madrileña de trabajos verticales y rehabilitación de edificios. Antes de crearla, su gerente pasó 17 años trabajando como autónomo en rehabilitación y trabajos en altura.» |
| Párrafo 2 | «Hoy supervisa personalmente todos los proyectos, desde la visita y el diagnóstico hasta la ejecución y la entrega. Así se mantiene un criterio técnico único y el cliente sabe quién responde.» | **Sustituir** por: «Hoy supervisa personalmente cada obra, desde la primera visita hasta la entrega. Una persona responsable del proyecto. Un criterio de principio a fin.» |
| Cifras 20 / 100 % / 24–48 h | `dl` de tres cifras | **Borrar** entero (ya están en la franja de confianza; «100 %» parece estadística) |
| Foto | `fotos.empresa` (operario en ladrillo) | Se queda hasta la fase 4; entonces se sustituye por una foto real del gerente en obra |

Las cifras siguen saliendo de `site.añosOficio` y `site.añosAutonomo`; no escribir «20» ni «17» a mano.

### 2.10 Preguntas frecuentes (`components/Faq.tsx`) — sin cambios

Se quedan las nueve. Plegadas ocupan unos 40 px cada una; quitar cuatro ahorra 160 px y pierde marcado `FAQPage`. La respuesta a «¿Quién paga la obra…?» ya es prudente («Depende de la naturaleza del elemento y de los estatutos… debe confirmarlo la administración de la finca»): se queda como está.

Las páginas nuevas pueden mostrar un subconjunto de estas preguntas, pero **sin** repetir el `FAQPage` JSON-LD: ese marcado se queda solo en la home.

### 2.11 Contacto (`components/Contact.tsx`) — fase 1

Columna izquierda:

- Etiqueta, H2 «El primer paso / es subir a verlo.», los dos párrafos y los tres canales (Llamar / WhatsApp / Email) con su QR: se quedan.
- Bloque «Zonas de trabajo» con la lista de municipios: **borrar** (ya está en Zonas y en el pie).

Formulario (`Lamina` / `Bloque` / `Cajetin` en `components/campos.tsx`):

- Título «Solicitud de visita técnica» y referencia «MLN · VT / HOJA 01»: se quedan (el marco es lo más reconocible del diseño y no cuesta conversión).
- Contador «0/2» del bloque 01: **borrar** (no significa nada para quien rellena).
- Cajetín final DOCUMENTO · ZONA · FECHA · RESPUESTA: **borrar** los cuatro. Si se quiere conservar el argumento, una línea de texto bajo el botón: «Respondemos en 24–48 h laborables.» (ya existe «La visita técnica no se cobra, y de ella sale el presupuesto por escrito.»; se puede fundir en una frase).
- Campo Email: **borrar** del formulario (el canal Email sigue en la columna izquierda; MLN llama por teléfono). Quitar también su validación en `useFormulario` y su línea en `resumen()` y en `enviarPorServidor`.
- Campos que se quedan, en este orden: Bloque 01 «Quién eres» → Nombre*, Teléfono*, Escribes como (chips). Bloque 02 «El edificio» → Dirección o zona, ¿Qué ocurre?, Fotos/informe/ITE. Consentimiento. Botones «Solicitar visita técnica» y «Enviar por WhatsApp».
- La preselección por `?perfil=` se mantiene: la usan los enlaces de `/administradores` y `/arquitectos`.

Móvil: el orden actual (canales primero, formulario después) es el correcto; comprobar que sigue así tras los cambios.

### 2.12 Cabecera y pie (`Header.tsx`, `Footer.tsx`) — fase 2

Cabecera escritorio: Servicios (`/#servicios`) · Administradores (`/administradores`) · Arquitectos (`/arquitectos`) · Zonas (`/zonas`) · Empresa (`/#empresa`) · Contacto (`/#contacto`) · Empleo (`/trabaja-con-nosotros`). El resaltado de sección activa, que hoy va por `id`, tiene que resaltar también por `pathname` en las páginas nuevas.

Menú móvil: mismos enlaces más Inicio y Preguntas frecuentes (`/#preguntas`).

Pie: Administradores, Arquitectos y Zonas de trabajo pasan a apuntar a las páginas. La línea de municipios del pie **se queda** (es la segunda y última aparición de las zonas).

### 2.13 Obras (`components/Obras.tsx`) — fase 4

Sigue montado y vacío. Se publica cuando haya tres fichas reales (título, zona, problema, solución, plazo, foto antes y después). Posición: entre `<Arquitectos />` y `<Process />`. Es la sección que más sube el nivel de la web y la única que no se puede escribir sin material.

## 3. Páginas nuevas (fase 2)

Las tres comparten estructura: `Header` → `Miga` (Inicio / Nombre de la página) → cabecera de página (etiqueta + H1 + párrafo) → contenido → bloque de cierre con CTA → `Footer` + `MobileCallBar`. Hay que añadir cada ruta a `app/sitemap.ts` (las fechas `lastModified` van a mano, no con `new Date()`; poner la del día de publicación y actualizar también la de la home, que cambia de contenido) y poner `alternates.canonical` en su `metadata`. Sin `FAQPage` JSON-LD en ninguna de ellas.

### 3.1 `/administradores`

- `title`: «Trabajos verticales para administradores de fincas en Madrid | MLN»
- `description`: «Un interlocutor, presupuesto por escrito que aguanta la junta y obra documentada de principio a fin. Subsanación de ITE. Visita técnica gratuita en Madrid y Comunidad.»
- Etiqueta: «Administradores de fincas»
- H1: «Tú respondes ante la comunidad. / Nosotros respondemos ante ti.»
- Intro: «Gestionas varias fincas y el problema no suele ser la obra: es el proveedor que no responde, el presupuesto que cambia a mitad de obra y la documentación que se retrasa.»
- Los cuatro puntos numerados actuales, con sus descripciones literales.
- Bloque «ITE en Madrid» con su texto actual.
- Enlace a proceso: «Cómo trabajamos: cinco pasos, ninguna improvisación →» → `/#proceso`.
- Preguntas (tres, sin JSON-LD): «¿Quién es el interlocutor durante la obra?», «La ITE de nuestro edificio ha salido desfavorable. ¿Podéis ejecutar las obras?», «¿Quién paga la obra, la comunidad o el propietario?» — con las respuestas de `faqs`.
- Cierre: H2 «Una finca, un interlocutor.» + «Pedir visita para una finca →» → `/?perfil=administrador#contacto` + teléfono.
- Sin foto hasta la fase 4.

### 3.2 `/arquitectos`

- `title`: «Contrata de trabajos verticales para arquitectos e ingenierías | MLN Madrid»
- `description`: «Equipo de campo especializado en altura: acceso para inspección y toma de datos, ejecución fiel al proyecto, documentación para la dirección de obra y plan de seguridad específico.»
- Etiqueta: «Arquitectos e ingenierías»
- H1: «El equipo de campo / que ejecuta lo que proyectas.»
- Intro: «Entramos como contrata especializada en altura dentro de tu obra, o como apoyo puntual para llegar a lo que no se inspecciona desde el suelo.»
- Los cuatro bloques actuales, con sus descripciones literales.
- Enlace a proceso: igual que en administradores.
- Cierre: H2 «Envíanos el proyecto o las mediciones.» + párrafo «Con el proyecto, las mediciones o unas fotos del punto a intervenir preparamos la propuesta. Si hace falta subir a verlo, la visita no se cobra.» + «Enviar proyecto o mediciones →» → `/?perfil=arquitecto#contacto` + «Llámanos: 643 08 60 71» + `mailto:` a `site.email`.
- Sin foto (decisión de diseño existente).

### 3.3 `/zonas`

- `title`: «Zonas de trabajo: trabajos verticales en Madrid y Comunidad | MLN»
- `description`: «Trabajos verticales y rehabilitación en Madrid capital, Alcobendas, San Sebastián de los Reyes, Pozuelo, Majadahonda, Las Rozas, Getafe, Leganés, Fuenlabrada, Alcalá de Henares y resto de la Comunidad.»
- Etiqueta: «Zonas de trabajo»
- H1: «Madrid y Comunidad. / Para obras completas, llegamos más lejos.»
- Intro: el párrafo actual de Zonas.
- Las seis zonas de `lib/zonas.ts` con la retícula actual (filete, número, nombre, descripción).
- Frase de cierre: «Antes de confirmar una visita, te decimos si podemos atenderla y en qué condiciones.»
- Cierre: «Dinos dónde está el edificio →» → `/#contacto` + teléfono.
- Nota para más adelante: cuando haya obras publicadas, cada zona puede tener su propia página (`/zonas/getafe`, etc.) con las obras de esa zona. Hoy no, porque no habría nada que decir que no esté ya en la descripción.

## 4. Reparto por fases (lista de ejecución)

### Fase 1 — recorte de la home, sin páginas nuevas

1. `Hero.tsx`: subtítulo, dos botones (2.1).
2. `TrustBar.tsx`: `grid-cols-2` en móvil (2.2).
3. `Services.tsx`: aire en móvil y banda «¿No encuentras tu problema?» (2.3).
4. `CTABlock.tsx`: botón a WhatsApp + enlace secundario; `page.tsx`: mover tras `<Services />` (2.4).
5. `WhyMLN.tsx`: H2, dos párrafos, borrar `cifras` (2.9).
6. `Contact.tsx` + `campos.tsx`: borrar bloque de zonas, contador, cajetín y campo email; reordenar campos (2.11).
7. Comprobar: `npm run build` sin errores, `npx biome check`, home en 390 px y 1440 px, ambos temas (claro/oscuro), los dos huecos grises que salían en la captura (foto de ITE en Administradores y foto de Empresa) se ven.

### Fase 2 — páginas nuevas

1. `lib/administradores.ts` y `lib/arquitectos.ts` con los puntos/bloques.
2. `app/administradores/page.tsx`, `app/arquitectos/page.tsx`, `app/zonas/page.tsx` (3.1–3.3), con `metadata`, `Miga` y sitemap.
3. Teasers en `Administradores.tsx`, `Arquitectos.tsx`, `Zonas.tsx` (2.5–2.7); `page.tsx`: `<Zonas />` pasa a ir entre `<Faq />` y `<Contact />`.
4. `Header.tsx` y `Footer.tsx` (2.12).
5. Comprobar: las tres páginas en móvil y escritorio, `?perfil=` preselecciona en el formulario al llegar desde cada página, sitemap lista las tres rutas, ningún enlace a `/#administradores`, `/#arquitectos` ni `/#zonas` queda roto (los ids de los teasers pueden mantenerse para que los anclas antiguos sigan funcionando).

### Fase 3 — proceso y móvil

1. `Process.tsx`: cinco columnas en `lg`, vertical compacto en móvil (2.8).
2. Pasada de espaciados en móvil, sección por sección, con el criterio «una idea por pantalla». Medir la altura total de la home a 390 px antes y después y anotarla en este documento.

### Fase 4 — depende de material de Constantin

Lista de fotos para una sesión de un día en obra real (una foto por hueco, formato indicado):

| Hueco | Qué fotografiar | Formato |
|---|---|---|
| Hero | Operario MLN descolgado en fachada con Madrid al fondo | Horizontal 16:9 |
| Empresa | Retrato del gerente en obra, con equipo y cuerda, mirando a cámara | Vertical 4:5 |
| Obras ×3 | Antes y después de tres intervenciones reales (fachada, cubierta o filtración, patio) | Mismo encuadre antes/después |
| `/administradores` | Portal o patio de una finca real intervenida | Horizontal |
| Proceso | Gerente inspeccionando una fachada desde la cuerda (paso 01) y equipo ejecutando (paso 04) | Horizontal |
| Detalle | Anclaje, cuerda y EPI, de cerca | Cuadrado |

Además: tres fichas de obra con título, zona, problema, solución y plazo; ficha de Google Business de MLN dada de alta y las primeras reseñas de clientes ya contratados. Con eso se publican `Obras.tsx` y una sección de reseñas después de Empresa (tres reseñas, nombre o rol, sin inventar ninguna).

## 5. Reglas para quien ejecute

- Los textos de este documento se copian literales; no se «mejoran».
- Nada de tarjetas con sombra, iconos de casco, degradados ni estadísticas: la dirección de marca está en `branding/MLN-direccion-de-marca.md`.
- Las cifras salen siempre de `lib/site.ts`; las zonas de `lib/zonas.ts`; los servicios de `lib/servicios.ts`; las fotos de `lib/fotos.ts`.
- Leer `node_modules/next/dist/docs/` antes de crear rutas: esta versión de Next tiene cambios respecto a lo habitual (`AGENTS.md`).
- Cada fase termina con `npm run build` limpio y una captura de la home completa en `screenshots/` con el nombre de la fase.
