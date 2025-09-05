# Guía técnica de optimización de velocidad (ALENIA)

Esta guía describe, paso a paso, cómo implementar mejoras de rendimiento en la web sin alterar el diseño ni la estructura visual. Está basada en buenas prácticas de Lighthouse y web.dev, y referenciada con fuentes oficiales.

Objetivos medibles:
- LCP < 2.5 s, CLS < 0.1, INP/TBT bajos
- Reducción de KB transferidos y número de solicitudes críticas
- Mejora de la puntuación Lighthouse Performance

---

## 1) Imágenes responsivas + formatos modernos (WebP/AVIF)

Archivos afectados: `src/pages/Home.jsx`, `src/pages/Blog.jsx`, `src/pages/BlogPostPage.jsx`, `src/components/blog/BlogCard.jsx`, `src/components/blog/RelatedPosts.jsx`, y cualquier otra página con `<img>`.

Acciones:
1. Generar variantes responsivas (p. ej., 320/640/1280/1920 px) en formato WebP y mantener fallback JPG/PNG cuando sea necesario.
2. En imágenes no críticas (no LCP), añadir `loading="lazy"` y `decoding="async"`.
3. Siempre definir `width` y `height` para evitar CLS.
4. Añadir `srcSet` y `sizes` para entregar el tamaño adecuado por viewport.

Ejemplos:
- Imagen LCP (Home):
```jsx
<img
  src="/images/5-3_1280.webp"
  srcSet="/images/5-3_640.webp 640w, /images/5-3_1280.webp 1280w, /images/5-3_1920.webp 1920w"
  sizes="(max-width: 768px) 100vw, 1280px"
  width="1280" height="720"
  fetchPriority="high"
  decoding="async"
  alt="Alen.iA Logo"
/>
```
- Imágenes no críticas (cards del blog, relacionados, etc.):
```jsx
<img
  src="/images/post_640.webp"
  srcSet="/images/post_320.webp 320w, /images/post_640.webp 640w"
  sizes="(max-width: 768px) 100vw, 640px"
  width="640" height="360"
  loading="lazy"
  decoding="async"
  alt="Título del post"
/>
```

