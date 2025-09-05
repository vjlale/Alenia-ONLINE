# 📘 MANUAL TÉCNICO - ALENIA WEBSITE

## 📋 Índice

1. [Información General del Proyecto](#información-general-del-proyecto)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
4. [Estructura de Carpetas](#estructura-de-carpetas)
5. [Setup y Configuración](#setup-y-configuración)
6. [Patrones de Desarrollo](#patrones-de-desarrollo)
7. [Convenciones de Código](#convenciones-de-código)
8. [Workflow de Desarrollo](#workflow-de-desarrollo)
9. [Deployment y CI/CD](#deployment-y-cicd)
10. [Performance y Optimización](#performance-y-optimización)
11. [Sistema de Diseño Visual](#sistema-de-diseño-visual)
12. [Testing](#testing)
13. [Troubleshooting](#troubleshooting)

---

## 📊 Información General del Proyecto

### **Proyecto**: Alenia Website
- **Tipo**: Single Page Application (SPA)
- **Dominio**: alenia.online
- **Estado**: Producción activa
- **Versión**: 1.0.0
- **Licencia**: Privada

### **Descripción**
Sitio web corporativo de Alenia que muestra servicios de automatización, IA y desarrollo web. Incluye herramientas interactivas, blog, sistema de servicios con niveles de pricing y landing pages especializadas.

### **Características Principales**
- ✅ Lazy Loading optimizado para performance
- ✅ Sistema de servicios con niveles (Elemental/Moderado/Visionario)  
- ✅ **Sistema de Apps Híbrido** (internas y externas)
- ✅ **Integración PicShop AI Studio** (redirección externa)
- ✅ Blog con sistema de categorías
- ✅ Landing pages para productos específicos
- ✅ SEO optimizado con meta tags dinámicos
- ✅ Analytics y A/B testing integrado
- ✅ Responsive design mobile-first

---

## 🛠️ Stack Tecnológico

### **Core Framework**
```json
{
  "Frontend Framework": "React 18.2.0",
  "Build Tool": "Vite 4.4.5", 
  "Language": "JavaScript ES6+",
  "Styling": "Tailwind CSS 3.3.0",
  "Routing": "React Router DOM 6.30.1"
}
```

### **Dependencias Principales**
```json
{
  "UI/Animation": {
    "framer-motion": "^10.18.0",
    "lucide-react": "^0.263.1"
  },
  "Data Visualization": {
    "recharts": "^2.7.2"
  },
  "Content": {
    "react-markdown": "^10.1.0",
    "react-share": "^5.2.2"
  },
  "SEO": {
    "react-helmet-async": "^2.0.5"
  }
}
```

### **Herramientas de Desarrollo**
```json
{
  "PostCSS": "^8.4.24",
  "Autoprefixer": "^10.4.14", 
  "Terser": "^5.43.1",
  "TypeScript Support": "@types/react ^18.2.15"
}
```

### **Hosting y Deployment**
- **Primary**: GitHub Pages (alenia.online)
- **Alternative**: Hostinger (configuración específica)
- **CDN**: GitHub CDN integrado
- **DNS**: Configuración en CNAME

---

## 🏗️ Arquitectura del Proyecto

### **Patrón Arquitectónico**
```
📁 Alenia Website (SPA)
├── 🎯 Presentation Layer (React Components)
├── 🔄 State Management (React Hooks + Context)
├── 🛣️ Routing Layer (React Router)
├── 🎨 Styling Layer (Tailwind CSS)
├── 📊 Data Layer (Static Data + Services)
├── 🔗 External Apps Integration (PicShop, etc.)
└── 🚀 Build Layer (Vite + Optimization)
```

### **Diagrama de Flujo de Datos**
```
User Interaction
      ↓
React Router (Navigation)
      ↓
Page Component (Lazy Loaded)
      ↓
Service Layer (Business Logic)
      ↓
Data Layer (Static/Dynamic)
      ↓
UI Components (Presentation)
      ↓
External Apps (if applicable)
      ↓
Redirection/Embed Handling
```

### **Lazy Loading Architecture**
```
Bundle Strategy:
├── 📦 Initial Bundle (~500KB)
│   ├── Home, Contact, NotFound
│   ├── Router, React Core
│   └── Critical CSS
├── 📦 Services Chunk (~300KB)
│   ├── Services, SolucionLevels
│   └── ServiceDetail
├── 📦 Apps Chunk (~250KB)
│   ├── Interactive Tools (internas)
│   ├── PicShopEmbed (redirección)
│   └── Calculators
└── 📦 Blog Chunk (~150KB)
    ├── Blog, BlogPost
    └── Content Components
```

---

## 📁 Estructura de Carpetas

### **Estructura Completa**
```
alenia-website-hostinger/
├── 📁 .github/                    # GitHub configuration
│   ├── workflows/                 # CI/CD workflows
│   └── copilot-instructions.md    # AI assistant config
├── 📁 .vscode/                    # VS Code settings
├── 📁 public/                     # Static assets
│   ├── images/                    # Image assets
│   ├── CNAME                      # Domain configuration
│   ├── robots.txt                 # SEO crawling rules
│   └── sitemap.xml               # SEO sitemap
├── 📁 src/                        # Source code
│   ├── 📁 components/             # React components
│   │   ├── 📁 admin/              # Admin components
│   │   ├── 📁 apps/               # Interactive tools & external apps
│   │   ├── 📁 blog/               # Blog components
│   │   ├── 📁 common/             # Shared components
│   │   └── 📁 landing/            # Landing page components
│   ├── 📁 data/                   # Static data sources
│   │   ├── blogData.js            # Blog posts data
│   │   ├── solucionesData.js      # Services data
│   │   └── appsData.js            # Apps data
│   ├── 📁 hooks/                  # Custom React hooks
│   │   ├── useLazyPreload.js      # Lazy loading hook
│   │   └── useScrollAnimation.js  # Scroll animations
│   ├── 📁 pages/                  # Page components
│   │   ├── Home.jsx               # Landing page
│   │   ├── Services.jsx           # Services listing
│   │   ├── SolucionLevels.jsx     # Service levels
│   │   ├── Apps.jsx               # Tools page
│   │   ├── Blog.jsx               # Blog listing
│   │   └── Contact.jsx            # Contact form
│   ├── 📁 services/               # Business logic
│   │   ├── analyticsService.js    # Analytics tracking
│   │   ├── seoService.js          # SEO optimization
│   │   ├── performanceService.js  # Performance monitoring
│   │   └── abTestingService.js    # A/B testing
│   ├── 📁 styles/                 # Styling
│   │   ├── globals.css            # Global styles
│   │   └── components.css         # Component styles
│   ├── 📁 utils/                  # Utility functions
│   │   ├── helpers.js             # Helper functions
│   │   └── constants.js           # App constants
│   ├── App.jsx                    # Main app component
│   └── main.jsx                   # Entry point
├── 📁 dist/                       # Build output
├── 📄 package.json                # Dependencies
├── 📄 vite.config.js              # Build configuration
├── 📄 tailwind.config.js          # Styling configuration
├── 📄 postcss.config.js           # CSS processing
└── 📄 README.md                   # Project documentation
```

### **Convenciones de Nomenclatura**
```javascript
// Archivos y Carpetas
├── PascalCase para componentes React (Header.jsx)
├── camelCase para utilidades (analyticsService.js)
├── kebab-case para assets (logo-alenia.png)
└── UPPERCASE para constantes (README.md)

// Variables y Funciones  
├── camelCase para variables (userName, isLoading)
├── PascalCase para componentes (ServiceCard, LoadingSpinner)
├── UPPER_SNAKE_CASE para constantes (API_BASE_URL)
└── kebab-case para CSS classes (service-card, btn-primary)
```

---

## ⚙️ Setup y Configuración

### **Prerrequisitos del Sistema**
```bash
# Node.js y npm
Node.js >= 18.0.0
npm >= 9.0.0

# Git
Git >= 2.30.0

# Editor recomendado
VS Code + extensiones:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - Auto Rename Tag
  - Prettier - Code formatter
  - GitLens
```

### **Instalación Inicial**
```bash
# 1. Clonar repositorio
git clone https://github.com/vjlale/Alenia-ONLINE.git
cd alenia-website-hostinger

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno (si aplica)
cp .env.example .env.local

# 4. Iniciar desarrollo
npm run dev

# ✅ Aplicación disponible en http://localhost:3001
```

### **Scripts Disponibles**
```json
{
  "dev": "vite",                    # Desarrollo (puerto 3001)
  "build": "vite build",            # Build básico
  "build:full": "npm run build && node post-build.js",  # Build completo
  "build:hostinger": "npm run build:full",              # Build para Hostinger
  "preview": "vite preview"         # Preview build (puerto 3002)
}
```

### **Configuración de Vite**
```javascript
// vite.config.js - Configuración optimizada
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'motion': ['framer-motion'],
          'icons': ['lucide-react'],
          'charts': ['recharts']
        }
      }
    }
  },
  server: { port: 3001, host: true },
  preview: { port: 3002, host: true }
});
```

### **Configuración de Tailwind**
```javascript
// tailwind.config.js - Sistema de diseño completo
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'alenia': {
          'primary': '#00ff88',    # Verde neón principal
          'secondary': '#0066ff',  # Azul tecnológico
          'accent': '#ff0066',     # Rosa de acento
          'dark': '#0a0a0a',       # Fondo principal
          'light': '#f8fafc'       # Texto principal
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Poppins', 'sans-serif']
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px'
      }
    }
  },
  plugins: []
}
```

---

## 🎯 Patrones de Desarrollo

### **1. Componentes Funcionales**
```javascript
// ✅ Patrón estándar para componentes
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ServiceCard = ({ servicio, index }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Lógica de inicialización
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Contenido del componente */}
    </motion.div>
  );
};

export default ServiceCard;
```

### **2. Custom Hooks**
```javascript
// ✅ Patrón para lógica reutilizable
import { useState, useEffect } from 'react';

const useLazyPreload = (routes, delay = 2000) => {
  const [preloadedRoutes, setPreloadedRoutes] = useState(new Set());
  
  useEffect(() => {
    // Lógica de precarga
  }, []);

  return { preloadedRoutes, preloadRoute };
};

export default useLazyPreload;
```

### **3. Service Layer**
```javascript
// ✅ Patrón para servicios de negocio
class AnalyticsService {
  constructor() {
    this.initialized = false;
  }

  async trackPageView(page, title) {
    // Lógica de tracking
  }

  async trackEvent(action, category, label) {
    // Lógica de eventos
  }
}

export default new AnalyticsService();
```

### **4. Lazy Loading Pattern**
```javascript
// ✅ Patrón para carga diferida
import { lazy, Suspense } from 'react';
import LoadingSpinner from './LoadingSpinner';
import LazyLoadErrorBoundary from './LazyLoadErrorBoundary';

const LazyComponent = lazy(() => import('./ExpensiveComponent'));

const LazyRoute = ({ component: Component }) => (
  <LazyLoadErrorBoundary>
    <Suspense fallback={<LoadingSpinner />}>
      <Component />
    </Suspense>
  </LazyLoadErrorBoundary>
);
```

### **5. Data Management Pattern**
```javascript
// ✅ Patrón para datos estáticos
// src/data/solucionesData.js
export const soluciones = [
  {
    id: 1,
    nombre: 'Desarrollo Web',
    categoria: 'desarrollo-web',
    icon: Globe,
    color: 'blue',
    niveles: {
      elemental: { /* ... */ },
      moderado: { /* ... */ },
      visionario: { /* ... */ }
    }
  }
];

// ✅ Patrón para apps data con soporte externo
// src/data/appsData.js
export const apps = [
  {
    id: 'e-pix-editor',
    nombre: 'E-pix Editor',
    descripcion: 'Editor de imágenes con IA',
    color: 'purple',
    link: 'https://picshop-1071804760043.us-central1.run.app',
    external: true,
    featured: true,
    difficulty: 'Intermedio',
    features: ['Edición con IA', 'Generación de imágenes', 'Filtros inteligentes']
  }
];
```

### **7. Interactividad y Microinteracciones**
```javascript
// ✅ Patrón para hover effects y microinteracciones
const InteractiveCard = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer transition-all duration-300"
    >
      {children}
    </motion.div>
  );
};

// ✅ Prefetching Pattern para mejor UX
const handleMouseEnter = (route) => {
  if (lazyRoutes[route]) {
    lazyRoutes[route]().catch(console.warn);
  }
};

// ✅ Loading states pattern
const [loading, setLoading] = useState(false);

const handleAction = async () => {
  setLoading(true);
  try {
    await performAction();
  } finally {
    setLoading(false);
  }
};
```

### **8. Sistema de Apps Híbrido**
```javascript
// ✅ Patrón para manejo de apps internas y externas
const appsData = [
  {
    id: 'e-pix-editor',
    nombre: 'E-pix Editor',
    descripcion: 'Editor de imágenes con IA',
    color: 'purple',
    link: 'https://picshop-1071804760043.us-central1.run.app',
    external: true,  // Indica redirección externa
    featured: true
  },
  {
    id: 'calculadora-roi',
    nombre: 'Calculadora ROI',
    descripcion: 'Calcula el retorno de inversión',
    color: 'green',
    link: '/apps/calculadora-roi',
    external: false,  // App interna
    featured: false
  }
];

// ✅ Renderizado condicional de enlaces
const AppLink = ({ app }) => {
  if (app.external) {
    return (
      <a
        href={app.link}
        target="_blank"
        rel="noopener noreferrer"
        className="app-link external"
      >
        {app.nombre}
      </a>
    );
  }
  
  return (
    <Link to={app.link} className="app-link internal">
      {app.nombre}
    </Link>
  );
};
```

---

## 📏 Convenciones de Código

### **Estructura de Archivos React**
```javascript
// ✅ Orden de imports estándar
// 1. React y hooks
import React, { useState, useEffect } from 'react';

// 2. Bibliotecas externas
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// 3. Componentes internos
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';

// 4. Servicios y utilidades
import analyticsService from './services/analyticsService';
import { formatDate } from './utils/helpers';

// 5. Datos y constantes
import { soluciones } from './data/solucionesData';

// 6. Estilos (si es necesario)
import './styles/globals.css';
```

### **Convenciones JSX**
```javascript
// ✅ Estructura de componente estándar
const ComponentName = ({ prop1, prop2, ...props }) => {
  // 1. Estados y refs
  const [state, setState] = useState(initialValue);
  
  // 2. Effects y lifecycle
  useEffect(() => {
    // Lógica de efecto
  }, [dependencies]);
  
  // 3. Funciones del componente
  const handleAction = () => {
    // Lógica de manejo
  };
  
  // 4. Render guards
  if (loading) return <LoadingSpinner />;
  
  // 5. JSX principal
  return (
    <motion.div
      className="component-class"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      {...props}
    >
      {/* Contenido */}
    </motion.div>
  );
};
```

### **Convenciones CSS (Tailwind)**
```javascript
// ✅ Orden de clases Tailwind
const className = [
  // 1. Layout (display, position, flex, grid)
  'flex items-center justify-between',
  
  // 2. Box model (margin, padding, width, height)
  'w-full max-w-4xl mx-auto p-6',
  
  // 3. Typography
  'text-lg font-semibold text-white',
  
  // 4. Visual (background, border, shadow)
  'bg-alenia-dark border border-alenia-primary/20 rounded-lg shadow-lg',
  
  // 5. Misc (cursor, transition, transform)
  'cursor-pointer transition-all hover:scale-105'
].join(' ');
```

### **Efectos Visuales Específicos**
```javascript
// ✅ Sistema de glow effects por servicio
const getServiceStyles = (color) => {
  const glowEffects = {
    blue: 'hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]',
    green: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]', 
    purple: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]',
    orange: 'hover:shadow-[0_0_30px_rgba(251,146,60,0.4)]',
    indigo: 'hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]'
  };
  
  return {
    border: `border-${color}-400`,
    glow: glowEffects[color],
    iconBg: 'bg-slate-800',
    iconColor: `text-${color}-400`,
    button: `bg-gradient-to-r from-${color}-400 to-${color}-500`
  };
};

// ✅ Glassmorphism effects
const glassEffect = 'backdrop-blur-md bg-white/10 border border-white/20';
const glassCard = 'backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl';

// ✅ Animations con Framer Motion
const cardAnimation = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { delay: index * 0.1 },
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
};
```

### **Comentarios y Documentación**
```javascript
/**
 * Componente para mostrar tarjetas de servicios con niveles de pricing
 * @param {Object} servicio - Datos del servicio desde solucionesData
 * @param {number} index - Índice para animaciones escalonadas
 * @returns {JSX.Element} Tarjeta de servicio animada
 */
const ServiceCard = ({ servicio, index }) => {
  // Lógica de estilos dinámicos basada en el color del servicio
  const getServiceStyles = () => {
    // Implementación...
  };
  
  return (
    // JSX...
  );
};
```

---

## 🔄 Workflow de Desarrollo

### **Git Workflow**
```bash
# 1. Feature Development
git checkout -b feature/nueva-funcionalidad
git add .
git commit -m "feat: agregar nueva funcionalidad"
git push origin feature/nueva-funcionalidad

# 2. Pull Request
# Crear PR en GitHub con descripción detallada

# 3. Code Review
# Revisión por parte del equipo

# 4. Merge to Main
git checkout main
git pull origin main
git merge feature/nueva-funcionalidad
git push origin main

# 5. Deploy
# Automático via GitHub Actions
```

### **Convenciones de Commits**
```bash
# Formato: tipo(scope): descripción
feat(services): agregar sistema de niveles de pricing
fix(routing): corregir navegación en SolucionLevels
docs(readme): actualizar documentación de setup
style(ui): mejorar espaciado en ServiceCard
refactor(hooks): optimizar useLazyPreload
perf(build): implementar code splitting
test(apps): agregar tests para calculadoras
chore(deps): actualizar dependencias
```

### **Branch Strategy**
```
main                    # Producción estable
├── develop            # Desarrollo principal  
├── feature/xyz        # Nuevas características
├── hotfix/abc         # Fixes urgentes
└── release/v1.x       # Preparación de releases
```

### **Code Review Checklist**
```markdown
- [ ] Código sigue convenciones establecidas
- [ ] Componentes son reutilizables y modulares  
- [ ] Performance: no hay re-renders innecesarios
- [ ] Accesibilidad: controles tienen labels apropiados
- [ ] Responsive: funciona en mobile y desktop
- [ ] SEO: meta tags apropiados si es página
- [ ] Error handling: manejo apropiado de errores
- [ ] Testing: funcionalidad probada manualmente
- [ ] Documentation: comentarios donde sea necesario
```

---

## 🚀 Deployment y CI/CD

### **GitHub Pages Deployment**
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build:full
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### **Hostinger Deployment**
```bash
# 1. Build para Hostinger
npm run build:hostinger

# 2. Subir archivos via FTP/Panel
# - Subir contenido de dist/ a public_html/
# - Configurar .htaccess para SPA routing

# 3. Verificar funcionamiento
# - Probar todas las rutas
# - Verificar assets se cargan correctamente
```

### **Configuración de Dominio**
```bash
# CNAME record
alenia.online -> vjlale.github.io

# DNS Records
A     @     185.199.108.153
A     @     185.199.109.153  
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   vjlale.github.io
```

### **Environment Variables**
```bash
# .env.local (no commiteado)
VITE_ANALYTICS_ID=GA_TRACKING_ID
VITE_API_BASE_URL=https://api.alenia.online
VITE_ENVIRONMENT=production
```

---

## ⚡ Performance y Optimización

### **Bundle Optimization**
```javascript
// Configuración de chunks en vite.config.js
manualChunks: {
  'vendor': ['react', 'react-dom'],
  'router': ['react-router-dom'], 
  'motion': ['framer-motion'],
  'icons': ['lucide-react'],
  'charts': ['recharts'],
  'pages-services': ['./src/pages/Services', './src/pages/SolucionLevels'],
  'pages-blog': ['./src/pages/Blog', './src/pages/BlogPostPage'],
  'components-apps': ['./src/components/apps/*']
}
```

### **Image Optimization**
```javascript
// Optimización de imágenes
├── WebP format para imágenes modernas
├── Lazy loading con intersection observer
├── Responsive images con srcset
└── Compression apropiada (80% quality)

// Ejemplo de uso
<img 
  src="/images/service.webp"
  alt="Descripción"
  loading="lazy"
  className="w-full h-auto"
/>
```

### **Core Web Vitals Targets**
```javascript
// Métricas objetivo
const PERFORMANCE_TARGETS = {
  LCP: '< 2.5s',          // Largest Contentful Paint
  FID: '< 100ms',         // First Input Delay  
  CLS: '< 0.1',           # Cumulative Layout Shift
  FCP: '< 1.8s',          # First Contentful Paint
  TTI: '< 3.8s'           # Time to Interactive
};
```

### **Lazy Loading Strategy**
```javascript
// Componentes críticos (bundle inicial)
- Home, Contact, NotFound
- Header, Footer, LoadingSpinner
- Error boundaries

// Componentes lazy (cargan bajo demanda)  
- Services, SolucionLevels
- Apps (internas), Blog, BlogPost
- PicShopEmbed (redirección externa)
- Landing pages específicas
- Admin components
```

---

## 🎨 Sistema de Diseño Visual

### **Paleta de Colores Alenia**
```javascript
// Colores principales de marca
const ALENIA_COLORS = {
  primary: '#00ff88',      // Verde neón principal
  secondary: '#0066ff',    // Azul tecnológico  
  accent: '#ff0066',       // Rosa de acento
  dark: '#0a0a0a',         // Fondo principal
  light: '#f8fafc',        // Texto principal
  
  // Colores por servicio (ServiceCard)
  services: {
    'blue': '#22d3ee',     // Desarrollo Web (cyan)
    'green': '#22c55e',    // Automatización (green)
    'purple': '#a855f7',   // Marketing Digital (purple) 
    'orange': '#fb923c',   // Consultoría IA (orange)
    'indigo': '#6366f1'    // Análisis Datos (indigo)
  },
  
  // Glassmorphism
  glass: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'rgba(255, 255, 255, 0.2)',
    backdrop: 'blur(20px)'
  }
};
```

### **Tipografía y Jerarquía**
```css
/* Sistema tipográfico */
.typography-system {
  /* Fuentes principales */
  font-family-primary: 'Poppins', sans-serif;     /* Headings */
  font-family-secondary: 'Inter', sans-serif;     /* Body text */
  
  /* Escalas de tamaño */
  text-xs: 0.75rem;      /* 12px - Labels pequeños */
  text-sm: 0.875rem;     /* 14px - Body secundario */
  text-base: 1rem;       /* 16px - Body principal */
  text-lg: 1.125rem;     /* 18px - Subtítulos */
  text-xl: 1.25rem;      /* 20px - Títulos sección */
  text-2xl: 1.5rem;      /* 24px - Títulos página */
  text-3xl: 1.875rem;    /* 30px - Hero secundario */
  text-4xl: 2.25rem;     /* 36px - Hero principal */
  text-5xl: 3rem;        /* 48px - Display grande */
  
  /* Pesos de fuente */
  font-light: 300;       /* Textos ligeros */
  font-normal: 400;      /* Texto normal */
  font-medium: 500;      /* Énfasis medio */
  font-semibold: 600;    /* Subtítulos */
  font-bold: 700;        /* Títulos principales */
  font-extrabold: 800;   /* Display text */
}
```

### **Efectos Visuales y Glassmorphism**
```css
/* Efectos de vidrio implementados */
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}

/* Efectos de glow dinámicos por servicio */
.glow-service-blue {
  hover:shadow-[0_0_30px_rgba(34,211,238,0.4)];
}

.glow-service-green {
  hover:shadow-[0_0_30px_rgba(34,197,94,0.4)];
}

.glow-service-purple {
  hover:shadow-[0_0_30px_rgba(168,85,247,0.4)];
}

.glow-service-orange {
  hover:shadow-[0_0_30px_rgba(251,146,60,0.4)];
}

.glow-service-indigo {
  hover:shadow-[0_0_30px_rgba(99,102,241,0.4)];
}
```

### **Sistema de Animaciones**
```javascript
// Configuración de animaciones Tailwind
const ANIMATIONS = {
  // Animaciones personalizadas
  'gradient': 'gradient 8s ease infinite',
  'float': 'float 6s ease-in-out infinite',
  'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  
  // Keyframes personalizados
  keyframes: {
    gradient: {
      '0%, 100%': {
        'background-size': '200% 200%',
        'background-position': 'left center'
      },
      '50%': {
        'background-size': '200% 200%',
        'background-position': 'right center'
      }
    },
    float: {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-20px)' }
    }
  }
};
```

### **Animaciones Framer Motion**
```javascript
// Patrones de animación estándar
const MOTION_VARIANTS = {
  // Fade in con desplazamiento
  fadeInUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  
  // Efecto stagger para listas
  staggerContainer: {
    animate: { transition: { staggerChildren: 0.1 } }
  },
  
  // Hover para tarjetas
  cardHover: {
    whileHover: { 
      scale: 1.05, 
      transition: { duration: 0.2 }
    },
    whileTap: { scale: 0.95 }
  },
  
  // Animación de loading
  loading: {
    animate: { rotate: 360 },
    transition: { 
      duration: 1, 
      repeat: Infinity, 
      ease: "linear" 
    }
  }
};

// Ejemplo de uso en componentes
<motion.div
  initial="initial"
  whileInView="animate"
  exit="exit"
  variants={fadeInUp}
  viewport={{ once: true }}
>
  {/* Contenido */}
</motion.div>
```

### **Sistema de Espaciado**
```css
/* Espaciado consistente basado en 8px grid */
.spacing-system {
  /* Espacios base */
  space-1: 0.25rem;    /* 4px */
  space-2: 0.5rem;     /* 8px */
  space-3: 0.75rem;    /* 12px */
  space-4: 1rem;       /* 16px */
  space-6: 1.5rem;     /* 24px */
  space-8: 2rem;       /* 32px */
  space-12: 3rem;      /* 48px */
  space-16: 4rem;      /* 64px */
  space-20: 5rem;      /* 80px */
  space-24: 6rem;      /* 96px */
  
  /* Contenedores máximos */
  max-w-sm: 24rem;     /* 384px */
  max-w-md: 28rem;     /* 448px */
  max-w-lg: 32rem;     /* 512px */
  max-w-xl: 36rem;     /* 576px */
  max-w-2xl: 42rem;    /* 672px */
  max-w-4xl: 56rem;    /* 896px */
  max-w-6xl: 72rem;    /* 1152px */
}
```

### **Interactividad y Estados**
```css
/* Estados interactivos estándar */
.interactive-states {
  /* Hover transitions */
  transition-all: all 0.3s ease;
  transition-colors: color 0.3s ease;
  transition-transform: transform 0.2s ease;
  transition-shadow: box-shadow 0.3s ease;
  
  /* Focus states */
  focus:outline-none;
  focus:ring-2;
  focus:ring-alenia-primary;
  focus:ring-opacity-50;
  
  /* Disabled states */
  disabled:opacity-50;
  disabled:cursor-not-allowed;
  disabled:transform-none;
}

/* Botones interactivos */
.btn-primary {
  @apply bg-gradient-to-r from-alenia-primary to-alenia-secondary;
  @apply text-alenia-dark font-semibold px-6 py-3 rounded-lg;
  @apply hover:shadow-lg hover:shadow-alenia-primary/25;
  @apply transition-all duration-300 transform hover:scale-105;
  @apply active:scale-95;
}

.btn-secondary {
  @apply border border-alenia-primary text-alenia-primary;
  @apply px-6 py-3 rounded-lg font-semibold;
  @apply hover:bg-alenia-primary hover:text-alenia-dark;
  @apply transition-all duration-300;
}
```

### **Sistema de Componentes UI**
```javascript
// Componentes base reutilizables
const UI_COMPONENTS = {
  // Cards con efectos
  ServiceCard: {
    base: 'bg-slate-800/50 rounded-xl p-6 border transition-all duration-300',
    hover: 'hover:scale-105 hover:bg-slate-800/70',
    glow: 'hover:shadow-[0_0_30px_rgba(color,0.4)]' // color dinámico
  },
  
  // Badges de nivel
  LevelBadge: {
    elemental: 'bg-green-500/20 text-green-400 border-green-500/30',
    moderado: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    visionario: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
  },
  
  // Loading states
  LoadingSpinner: {
    container: 'min-h-screen bg-alenia-dark flex items-center justify-center',
    spinner: 'w-16 h-16 border-4 border-alenia-primary/20 border-t-alenia-primary rounded-full',
    animation: 'animate-spin'
  }
};
```

### **Responsive Design System**
```css
/* Breakpoints del proyecto */
.responsive-system {
  /* Mobile first approach */
  default: 'mobile (< 640px)';
  sm: 'small tablet (≥ 640px)';
  md: 'tablet (≥ 768px)';
  lg: 'desktop (≥ 1024px)';
  xl: 'large desktop (≥ 1280px)';
  '2xl': 'extra large (≥ 1536px)';
  
  /* Container sizes */
  container-sm: '640px';
  container-md: '768px';
  container-lg: '1024px';
  container-xl: '1280px';
  container-2xl: '1536px';
}

/* Grid system responsive */
.grid-responsive {
  /* Services grid */
  services: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';
  
  /* Blog grid */
  blog: 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6';
  
  /* Level cards */
  levels: 'grid grid-cols-1 lg:grid-cols-3 gap-8';
}
```

### **Accesibilidad y UX**
```css
/* Estándares de accesibilidad */
.accessibility-standards {
  /* Contraste mínimo */
  color-contrast-aa: '4.5:1';     /* Texto normal */
  color-contrast-aaa: '7:1';      /* Texto grande */
  
  /* Tamaños mínimos touch */
  min-touch-target: '44px';        /* iOS/Android */
  min-click-target: '48px';        /* Material Design */
  
  /* Focus visible */
  focus-ring: '2px solid #00ff88';
  focus-offset: '2px';
  
  /* Motion respeta preferencias */
  prefers-reduced-motion: 'reduce';
}

/* Implementation */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### **Dark Mode Implementation**
```javascript
// Sistema de tema oscuro (por defecto)
const DARK_THEME = {
  background: {
    primary: '#0a0a0a',      // Fondo principal
    secondary: '#1a1a1a',    // Fondo cards
    tertiary: '#2a2a2a'      // Fondo elevado
  },
  
  text: {
    primary: '#f8fafc',      // Texto principal
    secondary: '#cbd5e1',    // Texto secundario
    muted: '#64748b'         // Texto atenuado
  },
  
  borders: {
    subtle: 'rgba(255, 255, 255, 0.1)',
    normal: 'rgba(255, 255, 255, 0.2)',
    strong: 'rgba(255, 255, 255, 0.3)'
  }
};
```

### **Performance Visual**
```javascript
// Optimizaciones de rendering
const VISUAL_PERFORMANCE = {
  // Optimización CSS
  willChange: 'transform, opacity',    // Para animaciones
  containment: 'layout style paint',   // CSS containment
  
  // Lazy loading de assets
  imageLoading: 'lazy',
  decoding: 'async',
  
  // Reducir repaints
  transform3d: 'translateZ(0)',        // Hardware acceleration
  backfaceVisibility: 'hidden',       // Evitar flicker
  
  // Critical CSS inlined
  criticalCSS: [
    'layout fundamentals',
    'typography base',
    'color system',
    'primary navigation'
  ]
};
```

---

## 🧪 Testing

### **Testing Strategy**
```javascript
// Pirámide de testing recomendada
├── Unit Tests (70%)      # Componentes individuales
├── Integration Tests (20%) # Flujos de usuario
└── E2E Tests (10%)       # Escenarios completos
```

### **Manual Testing Checklist**
```markdown
### Navegación
- [ ] Todas las rutas cargan correctamente
- [ ] Lazy loading funciona sin errores
- [ ] Breadcrumbs muestran ruta correcta
- [ ] Enlaces externos abren en nueva pestaña

### Responsive Design  
- [ ] Mobile (320px - 768px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1024px+)
- [ ] Orientación landscape/portrait

### Performance
- [ ] Tiempo de carga inicial < 3s
- [ ] Navegación subsecuente < 1s
- [ ] Imágenes cargan progresivamente
- [ ] Sin errores en consola

### Funcionalidad
- [ ] Formularios de contacto funcionan
- [ ] Calculadoras apps funcionan correctamente
- [ ] Blog search y filtros funcionan
- [ ] Servicios muestran niveles correctos
```

### **Browser Compatibility**
```javascript
// Navegadores soportados
const SUPPORTED_BROWSERS = {
  Chrome: '>= 90',
  Firefox: '>= 88', 
  Safari: '>= 14',
  Edge: '>= 90'
};
```

---

## 🔧 Troubleshooting

### **Problemas Comunes**

#### **1. Build Errors**
```bash
# Error: Cannot resolve module
Solución: Verificar imports y rutas
npm run dev  # Verificar en desarrollo
```

#### **2. Routing Issues**
```bash
# Error: 404 en rutas después del deploy
Solución: Configurar .htaccess para SPA
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

#### **3. Performance Issues**
```bash
# Bundle demasiado grande
Solución: Revisar manual chunks en vite.config.js
npm run build -- --analyze  # Analizar bundle
```

#### **4. Lazy Loading Errors**
```bash
# ChunkLoadError
Solución: Verificar rutas de chunks y network
# Implementar retry logic en ErrorBoundary
```

### **Debug Tools**
```javascript
// Development tools
├── React Developer Tools
├── Vite DevTools  
├── Lighthouse (Performance)
└── Chrome DevTools Network tab

// Production monitoring
├── Google Analytics
├── Core Web Vitals tracking
└── Error tracking (console.error)
```

### **Logs y Monitoring**
```javascript
// Estructura de logging
const logger = {
  info: (message, data) => console.log(`[INFO] ${message}`, data),
  warn: (message, data) => console.warn(`[WARN] ${message}`, data),
  error: (message, error) => console.error(`[ERROR] ${message}`, error)
};

// Performance monitoring
performanceService.trackMetric('page_load_time', duration);
analyticsService.trackEvent('error', 'chunk_load_failed', error.message);
```

---

## 📞 Contacto y Soporte

### **Equipo de Desarrollo**
- **Tech Lead**: [Definir responsable]
- **Frontend Developers**: [Lista del equipo]
- **QA Engineer**: [Responsable de testing]

### **Recursos Útiles**
- **Repositorio**: https://github.com/vjlale/Alenia-ONLINE
- **Sitio Web**: https://alenia.online
- **Documentación**: README.md y carpeta docs/
- **Issues**: GitHub Issues para bugs y features

### **Canales de Comunicación**
- **Slack**: #alenia-website-dev
- **Email**: desarrollo@alenia.online
- **Meetings**: Weekly standup Lunes 10:00 AM

---

## 📋 Conclusión

Este manual técnico proporciona toda la información necesaria para que un equipo de desarrolladores pueda trabajar eficientemente en el proyecto Alenia Website. 

### **Próximos Pasos Recomendados**
1. ✅ Implementar testing automatizado
2. ✅ Configurar monitoring de producción  
3. ✅ Optimizar SEO técnico
4. ✅ Implementar PWA features
5. ✅ Agregar internacionalización (i18n)
6. ✅ **Sistema de Apps Híbrido implementado**
7. ✅ **Integración PicShop AI Studio completada**

**Versión del Manual**: 1.1  
**Última Actualización**: Diciembre 2024  
**Próxima Revisión**: Enero 2025

---

*Este documento debe mantenerse actualizado con cada cambio significativo en la arquitectura o tecnologías del proyecto.*
