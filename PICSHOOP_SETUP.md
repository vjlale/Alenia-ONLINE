# 🎨 Configuración de PicShop en Alenia Website

## 📋 URLs de PicShop según Entorno

### 🔧 **Desarrollo Local**

#### Opción 1: Modo Vite (Frontend Only)
```bash
cd ../picshop
npm run dev
# URL: http://localhost:5173
```

#### Opción 2: Modo Producción Completo (Recomendado)
```bash
# Desde alenia-website-hostinger/
cd picshop
npm run start
# URL: http://localhost:8080

# O usar el script incluido:
start-picshop.bat
```

### 🌐 **Producción/Desplegado**

## 🎯 **MI RECOMENDACIÓN: Google Cloud Run**

**Por qué Google Cloud?**
- ✅ **Fácil integración** con Gemini API (mismo proveedor)
- ✅ **Auto-scaling** - solo pagas por uso real
- ✅ **Seguro** - aislamiento completo de tu sitio web
- ✅ **Rendimiento** - baja latencia global
- ✅ **Mantenimiento** - sin gestión de servidores

### 🚀 **Pasos para Google Cloud:**

1. **Instalar Google Cloud CLI:**
```bash
# Descargar e instalar desde: https://cloud.google.com/sdk/docs/install
```

2. **Configurar proyecto:**
```bash
gcloud init
gcloud config set project TU_PROJECT_ID
```

3. **Desplegar PicShop:**
```bash
cd picshop
gcloud run deploy picshop \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="GEMINI_API_KEY=tu_api_key"
```

4. **Actualizar URL en el sitio web:**
```javascript
// En src/pages/Apps.jsx - Buscar la app "E-pix Editor"
{
  id: 1,
  name: 'E-pix Editor',
  // ... otras propiedades
  link: 'https://tu-url-de-cloud-run.run.app',  // ← Actualizar aquí
  featured: true,
  external: true  // ← Importante: mantener esta propiedad
}

// En src/components/apps/PicShopEmbed.jsx
const PICSHOOP_URL = 'https://tu-url-de-cloud-run.run.app';  // ← Actualizar aquí
```

### 🔄 **Alternativas Consideradas:**

#### **Opción B: Hostinger (Integrado)**
```bash
# Build para Hostinger
cd picshop
npm run build
# Copiar dist/ a public/picshop/
# URL: https://alenia.online/picshop
```
**Ventajas:** Simple, mismo dominio
**Desventajas:** Puede afectar performance del sitio principal

#### **Opción C: VPS Independiente**
```
https://picshop.alenia.online
```
**Ventajas:** Control total
**Desventajas:** Mantenimiento adicional

## ⚙️ Configuración Actual

La URL de PicShop está configurada en dos lugares:

```javascript
// 1. En src/pages/Apps.jsx - Como app destacada
{
  id: 1,
  name: 'E-pix Editor',
  description: 'Editor de imágenes con IA avanzada...',
  link: 'https://picshop-1071804760043.us-central1.run.app',
  featured: true,
  external: true
}

// 2. En src/components/apps/PicShopEmbed.jsx - Para redirección
const PICSHOOP_URL = 'https://picshop-1071804760043.us-central1.run.app';
```

**Estado actual:**
- ✅ **PicShop integrado** en la carpeta `picshop/`
- ✅ **Archivo de configuración** `.env.local` creado
- ⚠️ **API Key pendiente** - Reemplazar `tu_api_key_aqui` con tu API key real
- ✅ **Script de inicio** `start-picshop.bat` creado
- ✅ **Nueva integración** implementada (Diciembre 2024)

## 🚀 Pasos para Configurar

### 1. **Desarrollo Local**
```bash
# Terminal 1: Iniciar PicShop
cd ../picshop
npm run start

# Terminal 2: Iniciar Alenia Website
cd alenia-website-hostinger
npm run dev
```

### 2. **Producción**
1. Desplegar PicShop en Google Cloud Run
2. Actualizar la URL en `Apps.jsx` y `PicShopEmbed.jsx`
3. Verificar que `external: true` esté configurado
4. Probar la integración desde `/apps`

## 🔍 Verificación de Funcionamiento

### Comandos para verificar:
```bash
# Verificar que PicShop responde
curl https://picshop-1071804760043.us-central1.run.app

# Verificar que Alenia puede acceder
curl -H "Origin: https://alenia.online" https://picshop-1071804760043.us-central1.run.app
```

### En el navegador:
1. Abrir `https://alenia.online/apps`
2. Hacer clic en "Probar herramienta" en la app destacada "E-pix Editor"
3. Verificar que se abre PicShop en nueva pestaña
4. Verificar que la redirección funciona en `/apps/picshop`

## 🛠️ Troubleshooting

### Problema: "GEMINI_API_KEY = NO CONFIGURADA"
**Solución**: Configurar la API key de Gemini. Ver [GEMINI_SETUP.md](../picshop/GEMINI_SETUP.md)

### Problema: "Error de conexión"
**Solución**: Verificar que PicShop esté ejecutándose en el puerto correcto

### Problema: "App no se abre desde el sitio web"
**Solución**: 
1. Verificar que la URL en `Apps.jsx` sea correcta
2. Verificar que `external: true` esté configurado
3. Verificar que el enlace tenga `target="_blank"`

### Problema: "Redirección no funciona"
**Solución**: Verificar que la URL en `PicShopEmbed.jsx` sea correcta

## 📝 Notas Importantes

- **Seguridad**: En producción, configura HTTPS
- **Performance**: PicShop ahora se abre en nueva pestaña para mejor experiencia
- **SEO**: Los enlaces directos mejoran el SEO
- **Responsive**: La nueva integración es completamente responsive
- **UX**: Los usuarios ven la interfaz completa de PicShop sin limitaciones de iframe

## 🔄 Nuevo Sistema de Integración (Diciembre 2024)

### **Cambios Implementados:**

1. **Eliminación del Iframe**: Se removió el iframe problemático que causaba errores de carga
2. **Enlaces Directos**: Los botones ahora abren PicShop directamente en nueva pestaña
3. **Redirección Automática**: La ruta `/apps/picshop` redirige automáticamente a PicShop
4. **App Destacada**: PicShop aparece como "E-pix Editor" en la página principal de apps

### **Ventajas del Nuevo Sistema:**
- ✅ **Mejor Performance**: No hay carga de iframe pesado
- ✅ **Experiencia Completa**: Los usuarios ven la interfaz completa de PicShop
- ✅ **Menos Errores**: Eliminamos problemas de CORS y carga
- ✅ **SEO Mejorado**: Enlaces directos en lugar de contenido embebido
- ✅ **Mantenimiento Simplificado**: Menos código complejo para mantener

## 🔗 Enlaces Útiles

- [Guía de Integración PicShop](picshop/embed-guide.md)
- [Manual Técnico PicShop](picshop/manual-tecnico.md)
- [Documentación Alenia](MANUAL_TECNICO.md)
- [Despliegue PicShop](PICSHOOP_DEPLOYMENT_README.md)

---

**Estado**: ✅ PicShop integrado y configurado - Listo para producción
**Última actualización**: Diciembre 2024
