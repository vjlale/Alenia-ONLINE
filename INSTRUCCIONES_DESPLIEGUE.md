# Instrucciones de Despliegue para Alenia Website

Este documento proporciona instrucciones detalladas para asegurar el despliegue correcto de la web de Alenia, incluyendo la implementación de la solución definitiva para evitar problemas de carga.

## Proceso de Compilación y Despliegue

### 1. Compilación Completa

Para generar una versión completa del sitio web con todas las soluciones de respaldo integradas:

```bash
npm run build:full
```

Este comando ejecuta:
- La compilación estándar de Vite
- El script post-build que copia todos los archivos necesarios

### 2. Verificación Pre-Despliegue

Antes de subir los archivos al servidor, verifica que se hayan generado correctamente:

```
alenia-website-hostinger/dist/
  ├── index.html
  ├── .htaccess
  ├── static-fallback.html
  ├── js/
  │   ├── solucion-definitiva.js
  │   ├── fallback-system.js
  │   └── diagnostico.js
  └── assets/
      └── ... (archivos generados por Vite)
```

### 3. Despliegue en Hostinger

1. Accede a tu panel de Hostinger
2. Ve a la sección "Administrador de archivos"
3. Navega al directorio público de tu hosting (generalmente `public_html`)
4. Sube **todos** los archivos y carpetas dentro de `alenia-website-hostinger/dist/`
5. Asegúrate de que el archivo `.htaccess` se suba correctamente (a veces está oculto)

### 4. Verificación Post-Despliegue

Después de subir los archivos:

1. Visita tu sitio web en diferentes navegadores
2. Verifica que todas las páginas carguen correctamente
3. Si hay problemas, abre la consola del navegador (F12) para ver mensajes de diagnóstico
4. Revisa que los sistemas de respaldo estén funcionando ejecutando en la consola:
   ```javascript
   window.aleniaDiagnostics.runAll()
   ```

## Solución de Problemas

### Si el sitio no carga correctamente:

1. **Problema con archivos estáticos**: Verifica que todos los archivos en la carpeta `js/` se hayan subido correctamente y tengan permisos de lectura (644).

2. **Problema con .htaccess**: Asegúrate de que el archivo `.htaccess` se haya subido y tenga los permisos correctos. En algunos casos, podrías necesitar activar el soporte para `.htaccess` en el panel de Hostinger.

3. **Problema con rutas**: Si las rutas no funcionan, verifica que el archivo `.htaccess` esté configurado correctamente para redirigir todas las solicitudes a `index.html`.

4. **Problema con React**: Si React no carga pero el contenido estático sí, el problema podría estar en las dependencias de React o en la configuración de Vite. Revisa la consola para ver errores específicos.

## Mantenimiento

Para actualizar el sitio:

1. Realiza cambios en el código fuente
2. Ejecuta `npm run build:full`
3. Sube los archivos actualizados a Hostinger

Si necesitas actualizar solo el contenido estático de respaldo, edita:
- `public/js/solucion-definitiva.js` (para el contenido estático)
- `public/static-fallback.html` (para la página de respaldo completa)

## Notas Importantes

- El sistema está diseñado para mostrar contenido estático si React no carga en 5 segundos
- La navegación entre páginas funcionará incluso en modo estático
- Todas las páginas y apps principales están incluidas en la versión estática
- El diseño estático mantiene la identidad visual de Alenia
