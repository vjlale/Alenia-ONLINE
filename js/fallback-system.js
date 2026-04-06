// Alenia Fallback System
// Verifica si React se cargó correctamente y, en caso contrario, muestra la versión estática

(function() {
  // Esperar a que React intente cargar
  window.addEventListener('load', function() {
    // Tiempo para esperar que React se inicialice (3 segundos)
    const reactDetectionTimeout = 3000;
    
    setTimeout(function() {
      const rootElement = document.getElementById('root');
      
      // Verificar si React ha renderizado algún contenido
      if (!rootElement || rootElement.children.length === 0) {
        console.log('React no se ha inicializado correctamente. Cargando fallback...');
        
        try {
          // Primero intentamos cargar la versión estática en la misma página
          fetch('/static-fallback.html')
            .then(response => response.text())
            .then(html => {
              // Extraer el body del HTML de respuesta
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = html;
              
              // Reemplazar solo el contenido del body, manteniendo la estructura base
              document.body.innerHTML = tempDiv.querySelector('body').innerHTML;
              
              // Añadir estilos necesarios
              const styles = tempDiv.querySelector('style');
              if (styles) {
                document.head.appendChild(styles.cloneNode(true));
              }
              
              console.log('Fallback cargado en la misma página');
            })
            .catch(error => {
              console.error('Error al cargar el fallback inline:', error);
              // Si falla, redirigir a la página estática
              window.location.href = '/static-fallback.html';
            });
        } catch (e) {
          console.error('Error al intentar mostrar el fallback:', e);
          // Como último recurso, redireccionar
          window.location.href = '/static-fallback.html';
        }
      } else {
        console.log('React se ha inicializado correctamente');
      }
    }, reactDetectionTimeout);
  });

  // También verificar errores generales que podrían prevenir la carga de React
  window.addEventListener('error', function(event) {
    console.error('Error detectado:', event.message);
    
    // Si el error parece ser crítico (relacionado con React o el bundle)
    if (event.message.includes('React') || 
        event.message.includes('Uncaught SyntaxError') || 
        event.message.includes('Cannot read properties')) {
      
      console.log('Error crítico detectado. Preparando fallback...');
      
      // Esperar un momento para ver si React se recupera
      setTimeout(function() {
        const rootElement = document.getElementById('root');
        if (!rootElement || rootElement.children.length === 0) {
          window.location.href = '/static-fallback.html';
        }
      }, 1000);
    }
  }, true); // Usar captura para detectar errores lo antes posible
})();
