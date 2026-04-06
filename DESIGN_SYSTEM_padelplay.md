# Play Padel - Sistema de Diseño Técnico

Este documento describe todos los aspectos técnicos del diseño visual de la aplicación Play Padel, incluyendo colores, efectos, animaciones e interacciones.

---

## 📋 Índice

1. [Paleta de Colores](#paleta-de-colores)
2. [Tipografía](#tipografía)
3. [Efectos y Sombras](#efectos-y-sombras)
4. [Animaciones](#animaciones)
5. [Componentes UI](#componentes-ui)
6. [Interacciones](#interacciones)
7. [Responsive Design](#responsive-design)
8. [Código de Implementación](#código-de-implementación)

---

## 🎨 Paleta de Colores

### Colores Principales (HSL)

```css
/* === FONDO === */
--background: 0 0% 4%;           /* #0A0A0A - Negro profundo */
--foreground: 0 0% 95%;          /* #F2F2F2 - Blanco suave */

/* === TARJETAS === */
--card: 0 0% 11%;                /* #1C1C1C - Gris oscuro */
--card-foreground: 0 0% 95%;     /* #F2F2F2 */

/* === COLOR PRIMARIO (Verde Neón/Cyan) === */
--primary: 145 100% 50%;         /* #00FF66 - Verde neón brillante */
--primary-foreground: 0 0% 4%;   /* #0A0A0A */

/* === COLOR SECUNDARIO === */
--secondary: 0 0% 18%;           /* #2E2E2E - Gris medio */
--secondary-foreground: 0 0% 95%;

/* === COLOR ACENTO (Magenta/Rosa) === */
--accent: 300 100% 50%;          /* #FF00FF - Magenta neón */
--accent-foreground: 0 0% 4%;

/* === COLORES UTILITARIOS === */
--muted: 0 0% 15%;               /* #262626 */
--muted-foreground: 0 0% 60%;    /* #999999 */
--destructive: 0 84% 60%;        /* #EF4444 - Rojo error */
--border: 0 0% 20%;              /* #333333 */
--input: 0 0% 20%;
--ring: 145 100% 50%;            /* Igual que primary */
```

### Paleta Azul/Celeste Complementaria

```css
--blue-dark: 210 85% 25%;        /* Azul oscuro */
--blue-light: 195 85% 50%;       /* Celeste brillante */
--blue-glow: 195 100% 55%;       /* Celeste para glow */
--blue-muted: 200 60% 38%;       /* Azul apagado */
--blue-accent: 195 90% 60%;      /* Celeste acento */
--blue-text: 195 80% 75%;        /* Celeste para texto */
```

### Colores para Gráficos

```css
--chart-1: 145 100% 50%;   /* Verde primario */
--chart-2: 300 100% 50%;   /* Magenta acento */
--chart-3: 45 100% 50%;    /* Amarillo */
--chart-4: 200 100% 50%;   /* Azul */
--chart-5: 280 60% 50%;    /* Púrpura */
```

### Conversión a HEX (Referencia)

| Token | HSL | HEX | Uso |
|-------|-----|-----|-----|
| background | 0 0% 4% | #0A0A0A | Fondo principal |
| foreground | 0 0% 95% | #F2F2F2 | Texto principal |
| primary | 145 100% 50% | #00FF66 | Botones, acentos, glow |
| accent | 300 100% 50% | #FF00FF | Gradientes, highlights |
| card | 0 0% 11% | #1C1C1C | Tarjetas, modales |
| muted | 0 0% 15% | #262626 | Fondos secundarios |
| border | 0 0% 20% | #333333 | Bordes |

---

## 📝 Tipografía

### Fuentes

```css
font-family: {
  sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
  serif: ['Merriweather', 'ui-serif', 'Georgia', 'serif'],
  mono: ['Roboto Mono', 'ui-monospace', 'Consolas', 'monospace']
}
```

### Carga de Fuentes (index.html)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

### Pesos Utilizados

- **300**: Light - Texto secundario
- **400**: Regular - Texto normal
- **500**: Medium - Subtítulos
- **600**: SemiBold - Botones, labels
- **700**: Bold - Títulos
- **800**: ExtraBold - Headings principales

---

## ✨ Efectos y Sombras

### Sombras Predefinidas

```css
/* Sombra para tarjetas */
--shadow-card: 0 4px 20px -4px hsl(145 100% 50% / 0.1);

/* Glow verde primario */
--shadow-glow: 0 0 20px hsl(145 100% 50% / 0.4);

/* Glow azul/celeste */
--shadow-blue: 0 0 20px hsl(var(--blue-light) / 0.4);
```

### Clases de Glow

```css
/* Glow primario (verde) */
.glow-primary {
  box-shadow: 0 0 20px hsl(var(--primary) / 0.4);
}

/* Glow acento (magenta) */
.glow-accent {
  box-shadow: 0 0 20px hsl(var(--accent) / 0.4);
}

/* Glow azul */
.glow-blue {
  box-shadow: var(--shadow-blue);
}

/* Ring glow (para focus) */
.ring-glow {
  box-shadow: 0 0 0 3px hsl(var(--primary) / 0.3),
              0 0 15px hsl(var(--primary) / 0.4);
}
```

### Borde con Glow

```css
.border-glow {
  border: 2px solid hsl(var(--primary));
  box-shadow: 0 0 10px hsl(var(--primary) / 0.3), 
              inset 0 0 10px hsl(var(--primary) / 0.1);
}
```

### Glassmorphism

```css
/* Glass estándar */
.glass {
  background: hsl(var(--card) / 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid hsl(var(--border) / 0.5);
}

/* Glass más opaco */
.glass-strong {
  background: hsl(var(--card) / 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid hsl(var(--border) / 0.3);
}
```

### Gradientes

```css
/* Gradiente de fondo (cielo nocturno) */
--gradient-sky: linear-gradient(180deg, hsl(0 0% 8%) 0%, hsl(0 0% 4%) 100%);

/* Gradiente azul */
--gradient-blue: linear-gradient(135deg, hsl(var(--blue-dark)), hsl(var(--blue-light)));

/* Gradiente neón (primario a acento) */
.gradient-neon {
  background: linear-gradient(135deg, 
    hsl(var(--primary)) 0%, 
    hsl(var(--accent)) 100%);
}

/* Texto con gradiente */
.text-gradient {
  background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 🎬 Animaciones

### Keyframes Definidos

```css
/* Accordion */
'accordion-down': '0% → height: 0 | 100% → height: var(--radix-accordion-content-height)'
'accordion-up': inverso

/* Slide up (entrada) */
'slide-up': '0% → translateY(10px), opacity: 0 | 100% → translateY(0), opacity: 1'

/* Fade in */
'fade-in': '0% → opacity: 0 | 100% → opacity: 1'

/* Float (flotante) */
'float': '0%,100% → translateY(0) | 50% → translateY(-6px)'

/* Shimmer (skeleton loader) */
'shimmer': '0% → backgroundPosition: -200% 0 | 100% → backgroundPosition: 200% 0'

/* Bounce in */
'bounce-in': '0% → scale(0.3), opacity: 0 | 50% → scale(1.05) | 70% → scale(0.9) | 100% → scale(1), opacity: 1'

/* Scale up */
'scale-up': '0% → scale(0.95), opacity: 0 | 100% → scale(1), opacity: 1'

/* Slide in bottom */
'slide-in-bottom': '0% → translateY(100%), opacity: 0 | 100% → translateY(0), opacity: 1'

/* Ripple */
'ripple': '0% → scale(0), opacity: 0.5 | 100% → scale(4), opacity: 0'

/* Shake */
'shake': 'alternancia entre translateX(-4px) y translateX(4px)'

/* Heartbeat */
'heartbeat': '0%,100% → scale(1) | 14%,42% → scale(1.3)'

/* Glow pulse */
'glow-pulse': '0%,100% → boxShadow: 0 0 8px primary/0.2 | 50% → boxShadow: 0 0 16px primary/0.35'

/* Pulse ring */
'pulse-ring': '0% → boxShadow: 0 0 0 0 primary/0.3 | 70% → 6px transparent | 100% → 0'

/* Spin slow */
'spin-slow': 'rotate 360deg en 3s'
```

### Clases de Animación

```css
/* Animaciones básicas */
.animate-slide-up       /* 0.3s ease-out */
.animate-fade-in        /* 0.3s ease-out */
.animate-float          /* 3s ease-in-out infinite */
.animate-shimmer        /* 2s linear infinite */
.animate-bounce-in      /* 0.5s cubic-bezier */
.animate-scale-up       /* 0.3s ease-out */
.animate-slide-in-bottom /* 0.4s ease-out */
.animate-ripple         /* 0.6s ease-out */
.animate-shake          /* 0.5s ease-in-out */
.animate-heartbeat      /* 1s ease-in-out */
.animate-glow-pulse     /* 3s ease-in-out infinite */
.animate-pulse-ring     /* 2.5s ease-out infinite */
.animate-spin-slow      /* 3s linear infinite */
```

### Animaciones de Interacción

```css
/* Hover lift */
.hover-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-glow);
}

/* Press scale (para botones) */
.press-scale {
  transition: transform 0.1s ease;
}
.press-scale:active {
  transform: scale(0.97);
}

/* Card interactiva con efecto 3D */
.card-interactive:hover {
  transform: translateY(-4px) rotateX(2deg);
  box-shadow: 
    0 20px 40px -15px hsl(var(--primary) / 0.2),
    0 0 20px hsl(var(--primary) / 0.1);
}
```

### Stagger Animation (Listas)

```css
.stagger-children > * {
  opacity: 0;
  animation: slide-up 0.4s ease-out forwards;
}
.stagger-children > *:nth-child(1) { animation-delay: 0ms; }
.stagger-children > *:nth-child(2) { animation-delay: 50ms; }
/* ... hasta nth-child(10) con delay de 450ms */
```

### Borde Animado con Glow

```css
.glow-border-animated::before {
  background: linear-gradient(
    45deg,
    hsl(var(--primary)),
    hsl(var(--accent)),
    hsl(var(--primary))
  );
  background-size: 200% 200%;
  animation: shimmer 3s linear infinite;
}
```

---

## 🧩 Componentes UI

### Botones (Variantes)

```typescript
// src/components/ui/button.tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-primary bg-transparent text-primary hover:bg-primary/10",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
        ghost: "hover:bg-secondary hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90 hover:shadow-[0_0_20px_hsl(var(--accent)/0.4)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
  }
);
```

### Tarjetas

```css
/* Base de tarjeta */
.card {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius); /* 1rem */
}

/* Tarjeta con glow al hover */
.card:hover {
  box-shadow: var(--shadow-card);
}
```

### Border Radius

```css
--radius: 1rem;  /* 16px */

/* Variantes */
.rounded-lg   /* var(--radius) = 1rem */
.rounded-md   /* calc(var(--radius) - 2px) = 14px */
.rounded-sm   /* calc(var(--radius) - 4px) = 12px */
```

---

## 👆 Interacciones

### Estados de Hover

1. **Botones**: Glow + ligera transparencia
2. **Tarjetas**: Elevación + sombra con glow
3. **Links**: Subrayado animado

### Estados de Focus

```css
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-ring
focus-visible:ring-offset-2
```

### Estados Active/Press

```css
.press-scale:active {
  transform: scale(0.97);
}
```

### Transiciones Base

```css
transition-all duration-200  /* Predeterminado */
transition-colors duration-150  /* Para colores */
transition-transform duration-300  /* Para movimientos */
```

---

## 📱 Responsive Design

### Breakpoints (Tailwind)

```css
sm: '640px'   /* Móviles grandes */
md: '768px'   /* Tablets */
lg: '1024px'  /* Laptops */
xl: '1280px'  /* Desktop */
2xl: '1400px' /* Desktop grande */
```

### Container Mobile

```css
.container-mobile {
  @apply px-4 max-w-md mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-6xl;
}
```

### Touch Targets

```css
.touch-target {
  min-height: 44px;
  min-width: 44px;
}
```

### Safe Area (iOS)

```css
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom, 0);
}
```

---

## 💻 Código de Implementación

### Configuración Tailwind

```typescript
// tailwind.config.ts
export default {
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        // ... resto de colores
      },
      fontFamily: {
        sans: ['Montserrat', ...],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: { /* ... */ },
      animation: { /* ... */ }
    }
  },
  plugins: [require("tailwindcss-animate")]
}
```

### Uso en Componentes

```tsx
// ❌ INCORRECTO - Colores directos
<div className="bg-black text-white">

