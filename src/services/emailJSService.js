import emailjs from '@emailjs/browser';

/**
 * Servicio de EmailJS para envío de formularios de servicios
 * Configuración centralizada para todos los formularios de ALENIA
 */
class EmailJSService {
  constructor() {
    // IDs de configuración - EmailJS ALENIA
    this.publicKey = 'AMxe85E4MNVHV01Mu';
    this.serviceId = 'service_iub8viq';
    
    // Template IDs disponibles (Plan gratuito: 2 templates)
    this.templateIds = {
      general: 'template_fbmrpdl',        // Template universal para todos los servicios
      desarrolloWeb: 'template_hv5y0ts',  // Template específico para desarrollo web
      // Fallback: todos los otros servicios usan el template general
      automatizacion: 'template_fbmrpdl',
      marketingDigital: 'template_fbmrpdl',
      consultoriaIA: 'template_fbmrpdl',
      analytics: 'template_fbmrpdl'
    };

    // Inicializar EmailJS
    this.init();
  }

  /**
   * Inicializar EmailJS con la clave pública
   */
  init() {
    try {
      emailjs.init(this.publicKey);
      console.log('📧 EmailJS inicializado correctamente - emailJSService.js:34');
    } catch (error) {
      console.error('❌ Error inicializando EmailJS: - emailJSService.js:36', error);
    }
  }

  /**
   * Mapeo de categorías a tipos de template
   * NOTA: Plan gratuito solo permite 2 templates
   * - desarrollo-web: usa template específico
   * - otros servicios: usan template general con datos estructurados
   */
  getTemplateType(categoria) {
    const mapping = {
      'desarrollo-web': 'desarrolloWeb',
      'automatizacion': 'general',
      'marketing-digital': 'general',
      'consultoria-ia': 'general',
      'analytics': 'general',
      'contacto-general': 'general',
      'consultoria-general': 'general'
    };
    
    const templateType = mapping[categoria] || 'general';
    
    // Log informativo
    if (categoria === 'desarrollo-web') {
      console.log('📧 Usando template específico de Desarrollo Web - emailJSService.js:61');
    } else {
      console.log(`📧 Usando template general para ${categoria} - emailJSService.js:63`);
    }
    
    return templateType;
  }

