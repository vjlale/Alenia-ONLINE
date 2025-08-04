
# Copilot AI Agent Instructions for Alenia Website

## 🏗️ Arquitectura General
- **SPA React 18 + Vite**: Navegación sin recarga, rutas declaradas en `src/pages` y registradas en `App.jsx` usando `react-router-dom`.
- **Tailwind CSS**: Todos los estilos nuevos deben usar utilidades Tailwind (ver `globals.css` y `main.css`). No usar CSS inline ni archivos CSS externos salvo excepciones legacy.
- **Componentes reutilizables**: En `src/components` (subcarpetas: `common`, `landing`, `blog`, `apps`). Ejemplo: `CompetitorAnalyzer.jsx` en `apps`.
- **Capa de servicios**: Toda lógica de negocio y acceso a APIs debe ir en `src/services`. Los servicios son dummy por defecto, listos para integración real (ej: `analyticsService.js`, `seoService.js`).
- **Datos estáticos**: Configuración y blog en `src/data` (ej: `blogData.js`).
- **Hooks y utilidades**: Custom hooks en `src/hooks`, helpers en `src/utils`.
- **Assets**: Imágenes y logos en `public/images`.

## 🚦 Workflows de Desarrollo
- **Instalación**: `npm install`
- **Desarrollo local**: `npm run dev` (Vite, puerto 3001)
- **Build**: `npm run build` (output en `dist`)
- **Preview**: `npm run preview`
- **Deploy GitHub Pages**: `npm run deploy` (usa `gh-pages` y requiere configurar `base` en `vite.config.js`)
- **Deploy Hostinger**: Cambia `base` en `vite.config.js`, sube todo el contenido de `dist` y `.htaccess` para SPA routing. Verifica rutas y assets.
- **Validación**: No hay tests automáticos; validación manual por página/app.

## 📐 Convenciones y Patrones
- **Tailwind obligatorio**: Usa clases utilitarias, no dupliques estilos ni uses CSS inline.
- **Registro de rutas**: Toda página/app nueva debe agregarse en `App.jsx` en el bloque `<Routes>`. Ejemplo:
  ```jsx
  <Route path="/apps/analizador-competencia" element={<CompetitorAnalyzer />} />
  ```
- **Service Layer**: No hacer llamadas API directas en componentes UI; usa servicios. Ejemplo: `analyticsService.trackPageView()` en `App.jsx`.
- **Componentes modulares**: Cada app o feature debe ser un componente autocontenible en `components/apps` o `pages`.
- **Extensión de blog**: Añade posts en `data/blogData.js` y usa `BlogCard.jsx` para renderizado.
- **Integración externa**: Ver `AleniaGestionLanding.jsx` para integración con apps desktop.

## 🔗 Integraciones y Dependencias
- **Analytics/SEO/Performance/A-B**: Los servicios en `src/services` son dummy y deben reemplazarse por APIs reales según necesidad.
- **Apps conectadas**: ALENIA GESTIÓN (desktop), CRM Digital, N8N workflows, Email Marketing.
- **Tracking**: Google Analytics 4, Meta Pixel, Hotjar, Mailchimp (dummy por defecto, ver `analyticsService.js`).

## 🧩 Ejemplos clave y patrones
- **Card grid con Tailwind**: Ver `pages/Apps.jsx` para grillas de apps.
- **Landing custom**: Ver `pages/AleniaGestionLanding.jsx` para landings específicas.
- **Patrón de servicio**: Ver `services/analyticsService.js` para estructura de servicios desacoplados.
- **App modular**: Ver `components/apps/CompetitorAnalyzer.jsx`.

## ⚠️ Notas importantes
- No modificar lógica de negocio fuera de servicios/utilidades.
- No duplicar estilos; usa clases Tailwind existentes.
- No agregar dependencias sin justificación clara.
- Documenta cualquier integración nueva en el `README.md`.
- Si agregas una nueva página, recuerda registrar la ruta en `App.jsx` y usar el patrón de servicio si requiere lógica de negocio.