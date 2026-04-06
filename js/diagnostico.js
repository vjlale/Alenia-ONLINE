// Sistema de diagnóstico para Alenia Website
// Este script te ayudará a identificar problemas específicos con tu sitio web

(function() {
  console.log('🔍 Sistema de diagnóstico Alenia iniciado');
  
  // Información general del sistema
  console.log('📊 Información del navegador:', navigator.userAgent);
  console.log('🔄 Estado de la página:', document.readyState);
  
  // Comprobar React
  function checkReact() {
    console.log('⚛️ Comprobando React...');
    if (window.React) {
      console.log('✅ React está disponible en window.React');
    } else {
      console.log('❌ React no está disponible como objeto global');
    }
    
    const rootElement = document.getElementById('root');
    console.log('🌱 Estado del elemento root:', rootElement ? 
      `Encontrado, contiene ${rootElement.children.length} elementos hijos` : 
      'No encontrado');
    
    // Intenta verificar si React está funcionando buscando elementos React Fiber
    try {
      const possibleReactElement = document.querySelector('[data-reactroot]');
      if (possibleReactElement) {
        console.log('✅ Elementos React detectados en el DOM');
      } else {
        console.log('❌ No se detectaron elementos React en el DOM');
      }
    } catch (e) {
      console.log('❌ Error al buscar elementos React:', e);
    }
  }
  
  // Comprobar CSS
  function checkCSS() {
    console.log('🎨 Comprobando CSS...');
    const styleSheets = document.styleSheets;
    console.log(`📑 Hojas de estilo cargadas: ${styleSheets.length}`);
    
    // Intentar acceder a las hojas de estilo para ver si hay errores CORS
    try {
      for (let i = 0; i < styleSheets.length; i++) {
        const sheet = styleSheets[i];
        try {
          const rules = sheet.cssRules || sheet.rules;
          console.log(`✅ Hoja de estilo ${i + 1}: ${sheet.href || 'inline'} - ${rules.length} reglas`);
        } catch (e) {
          if (e.name === 'SecurityError') {
            console.log(`❌ CORS Error en hoja de estilo ${i + 1}: ${sheet.href} - Posible problema de CORS`);
          } else {
            console.log(`❌ Error en hoja de estilo ${i + 1}: ${sheet.href} - ${e.message}`);
          }
        }
      }
    } catch (e) {
      console.log('❌ Error general al analizar hojas de estilo:', e);
    }
  }
  
  // Comprobar recursos cargados
  function checkResources() {
    console.log('🔗 Comprobando recursos cargados...');
    
    // Scripts
    const scripts = document.scripts;
    console.log(`📜 Scripts cargados: ${scripts.length}`);
    
    // Intentar identificar si el script principal de React se ha cargado
    let reactScriptFound = false;
    for (let i = 0; i < scripts.length; i++) {
      const script = scripts[i];
      if (script.src && (script.src.includes('react') || script.src.includes('main.') || script.src.includes('bundle.'))) {
        console.log(`✅ Script relevante: ${script.src}`);
        reactScriptFound = true;
      }
    }
    
    if (!reactScriptFound) {
      console.log('❌ No se detectaron scripts principales de React/bundle');
    }
    
    // Comprobar si hay errores 404 o recursos que no se cargaron
    if (window.performance) {
      const resources = window.performance.getEntriesByType('resource');
      let failedResources = 0;
      
      resources.forEach(resource => {
        // Aquí no podemos detectar errores HTTP directamente con Performance API
        // pero podemos verificar los tiempos de transferencia
        if (resource.transferSize === 0 && resource.decodedBodySize === 0 && !resource.name.includes('data:')) {
          console.log(`⚠️ Posible recurso fallido: ${resource.name}`);
          failedResources++;
        }
      });
      
      console.log(`🔢 Recursos totales cargados: ${resources.length}, posiblemente fallidos: ${failedResources}`);
    }
  }
  
  // Ejecutar diagnóstico completo cuando la página termine de cargar
  window.addEventListener('load', function() {
    console.log('🚀 Página cargada completamente, ejecutando diagnóstico completo...');
    
    // Esperar un momento para que React tenga tiempo de inicializarse
    setTimeout(() => {
      checkReact();
      checkCSS();
      checkResources();
      
      console.log('🏁 Diagnóstico completado');
    }, 1000);
  });
  
  // También ejecutar un diagnóstico parcial de inmediato
  checkReact();
  checkCSS();
  
  // Añadir funciones al objeto global para diagnóstico manual
  window.aleniaDiagnostics = {
    checkReact,
    checkCSS,
    checkResources,
    runAll: function() {
      checkReact();
      checkCSS();
      checkResources();
    }
  };
  
  console.log('🛠️ Diagnóstico inicial completado. Puedes ejecutar diagnósticos adicionales con window.aleniaDiagnostics');
})();
