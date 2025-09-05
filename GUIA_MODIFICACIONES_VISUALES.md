# 🎨 GUÍA DE MODIFICACIONES VISUALES - ALEN.IA

## 📋 ÍNDICE
1. [Configuración Básica](#configuración-básica)
2. [Modificación de Variables](#modificación-de-variables)
3. [Temas Predefinidos](#temas-predeterminados)
4. [Control Granular](#control-granular) ⭐ **NUEVO**
5. [Aplicación en Desarrollo](#aplicación-en-desarrollo)
6. [Aplicación en Producción](#aplicación-en-producción)

## 📁 Archivo Principal de Configuración
**Ubicación**: `src/styles/visual-config.css`

Este archivo contiene todas las variables CSS que controlan la apariencia visual de la web. **Solo modifica este archivo** para cambiar colores, bordes, fondos y efectos.

## 🎯 Cómo Modificar Elementos Visuales

### 1. **COLORES PRINCIPALES** (Líneas 4-8)
```css
--color-primary: #00ff88;        /* Verde neón principal */
--color-secondary: #0066ff;      /* Azul secundario */
--color-accent: #ff0066;         /* Magenta de acento */
--color-dark: #0a0a0a;          /* Negro de fondo */
--color-light: #f8fafc;         /* Blanco de texto */
```

**Ejemplos de cambios:**
- Cambiar el verde neón: `--color-primary: #ff6b35;` (naranja)
- Cambiar el azul: `--color-secondary: #8b5cf6;` (púrpura)
- Cambiar el magenta: `--color-accent: #f59e0b;` (ámbar)

### 2. **GRADIENTES** (Líneas 10-12)
```css
--gradient-primary: linear-gradient(135deg, #00ff88, #0066ff);
--gradient-secondary: linear-gradient(135deg, #06baa8, #be06af);
--gradient-dark: linear-gradient(135deg, #0a0a0a, #1a1a1a);
```

**Ejemplos de cambios:**
- Gradiente rojo-naranja: `--gradient-primary: linear-gradient(135deg, #ff6b35, #f7931e);`
- Gradiente púrpura-rosa: `--gradient-secondary: linear-gradient(135deg, #8b5cf6, #ec4899);`

### 3. **BORDES Y RADIOS** (Líneas 14-22)
```css
--border-radius-sm: 0.25rem;     /* Bordes pequeños */
--border-radius-md: 0.5rem;      /* Bordes medianos */
--border-radius-lg: 1rem;        /* Bordes grandes */
--border-radius-xl: 1.5rem;      /* Bordes extra grandes */
```

**Ejemplos de cambios:**
- Bordes más redondeados: `--border-radius-lg: 2rem;`
- Bordes más cuadrados: `--border-radius-md: 0.125rem;`

### 4. **SOMBRAS Y EFECTOS** (Líneas 24-30)
```css
--glow-primary: 0 0 20px rgba(0, 255, 136, 0.5);
--glow-secondary: 0 0 20px rgba(0, 102, 255, 0.5);
--glow-accent: 0 0 20px rgba(255, 0, 102, 0.5);
```

**Ejemplos de cambios:**
- Glow más intenso: `--glow-primary: 0 0 30px rgba(0, 255, 136, 0.8);`
- Glow más sutil: `--glow-primary: 0 0 10px rgba(0, 255, 136, 0.3);`

### 5. **EFECTOS DE VIDRIO** (Líneas 50-52)
```css
--glass-bg: rgba(255, 255, 255, 0.1);
--glass-border: rgba(255, 255, 255, 0.2);
--glass-blur: 20px;
```

**Ejemplos de cambios:**
- Vidrio más transparente: `--glass-bg: rgba(255, 255, 255, 0.05);`
- Vidrio más opaco: `--glass-bg: rgba(255, 255, 255, 0.2);`
- Blur más intenso: `--glass-blur: 30px;`

## 🎨 Temas Predefinidos

### Tema "Neon Cyberpunk" (Actual)
```css
--color-primary: #00ff88;
--color-secondary: #0066ff;
--color-accent: #ff0066;
```

### Tema "Sunset Warm"
```css
--color-primary: #ff6b35;
--color-secondary: #f7931e;
--color-accent: #ff4757;
```

### Tema "Ocean Blue"
```css
--color-primary: #00d4ff;
--color-secondary: #0099cc;
--color-accent: #ff6b9d;
```

### Tema "Purple Magic"
```css
--color-primary: #8b5cf6;
--color-secondary: #a855f7;
--color-accent: #ec4899;
```

## 🎯 CONTROL GRANULAR - MODIFICAR ELEMENTOS ESPECÍFICOS

### Problema: Elementos que comparten variables CSS
Cuando varios elementos usan la misma variable CSS (ej: `--color-primary`), modificar la variable afecta a todos los elementos.

### Soluciones:

#### 1. **Variables Específicas por Componente**
```css
/* En visual-config.css */
:root {
  /* Variables globales */
  --color-primary: #00ff88;
  
  /* Variables específicas por componente */
  --color-primary-header: #00ff88;      /* Solo para header */
  --color-primary-buttons: #00ff88;    /* Solo para botones */
  --color-primary-cards: #00ff88;      /* Solo para cards */
}
```

#### 2. **Clases CSS Específicas**
```css
/* En visual-config.css */
/* Clases específicas para elementos particulares */
.btn-primary-custom {
  background: linear-gradient(135deg, #ff0066, #00ff88) !important;
  border-radius: var(--border-radius-lg) !important;
}

.card-primary-custom {
  background: linear-gradient(135deg, #0066ff, #00ff88) !important;
  box-shadow: 0 0 30px rgba(0, 255, 136, 0.3) !important;
}

.header-primary-custom {
  background: linear-gradient(135deg, #00ff88, #06baa8) !important;
  border-bottom: 2px solid var(--color-primary) !important;
}
```

#### 3. **Selectores CSS Específicos**
```css
/* En visual-config.css */
/* Modificar elementos específicos por selector */
.header .btn-primary {
  background: linear-gradient(135deg, #ff0066, #00ff88) !important;
}

.footer .btn-primary {
  background: linear-gradient(135deg, #0066ff, #00ff88) !important;
}

.home-page .card {
  background: linear-gradient(135deg, #00ff88, #06baa8) !important;
}

.blog-page .card {
  background: linear-gradient(135deg, #ff0066, #06baa8) !important;
}
```

#### 4. **Variables CSS con Sufijos**
```css
/* En visual-config.css */
:root {
  /* Variables base */
  --color-primary: #00ff88;
  
  /* Variables con sufijos para control específico */
  --color-primary-btn: #ff0066;        /* Botones específicos */
  --color-primary-nav: #0066ff;        /* Navegación específica */
  --color-primary-card: #06baa8;       /* Cards específicas */
  --color-primary-text: #00ff88;       /* Texto específico */
}
```

### Ejemplo Práctico: Modificar Líneas 129-130 sin afectar 116-117

**Situación:**
- Líneas 129-130: Botón en el header
- Líneas 116-117: Botón en el footer
- Ambos usan `--color-primary`

**Solución:**

1. **Agregar variables específicas:**
```css
/* En visual-config.css */
:root {
  --color-primary: #00ff88;              /* Variable global */
  --color-primary-header-btn: #ff0066;   /* Solo para botones del header */
  --color-primary-footer-btn: #0066ff;   /* Solo para botones del footer */
}
```

2. **Crear clases específicas:**
```css
/* En visual-config.css */
.btn-header-primary {
  background: var(--color-primary-header-btn) !important;
  border: 2px solid var(--color-primary-header-btn) !important;
}

.btn-footer-primary {
  background: var(--color-primary-footer-btn) !important;
  border: 2px solid var(--color-primary-footer-btn) !important;
}
```

3. **Aplicar en el código:**
```jsx
// En el componente del header (líneas 129-130)
<button className="btn-header-primary">Botón Header</button>

// En el componente del footer (líneas 116-117)
<button className="btn-footer-primary">Botón Footer</button>
```

### Estrategias por Tipo de Modificación:

#### **Para Colores:**
- Usar variables específicas: `--color-primary-[componente]`
- Usar clases específicas: `.btn-[componente]-primary`
- Usar selectores específicos: `[componente] .btn-primary`

#### **Para Bordes:**
- Variables: `--border-radius-[componente]`
- Clases: `.border-[componente]-custom`
- Selectores: `[componente] .border-primary`

#### **Para Sombras:**
- Variables: `--shadow-[componente]`
- Clases: `.shadow-[componente]-custom`
- Selectores: `[componente] .shadow-primary`

### Recomendación:
1. **Para modificaciones temporales:** Usar clases específicas
2. **Para modificaciones permanentes:** Usar variables específicas
3. **Para modificaciones complejas:** Usar selectores CSS específicos

## 🔧 Cómo Aplicar Cambios

### Paso 1: Modificar Variables
1. Abre `src/styles/visual-config.css`
2. Encuentra la variable que quieres cambiar
3. Modifica el valor
4. Guarda el archivo

### Paso 2: Ver Cambios en Tiempo Real
```bash
npm run dev
```
Abre http://localhost:3001 y verás los cambios inmediatamente.

### Paso 3: Aplicar a Producción
```bash
npm run build:hostinger
```
Sube los archivos de `dist/` a tu hosting.

## 🎯 Elementos Específicos por Página

### Página Principal (Home)
- **Hero Section**: Usa `--color-primary` y `--gradient-primary`
- **Botones CTA**: Usa `.btn-primary` class
- **Cards**: Usa `.card-glass` class

### Página de Servicios
- **Pricing Cards**: Usa `.card-glass` class
- **Feature Icons**: Usa `--color-secondary`
- **Background**: Usa `--gradient-dark`

### Página de Contacto
- **Form Inputs**: Usa `.input-primary` class
- **Submit Button**: Usa `.btn-primary` class
- **Success Messages**: Usa `--color-primary`

### Blog
- **Article Cards**: Usa `.card-glass` class
- **Read More Links**: Usa `--color-secondary`
- **Category Tags**: Usa `--color-accent`

## 🚀 Clases CSS Utilitarias Disponibles

### Colores de Texto
```html
<div class="text-primary">Texto verde neón</div>
<div class="text-secondary">Texto azul</div>
<div class="text-accent">Texto magenta</div>
```

### Fondos
```html
<div class="bg-primary">Fondo verde</div>
<div class="bg-gradient-primary">Fondo con gradiente</div>
<div class="glass">Efecto de vidrio</div>
```

### Efectos
```html
<button class="btn-primary">Botón con glow</button>
<div class="card-glass">Card con efecto vidrio</div>
<input class="input-primary">Input con borde</input>
```

## ⚠️ Reglas Importantes

1. **NO modifiques** otros archivos CSS
2. **Solo cambia valores** en `visual-config.css`
3. **Usa las clases utilitarias** en lugar de CSS inline
4. **Prueba en desarrollo** antes de subir a producción
5. **Mantén consistencia** en toda la web

## 🎨 Consejos de Diseño

### Para Mejor Legibilidad
- Usa `--color-light` para texto sobre fondos oscuros
- Usa `--color-dark` para texto sobre fondos claros
- Mantén contraste suficiente entre texto y fondo

### Para Efectos Modernos
- Usa `--glass-blur: 25px` para efectos más dramáticos
- Usa `--glow-primary` para elementos importantes
- Usa `--border-radius-lg` para un look más suave

### Para Performance
- Los cambios en variables CSS son muy rápidos
- No afectan la funcionalidad JavaScript
- Se aplican inmediatamente sin recargar

## 📱 Responsive Design

Los cambios se aplican automáticamente a todos los dispositivos. En móviles:
- Los tamaños de fuente se reducen automáticamente
- El espaciado se ajusta
- Los efectos de blur se mantienen

---

**¡Con este sistema puedes cambiar completamente la apariencia de la web modificando solo un archivo!** 🎨 