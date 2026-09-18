# MLN · Web con descenso continuo por la fachada

La cabecera y los cuatro capítulos de recorrido usan una misma fotografía continua de Madrid. Al hacer scroll, la cámara avanza desde los técnicos en altura hasta la calle. Se conservan las demás secciones del proyecto existente.

## Abrir

Requiere Node.js y npm. En esta carpeta:

```sh
npm install
npm run dev
```

Abrir http://localhost:3001. No basta con abrir un archivo TSX haciendo doble clic: es un proyecto Next.js.

## Compilar

```sh
npm run build
npm run start -- -p 3001
```

## Archivos principales

- `components/FacadeScroll.tsx`: cámara vinculada al scroll, sin bloquearlo, medición adaptable y limpieza de observadores/eventos.
- `components/Hero.tsx`: cabecera inspirada en la referencia elegida.
- `components/Descenso.tsx`: capítulos legibles, de cubierta a calle.
- `app/globals.css`: composición móvil/escritorio y alternativa estática para movimiento reducido.
- `public/madrid-facade-continuous.jpg`: versión web comprimida; PNG conserva el máster generado.

## Antes de publicar

Esta entrega local no modifica la web publicada en Sites. Validar teléfono, correo, dominio, documentación, garantías y afirmaciones comerciales del proyecto existente. El teléfono `600 000 000` que había en esta carpeta es provisional; no debe usarse como contacto real. Formularios, contratación y posibles envíos deben revisarse por separado; este cambio no añade un backend ni activa recepción de candidaturas.

## Imagen y procedencia

Imagen conceptual creada con la herramienta integrada de generación de imágenes a partir de la referencia del usuario. No representa una obra ni un equipo reales de MLN. Se identifica en pantalla. La exportación JPEG solo comprime el máster, sin cambiar su composición.

Prompt utilizado:

> Edit target: attached clean Madrid facade photograph. Create one extra-tall continuous architectural photographic master, portrait ratio 1:2.5, for a web camera descending along the same building. The TOP 25 percent of the image must preserve the provided wide composition very closely: pale sky and Madrid skyline including ornate domed landmark left, modern pale stone facade right with two rope-access technicians in black clothing, white helmets and blue ropes. Extend DOWNWARD ONLY into several aligned lower floors of that same modern building, finally reaching a realistic clean sidewalk and entrance at the bottom. Same camera perspective and daylight throughout, consistent window grid, facade occupies right 45 percent across the entire image, left lower image reveals coherent neighboring Madrid architecture and street as altitude decreases. Do not repeat the technicians or duplicate skyline on lower levels. No horizontal seam, no montage, no website text, no UI, no logo overlays, no watermark. Photorealistic premium architectural conceptual image. Both upper technicians fully visible, no stretching.