// ✅ CORRECTO - Tokens semánticos
<div className="bg-background text-foreground">

// ❌ INCORRECTO - Sombras hardcodeadas
<div className="shadow-lg">

// ✅ CORRECTO - Sombras del sistema
<div className="shadow-card glow-primary">

// ✅ Ejemplo de tarjeta completa
<div className="bg-card border border-border rounded-lg p-4 hover-lift glass">
  <h3 className="text-foreground font-semibold">Título</h3>
  <p className="text-muted-foreground">Descripción</p>
</div>
```

### Ejemplo de Logo con Glow Cyan

```tsx
<div className="relative w-32 h-32 rounded-full bg-background/50 border-2 border-primary/60 
  shadow-[0_0_30px_hsl(var(--primary)/0.5),0_0_60px_hsl(var(--primary)/0.3),inset_0_0_20px_hsl(var(--primary)/0.1)] 
  animate-pulse flex items-center justify-center overflow-hidden">
  <img 
    src={logo} 
    alt="Logo" 
    className="w-28 h-28 object-contain drop-shadow-[0_0_15px_hsl(var(--primary)/0.6)]"
  />
</div>
```

---

## 🎯 Resumen Visual

### Identidad de Marca

- **Tema**: Oscuro con acentos neón
- **Sensación**: Futurista, deportiva, premium
- **Colores clave**: Verde neón (#00FF66) + Magenta (#FF00FF)
- **Fondo**: Negro profundo (#0A0A0A)

### Efectos Característicos

1. ✨ **Glow neón** en elementos interactivos
2. 🌟 **Glassmorphism** en tarjetas y modales
3. 🎭 **Gradientes animados** en bordes
4. 📱 **Micro-interacciones** en hover/press
5. 🔄 **Animaciones fluidas** de entrada

---

## 📁 Archivos de Referencia

- `src/index.css` - Variables CSS y clases utility
- `tailwind.config.ts` - Configuración de Tailwind
- `src/components/ui/button.tsx` - Componente de botón
- `src/components/ui/card.tsx` - Componente de tarjeta
- `index.html` - Carga de fuentes

---

*Documento generado para Play Padel - Sistema de Diseño v1.0*
