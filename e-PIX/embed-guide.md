# 🔗 Guía de Integración - PicShop AI Studio

## Cómo Embeber PicShop en tu Web

PicShop AI Studio está diseñado para integrarse fácilmente en cualquier sitio web. Aquí tienes todas las opciones disponibles:

---

## 📋 Opciones de Integración

### 1. **Iframe Simple** ⚡ *Más Fácil*
```html
<iframe 
  src="https://tu-picshop-url.com" 
  width="100%" 
  height="800"
  frameborder="0"
  allowfullscreen>
</iframe>
```

### 2. **Iframe Responsivo** 📱 *Recomendado*
```html
<div style="position: relative; width: 100%; height: 0; padding-bottom: 75%;">
  <iframe 
    src="https://tu-picshop-url.com"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    frameborder="0"
    allowfullscreen>
  </iframe>
</div>
```

### 3. **Iframe con Configuración Personalizada** ⚙️ *Avanzado*
```html
<iframe 
  id="picshop-embed"
  src="https://tu-picshop-url.com" 
  width="100%" 
  height="600"
  frameborder="0"
  allowfullscreen>
</iframe>

<script>
// Configuración personalizada
const iframe = document.getElementById('picshop-embed');

iframe.onload = function() {
  // Enviar configuración a PicShop
  iframe.contentWindow.postMessage({
    type: 'PICSHOP_CONFIG',
    config: {
      hideHeader: false,        // Ocultar header
      compactMode: true,        // Modo compacto
      hideFooter: false,        // Ocultar footer
      maxHeight: 600,           // Altura máxima
      allowFullscreen: true     // Permitir pantalla completa
    }
  }, '*');
};

// Escuchar eventos de PicShop
window.addEventListener('message', function(event) {
  if (event.data.type === 'PICSHOP_READY') {
    console.log('PicShop cargado correctamente');
  }
  
  if (event.data.type === 'PICSHOP_GENERATION_SUCCESS') {
    console.log('Imagen generada:', event.data);
    // Aquí puedes agregar tu lógica personalizada
  }
});
</script>
```

---

## 🎨 Configuraciones Disponibles

### Opciones de `config`:

| Parámetro | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `hideHeader` | boolean | `false` | Oculta el header con logo |
| `compactMode` | boolean | `false` | Activa diseño compacto |
| `hideFooter` | boolean | `false` | Oculta elementos del footer |
| `maxHeight` | number | `null` | Altura máxima en px |
| `allowFullscreen` | boolean | `true` | Permite botón pantalla completa |
| `customTheme` | string | `null` | Tema personalizado (futuro) |

### Ejemplos de Configuración:

#### Modo Compacto (para sidebars):
```javascript
{
  hideHeader: true,
  compactMode: true,
  maxHeight: 500,
  allowFullscreen: true
}
```

#### Modo Completo (para páginas dedicadas):
```javascript
{
  hideHeader: false,
  compactMode: false,
  allowFullscreen: false
}
```

---

## 📡 Eventos Disponibles

PicShop envía eventos al sitio parent que puedes escuchar:

### Eventos que Recibe tu Web:

```javascript
window.addEventListener('message', function(event) {
  switch(event.data.type) {
    case 'PICSHOP_READY':
      // PicShop se ha cargado completamente
      console.log('Versión:', event.data.version);
      break;
      
    case 'PICSHOP_GENERATION_STARTED':
      // Usuario inició generación de imagen
      console.log('Prompt:', event.data.data.prompt);
      break;
      
    case 'PICSHOP_GENERATION_SUCCESS':
      // Imagen generada exitosamente
      console.log('Éxito:', event.data.data);
      break;
      
    case 'PICSHOP_GENERATION_ERROR':
      // Error en la generación
      console.log('Error:', event.data.data.error);
      break;
      
    case 'PICSHOP_REQUEST_FULLSCREEN':
      // Usuario solicita pantalla completa
      openPicshopFullscreen();
      break;
  }
});
```

### Eventos que Puedes Enviar a PicShop:

```javascript
const iframe = document.getElementById('picshop-embed');

// Configurar PicShop
iframe.contentWindow.postMessage({
  type: 'PICSHOP_CONFIG',
  config: { /* opciones */ }
}, '*');
```

---

## 🌟 Ejemplos de Implementación

