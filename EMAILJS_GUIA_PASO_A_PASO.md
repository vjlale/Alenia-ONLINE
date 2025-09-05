# 🚀 GUÍA COMPLETA EMAILJS - CONFIGURACIÓN PASO A PASO

## 📋 **CHECKLIST DE CONFIGURACIÓN**

### ✅ **PASO 1: Registro en EmailJS**
1. Ve a: https://www.emailjs.com/
2. Click en **"Sign Up"**
3. Usa tu email corporativo: `tu-email@alenia.online`
4. Verifica tu email
5. Inicia sesión en el dashboard

---

### ✅ **PASO 2: Configurar Servicio de Email**

1. **En el dashboard, click en "Email Services"**
2. **Click "Add New Service"**
3. **Selecciona "Gmail"** (recomendado)
4. **Sigue estos pasos:**
   - Click "Connect Account"
   - Autoriza con tu Gmail corporativo
   - Configura el nombre del servicio: `ALENIA_Gmail`
5. **Guarda el SERVICE_ID** que aparece (ej: `service_abc123`)

**📝 ANOTA AQUÍ TU SERVICE_ID:**
```
SERVICE_ID: service_iub8viq___________________
```

---

### ✅ **PASO 3: Crear Email Templates**

#### **Template 1: Formulario General**
1. Click en **"Email Templates"**
2. Click **"Create New Template"**
3. **Template Name:** `alenia_service_inquiry`
4. **Subject:** `Nueva consulta de {{servicio_nombre}} - {{nombre}}`
5. **Copia y pega el HTML de la PLANTILLA 1** (del archivo anterior)
6. Click **"Save"**
7. **Guarda el TEMPLATE_ID** (ej: `template_xyz789`)

#### **Template 2: Desarrollo Web**
1. **Create New Template**
2. **Template Name:** `alenia_desarrollo_web`
3. **Subject:** `💻 Nuevo proyecto de Desarrollo Web - {{nombre}}`
4. **Copia y pega el HTML de la PLANTILLA 2**
5. **Save y guarda el TEMPLATE_ID**

#### **Template 3: Automatización**
1. **Create New Template**
2. **Template Name:** `alenia_automatizacion`
3. **Subject:** `⚡ Nueva consulta de Automatización - {{nombre}}`
4. **Copia y pega el HTML de la PLANTILLA 3**
5. **Save y guarda el TEMPLATE_ID**

#### **Template 4: Marketing Digital**
1. **Create New Template**
2. **Template Name:** `alenia_marketing_digital`
3. **Subject:** `📈 Nueva estrategia de Marketing Digital - {{nombre}}`
4. **Copia y pega el HTML de la PLANTILLA 4**
5. **Save y guarda el TEMPLATE_ID**

#### **Template 5: Consultoría IA**
1. **Create New Template**
2. **Template Name:** `alenia_consultoria_ia`
3. **Subject:** `🧠 Nueva consultoría de IA - {{nombre}}`
4. **Copia y pega el HTML de la PLANTILLA 5**
5. **Save y guarda el TEMPLATE_ID**

#### **Template 6: Analytics**
1. **Create New Template**
2. **Template Name:** `alenia_analytics`
3. **Subject:** `📊 Nueva consulta de Analytics - {{nombre}}`
4. **Copia y pega el HTML de la PLANTILLA 6**
5. **Save y guarda el TEMPLATE_ID**

**📝 ANOTA AQUÍ TUS TEMPLATE_IDs:**
```
General:         template_fbmrpdl___________________
Desarrollo Web:  template_hv5y0ts___________________
Automatización:  ___________________
Marketing:       ___________________
Consultoría IA:  ___________________
Analytics:       ___________________
```

---

### ✅ **PASO 4: Obtener Public Key**

1. **En el dashboard, click en "Account"**
2. **Ve a "API Keys"**
3. **Copia tu "Public Key"** (ej: `user_abc123`)

