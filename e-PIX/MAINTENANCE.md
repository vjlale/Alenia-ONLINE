# Modo mantenimiento (E-pix)

Cuando la app está en actualización, se puede activar el **modo mantenimiento** para mostrar un aviso en ventana modal y ofrecer a los usuarios dejar su email para ser notificados cuando la app vuelva a estar disponible.

## Cómo activar o desactivar

1. **Variable de entorno:** `VITE_EPIX_MAINTENANCE`
   - `true`: activa el modo mantenimiento. Al entrar a la app se muestra el modal.
   - `false` o sin definir: la app funciona con normalidad.

2. **Dónde configurarla:** En tu entorno de build/despliegue (por ejemplo en `.env`, `.env.local` o variables del host).

   ```bash
   VITE_EPIX_MAINTENANCE=true
   ```

3. **Importante:** Las variables `VITE_*` se inyectan en **build time**. Para cambiar el modo hace falta **volver a construir y redesplegar** la app.

## CRM y notificaciones por email

- Los emails se envían al **CRM** existente vía `POST /api/lead` con `rubro: "E-pix - Notificación disponibilidad"`.
- Configura `VITE_CRM_API_URL` con la URL base del CRM (por ejemplo `https://tu-crm.railway.app`).
- El **CORS** del CRM debe permitir el origen de E-pix (p. ej. `https://e-pix.alenia.online` y `http://localhost:5173` en desarrollo). Usa la variable `CORS_ORIGINS` del CRM.

## Referencia rápida

| Variable               | Uso                                                                 |
|------------------------|---------------------------------------------------------------------|
| `VITE_EPIX_MAINTENANCE`| `true` = modo mantenimiento activo; `false` o vacío = app normal   |
| `VITE_CRM_API_URL`     | URL base del CRM (ej. `https://...`) para el formulario de aviso   |

Ver también [.env.example](.env.example).
