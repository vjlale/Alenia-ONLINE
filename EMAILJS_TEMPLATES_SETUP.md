# 📧 PLANTILLAS EMAILJS - ALENIA SERVICIOS

## 🎯 **Configuración Paso a Paso**

### **PASO 1: Crear cuenta en EmailJS**
1. Ve a: https://www.emailjs.com/
2. Registrate con tu email corporativo
3. Verifica tu email
4. Accede al dashboard

### **PASO 2: Configurar Servicio de Email**
1. En el dashboard, click en **"Add New Service"**
2. Selecciona **Gmail** (recomendado) o tu proveedor
3. Sigue la autenticación OAuth
4. Guarda el **SERVICE_ID** (ej: `service_abc123`)

### **PASO 3: Crear Templates**
Copia y pega estas plantillas exactas en EmailJS:

---

## 📋 **PLANTILLA 1: FORMULARIO GENERAL DE SERVICIOS**
template_fbmrpdl
### **Template Name:** `alenia_service_inquiry`
### **Subject:** `Nueva consulta de {{servicio_nombre}} - {{nombre}}`

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: linear-gradient(135deg, #00ff88, #0066ff); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .info-box { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #00ff88; }
        .footer { background: #0a0a0a; color: white; padding: 15px; text-align: center; font-size: 12px; }
        .highlight { color: #0066ff; font-weight: bold; }
        .nivel-badge { background: #00ff88; color: #0a0a0a; padding: 5px 10px; border-radius: 15px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚀 Nueva Consulta ALENIA</h1>
        <p>Formulario de {{servicio_nombre}}</p>
    </div>
    
    <div class="content">
        <div class="info-box">
            <h3>📋 Información del Cliente</h3>
            <p><strong>Nombre:</strong> {{nombre}}</p>
            <p><strong>Email:</strong> {{email}}</p>
            <p><strong>Teléfono:</strong> {{telefono}}</p>
            <p><strong>Empresa:</strong> {{empresa}}</p>
        </div>
        
        <div class="info-box">
            <h3>🎯 Detalles del Servicio</h3>
            <p><strong>Servicio:</strong> <span class="highlight">{{servicio_nombre}}</span></p>
            <p><strong>Categoría:</strong> {{categoria}}</p>
            {{#nivel}}
            <p><strong>Nivel seleccionado:</strong> <span class="nivel-badge">{{nivel}}</span></p>
            {{/nivel}}
            <p><strong>Fecha:</strong> {{fecha_envio}}</p>
        </div>
        
        <div class="info-box">
            <h3>💬 Mensaje del Cliente</h3>
            <p style="background: #f0f0f0; padding: 10px; border-radius: 5px;">{{mensaje}}</p>
        </div>
        
        {{#detalles_especificos}}
        <div class="info-box">
            <h3>🔍 Detalles Específicos</h3>
            <div style="background: #f0f0f0; padding: 10px; border-radius: 5px;">
                {{{detalles_especificos}}}
            </div>
        </div>
        {{/detalles_especificos}}
        
        <div class="info-box">
            <h3>⚡ Acciones Recomendadas</h3>
            <ul>
                <li>📞 Contactar en menos de 24 horas</li>
                <li>📊 Preparar propuesta personalizada</li>
                <li>📅 Agendar reunión de diagnóstico</li>
                <li>💼 Enviar portfolio relevante</li>
            </ul>
        </div>
    </div>
    
    <div class="footer">
        <p>🤖 Generado automáticamente por ALENIA CRM</p>
        <p>alenia.online | +52 (xxx) xxx-xxxx</p>
    </div>
</body>
</html>
```

---

## 📋 **PLANTILLA 2: DESARROLLO WEB**
template_hv5y0ts
### **Template Name:** `alenia_desarrollo_web`
### **Subject:** `💻 Nuevo proyecto de Desarrollo Web - {{nombre}}`

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: linear-gradient(135deg, #22d3ee, #0066ff); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .info-box { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #22d3ee; }
        .footer { background: #0a0a0a; color: white; padding: 15px; text-align: center; font-size: 12px; }
        .presupuesto { background: #22d3ee; color: white; padding: 8px 12px; border-radius: 20px; font-weight: bold; }
        .funcionalidad { background: #f0f8ff; padding: 5px 8px; margin: 2px; border-radius: 10px; display: inline-block; }
    </style>
</head>
<body>
    <div class="header">
        <h1>💻 Proyecto de Desarrollo Web</h1>
        <p>Cliente: {{nombre}}</p>
    </div>
    
    <div class="content">
        <div class="info-box">
            <h3>👤 Cliente</h3>
            <p><strong>Nombre:</strong> {{nombre}}</p>
            <p><strong>Email:</strong> {{email}}</p>
            <p><strong>Teléfono:</strong> {{telefono}}</p>
            <p><strong>Empresa:</strong> {{empresa}}</p>
        </div>
        
        <div class="info-box">
            <h3>🎯 Detalles del Proyecto</h3>
            <p><strong>Tipo de proyecto:</strong> {{tipo_proyecto}}</p>
            <p><strong>Presupuesto:</strong> <span class="presupuesto">{{presupuesto}}</span></p>
            <p><strong>Tiempo esperado:</strong> {{tiempo_esperado}}</p>
            {{#tiene_dominio}}
            <p><strong>Dominio existente:</strong> {{dominio_existente}}</p>
            {{/tiene_dominio}}
            {{#sitio_inspiracion}}
            <p><strong>Inspiración:</strong> {{sitio_inspiracion}}</p>
            {{/sitio_inspiracion}}
        </div>
        
        {{#funcionalidades}}
        <div class="info-box">
            <h3>⚙️ Funcionalidades Requeridas</h3>
            <div>
                {{#funcionalidades_list}}
                <span class="funcionalidad">{{.}}</span>
                {{/funcionalidades_list}}
            </div>
        </div>
        {{/funcionalidades}}
        
        <div class="info-box">
            <h3>💭 Descripción del Proyecto</h3>
            <p style="background: #f0f8ff; padding: 15px; border-radius: 8px;">{{descripcion}}</p>
        </div>
        
        <div class="info-box">
            <h3>🚀 Próximos Pasos</h3>
            <ul>
                <li>📞 Llamada de diagnóstico en 24h</li>
                <li>📊 Propuesta técnica detallada</li>
                <li>🎨 Mockups y wireframes</li>
                <li>⏰ Timeline del proyecto</li>
                <li>💰 Cotización final</li>
            </ul>
        </div>
    </div>
    
    <div class="footer">
        <p>💻 Equipo de Desarrollo Web ALENIA</p>
        <p>Especialistas en {{tipo_proyecto}}</p>
    </div>
</body>
</html>
```

---

## 📋 **PLANTILLA 3: AUTOMATIZACIÓN**

### **Template Name:** `alenia_automatizacion`
### **Subject:** `⚡ Nueva consulta de Automatización - {{nombre}}`

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: linear-gradient(135deg, #22c55e, #059669); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .info-box { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #22c55e; }
        .footer { background: #0a0a0a; color: white; padding: 15px; text-align: center; font-size: 12px; }
        .problema { background: #fee2e2; color: #dc2626; padding: 8px 12px; border-radius: 15px; }
        .proceso { background: #dcfce7; color: #166534; padding: 5px 8px; margin: 2px; border-radius: 10px; display: inline-block; }
        .volumen { background: #22c55e; color: white; padding: 8px 15px; border-radius: 20px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="header">
        <h1>⚡ Proyecto de Automatización</h1>
        <p>{{tipo_negocio}} - {{nombre}}</p>
    </div>
    
    <div class="content">
        <div class="info-box">
            <h3>🏢 Información del Negocio</h3>
            <p><strong>Contacto:</strong> {{nombre}} ({{email}})</p>
            <p><strong>Teléfono:</strong> {{telefono}}</p>
            <p><strong>Empresa:</strong> {{empresa}}</p>
            <p><strong>Tipo de negocio:</strong> {{tipo_negocio}}</p>
            <p><strong>Volumen mensual:</strong> <span class="volumen">{{volumen_mensual}}</span></p>
        </div>
        
        <div class="info-box">
            <h3>🚨 Problema Principal</h3>
            <p><span class="problema">{{problema_principal}}</span></p>
        </div>
        
        {{#procesos_automatizar}}
        <div class="info-box">
            <h3>🔄 Procesos a Automatizar</h3>
            <div>
                {{#procesos_list}}
                <span class="proceso">{{.}}</span>
                {{/procesos_list}}
            </div>
        </div>
        {{/procesos_automatizar}}
        
        {{#herramientas_actuales}}
        <div class="info-box">
            <h3>🛠️ Herramientas Actuales</h3>
            <p>{{herramientas_actuales}}</p>
        </div>
        {{/herramientas_actuales}}
        
        <div class="info-box">
            <h3>💭 Descripción Detallada</h3>
            <p style="background: #f0fdf4; padding: 15px; border-radius: 8px;">{{descripcion}}</p>
        </div>
        
        <div class="info-box">
            <h3>⚡ Plan de Automatización</h3>
            <ul>
                <li>🔍 Auditoría de procesos actuales</li>
                <li>📊 Mapeo de flujos de trabajo</li>
                <li>🤖 Diseño de automatizaciones</li>
                <li>⚙️ Implementación gradual</li>
                <li>📈 Medición de resultados</li>
            </ul>
        </div>
        
        <div class="info-box">
            <h3>💰 ROI Estimado</h3>
            <p>Con un volumen de <strong>{{volumen_mensual}}</strong>, estimamos:</p>
            <ul>
                <li>⏰ Ahorro de tiempo: 60-80%</li>
                <li>💸 Reducción de costos: 40-60%</li>
                <li>📈 Incremento en productividad: 200-300%</li>
            </ul>
        </div>
    </div>
    
    <div class="footer">
        <p>⚡ Equipo de Automatización ALENIA</p>
        <p>Especialistas en {{tipo_negocio}}</p>
    </div>
</body>
</html>
```

---

## 📋 **PLANTILLA 4: MARKETING DIGITAL**

### **Template Name:** `alenia_marketing_digital`
### **Subject:** `📈 Nueva estrategia de Marketing Digital - {{nombre}}`

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: linear-gradient(135deg, #a855f7, #7c3aed); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .info-box { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #a855f7; }
        .footer { background: #0a0a0a; color: white; padding: 15px; text-align: center; font-size: 12px; }
        .presupuesto { background: #a855f7; color: white; padding: 8px 15px; border-radius: 20px; font-weight: bold; }
        .objetivo { background: #f3e8ff; color: #7c3aed; padding: 5px 8px; margin: 2px; border-radius: 10px; display: inline-block; }
        .plataforma { background: #ddd6fe; color: #5b21b6; padding: 4px 8px; margin: 2px; border-radius: 8px; display: inline-block; font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>📈 Estrategia de Marketing Digital</h1>
        <p>{{industria}} - {{nombre}}</p>
    </div>
    
    <div class="content">
        <div class="info-box">
            <h3>🎯 Cliente</h3>
            <p><strong>Contacto:</strong> {{nombre}} ({{email}})</p>
            <p><strong>Teléfono:</strong> {{telefono}}</p>
            <p><strong>Empresa:</strong> {{empresa}}</p>
            <p><strong>Industria:</strong> {{industria}}</p>
            <p><strong>Experiencia en marketing:</strong> {{experiencia_marketing}}</p>
        </div>
        
        <div class="info-box">
            <h3>💰 Presupuesto</h3>
            <p><span class="presupuesto">{{presupuesto_mensual}}</span> mensuales</p>
        </div>
        
        {{#objetivos}}
        <div class="info-box">
            <h3>🎯 Objetivos de Marketing</h3>
            <div>
                {{#objetivos_list}}
                <span class="objetivo">{{.}}</span>
                {{/objetivos_list}}
            </div>
        </div>
        {{/objetivos}}
        
        {{#plataformas}}
        <div class="info-box">
            <h3>📱 Plataformas de Interés</h3>
            <div>
                {{#plataformas_list}}
                <span class="plataforma">{{.}}</span>
                {{/plataformas_list}}
            </div>
        </div>
        {{/plataformas}}
        
        {{#audiencia_objetivo}}
        <div class="info-box">
            <h3>👥 Audiencia Objetivo</h3>
            <p style="background: #faf5ff; padding: 15px; border-radius: 8px;">{{audiencia_objetivo}}</p>
        </div>
        {{/audiencia_objetivo}}
        
        {{#competencia}}
        <div class="info-box">
            <h3>🏆 Competencia Principal</h3>
            <p>{{competencia}}</p>
        </div>
        {{/competencia}}
        
        <div class="info-box">
            <h3>💭 Descripción de Necesidades</h3>
            <p style="background: #faf5ff; padding: 15px; border-radius: 8px;">{{descripcion}}</p>
        </div>
        
        <div class="info-box">
            <h3>📊 Estrategia Propuesta</h3>
            <ul>
                <li>🔍 Auditoría digital completa</li>
                <li>🎯 Definición de buyer persona</li>
                <li>📈 Plan de contenidos</li>
                <li>💰 Optimización de presupuesto</li>
                <li>📊 Dashboard de métricas</li>
                <li>🚀 Implementación gradual</li>
            </ul>
        </div>
        
        <div class="info-box">
            <h3>📈 KPIs a Medir</h3>
            <ul>
                <li>💰 ROAS (Return on Ad Spend)</li>
                <li>👥 CPL (Cost per Lead)</li>
                <li>🔄 Tasa de conversión</li>
                <li>📱 Engagement rate</li>
                <li>🎯 CAC (Customer Acquisition Cost)</li>
            </ul>
        </div>
    </div>
    
    <div class="footer">
        <p>📈 Equipo de Marketing Digital ALENIA</p>
        <p>Especialistas en {{industria}}</p>
    </div>
</body>
</html>
```

---

## 📋 **PLANTILLA 5: CONSULTORÍA IA**

### **Template Name:** `alenia_consultoria_ia`
### **Subject:** `🧠 Nueva consultoría de IA - {{nombre}}`

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: linear-gradient(135deg, #fb923c, #f97316); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .info-box { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #fb923c; }
        .footer { background: #0a0a0a; color: white; padding: 15px; text-align: center; font-size: 12px; }
        .nivel-ia { background: #fb923c; color: white; padding: 8px 15px; border-radius: 20px; font-weight: bold; }
        .solucion { background: #fed7aa; color: #c2410c; padding: 5px 8px; margin: 2px; border-radius: 10px; display: inline-block; }
        .empresa-size { background: #ffedd5; color: #ea580c; padding: 4px 8px; border-radius: 8px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🧠 Consultoría de Inteligencia Artificial</h1>
        <p>{{tamano_empresa}} - {{nombre}}</p>
    </div>
    
    <div class="content">
        <div class="info-box">
            <h3>🏢 Información de la Empresa</h3>
            <p><strong>Contacto:</strong> {{nombre}} ({{email}})</p>
            <p><strong>Teléfono:</strong> {{telefono}}</p>
            <p><strong>Empresa:</strong> {{empresa}}</p>
            <p><strong>Tamaño:</strong> <span class="empresa-size">{{tamano_empresa}}</span></p>
            <p><strong>Conocimiento en IA:</strong> <span class="nivel-ia">{{nivel_conocimiento_ia}}</span></p>
        </div>
        
        {{#objetivo_ia}}
        <div class="info-box">
            <h3>🎯 Objetivo con IA</h3>
            <p style="background: #fff7ed; padding: 15px; border-radius: 8px; color: #c2410c; font-weight: bold;">{{objetivo_ia}}</p>
        </div>
        {{/objetivo_ia}}
        
        {{#tipo_solucion_ia}}
        <div class="info-box">
            <h3>🤖 Tipo de Solución IA</h3>
            <div>
                {{#soluciones_list}}
                <span class="solucion">{{.}}</span>
                {{/soluciones_list}}
            </div>
        </div>
        {{/tipo_solucion_ia}}
        
        {{#herramientas_ia_actuales}}
        <div class="info-box">
            <h3>🛠️ Herramientas IA Actuales</h3>
            <p>{{herramientas_ia_actuales}}</p>
        </div>
        {{/herramientas_ia_actuales}}
        
        {{#presupuesto_ia}}
        <div class="info-box">
            <h3>💰 Presupuesto para IA</h3>
            <p><span class="nivel-ia">{{presupuesto_ia}}</span></p>
        </div>
        {{/presupuesto_ia}}
        
        <div class="info-box">
            <h3>💭 Descripción del Proyecto</h3>
            <p style="background: #fff7ed; padding: 15px; border-radius: 8px;">{{descripcion}}</p>
        </div>
        
        <div class="info-box">
            <h3>🧠 Plan de Implementación IA</h3>
            <ul>
                <li>🔍 Auditoría de datos existentes</li>
                <li>📊 Análisis de casos de uso</li>
                <li>🎯 Definición de objetivos medibles</li>
                <li>🤖 Diseño de arquitectura IA</li>
                <li>⚙️ Prototipo y pruebas</li>
                <li>🚀 Implementación escalable</li>
                <li>📈 Monitoreo y optimización</li>
            </ul>
        </div>
        
        <div class="info-box">
            <h3>📊 ROI Esperado con IA</h3>
            <ul>
                <li>⚡ Automatización: 70-90% de tareas repetitivas</li>
                <li>🎯 Precisión: Mejora del 40-60% en decisiones</li>
                <li>💰 Ahorro de costos: 30-50% operacionales</li>
                <li>🚀 Velocidad: 10x más rápido en procesos</li>
                <li>📈 Insights: Datos accionables en tiempo real</li>
            </ul>
        </div>
        
        <div class="info-box">
            <h3>⚠️ Consideraciones Técnicas</h3>
            <p><strong>Nivel de conocimiento:</strong> {{nivel_conocimiento_ia}}</p>
            <p><strong>Capacitación requerida:</strong> {{#nivel_conocimiento_ia}}{{#eq 'Principiante'}}Extensa{{/eq}}{{#eq 'Intermedio'}}Moderada{{/eq}}{{#eq 'Avanzado'}}Mínima{{/eq}}{{/nivel_conocimiento_ia}}</p>
            <p><strong>Tiempo de implementación:</strong> {{#tamano_empresa}}{{#eq 'Startup'}}2-4 meses{{/eq}}{{#eq 'Pequeña'}}3-6 meses{{/eq}}{{#eq 'Mediana'}}6-12 meses{{/eq}}{{#eq 'Grande'}}12-18 meses{{/eq}}{{/tamano_empresa}}</p>
        </div>
    </div>
    
    <div class="footer">
        <p>🧠 Equipo de IA ALENIA</p>
        <p>Especialistas en {{objetivo_ia}}</p>
    </div>
</body>
</html>
```

---

## 📋 **PLANTILLA 6: ANALYTICS**

### **Template Name:** `alenia_analytics`
### **Subject:** `📊 Nueva consulta de Analytics - {{nombre}}`

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .info-box { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #6366f1; }
        .footer { background: #0a0a0a; color: white; padding: 15px; text-align: center; font-size: 12px; }
        .madurez { background: #6366f1; color: white; padding: 8px 15px; border-radius: 20px; font-weight: bold; }
        .fuente { background: #e0e7ff; color: #3730a3; padding: 4px 8px; margin: 2px; border-radius: 8px; display: inline-block; font-size: 12px; }
        .metrica { background: #c7d2fe; color: #3730a3; padding: 5px 8px; margin: 2px; border-radius: 10px; display: inline-block; }
        .frecuencia { background: #818cf8; color: white; padding: 5px 10px; border-radius: 15px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>📊 Proyecto de Analytics</h1>
        <p>{{nombre}} - {{empresa}}</p>
    </div>
    
    <div class="content">
        <div class="info-box">
            <h3>📈 Cliente</h3>
            <p><strong>Contacto:</strong> {{nombre}} ({{email}})</p>
            <p><strong>Teléfono:</strong> {{telefono}}</p>
            <p><strong>Empresa:</strong> {{empresa}}</p>
            <p><strong>Madurez en Analytics:</strong> <span class="madurez">{{madurez_analytics}}</span></p>
        </div>
        
        {{#fuentes_datos}}
        <div class="info-box">
            <h3>📊 Fuentes de Datos Disponibles</h3>
            <div>
                {{#fuentes_list}}
                <span class="fuente">{{.}}</span>
                {{/fuentes_list}}
            </div>
        </div>
        {{/fuentes_datos}}
        
        {{#tipo_reportes}}
        <div class="info-box">
            <h3>📋 Tipos de Reportes Necesarios</h3>
            <p>{{tipo_reportes}}</p>
        </div>
        {{/tipo_reportes}}
        
        {{#metricas_importantes}}
        <div class="info-box">
            <h3>🎯 Métricas Clave</h3>
            <div>
                {{#metricas_list}}
                <span class="metrica">{{.}}</span>
                {{/metricas_list}}
            </div>
        </div>
        {{/metricas_importantes}}
        
        {{#stakeholders}}
        <div class="info-box">
            <h3>👥 Stakeholders</h3>
            <p>{{stakeholders}}</p>
        </div>
        {{/stakeholders}}
        
        {{#frecuencia_reportes}}
        <div class="info-box">
            <h3>⏰ Frecuencia de Reportes</h3>
            <p><span class="frecuencia">{{frecuencia_reportes}}</span></p>
        </div>
        {{/frecuencia_reportes}}
        
        <div class="info-box">
            <h3>💭 Descripción de Necesidades</h3>
            <p style="background: #f0f4ff; padding: 15px; border-radius: 8px;">{{descripcion}}</p>
        </div>
        
        <div class="info-box">
            <h3>📊 Solución Propuesta</h3>
            <ul>
                <li>🔍 Auditoría de datos actuales</li>
                <li>📊 Diseño de arquitectura de datos</li>
                <li>🎯 Implementación de dashboards</li>
                <li>⚙️ Automatización de reportes</li>
                <li>📈 KPIs y métricas personalizadas</li>
                <li>🎓 Capacitación del equipo</li>
            </ul>
        </div>
        
        <div class="info-box">
            <h3>💡 Beneficios Esperados</h3>
            <ul>
                <li>⚡ Decisiones basadas en datos en tiempo real</li>
                <li>📈 Incremento en eficiencia operativa: 40-60%</li>
                <li>🎯 Mejor segmentación de clientes</li>
                <li>💰 Optimización de inversiones</li>
                <li>📊 Visibilidad completa del negocio</li>
            </ul>
        </div>
        
        <div class="info-box">
            <h3>🛠️ Stack Tecnológico Recomendado</h3>
            <p><strong>Visualización:</strong> Power BI, Tableau, Looker Studio</p>
            <p><strong>Almacenamiento:</strong> BigQuery, Snowflake, Azure</p>
            <p><strong>ETL:</strong> Fivetran, Stitch, Airbyte</p>
            <p><strong>Madurez actual:</strong> {{madurez_analytics}}</p>
        </div>
    </div>
    
    <div class="footer">
        <p>📊 Equipo de Analytics ALENIA</p>
        <p>Expertos en Business Intelligence</p>
    </div>
</body>
</html>
```

---

## ✅ **PASO 4: Verificar Variables Auto-detectadas**

**¡Las variables se detectan automáticamente!** 🎉

Cuando pegas el HTML en EmailJS, todas las variables `{{nombre_variable}}` se detectan automáticamente y aparecen en la vista previa. **No necesitas configurar nada manualmente.**

### **Variables que EmailJS detecta por servicio:**

#### **Variables Globales (todos los templates):**
✅ `nombre`, `email`, `telefono`, `empresa`, `descripcion`, `fecha_envio`, `servicio_nombre`

#### **Desarrollo Web:**
✅ `tipo_proyecto`, `presupuesto`, `tiempo_esperado`, `dominio_existente`, `sitio_inspiracion`, `funcionalidades_list`

#### **Automatización:**
✅ `tipo_negocio`, `problema_principal`, `procesos_list`, `volumen_mensual`, `herramientas_actuales`

#### **Marketing Digital:**
✅ `industria`, `experiencia_marketing`, `presupuesto_mensual`, `objetivos_list`, `plataformas_list`, `audiencia_objetivo`, `competencia`

#### **Consultoría IA:**
✅ `tamano_empresa`, `nivel_conocimiento_ia`, `objetivo_ia`, `soluciones_list`, `herramientas_ia_actuales`, `presupuesto_ia`

#### **Analytics:**
✅ `madurez_analytics`, `fuentes_list`, `tipo_reportes`, `metricas_list`, `stakeholders`, `frecuencia_reportes`

---

## 🚀 **PASO 5: Obtener IDs de EmailJS**

Después de crear los templates:

1. **Copia el PUBLIC KEY** (ej: `user_abc123`)
2. **Copia cada TEMPLATE ID** (ej: `template_xyz789`)
3. **Copia el SERVICE ID** (ej: `service_def456`)

**Pégame estos 3 valores y continúo con la integración en React** 📧✨
