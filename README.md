# CEPROC Landing

Migración de la landing de CEPROC de PHP nativo a Astro.

## Estado

- **Fase 0:** inicialización del proyecto — completada.
- **Fase 1:** esqueleto Astro y layout base — pendiente.
- **Fase 2:** assets y sistema visual — pendiente.
- **Fases posteriores:** secciones, interacciones, contenido, multidioma, formulario, SEO y deploy.

## Stack

- Astro + TypeScript.
- Bootstrap 5 + CSS heredado en la primera etapa.
- npm como gestor de paquetes.

## Requisitos

- Node.js >= 22.
- npm >= 10.

Entorno verificado: Node v26.13.1, npm 11.20.0.

> Nota: Node está instalado en `C:\Program Files\nodejs`. Si una terminal no lo reconoce, hay que reiniciar esa sesión o agregar esa ruta al `PATH`.

## Comandos

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Rutas

- `/` redirige a `/es/`.
- `/es/` versión en español.
- `/en/` se agregará en la fase de multidioma.

## Referencia visual

`C:\xampp\htdocs\ceproc` es solo una referencia visual y de contenido. No se modifica.

## Decisiones de la Fase 0

- Migración visual 1:1, sin rediseño en esta etapa.
- Bootstrap 5 + CSS heredado para reducir regresiones visuales.
- El contenido actual se migra tal cual; la optimización se hace en la Fase 7.
- El formulario se muestra deshabilitado hasta la Fase 9.
- Git: rama `main`, commits locales. Todavía no hay remoto configurado.
