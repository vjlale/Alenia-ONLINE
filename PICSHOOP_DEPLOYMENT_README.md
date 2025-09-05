# 🚀 Despliegue de PicShop en Google Cloud Run

## 📋 Requisitos Previos

### 1. **API Key de Gemini**
```bash
# Ve a: https://aistudio.google.com/app/apikey
# Crea una API key y cópiala
```

### 2. **Configurar API Key**
```bash
# Editar el archivo picshop/.env.local
GEMINI_API_KEY=tu_api_key_real_aqui_sin_comillas
```

### 3. **Google Cloud CLI**
```bash
# Instalar desde: https://cloud.google.com/sdk/docs/install
gcloud --version
```

### 4. **Proyecto de Google Cloud**
```bash
# Crear o seleccionar proyecto
gcloud projects create TU_PROJECT_ID
gcloud config set project TU_PROJECT_ID
```

## 🎯 Despliegue Automático

### **Opción A: Windows (PowerShell)**
```powershell
# Desde alenia-website-hostinger/
.\deploy-picshop-cloud.ps1
```

### **Opción B: Linux/Mac (Bash)**
```bash
# Desde alenia-website-hostinger/
chmod +x deploy-picshop-cloud.sh
./deploy-picshop-cloud.sh
```

### **Opción C: Manual**
```bash
cd picshop

# Verificar configuración
gcloud auth login
gcloud config set project TU_PROJECT_ID

# Desplegar
gcloud run deploy picshop \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="GEMINI_API_KEY=tu_api_key"
```

## ⚙️ Configuración del Servicio

El despliegue incluye configuración optimizada:

- **CPU:** 1 vCPU
- **Memoria:** 512 MB
- **Máximo de instancias:** 10
- **Mínimo de instancias:** 0 (auto-scaling)
- **Timeout:** 300 segundos
- **Concurrencia:** 80 requests por instancia

## 💰 Costos Estimados

- **Primeros 2M requests/mes:** **GRATIS**
- **CPU adicional:** ~$0.0001 por hora
- **Memoria adicional:** ~$0.000002 por GB/hora
- **Para uso normal:** **< $5/mes**

## 🔧 Configuración Final

Después del despliegue exitoso:

1. **Copia la URL** que aparece en la terminal
2. **Actualiza** `src/pages/Apps.jsx`:
```javascript
// En el array de apps, buscar la app "E-pix Editor"
{
  id: 1,
  name: 'E-pix Editor',
  // ... otras propiedades
  link: 'https://tu-app-cloud-run.run.app',  // ← Pega aquí tu URL
  featured: true,
  external: true  // ← Importante: marca como enlace externo
}
```

3. **Actualiza** `src/components/apps/PicShopEmbed.jsx`:
```javascript
const PICSHOOP_URL = 'https://tu-app-cloud-run.run.app';  // ← Pega aquí tu URL
```

## 🎉 ¡Listo!

Una vez completado:
- ✅ PicShop estará disponible globalmente
- ✅ Auto-escalará según la demanda
- ✅ Tendrá alta disponibilidad
- ✅ Estará integrado en tu sitio web como app destacada

## 🔄 Integración con el Sitio Web

### **Nuevo Sistema de Integración (Diciembre 2024)**

PicShop ahora se integra de manera más eficiente:

1. **App Destacada**: PicShop aparece como "E-pix Editor" en la página `/apps`
2. **Enlace Directo**: El botón "Probar herramienta" abre directamente la URL de PicShop
3. **Redirección Automática**: Si alguien va a `/apps/picshop`, se redirige automáticamente
4. **Sin Iframe**: Eliminamos el iframe problemático para mejor performance

### **Ventajas del Nuevo Sistema:**
- ✅ **Mejor Performance**: No hay carga de iframe pesado
- ✅ **Experiencia Completa**: Los usuarios ven la interfaz completa de PicShop
- ✅ **Menos Errores**: Eliminamos problemas de CORS y carga
- ✅ **SEO Mejorado**: Enlaces directos en lugar de contenido embebido

## 🛠️ Troubleshooting

### Problema: "API key not valid"
```bash
# Verifica que la API key en .env.local sea correcta
cat picshop/.env.local
```

### Problema: "Not authenticated"
```bash
gcloud auth login
gcloud config set project TU_PROJECT_ID
```

### Problema: "Build failed"
```bash
# Verifica que todas las dependencias estén instaladas
cd picshop && npm install
```

### Problema: "App no se abre desde el sitio web"
```bash
# Verifica que la URL en Apps.jsx sea correcta
# Verifica que external: true esté configurado
```

## 📊 Monitoreo

Después del despliegue, puedes monitorear:

```bash
# Ver logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=picshop"

# Ver métricas
gcloud run services describe picshop --region=us-central1
```

## 🔄 Actualizaciones

Para actualizar PicShop:

```bash
cd picshop
# Hacer cambios...
git add .
git commit -m "Update PicShop"

# Re-desplegar
gcloud run deploy picshop --source .
```

---

**Estado:** ✅ PicShop desplegado y operativo

## 🎉 DESPLIEGUE COMPLETADO

### **Servicio Activo:**
- **URL:** https://picshop-1071804760043.us-central1.run.app
- **Estado:** ✅ Funcionando
- **Región:** us-central1
- **Proyecto:** aleni-automation
- **API Key:** ✅ Configurada como secreto

### **Integración Web:**
- ✅ URL actualizada en `Apps.jsx` como app destacada
- ✅ Componente `PicShopEmbed.jsx` simplificado para redirección
- ✅ Sistema de enlaces externos implementado
- ✅ Primera app destacada en `/apps`
- ✅ Lista para producción

**Última actualización:** Diciembre 2024
