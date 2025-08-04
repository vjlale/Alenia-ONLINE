# Plan de Acción Consolidación Alenia Website

## 1. Estructura y organización actual

**Páginas principales:**
- Home (Home.jsx)
- Apps (Apps.jsx)
- Blog (Blog.jsx)
- Servicios (Services.jsx)
- Contacto
- NotFound

**Páginas especializadas:**
- Automatizaciones
- AleniaGestionLanding
- GestionKontrolPlus

**Apps internas:**
- Calculadora de ROI
- Analizador de Competencia
- Generador de Hashtags
- Simulador de Automatizaciones (placeholders)

**Componentes reutilizables:**
- Header, Footer, HeroSection, BlogCard, ABTestingDashboard, etc.

**Servicios:**
- Analytics, SEO, Performance, A/B Testing (dummy, listos para integración real)

**Estilos:**
- Tailwind + globals.css con clases de marca y utilidades personalizadas

**Utilidades y hooks:**
- Ejemplo: useWindowSize, formatDate

---

## 2. Nivel de avance y duplicados

- **Apps y funcionalidades avanzadas:**
  - Hay componentes y páginas con lógica avanzada (ej: ROICalculator.jsx tiene lógica de cálculo y feedback visual).
  - Algunas apps y páginas están como placeholders o con contenido mínimo.
- **Landing y páginas especiales:**
  - Existen landings específicas (AleniaGestionLanding, GestionKontrolPlus) que pueden tener lógica o diseño propio.
- **Blog y servicios:**
  - BlogCard y posts están como ejemplo, pero la estructura permite escalar.
- **Estilos:**
  - Hay una base sólida, pero algunos componentes usan estilos inline y otros clases de Tailwind.

---

## 3. Problemas detectados y oportunidades de mejora

- **Consistencia visual:**
  - Mezcla de estilos inline y Tailwind. Conviene unificar a Tailwind + clases personalizadas para mantener identidad y facilitar cambios globales.
- **Duplicados o versiones menos avanzadas:**
  - Hay apps y páginas con versiones mínimas y otras con lógica avanzada. Debemos priorizar siempre la versión más completa y funcional.
- **Rutas y navegación:**
  - El router ya soporta basename dinámico, pero hay que asegurar que todas las páginas estén correctamente enlazadas y accesibles.
- **Preparación para producción:**
  - El build y la configuración para Hostinger están casi listos, solo falta asegurar que todas las rutas y assets funcionen bajo /alenia-website/.

---

## 4. Sugerencias de orden y próximos pasos

### A. Auditoría y consolidación
- Revisar cada página y app, asegurando que se use la versión más avanzada.
- Eliminar solo duplicados o placeholders si existe una versión superior, previa consulta.
- Unificar estilos a Tailwind y clases personalizadas para toda la UI.
- Asegurar que todas las rutas estén en el router y sean accesibles desde el menú o links internos.

### B. Pruebas y validación
- Probar cada página y app en desarrollo, asegurando que todo se vea y funcione bien.
- Ajustar detalles visuales para máxima coherencia de marca.

### C. Preparación para producción
- Dejar el vite.config.js con base: '/alenia-website/' para el build final.
- Probar el build localmente antes de subir a Hostinger.
- Dejar .htaccess y assets listos para SPA.

---

## 5. Propuesta de plan de acción inmediato

### Auditoría y consolidación
- Listar todas las páginas y apps, indicando cuál es la versión más avanzada y cuál debe ser la principal.
- Unificar estilos y asegurar consistencia visual.
- Asegurar que todas las rutas estén en el router y sean navegables.

### Pruebas
- Probar cada página/app en desarrollo.
- Corregir cualquier bug visual o funcional.

### Preparación para producción
- Ajustar configuración y hacer build de prueba.
- Validar el resultado antes de subir a Hostinger.
