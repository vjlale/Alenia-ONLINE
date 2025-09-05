# Alenia Website

Este es el repositorio para el sitio web de Alenia, una aplicación web moderna construida con React, Vite y Tailwind CSS. El sitio está diseñado para mostrar los servicios de Alenia, que se centran en la automatización, la inteligencia artificial y el desarrollo web.

## Páginas

El sitio web consta de las siguientes páginas:

*   **Home:** La página de inicio que presenta a Alenia, su propuesta de valor y un llamado a la acción para agendar una consultoría.
*   **Blog:** Una sección con artículos sobre IA, automatización, desarrollo web y marketing digital. Incluye búsqueda, filtrado por categorías y una vista de detalle para cada publicación.
*   **Apps:** Una colección de herramientas y aplicaciones interactivas, incluyendo **E-pix Editor (PicShop)** como app destacada, calculadora de ROI, analizador de competencia y generador de hashtags. Permite filtrar por categoría y dificultad. Las apps pueden ser internas o externas (se abren en nueva pestaña).
*   **Servicios:** Una descripción detallada de los servicios ofrecidos por Alenia, incluyendo desarrollo de software, automatización de marketing y consultoría de IA.
*   **Contacto:** Un formulario de contacto para que los visitantes se pongan en contacto con Alenia, junto con información de contacto y un mapa de ubicación.

## Lógica y Funcionalidad

La aplicación utiliza **React Router DOM** para gestionar la navegación del lado del cliente, lo que permite transiciones de página fluidas sin recargar la página. El estado de los componentes se gestiona mediante **React Hooks** (`useState`, `useEffect`).

La funcionalidad clave incluye:

*   **Enrutamiento dinámico:** `App.jsx` define todas las rutas de la aplicación, incluyendo rutas anidadas para las aplicaciones.
*   **Componentes reutilizables:** El código se organiza en componentes reutilizables ubicados en el directorio `src/components`, como `Header`, `Footer`, `BlogCard` y `AppsStats`.
*   **Formularios interactivos:** Los formularios de contacto y suscripción al boletín utilizan el estado de React para gestionar las entradas del usuario y los envíos de formularios.
*   **Filtrado y búsqueda:** Las páginas de Blog y Apps implementan la funcionalidad de filtrado y búsqueda para ayudar a los usuarios a encontrar contenido relevante.
*   **Sistema de apps híbrido:** Soporte para apps internas (misma pestaña) y externas (nueva pestaña) con redirección automática.
*   **Carga de datos estáticos:** La información de publicaciones de blog, aplicaciones y servicios se carga desde arreglos de datos estáticos en el código fuente.

## Estética y Diseño

El sitio web presenta un diseño moderno y profesional con un tema oscuro. La estética se define en `tailwind.config.js` y se aplica de forma coherente en toda la aplicación.

### Paleta de Colores

La paleta de colores se define en la sección `theme.extend.colors` de `tailwind.config.js`:

*   **Primario:** `#00ff88` (un verde brillante)
*   **Secundario:** `#0066ff` (un azul vibrante)
*   **Acento:** `#ff0066` (un rosa intenso)
*   **Oscuro:** `#0a0a0a` (un negro profundo para los fondos)
*   **Claro:** `#f8fafc` (un blanco roto para el texto y los elementos de la interfaz de usuario)

### Tipografía

Se utilizan dos fuentes principales, definidas en la sección `theme.extend.fontFamily`:

*   **Sans-serif:** 'Inter' (para el cuerpo del texto)
*   **Display:** 'Poppins' (para los encabezados y títulos)

### Efectos y Animaciones

El sitio web utiliza **Framer Motion** para animaciones sutiles y atractivas, mejorando la experiencia del usuario. Las animaciones personalizadas se definen en la sección `theme.extend.animation` de `tailwind.config.js`:

*   **`gradient`:** Anima un fondo degradado.
*   **`float`:** Crea un efecto de flotación sutil en los elementos.
*   **`pulse-slow`:** Una animación de pulso lento para llamar la atención sobre los elementos.

## Estructura del Proyecto

El código fuente está organizado en el directorio `src` de la siguiente manera:

```
src/
├── components/      # Componentes de interfaz de usuario reutilizables
│   └── apps/        # Componentes específicos de apps interactivas
├── data/            # Datos estáticos (ej. publicaciones de blog, servicios)
├── hooks/           # Hooks de React personalizados
├── pages/           # Componentes de página
├── services/        # Servicios (ej. llamadas a la API)
├── styles/          # Estilos globales y CSS
├── utils/           # Funciones de utilidad
├── App.jsx          # Componente principal de la aplicación y enrutamiento
└── main.jsx         # Punto de entrada de la aplicación
```

## Documentación Adicional

Para información más detallada sobre aspectos específicos del proyecto, consulta:

*   **[Sistema de Apps](APPS_SYSTEM_DOCUMENTATION.md):** Documentación completa del sistema de apps, incluyendo configuración, integración con PicShop y guías de desarrollo.
*   **[Manual Técnico](MANUAL_TECNICO.md):** Documentación técnica detallada del proyecto, arquitectura y patrones de desarrollo.
*   **[Configuración PicShop](PICSHOOP_SETUP.md):** Guía de configuración e integración de PicShop (E-pix Editor).
*   **[Despliegue PicShop](PICSHOOP_DEPLOYMENT_README.md):** Instrucciones de despliegue de PicShop en Google Cloud Run.
*   **[Optimización de Velocidad](OPTIMIZACION_VELOCIDAD.md):** Estrategias y técnicas de optimización implementadas.

## Estado del Proyecto

**Versión actual:** 2.0 (Diciembre 2024)
**Estado:** ✅ Producción activa
**Última actualización:** Integración mejorada de PicShop con sistema de apps híbrido