Referencias:
- [Imágenes responsivas (Lighthouse)](https://developer.chrome.com/docs/lighthouse/performance/uses-responsive-images?hl=es-419)
- [Usa WebP/AVIF (Lighthouse)](https://developer.chrome.com/docs/lighthouse/performance/uses-webp-images?hl=es-419)

---

## 2) Priorizar el LCP y reducir cadenas críticas

Archivos afectados: `src/pages/Home.jsx`, `src/pages/BlogPostPage.jsx`, `src/services/seoService.js`.

Acciones:
1. En la imagen LCP (Hero), usar `fetchPriority="high"` y `decoding="async"` (ver ejemplo anterior) y NO `loading="lazy"`.
2. Preload de la imagen LCP y recursos críticos desde `seoService.preloadCriticalResources()` usando `<link rel="preload" as="image">`.
3. Preconnect a orígenes externos (si aplica, ej. fuentes/CDN).

Ejemplo minimal en `seoService.preloadCriticalResources()`:
```js
preloadCriticalResources() {
  if (typeof document === 'undefined') return;
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = '/images/5-3_1280.webp'; // LCP estimado
  document.head.appendChild(link);

  // Ejemplo: preconectar CDN (si aplica)
  // const preconnect = document.createElement('link');
  // preconnect.rel = 'preconnect';
  // preconnect.href = 'https://cdn.tu-dominio.com';
  // preconnect.crossOrigin = 'anonymous';
  // document.head.appendChild(preconnect);
}
```

Referencias:
- [Evita cadenas de solicitudes críticas](https://developer.chrome.com/docs/lighthouse/performance/critical-request-chains?hl=es-419)
- [Critical path y recursos que bloquean render](https://web.dev/learn/performance/understanding-the-critical-path?hl=es-419#render-blocking_resources)

---

## 3) Lazy load de librerías y componentes no críticos

Archivos afectados: `src/pages/BlogPostPage.jsx` (y cualquier página que use librerías pesadas).

Acciones:
1. Cargar `react-share` bajo demanda (cuando el bloque de compartir entra al viewport o al hacer click).
2. Cargar `react-markdown` con `lazy()` si sólo se usa en detalle de post.

Patrón con import dinámico en `BlogPostPage.jsx`:
```jsx
// Sustituir imports directos de react-share por carga diferida
// import { LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';

import { useEffect, useState } from 'react';

function ShareButtons({ postUrl, title, excerpt }) {
  const [mod, setMod] = useState(null);
  useEffect(() => { import('react-share').then(setMod); }, []);
  if (!mod) return null;
  const { LinkedinShareButton, TwitterShareButton, WhatsappShareButton } = mod;
  return (
    <>
      <TwitterShareButton url={postUrl} title={title} />
      <LinkedinShareButton url={postUrl} title={title} summary={excerpt} />
      <WhatsappShareButton url={postUrl} title={title} />
    </>
  );
}
```

Para `react-markdown`, si no es usado en otras rutas, considera `const ReactMarkdown = React.lazy(() => import('react-markdown'));` y render condicional con `<Suspense>`.

---

## 4) Prefetch de rutas perezosas y módulos en idle/hover

Archivos afectados: `src/App.jsx`, `src/hooks/useLazyPreload.js`, componentes con `<Link>` a rutas lazy (ej. `Blog.jsx`).

Acciones:
1. En `App.jsx`, agenda prefetch de rutas con `requestIdleCallback` después del primer render (ej.: Blog, Services, Apps):
```jsx
useEffect(() => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      import('./pages/Blog');
      import('./pages/Services');
      import('./pages/Apps');
    });
  }
}, []);
```
2. Enlaces: al hacer hover sobre un `<Link>` a una ruta lazy, dispara un prefetch (`import()` del módulo) desde `useLazyPreload`.

Referencias:
- [Evita encadenar solicitudes críticas](https://developer.chrome.com/docs/lighthouse/performance/critical-request-chains?hl=es-419)

---

## 5) Evitar redirecciones internas

Archivo afectado: `src/pages/Apps.jsx`.

Acción:
- Cambiar el CTA del final de `"/contact"` a `"/contacto"` para evitar hops intermedios que afectan LCP.

Referencias:
- [Evita redireccionamientos](https://developer.chrome.com/docs/lighthouse/performance/redirects?hl=es-419)

---

## 6) Terceros pesados: “facade” para Google Maps

Archivo afectado: `src/pages/Contact.jsx`.

Acciones:
1. Reemplazar el `<iframe>` embebido por un “facade”: una imagen estática o un contenedor con botón “Cargar mapa”.
2. Al hacer click, montar dinámicamente el `<iframe>` (o al entrar a viewport con `IntersectionObserver`).

Patrón:
```jsx
const [showMap, setShowMap] = useState(false);

<div className="aspect-w-16 aspect-h-9 bg-brand-primary rounded-2xl overflow-hidden border border-brand box-shadow-card glow-btn">
  {!showMap ? (
    <button onClick={() => setShowMap(true)} className="w-full h-full text-white">
      Cargar mapa
    </button>
  ) : (
    <iframe src="..." width="100%" height="100%" loading="lazy" style={{ border: 0 }} />
  )}
</div>
```

Impacto: reduce bytes y ejecución de terceros en la primera carga.

---

## 7) Componente utilitario opcional: `SmartImage`

Propósito: centralizar buenas prácticas (`loading`, `decoding`, `width/height`, `srcSet/sizes`, `fetchPriority`). No cambia diseño; sólo encapsula `<img>`.

Esqueleto:
```jsx
export default function SmartImage({ src, alt, width, height, srcSet, sizes, priority = false, ...rest }) {
  const props = {
    src,
    alt,
    width,
    height,
    decoding: 'async',
    loading: priority ? undefined : 'lazy',
    fetchPriority: priority ? 'high' : undefined,
    srcSet,
    sizes,
    ...rest,
  };
  return <img {...props} />;
}
```

Uso: LCP con `priority`, resto sin.

---

## 8) Entrega y caché (infraestructura)

Servidor/CDN:
- Habilitar Brotli y Gzip.
- `Cache-Control: public, max-age=31536000, immutable` para assets con hash; TTL menor para HTML.
- Servir imágenes desde CDN si es posible.

Build (Vite):
- Minificación y treeshaking.
- Split de vendor en chunks (por defecto ya divide en lazy routes).

Referencia:
- [Hostinger: Speed up WordPress (lecciones generales aplicables)](https://www.hostinger.com/tutorials/speed-up-wordpress?_gl=1*19s0f5u*_gcl_aw*R0NMLjE3NTQyMjI0NzcuQ2p3S0NBandrYnpFQmhBVkVpd0E0Vi15cWwxNFF3cXM3cXFaMFJMN3FKM3BFUkN1Zlk0a24tRVpLSUczZFVhZ3FUMUJwa1h5ZFBtdXFSb0NFS1FRQXZEX0J3RQ..*_gcl_au*MTI1OTgwMDcwMy4xNzUzMjQ2MTkzLjE5MDcxMzEwNi4xNzU1MjMwODY3LjE3NTUyMzA4NjY.*_ga*MTIwMTU2MDI5NC4xNzUzMjQ2MTkz*_ga_73N1QWLEMH*czE3NTUzNzQxODIkbzM5JGcxJHQxNzU1Mzc0Mjc4JGo0OSRsMCRoNjE5ODEyMDMx)

---

## 9) Medición y verificación

Acciones:
- Ejecutar Lighthouse/PSI en Home, Blog (listado y detalle) y Contacto.
- Revisar específicamente:
  - “Cadenas de solicitudes críticas”
  - “Imágenes responsivas”
  - “Entregar imágenes en formatos modernos”
  - “Evitar redirecciones”
- Instrumentar Web Vitals en `performanceService` (LCP/CLS/INP) y loggear en dev para validar impacto.

Referencias:
- [Critical request chains](https://developer.chrome.com/docs/lighthouse/performance/critical-request-chains?hl=es-419)
- [Imágenes responsivas](https://developer.chrome.com/docs/lighthouse/performance/uses-responsive-images?hl=es-419)
- [Render-blocking / Critical path](https://web.dev/learn/performance/understanding-the-critical-path?hl=es-419#render-blocking_resources)
- [Redirecciones](https://developer.chrome.com/docs/lighthouse/performance/redirects?hl=es-419)
- [WebP/AVIF](https://developer.chrome.com/docs/lighthouse/performance/uses-webp-images?hl=es-419)

---

## 10) Checklist de implementación

- [ ] Variantes WebP (y fallback) + `srcSet/sizes` en todas las imágenes
- [ ] `loading="lazy"` y `decoding="async"` en imágenes no críticas
- [ ] LCP sin lazy + `fetchPriority="high"` y preload en `seoService`
- [ ] Prefetch de rutas lazy en idle/hover
- [ ] Evitar redirecciones internas (`/contacto`)
- [ ] Facade de Google Maps en `Contact.jsx`
- [ ] (Opcional) `SmartImage` para estandarizar
- [ ] CDN + compresión + caché de estáticos
- [ ] Validación con Lighthouse (LCP/CLS/INP) y ajuste fino

---

Notas finales:
- Estas mejoras no alteran la UI ni el diseño; sólo optimizan el transporte y la ejecución.
- Aplicar primero en Home (impacto en LCP), luego Blog y Contacto (terceros), y finalmente el resto.