### 1. **Integración en WordPress**
```php
// En tu tema o plugin
function embed_picshop_shortcode($atts) {
    $atts = shortcode_atts(array(
        'height' => '800',
        'compact' => 'false'
    ), $atts);
    
    $compact_js = $atts['compact'] === 'true' ? 'true' : 'false';
    
    return '
    <div id="picshop-container">
        <iframe id="picshop-app" src="https://tu-picshop-url.com" 
                width="100%" height="'.$atts['height'].'" frameborder="0" allowfullscreen>
        </iframe>
        <script>
            document.getElementById("picshop-app").onload = function() {
                this.contentWindow.postMessage({
                    type: "PICSHOP_CONFIG",
                    config: { compactMode: '.$compact_js.' }
                }, "*");
            };
        </script>
    </div>';
}
add_shortcode('picshop', 'embed_picshop_shortcode');

// Uso: [picshop height="600" compact="true"]
```

### 2. **Integración en React**
```jsx
import React, { useRef, useEffect } from 'react';

const PicShopEmbed = ({ config = {}, onEvent = () => {} }) => {
  const iframeRef = useRef();
  
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type?.startsWith('PICSHOP_')) {
        onEvent(event.data);
      }
    };
    
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onEvent]);
  
  const handleLoad = () => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow.postMessage({
        type: 'PICSHOP_CONFIG',
        config
      }, '*');
    }
  };
  
  return (
    <iframe
      ref={iframeRef}
      src="https://tu-picshop-url.com"
      width="100%"
      height="600"
      frameBorder="0"
      allowFullScreen
      onLoad={handleLoad}
    />
  );
};

// Uso:
<PicShopEmbed 
  config={{ compactMode: true, hideHeader: true }}
  onEvent={(event) => console.log('PicShop event:', event)}
/>
```

### 3. **Integración con Modal/Popup**
```html
<!-- Botón para abrir PicShop -->
<button onclick="openPicShop()">🎨 Editar con IA</button>

<!-- Modal -->
<div id="picshop-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 1000;">
  <div style="position: relative; width: 90%; height: 90%; margin: 5% auto; background: white; border-radius: 10px;">
    <button onclick="closePicShop()" style="position: absolute; top: 10px; right: 10px; z-index: 1001;">✕</button>
    <iframe id="picshop-modal-iframe" src="https://tu-picshop-url.com" width="100%" height="100%" frameborder="0"></iframe>
  </div>
</div>

<script>
function openPicShop() {
  document.getElementById('picshop-modal').style.display = 'block';
  document.getElementById('picshop-modal-iframe').contentWindow.postMessage({
    type: 'PICSHOP_CONFIG',
    config: { hideHeader: true, allowFullscreen: false }
  }, '*');
}

function closePicShop() {
  document.getElementById('picshop-modal').style.display = 'none';
}
</script>
```

---

## 🎯 Casos de Uso Recomendados

### **Para E-commerce:**
```html
<!-- En página de producto -->
<div class="product-tools">
  <h3>Herramientas de Imagen</h3>
  <iframe src="https://tu-picshop-url.com" width="100%" height="500" frameborder="0"></iframe>
</div>
```

### **Para Dashboards:**
```html
<!-- En panel de administración -->
<div class="dashboard-widget">
  <h3>Editor de Imágenes IA</h3>
  <iframe src="https://tu-picshop-url.com" width="100%" height="400" frameborder="0"></iframe>
</div>
```

### **Para Blogs/CMS:**
```html
<!-- Como herramienta de contenido -->
<div class="content-editor-tools">
  <iframe src="https://tu-picshop-url.com" width="100%" height="600" frameborder="0"></iframe>
</div>
```

---

## 🔧 Troubleshooting

### **Problema: Iframe no carga**
- Verificar que la URL sea correcta
- Comprobar políticas CORS
- Revisar que no haya bloqueadores de contenido

### **Problema: Configuración no se aplica**
- Verificar que el mensaje se envíe después del evento `onload`
- Comprobar la sintaxis del objeto `config`
- Revisar la consola por errores

### **Problema: Eventos no se reciben**
- Verificar que el listener esté activo antes de cargar el iframe
- Comprobar el origen del mensaje por seguridad
- Revisar que los tipos de evento sean correctos

---

## 📱 Responsive Design

Para mejor experiencia móvil:

```css
.picshop-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.picshop-iframe {
  width: 100%;
  height: 600px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .picshop-iframe {
    height: 500px;
  }
}

@media (max-width: 480px) {
  .picshop-iframe {
    height: 400px;
  }
}
```

---

## 🚀 Próximas Funcionalidades

- **Temas personalizados**: Adaptar colores a tu marca
- **API callbacks**: Webhooks para eventos
- **Plugins específicos**: WordPress, Shopify, etc.
- **SSO integration**: Single Sign-On
- **Configuración avanzada**: Más opciones de personalización

---

**¿Necesitas ayuda?** Revisa el [Manual Técnico](manual-tecnico.md) o crea un issue en el repositorio.
