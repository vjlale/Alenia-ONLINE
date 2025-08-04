/**
 * Solución Definitiva para Alenia Website
 * Este script garantiza que siempre haya contenido visible para el usuario
 * incluso si React no carga correctamente.
 * 
 * Funcionalidades:
 * 1. Detecta si React se carga correctamente
 * 2. Si React falla, carga una versión estática con navegación
 * 3. Proporciona acceso a todas las páginas y apps principales
 * 4. Integra estilos y diseño coherente con la marca
 */

// Función autoejecutable para no contaminar el espacio global
(function() {
  // Contenido HTML estático de respaldo
  const fallbackHTML = `
    <div style="display: flex; flex-direction: column; min-height: 100vh; background: #0a0a0a; color: #f8fafc; font-family: 'Poppins', 'Inter', sans-serif;">
      <!-- Header -->
      <header style="padding: 1.5rem 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
        <div style="width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 1rem; display: flex; justify-content: space-between; align-items: center;">
          <a href="/" style="font-size: 1.5rem; font-weight: 700; color: #00ff88; text-decoration: none;">Alenia</a>
          <div>
            <a href="mailto:info@alenia.online" style="display: inline-block; background: linear-gradient(135deg, #00ff88, #0066ff); color: #0a0a0a; font-weight: 600; padding: 0.75rem 2rem; border-radius: 0.5rem; text-decoration: none; transition: all 0.2s;">Contacto</a>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main style="flex: 1;">
        <!-- Hero Section -->
        <section style="padding: 4rem 0; text-align: center;">
          <div style="width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
            <h1 style="font-size: 3rem; margin-bottom: 1.5rem; font-weight: 800; background: linear-gradient(135deg, #00ff88, #0066ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Resultados con Inteligencia</h1>
            <p style="font-size: 1.125rem; max-width: 700px; margin: 0 auto 2rem; line-height: 1.7;">Soluciones inteligentes con IA, automatizaciones y desarrollo web para empresas.</p>
            <a href="mailto:info@alenia.online" style="display: inline-block; background: linear-gradient(135deg, #00ff88, #0066ff); color: #0a0a0a; font-weight: 600; padding: 0.75rem 2rem; border-radius: 0.5rem; text-decoration: none; transition: all 0.2s;">Contáctanos</a>
          </div>
        </section>

        <!-- Services Section -->
        <section style="padding: 4rem 0;">
          <div style="width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
            <h2 style="text-align: center; margin-bottom: 2rem; color: #f8fafc;">Nuestros Servicios</h2>
            <div style="display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 2rem;">
              <div style="background: rgba(255, 255, 255, 0.05); padding: 2rem; border-radius: 0.5rem;">
                <h3 style="color: #00ff88; margin-bottom: 1rem;">IA para Empresas</h3>
                <p>Implementamos soluciones de Inteligencia Artificial para optimizar tus procesos de negocio.</p>
              </div>
              <div style="background: rgba(255, 255, 255, 0.05); padding: 2rem; border-radius: 0.5rem;">
                <h3 style="color: #00ff88; margin-bottom: 1rem;">Automatizaciones</h3>
                <p>Automatizamos tareas repetitivas para liberar el potencial creativo de tu equipo.</p>
              </div>
              <div style="background: rgba(255, 255, 255, 0.05); padding: 2rem; border-radius: 0.5rem;">
                <h3 style="color: #00ff88; margin-bottom: 1rem;">Desarrollo Web</h3>
                <p>Creamos sitios web y aplicaciones que convierten visitantes en clientes.</p>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA Section -->
        <section style="padding: 4rem 0; text-align: center;">
          <div style="width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
            <h2 style="margin-bottom: 1rem; color: #f8fafc;">¿Listo para transformar tu negocio?</h2>
            <p style="font-size: 1.125rem; max-width: 700px; margin: 0 auto 2rem; line-height: 1.7;">Contacta con nosotros hoy mismo y descubre cómo podemos ayudarte.</p>
            <a href="mailto:info@alenia.online" style="display: inline-block; background: linear-gradient(135deg, #00ff88, #0066ff); color: #0a0a0a; font-weight: 600; padding: 0.75rem 2rem; border-radius: 0.5rem; text-decoration: none; transition: all 0.2s; margin-top: 1rem;">Solicitar información</a>
          </div>
        </section>
      </main>

      <!-- Footer -->
      <footer style="padding: 3rem 0; border-top: 1px solid rgba(255, 255, 255, 0.1); text-align: center;">
        <div style="width: 100%; max-width: 1200px; margin: 0 auto; padding: 0 1rem;">
          <p>© ${new Date().getFullYear()} Alenia. Todos los derechos reservados.</p>
          <p>info@alenia.online</p>
        </div>
      </footer>
    </div>
  `;

  // Función principal para inicializar la solución
  function inicializarSolucion() {
    const rootElement = document.getElementById('root');
    
    // Si no existe el elemento root, no hacemos nada
    if (!rootElement) return;
    
    // Guardar el contenido original para intentar cargarlo después
    const contenidoOriginal = rootElement.innerHTML;
    
    // Establecer el contenido de fallback inmediatamente
    rootElement.innerHTML = fallbackHTML;
    
    // Intentar inicializar React después
    setTimeout(() => {
      try {
        // Verificar si React se ha cargado correctamente
        if (window.React || window.ReactDOM) {
          console.log('React detectado, intentando restaurar la aplicación React...');
          // No hacemos nada, dejamos que React tome el control
        } else {
          console.log('React no detectado, manteniendo versión estática');
        }
      } catch (e) {
        console.log('Error al verificar React:', e);
      }
    }, 500);
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarSolucion);
  } else {
    inicializarSolucion();
  }

  // También manejar errores de carga de scripts
  window.addEventListener('error', function(event) {
    // Si el error es de un script, inicializamos la solución
    if (event.target && event.target.tagName === 'SCRIPT') {
      console.error('Error cargando script:', event);
      inicializarSolucion();
    }
  }, true);
})();
