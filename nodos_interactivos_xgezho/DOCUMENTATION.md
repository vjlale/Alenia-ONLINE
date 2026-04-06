# Documentación Técnica: Animación Interactiva de Nodos

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Componentes Principales](#componentes-principales)
4. [Implementación Paso a Paso](#implementación-paso-a-paso)
5. [Algoritmos y Lógica](#algoritmos-y-lógica)
6. [Optimización y Rendimiento](#optimización-y-rendimiento)
7. [Personalización](#personalización)

---

## Introducción

Esta documentación describe cómo crear una animación interactiva de nodos conectados usando **React**, **TypeScript** y **Canvas API**. La animación presenta partículas luminosas que se mueven por la pantalla, se conectan entre sí mediante líneas, y responden a la interacción del mouse.

### Características Principales

- ✨ Nodos con efecto de brillo (glow)
- 🔗 Conexiones dinámicas basadas en distancia
- 🖱️ Interacción con el mouse (repulsión y atracción)
- 📱 Responsive y optimizado para diferentes dispositivos
- 🎨 Totalmente personalizable

---

## Arquitectura del Sistema

### Estructura de Archivos

```
src/
├── components/
│   ├── NodeCanvas.tsx          # Componente principal del canvas
│   └── OverlayLabel.tsx        # Etiqueta decorativa
├── lib/
│   ├── Node.ts                 # Clase para cada nodo
│   └── AnimationController.ts  # Controlador de optimización
├── hooks/
│   └── useMouseInteraction.ts  # Hook para interacción del mouse
└── App.tsx                     # Componente raíz
```

### Flujo de Datos

```
App.tsx
  └─> NodeCanvas.tsx
       ├─> useMouseInteraction (hook)
       ├─> Node[] (array de instancias)
       └─> AnimationController (utilidades)
```

---

## Componentes Principales

### 1. Clase `Node` (src/lib/Node.ts)

La clase `Node` representa cada partícula individual en la animación.

#### Propiedades Principales

```typescript
class Node {
  x: number;              // Posición X
  y: number;              // Posición Y
  vx: number;             // Velocidad X
  vy: number;             // Velocidad Y
  radius: number;         // Radio del nodo
  color: string;          // Color HSL
  opacity: number;        // Opacidad actual
  targetOpacity: number;  // Opacidad objetivo (animación suave)
  scale: number;          // Escala actual
  targetScale: number;    // Escala objetivo
}
```

#### Métodos Clave

**Constructor**
```typescript
constructor(width: number, height: number, color: string) {
  // Posición aleatoria inicial
  this.x = Math.random() * width;
  this.y = Math.random() * height;
  
  // Velocidad aleatoria (-0.25 a 0.25)
  this.vx = (Math.random() - 0.5) * 0.5;
  this.vy = (Math.random() - 0.5) * 0.5;
  
  // Radio variable (3-5px)
  this.radius = 3 + Math.random() * 2;
  
  // Opacidad inicial 0, objetivo aleatorio (0.6-1.0)
  this.opacity = 0;
  this.targetOpacity = 0.6 + Math.random() * 0.4;
}
```

**update()** - Actualiza posición y propiedades
```typescript
update() {
  // Mover el nodo
  this.x += this.vx;
  this.y += this.vy;

  // Rebotar en los bordes
  if (this.x < 0 || this.x > this.width) {
    this.vx *= -1;
    this.x = Math.max(0, Math.min(this.width, this.x));
  }
  if (this.y < 0 || this.y > this.height) {
    this.vy *= -1;
    this.y = Math.max(0, Math.min(this.height, this.y));
  }

  // Transición suave de opacidad (easing)
  this.opacity += (this.targetOpacity - this.opacity) * 0.05;
  
  // Transición suave de escala
  this.scale += (this.targetScale - this.scale) * 0.1;
}
```

**applyMouseForce()** - Aplica fuerza de repulsión del mouse
```typescript
applyMouseForce(mouseX: number, mouseY: number, radius: number) {
  const dx = this.x - mouseX;
  const dy = this.y - mouseY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < radius) {
    // Calcular fuerza inversamente proporcional a la distancia
    const force = (radius - distance) / radius;
    const angle = Math.atan2(dy, dx);
    
    // Aplicar fuerza en dirección opuesta al mouse
    this.vx += Math.cos(angle) * force * 0.3;
    this.vy += Math.sin(angle) * force * 0.3;

    // Limitar velocidad máxima
    const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (speed > 2) {
      this.vx = (this.vx / speed) * 2;
      this.vy = (this.vy / speed) * 2;
    }
  }
}
```

**draw()** - Renderiza el nodo con efecto glow
```typescript
draw(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.globalAlpha = this.opacity;
  
  // Dibujar resplandor (gradiente radial)
  const gradient = ctx.createRadialGradient(
    this.x, this.y, 0,
    this.x, this.y, this.radius * this.scale * 3
  );
  gradient.addColorStop(0, 'hsla(180, 90%, 50%, 0.8)');
  gradient.addColorStop(0.5, 'hsla(180, 90%, 50%, 0.3)');
  gradient.addColorStop(1, 'hsla(180, 90%, 50%, 0)');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius * this.scale * 3, 0, Math.PI * 2);
  ctx.fill();

  // Dibujar núcleo sólido
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius * this.scale, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
}
```

---

### 2. Hook `useMouseInteraction` (src/hooks/useMouseInteraction.ts)

Hook personalizado que maneja toda la interacción del mouse y touch.

```typescript
export function useMouseInteraction(canvasRef: RefObject<HTMLCanvasElement>) {
  const [mousePosition, setMousePosition] = useState<MousePosition | null>(null);
  const [isMouseActive, setIsMouseActive] = useState(false);
  const [clickPosition, setClickPosition] = useState<MousePosition | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Eventos de mouse
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsMouseActive(true);
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setClickPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setTimeout(() => setClickPosition(null), 100);
    };

    // Eventos táctiles para móviles
    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      setMousePosition({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
      setIsMouseActive(true);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('touchstart', handleTouchStart);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('touchstart', handleTouchStart);
    };
  }, [canvasRef]);

  return { mousePosition, isMouseActive, clickPosition };
}
```

---

### 3. Componente `NodeCanvas` (src/components/NodeCanvas.tsx)

Componente principal que orquesta toda la animación.

#### Inicialización del Canvas

```typescript
useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Configurar DPI para pantallas retina
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  
  ctx.scale(dpr, dpr);
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;

  // Crear nodos
  const adjustedNodeCount = AnimationController.getOptimalNodeCount(nodeCount);
  nodesRef.current = Array.from({ length: adjustedNodeCount }, () => 
    new Node(rect.width, rect.height, nodeColor)
  );

  setIsInitialized(true);
}, [nodeCount, nodeColor]);
```

#### Loop de Animación

```typescript
useEffect(() => {
  if (!isInitialized) return;

  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  const rect = canvas.getBoundingClientRect();

  const animate = () => {
    // Limpiar canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Actualizar y dibujar cada nodo
    nodesRef.current.forEach((node, index) => {
      // Actualizar posición
      node.update();

      // Aplicar fuerza del mouse
      if (interactive && isMouseActive && mousePosition) {
        node.applyMouseForce(mousePosition.x, mousePosition.y, 100);
      }

      // Dibujar conexiones con nodos cercanos
      for (let j = index + 1; j < nodesRef.current.length; j++) {
        const otherNode = nodesRef.current[j];
        const distance = node.distanceTo(otherNode);

        if (distance < maxConnectionDistance) {
          // Opacidad basada en distancia
          const opacity = (1 - distance / maxConnectionDistance) * 0.3;
          
          // Aumentar brillo cerca del mouse
          let finalOpacity = opacity;
          if (interactive && isMouseActive && mousePosition) {
            const midX = (node.x + otherNode.x) / 2;
            const midY = (node.y + otherNode.y) / 2;
            const distToMouse = Math.hypot(midX - mousePosition.x, midY - mousePosition.y);
            
            if (distToMouse < 150) {
              finalOpacity = opacity * 2;
            }
          }

          // Dibujar línea
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(otherNode.x, otherNode.y);
          ctx.strokeStyle = `hsla(220, 90%, 40%, ${finalOpacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Dibujar nodo
      node.draw(ctx);
    });

    // Continuar animación
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  animate();

  return () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };
}, [isInitialized, interactive, isMouseActive, mousePosition]);
```

---

## Implementación Paso a Paso

### Paso 1: Configurar el Proyecto

```bash
# Crear proyecto React con Vite
npm create vite@latest node-animation -- --template react-ts

# Instalar dependencias
cd node-animation
npm install
```

### Paso 2: Crear la Clase Node

Crea `src/lib/Node.ts` con la implementación completa de la clase Node (ver sección anterior).

### Paso 3: Crear el Hook de Interacción

Crea `src/hooks/useMouseInteraction.ts` para manejar eventos del mouse.

### Paso 4: Crear el Componente Canvas

Crea `src/components/NodeCanvas.tsx` con:
- Inicialización del canvas
- Creación de nodos
- Loop de animación
- Renderizado de conexiones

### Paso 5: Integrar en la Aplicación

```typescript
// src/App.tsx
import { NodeCanvas } from './components/NodeCanvas';

function App() {
  return (
    <main className="w-screen h-screen bg-black">
      <NodeCanvas 
        nodeCount={80}
        maxConnectionDistance={150}
        nodeColor="hsl(180, 90%, 50%)"
        lineColor="hsl(220, 90%, 40%)"
      />
    </main>
  );
}
```

---

## Algoritmos y Lógica

### 1. Detección de Colisiones con Bordes

```typescript
// Rebotar en los bordes
if (this.x < 0 || this.x > this.width) {
  this.vx *= -1;  // Invertir velocidad horizontal
  this.x = Math.max(0, Math.min(this.width, this.x));  // Mantener dentro
}
```

### 2. Cálculo de Distancia entre Nodos

```typescript
distanceTo(other: Node): number {
  const dx = this.x - other.x;
  const dy = this.y - other.y;
  return Math.sqrt(dx * dx + dy * dy);  // Teorema de Pitágoras
}
```

### 3. Fuerza de Repulsión del Mouse

```typescript
// Calcular vector dirección
const dx = this.x - mouseX;
const dy = this.y - mouseY;
const distance = Math.sqrt(dx * dx + dy * dy);

// Fuerza inversamente proporcional
const force = (radius - distance) / radius;

// Ángulo de repulsión
const angle = Math.atan2(dy, dx);

// Aplicar fuerza
this.vx += Math.cos(angle) * force * 0.3;
this.vy += Math.sin(angle) * force * 0.3;
```

### 4. Opacidad de Conexiones Basada en Distancia

```typescript
if (distance < maxConnectionDistance) {
  // Opacidad: 1.0 cuando distance=0, 0.0 cuando distance=maxDistance
  const opacity = (1 - distance / maxConnectionDistance) * 0.3;
  
  ctx.strokeStyle = `hsla(220, 90%, 40%, ${opacity})`;
}
```

### 5. Easing (Suavizado de Animaciones)

```typescript
// Linear interpolation con factor de suavizado
this.opacity += (this.targetOpacity - this.opacity) * 0.05;

// Fórmula: current = current + (target - current) * easingFactor
// easingFactor más bajo = transición más suave
```

---

## Optimización y Rendimiento

### 1. Device Pixel Ratio (Pantallas Retina)

```typescript
const dpr = window.devicePixelRatio || 1;
canvas.width = rect.width * dpr;
canvas.height = rect.height * dpr;
ctx.scale(dpr, dpr);
```

**Por qué:** Las pantallas retina tienen más píxeles físicos que píxeles CSS. Sin esto, el canvas se vería borroso.

### 2. Ajuste Dinámico de Nodos

```typescript
static getOptimalNodeCount(baseCount: number): number {
  const width = window.innerWidth;
  
  if (width >= 1024) return baseCount;           // Desktop: 100%
  if (width >= 768) return Math.floor(baseCount * 0.7);  // Tablet: 70%
  return Math.floor(baseCount * 0.4);            // Mobile: 40%
}
```

**Por qué:** Dispositivos móviles tienen menos potencia de procesamiento.

### 3. Optimización del Loop de Conexiones

```typescript
// Solo verificar nodos posteriores (evitar duplicados)
for (let j = index + 1; j < nodesRef.current.length; j++) {
  // ...
}
```

**Complejidad:** O(n²/2) en lugar de O(n²)

### 4. RequestAnimationFrame

```typescript
const animate = () => {
  // ... renderizado ...
  animationFrameRef.current = requestAnimationFrame(animate);
};
```

**Por qué:** Sincroniza con la tasa de refresco del navegador (60 FPS) y pausa cuando la pestaña no está visible.

### 5. Limitar Velocidad Máxima

```typescript
const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
if (speed > 2) {
  this.vx = (this.vx / speed) * 2;
  this.vy = (this.vy / speed) * 2;
}
```

**Por qué:** Evita que los nodos se muevan demasiado rápido y salgan de control.

---

## Personalización

### Cambiar Colores

```typescript
<NodeCanvas 
  nodeColor="hsl(280, 90%, 60%)"      // Púrpura
  lineColor="hsl(340, 90%, 50%)"      // Rosa
/>
```

### Ajustar Cantidad de Nodos

```typescript
<NodeCanvas nodeCount={120} />  // Más denso
<NodeCanvas nodeCount={40} />   // Más espaciado
```

### Modificar Distancia de Conexión

```typescript
<NodeCanvas maxConnectionDistance={200} />  // Más conexiones
<NodeCanvas maxConnectionDistance={100} />  // Menos conexiones
```

### Cambiar Velocidad de Movimiento

En `Node.ts`:
```typescript
// Más rápido
this.vx = (Math.random() - 0.5) * 1.5;
this.vy = (Math.random() - 0.5) * 1.5;

// Más lento
this.vx = (Math.random() - 0.5) * 0.2;
this.vy = (Math.random() - 0.5) * 0.2;
```

### Ajustar Radio de Interacción del Mouse

En `NodeCanvas.tsx`:
```typescript
node.applyMouseForce(mousePosition.x, mousePosition.y, 200);  // Radio mayor
```

### Modificar Efecto Glow

En `Node.ts` método `draw()`:
```typescript
// Glow más grande
this.radius * this.scale * 5

// Glow más pequeño
this.radius * this.scale * 2

// Glow más intenso
gradient.addColorStop(0, 'hsla(180, 90%, 50%, 1.0)');
```

---

## Conceptos Matemáticos Clave

### 1. Teorema de Pitágoras (Distancia)
```
distance = √(dx² + dy²)
```

### 2. Trigonometría (Dirección)
```
angle = atan2(dy, dx)
vx = cos(angle) * force
vy = sin(angle) * force
```

### 3. Interpolación Lineal (Easing)
```
current = current + (target - current) * factor
```

### 4. Normalización de Vectores
```
magnitude = √(vx² + vy²)
normalized_vx = vx / magnitude
normalized_vy = vy / magnitude
```

---

## Troubleshooting

### Canvas Borroso
**Solución:** Asegúrate de aplicar `devicePixelRatio`

### Bajo Rendimiento
**Solución:** Reduce `nodeCount` o `maxConnectionDistance`

### Nodos Desaparecen
**Solución:** Verifica los límites en el método `update()`

### No Responde al Mouse
**Solución:** Verifica que `interactive={true}` y los event listeners estén correctos

---

## Recursos Adicionales

- [Canvas API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [RequestAnimationFrame - MDN](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- [React Hooks - Documentación Oficial](https://react.dev/reference/react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## Conclusión

Esta animación combina conceptos de:
- **Física:** Movimiento, velocidad, fuerzas
- **Matemáticas:** Geometría, trigonometría, interpolación
- **Programación:** POO, hooks, optimización
- **Gráficos:** Canvas API, gradientes, composición

El resultado es una experiencia visual fluida e interactiva que puede adaptarse a múltiples casos de uso: fondos de sitios web, visualizaciones de datos, efectos decorativos, etc.

---

**Autor:** Sistema de Animación de Nodos  
**Versión:** 1.0.0  
**Última actualización:** 2024
