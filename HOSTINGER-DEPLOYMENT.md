# 🚀 Deployment en Hostinger - Alen.iA

## 📋 Pasos para subir la web a Hostinger

### 1. Preparar el build de producción
```bash
npm install
npm run build:hostinger
```

### 2. Archivos a subir
Después del build, sube TODOS los archivos de la carpeta `dist/` a la carpeta `public_html` de tu hosting en Hostinger:

```
dist/
├── index.html          → public_html/index.html
├── .htaccess          → public_html/.htaccess
├── favicon.svg        → public_html/favicon.svg
├── assets/            → public_html/assets/
├── images/            → public_html/images/ (si existe)
└── ...todos los demás archivos
```

### 3. Configuración del dominio en Hostinger
1. Ve al panel de Hostinger
2. Sección "Dominios" 
3. Apunta `alenia.online` a tu hosting
4. Configura SSL (Let's Encrypt gratuito)

### 4. Verificación
- ✅ Visita https://alenia.online
- ✅ Prueba las rutas: /contacto, /blog, /automatizaciones
- ✅ Verifica que el SSL funcione correctamente

### 5. Archivos importantes incluidos
- `.htaccess`: Maneja las rutas SPA y optimizaciones
- `index.html`: Configurado para producción
- Assets optimizados y comprimidos

## 🔧 Troubleshooting

### Si las rutas no funcionan:
- Verifica que el archivo `.htaccess` esté en `public_html/`
- Asegúrate que el hosting soporte mod_rewrite

### Si los assets no cargan:
- Verifica que la carpeta `assets/` esté completa
- Revisa los permisos de archivos (644 para archivos, 755 para carpetas)

### Performance:
- El `.htaccess` incluye compresión gzip
- Assets optimizados con hash para caché
- CSS y JS minificados

---
*Configuración optimizada para Hostinger - Mantiene toda la funcionalidad original*