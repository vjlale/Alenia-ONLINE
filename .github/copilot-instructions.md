
# Copilot AI Agent Instructions for Alenia Website

## 🏗️ Arquitectura General
- **SPA React 18 + Vite**: Navegación sin recarga, rutas declaradas en `src/pages` y registradas en `App.jsx` usando `react-router-dom`.
- **Tailwind CSS**: Todos los estilos nuevos deben usar utilidades Tailwind (ver `globals.css` y `main.css`). No usar CSS inline ni archivos CSS externos salvo excepciones legacy.
- **Componentes reutilizables**: En `src/components` (subcarpetas: `common`, `landing`, `blog`, `apps`). Ejemplo: `CompetitorAnalyzer.jsx` en `apps`.
- **Capa de servicios**: Toda lógica de negocio y acceso a APIs debe ir en `src/services`. Los servicios son dummy por defecto, listos para integración real (ej: `analyticsService.js`, `seoService.js`).
- **Datos estáticos**: Configuración y blog en `src/data` (ej: `blogData.js`, `solucionesData.js`).
- **Hooks y utilidades**: Custom hooks en `src/hooks`, helpers en `src/utils`.
- **Assets**: Imágenes y logos en `public/images`.

## 🚦 Workflows de Desarrollo
- **Instalación**: `npm install`
- **Desarrollo local**: `npm run dev` (Vite, auto-detecta puerto libre)
- **Build**: `npm run build` (output en `dist`)
- **Build completo**: `npm run build:full` (incluye post-procesamiento)
- **Build para Hostinger**: `npm run build:hostinger` (optimizado para ese hosting)
- **Preview**: `npm run preview` (puerto 3002)
- **Deploy GitHub Pages**: Configurado en README/DEPLOYMENT.md
- **Deploy Hostinger**: Ver instrucciones en HOSTINGER-DEPLOYMENT.md

## 📐 Convenciones y Patrones Críticos
- **Tailwind obligatorio**: Usa clases utilitarias de Tailwind, no CSS inline. Paleta personalizada definida en `tailwind.config.js`:
  ```js
  colors: {
    'alenia': {
      'primary': '#00ff88',
      'secondary': '#0066ff', 
      'accent': '#ff0066',
      'dark': '#0a0a0a',
      'light': '#f8fafc'
    }
  }
  ```
- **Registro de rutas**: Toda página/app nueva debe agregarse en `App.jsx` en el bloque `<Routes>`. Patrones actuales:
  ```jsx
  <Route path="/soluciones/:categoria" element={<SolucionLevels />} />
  <Route path="/apps/analizador-competencia" element={<CompetitorAnalyzer />} />
  ```
- **Sistema de Niveles de Servicio**: Estructura de datos en `solucionesData.js` con niveles `elemental`, `moderado`, `visionario` que incluyen `precio`, `beneficios`, `caracteristicas`. El routing `/soluciones/:categoria` muestra estos niveles.
- **Service Layer**: No hacer llamadas API directas en componentes UI; usa servicios. Ejemplo: `analyticsService.trackPageView()` en `App.jsx`.
- **Animaciones**: Usar Framer Motion para animaciones. Configuración base en `tailwind.config.js` (animation, keyframes).
- **Componentes modulares**: Cada app o feature debe ser un componente autocontenible en `components/apps` o `pages`.

## 🎯 Patrones de Datos Específicos del Proyecto
- **solucionesData.js**: Estructura centralizada para servicios con soporte para niveles de pricing:
  ```js
  {
    id: 1,
    nombre: 'Soluciones Digitales',
    categoria: 'desarrollo-web', // usado para routing dinámico
    niveles: {
      elemental: { precio: 'Desde $299', beneficios: [...] },
      moderado: { precio: 'Desde $599', beneficios: [...] },
      visionario: { precio: 'Desde $1,299', beneficios: [...] }
    }
  }
  ```
- **Iconos como propiedades**: Los iconos de Lucide React se almacenan como propiedades de componente, no como imports estáticos.
- **Formularios de contacto**: Cada servicio tiene configuración de formulario específica en el componente, siguiendo el patrón de `formularioConfigs`.

## 🔗 Integraciones y Dependencias
- **Servicios dummy**: Los servicios en `src/services` (analytics, SEO, performance, AB testing) son implementaciones simuladas con logs de desarrollo.
- **Framer Motion**: Para animaciones e interacciones.
- **React Router DOM**: Enrutamiento SPA con rutas dinámicas para categorías.
- **Lucide React**: Para iconos SVG (preferido sobre otros paquetes de iconos).
- **Recharts**: Para gráficos y visualizaciones.
- **React Markdown**: Para renderizar contenido de blog.
- **React Helmet Async**: Para SEO dinámico por página.
- **Apps conectadas**: ALENIA GESTIÓN (desktop), CRM Digital, N8N workflows, Email Marketing.

## 🧩 Ejemplos y Patrones Críticos
- **Niveles de servicio**: Ver `SolucionLevels.jsx` para implementación de pricing tiers con `LevelCard` components.
- **Breadcrumbs dinámicos**: Ver `Breadcrumbs.jsx` para navegación contextual.
- **Landing page**: Ver `pages/AleniaGestionLanding.jsx` y `KontrolPlusLanding.jsx`.
- **App interactiva**: Ver `components/apps/CompetitorAnalyzer.jsx` para una herramienta que simula análisis en tiempo real.
- **Simulación de datos**: Cuando no hay backend real, usar timers para simular respuestas API:
  ```jsx
  const analyzeCompetitor = () => {
    setLoading(true);
    setTimeout(() => {
      const mockAnalysis = {...}; // Datos simulados
      setAnalysis(mockAnalysis);
      setLoading(false);
    }, 2000);
  };
  ```

## ⚠️ Reglas Críticas
- **Importación de datos**: SIEMPRE importar desde `src/data/solucionesData.js`, nunca duplicar data local en componentes.
- **Routing de niveles**: Para servicios con niveles, usar `/soluciones/:categoria` donde `categoria` corresponde a la propiedad en solucionesData.
- **No modificar lógica de negocio** fuera de servicios/utilidades.
- **No duplicar estilos**; usa clases Tailwind existentes.
- **Registrar rutas**: Si agregas una nueva página, registra la ruta en `App.jsx` y usa el patrón de servicio si requiere lógica de negocio.
- **Build optimization**: El `vite.config.js` tiene manual chunks configurado - respetar esta estructura para performance.

## 🔄 Despliegue y Build
- **Vite optimizations**: Configurado con manual chunks para vendor, router, motion, icons, charts.
- **Post-build script**: `post-build.js` ejecuta tareas adicionales después del build de Vite.
- **GitHub Pages**: Dominio configurado con `alenia.online`. Ver DEPLOYMENT.md para DNS.
- **Hostinger**: Requiere configuración especial de `.htaccess`. Ver HOSTINGER-DEPLOYMENT.md.
- **Asset handling**: Imágenes en `public/images` son accesibles via URL relativa, no imports.

## 🎨 Patrones de UI/UX Específicos
- **Tema oscuro por defecto**: Background `bg-alenia-dark`, texto `text-white` como base.
- **Gradientes de marca**: Usar `from-alenia-primary to-alenia-secondary` para elementos destacados.
- **Animaciones**: `whileInView`, `whileHover`, `whileTap` con Framer Motion para interacciones.
- **Responsive**: Diseño mobile-first con breakpoints `sm:`, `md:`, `lg:`.
- **Cards pattern**: Estructura consistente con padding, border, shadow usando clases Tailwind.