**📝 ANOTA AQUÍ TU PUBLIC_KEY:**
```
PUBLIC_KEY: AMxe85E4MNVHV01Mu

---

### ✅ **PASO 5: Configurar Variables en Templates**

Para cada template creado:

1. **Click en el template**
2. **Ve a "Settings"**
3. **En "Auto-Reply" (opcional):**
   - Subject: `Gracias por contactar ALENIA`
   - Message: `Hemos recibido tu consulta. Te contactaremos en menos de 24 horas.`

---

### ✅ **PASO 6: Testear Templates**

1. **En cada template, click "Test it"**
2. **Completa los datos de prueba:**
   ```
   nombre: Juan Pérez
   email: juan@empresa.com
   telefono: +52 55 1234 5678
   empresa: Mi Empresa
   descripcion: Necesito una página web
   servicio_nombre: Desarrollo Web
   categoria: desarrollo-web
   ```
3. **Envía el test**
4. **Verifica que llegue el email correctamente**

---

## 🔧 **PASO 7: Configurar en el Código**

Una vez que tengas todos los IDs, edita el archivo:
`src/services/emailJSService.js`

**Reemplaza estas líneas:**
```javascript
// ANTES:
this.publicKey = 'TU_PUBLIC_KEY_AQUI';
this.serviceId = 'TU_SERVICE_ID_AQUI';

// DESPUÉS:
this.publicKey = 'tu_public_key_real';
this.serviceId = 'tu_service_id_real';
```

**Y actualiza los template IDs:**
```javascript
this.templateIds = {
  general: 'tu_template_general_id',
  desarrolloWeb: 'tu_template_desarrollo_id',
  automatizacion: 'tu_template_automatizacion_id',
  marketingDigital: 'tu_template_marketing_id',
  consultoriaIA: 'tu_template_ia_id',
  analytics: 'tu_template_analytics_id'
};
```

---

## 🧪 **PASO 8: Probar en la Aplicación**

1. **Guarda los cambios**
2. **Ve a**: http://localhost:3001/soluciones
3. **Click en "Solicitar Información"** en cualquier servicio
4. **Completa el formulario**
5. **Envía y verifica que llegue el email**

---

## 📊 **PASO 9: Monitoreo**

En el dashboard de EmailJS puedes ver:
- ✅ **Emails enviados**
- ✅ **Rate de éxito**
- ✅ **Errores** (si los hay)
- ✅ **Límites de uso**

**Plan gratuito:** 200 emails/mes
**Plan Pro:** $15/mes para 100,000 emails

---

## 🚨 **TROUBLESHOOTING**

### **Error: "Public key required"**
- Verifica que hayas copiado bien el PUBLIC_KEY
- Asegúrate de que no tenga espacios extra

### **Error: "Template not found"**
- Verifica los TEMPLATE_IDs
- Asegúrate de que los nombres coincidan exactamente

### **Error: "Service not found"**
- Verifica el SERVICE_ID
- Asegúrate de que el servicio esté activo

### **Emails no llegan**
- Revisa la carpeta de SPAM
- Verifica la configuración de Gmail
- Checa los logs en EmailJS dashboard

---

## 📝 **PLANTILLA DE CONFIGURACIÓN FINAL**

**Copia este código y reemplaza en `emailJSService.js`:**

```javascript
// CONFIGURACIÓN FINAL - REEMPLAZA TUS VALORES REALES
this.publicKey = 'TU_PUBLIC_KEY';
this.serviceId = 'TU_SERVICE_ID';

this.templateIds = {
  general: 'TU_TEMPLATE_GENERAL',
  desarrolloWeb: 'TU_TEMPLATE_DESARROLLO',
  automatizacion: 'TU_TEMPLATE_AUTOMATIZACION',
  marketingDigital: 'TU_TEMPLATE_MARKETING',
  consultoriaIA: 'TU_TEMPLATE_IA',
  analytics: 'TU_TEMPLATE_ANALYTICS'
};
```

---

## 🎯 **¡LISTO!**

Una vez configurado, tus formularios enviarán emails automáticamente con:
- ✅ **Diseño profesional** por servicio
- ✅ **Datos estructurados** y fáciles de leer
- ✅ **Información específica** según el tipo de consulta
- ✅ **Autorespuesta** al cliente (opcional)

**¡Pégame aquí tus IDs cuando los tengas y te ayudo con la configuración final!** 🚀