  /**
   * Formatear datos base común a todos los formularios
   */
  formatBaseData(formData) {
    const messageContent = formData.descripcion || '';
    return {
      nombre: formData.nombre || '',
      email: formData.email || '',
  rubro: formData.rubro || '',
      telefono: formData.telefono || '',
      empresa: formData.empresa || '',
      message: messageContent, // Variable principal que funciona
      descripcion: messageContent, // Backup
      mensaje: messageContent, // Backup en español
      content: messageContent, // Backup
      body: messageContent, // Backup
      texto: messageContent, // Backup en español
      comentarios: messageContent, // Backup
      servicio_nombre: formData.servicio || '',
      categoria: formData.categoria || '',
      nivel: formData.nivel || null,
      fecha_envio: new Date().toLocaleString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
  }

  /**
   * Formatear datos específicos para Desarrollo Web
   */
  formatDesarrolloWebData(formData) {
    const baseData = this.formatBaseData(formData);
    
    return {
      ...baseData,
      // Sobrescribir 'message' con variable específica para desarrollo web
      message: `Proyecto: ${formData.tipoProyecto || 'No especificado'}\n\nDescripción: ${formData.descripcion || ''}`,
      descripcion_proyecto: formData.descripcion || '', // Variable específica del proyecto
      tipo_proyecto: formData.tipoProyecto || '',
      presupuesto: formData.presupuesto || '',
      tiempo_esperado: formData.tiempoEsperado || '',
      tiene_dominio: formData.tieneDominio || false,
      dominio_existente: formData.dominioExistente || '',
      sitio_inspiracion: formData.sitioInspiracion || '',
      funcionalidades: formData.funcionalidades ? formData.funcionalidades.join(', ') : '',
      funcionalidades_list: formData.funcionalidades || [],
      detalles_especificos: this.formatDetallesEspecificos(formData, 'desarrolloWeb')
    };
  }

  /**
   * Formatear datos específicos para Automatización
   */
  formatAutomatizacionData(formData) {
    const baseData = this.formatBaseData(formData);
    
    return {
      ...baseData,
      tipo_negocio: formData.tipoNegocio || '',
      problema_principal: formData.problemaPrincipal || '',
      procesos_automatizar: formData.procesosAutomatizar ? formData.procesosAutomatizar.join(', ') : '',
      procesos_list: formData.procesosAutomatizar || [],
      volumen_mensual: formData.volumenMensual || '',
      herramientas_actuales: formData.herramientasActuales || '',
      detalles_especificos: this.formatDetallesEspecificos(formData, 'automatizacion')
    };
  }

  /**
   * Formatear datos específicos para Marketing Digital
   */
  formatMarketingDigitalData(formData) {
    const baseData = this.formatBaseData(formData);
    
    return {
      ...baseData,
      industria: formData.industria || '',
      experiencia_marketing: formData.experienciaMarketing || '',
      presupuesto_mensual: formData.presupuestoMensual || '',
      objetivos: formData.objetivos ? formData.objetivos.join(', ') : '',
      objetivos_list: formData.objetivos || [],
      plataformas: formData.plataformas ? formData.plataformas.join(', ') : '',
      plataformas_list: formData.plataformas || [],
      audiencia_objetivo: formData.audienciaObjetivo || '',
      competencia: formData.competencia || '',
      detalles_especificos: this.formatDetallesEspecificos(formData, 'marketingDigital')
    };
  }

  /**
   * Formatear datos específicos para Consultoría IA
   */
  formatConsultoriaIAData(formData) {
    const baseData = this.formatBaseData(formData);
    
    return {
      ...baseData,
      tamano_empresa: formData.tamanoEmpresa || '',
      nivel_conocimiento_ia: formData.nivelConocimientoIA || '',
      objetivo_ia: formData.objetivoIA || '',
      tipo_solucion_ia: formData.tipoSolucionIA ? formData.tipoSolucionIA.join(', ') : '',
      soluciones_list: formData.tipoSolucionIA || [],
      herramientas_ia_actuales: formData.herramientasIAActuales || '',
      presupuesto_ia: formData.presupuestoIA || '',
      detalles_especificos: this.formatDetallesEspecificos(formData, 'consultoriaIA')
    };
  }

  /**
   * Formatear datos específicos para Analytics
   */
  formatAnalyticsData(formData) {
    const baseData = this.formatBaseData(formData);
    
    return {
      ...baseData,
      madurez_analytics: formData.madurezAnalytics || '',
      fuentes_datos: formData.fuentesDatos ? formData.fuentesDatos.join(', ') : '',
      fuentes_list: formData.fuentesDatos || [],
      tipo_reportes: formData.tipoReportes || '',
      metricas_importantes: formData.metricasImportantes ? formData.metricasImportantes.join(', ') : '',
      metricas_list: formData.metricasImportantes || [],
      stakeholders: formData.stakeholders || '',
      frecuencia_reportes: formData.frecuenciaReportes || '',
      detalles_especificos: this.formatDetallesEspecificos(formData, 'analytics')
    };
  }

  /**
   * Formatear detalles específicos como HTML para el email
   */
  formatDetallesEspecificos(formData, tipo) {
    let html = '<ul style="list-style-type: none; padding: 0;">';
    
    switch (tipo) {
      case 'desarrolloWeb':
        if (formData.funcionalidades?.length) {
          html += '<li><strong>Funcionalidades:</strong></li>';
          formData.funcionalidades.forEach(func => {
            html += `<li style="margin-left: 20px;">✓ ${func}</li>`;
          });
        }
        break;
        
      case 'automatizacion':
        if (formData.procesosAutomatizar?.length) {
          html += '<li><strong>Procesos a Automatizar:</strong></li>';
          formData.procesosAutomatizar.forEach(proceso => {
            html += `<li style="margin-left: 20px;">⚡ ${proceso}</li>`;
          });
        }
        break;
        
      case 'marketingDigital':
        if (formData.objetivos?.length) {
          html += '<li><strong>Objetivos:</strong></li>';
          formData.objetivos.forEach(objetivo => {
            html += `<li style="margin-left: 20px;">🎯 ${objetivo}</li>`;
          });
        }
        if (formData.plataformas?.length) {
          html += '<li><strong>Plataformas:</strong></li>';
          formData.plataformas.forEach(plataforma => {
            html += `<li style="margin-left: 20px;">📱 ${plataforma}</li>`;
          });
        }
        break;
        
      case 'consultoriaIA':
        if (formData.tipoSolucionIA?.length) {
          html += '<li><strong>Soluciones IA:</strong></li>';
          formData.tipoSolucionIA.forEach(solucion => {
            html += `<li style="margin-left: 20px;">🤖 ${solucion}</li>`;
          });
        }
        break;
        
      case 'analytics':
        if (formData.fuentesDatos?.length) {
          html += '<li><strong>Fuentes de Datos:</strong></li>';
          formData.fuentesDatos.forEach(fuente => {
            html += `<li style="margin-left: 20px;">📊 ${fuente}</li>`;
          });
        }
        if (formData.metricasImportantes?.length) {
          html += '<li><strong>Métricas Clave:</strong></li>';
          formData.metricasImportantes.forEach(metrica => {
            html += `<li style="margin-left: 20px;">📈 ${metrica}</li>`;
          });
        }
        break;
    }
    
    html += '</ul>';
    return html;
  }

  /**
   * Enviar formulario según el tipo de servicio
   */
  async sendServiceForm(formData, servicio) {
    try {
      // Validar datos requeridos mínimos
      if (!formData.nombre || !formData.email) {
        throw new Error('Faltan datos requeridos: nombre y email');
      }

      // Asegurar valores por defecto
      const emailData = {
        ...formData,
        telefono: formData.telefono || 'No especificado',
        empresa: formData.empresa || 'No especificada'
      };

      // Determinar tipo de template
      const templateType = this.getTemplateType(servicio?.categoria);
      const templateId = this.templateIds[templateType];

      if (!templateId) {
        throw new Error(`No se encontró template para: ${templateType}`);
      }

      // Formatear datos según el tipo
      let finalEmailData;
      switch (templateType) {
        case 'desarrolloWeb':
          finalEmailData = this.formatDesarrolloWebData(emailData);
          break;
        case 'automatizacion':
          finalEmailData = this.formatAutomatizacionData(emailData);
          break;
        case 'marketingDigital':
          finalEmailData = this.formatMarketingDigitalData(emailData);
          break;
        case 'consultoriaIA':
          finalEmailData = this.formatConsultoriaIAData(emailData);
          break;
        case 'analytics':
          finalEmailData = this.formatAnalyticsData(emailData);
          break;
        default:
          finalEmailData = this.formatBaseData(emailData);
      }

      // Enviar email
      console.log('📧 Enviando formulario: - emailJSService.js:317', { templateType, templateId, finalEmailData });
      console.log('🔍 Campo descripcion enviado: - emailJSService.js:318', finalEmailData.descripcion);
      console.log('🔍 Campo message enviado: - emailJSService.js:319', finalEmailData.message);
      console.log('🔍 Campo mensaje enviado: - emailJSService.js:320', finalEmailData.mensaje);
      console.log('🔍 Todos los campos: - emailJSService.js:321', Object.keys(finalEmailData));
      console.log('🔍 DEBUGGING  Objeto completo que se envía: - emailJSService.js:322', JSON.stringify(finalEmailData, null, 2));
      
      const response = await emailjs.send(
        this.serviceId,
        templateId,
        finalEmailData
      );

      console.log('✅ Email enviado exitosamente: - emailJSService.js:330', response);
      return { success: true, response };

    } catch (error) {
      console.error('❌ Error enviando email: - emailJSService.js:334', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Verificar configuración de EmailJS
   */
  isConfigured() {
    return this.publicKey !== 'TU_PUBLIC_KEY_AQUI' && 
           this.serviceId !== 'TU_SERVICE_ID_AQUI';
  }

  /**
   * Obtener estado de configuración
   */
  getConfigStatus() {
    return {
      configured: this.isConfigured(),
      publicKey: this.publicKey,
      serviceId: this.serviceId,
      templates: Object.keys(this.templateIds).length
    };
  }
}

// Crear instancia única
const emailJSService = new EmailJSService();

export default emailJSService;
