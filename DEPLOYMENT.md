# 🌐 Configuración DNS y GitHub Pages para Alen.iA

## 📋 Checklist de Configuración

### ✅ 1. Preparación del Proyecto
- [x] Repositorio Git inicializado
- [x] Archivo CNAME configurado con `alenia.online`
- [x] GitHub Actions workflow configurado
- [x] Build de producción funcionando correctamente
- [x] Archivos optimizados para deployment

### 🔧 2. Configuración DNS (GoDaddy)

#### Records DNS requeridos:
```
Tipo    Nombre    Valor                TTL
A       @         185.199.108.153      1 hora
A       @         185.199.109.153      1 hora
A       @         185.199.110.153      1 hora
A       @         185.199.111.153      1 hora
CNAME   www       vjlale.github.io     1 hora
```

#### Pasos para configurar en GoDaddy:
1. Acceder a tu cuenta de GoDaddy
2. Ir a "My Products" > "DNS"
3. Seleccionar el dominio `alenia.online`
4. Eliminar los registros A existentes
5. Agregar los 4 nuevos registros A de GitHub Pages
6. Configurar el CNAME para www
7. Guardar cambios

### 🚀 3. Configuración GitHub Pages

#### Pasos para configurar GitHub Pages:
1. Crear el repositorio en GitHub: `https://github.com/vjlale/alenia-website`
2. Hacer push del código:
   ```bash
   git push -u origin main
   ```
3. Ir a Settings > Pages en el repositorio
4. Configurar:
   - Source: "Deploy from a branch"
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Configurar Custom Domain:
   - Agregar: `alenia.online`
   - Habilitar "Enforce HTTPS"
6. Esperar la verificación del dominio

### 🤖 4. GitHub Actions
El workflow está configurado para:
- ✅ Ejecutarse en cada push a main
- ✅ Instalar dependencias
- ✅ Construir el proyecto
- ✅ Desplegar automáticamente a gh-pages
- ✅ Configurar dominio personalizado

### 🔍 5. Verificación

#### Comandos para verificar:
```bash
# Verificar DNS
nslookup alenia.online

# Verificar conectividad
ping alenia.online

# Verificar certificado SSL
curl -I https://alenia.online
```

#### URLs de verificación:
- **Producción**: https://alenia.online
- **GitHub Pages**: https://vjlale.github.io/alenia-website
- **Desarrollo**: http://localhost:3001

### 📊 6. Monitoreo y Analytics

#### Próximos pasos para analytics:
- [ ] Configurar Google Analytics 4
- [ ] Implementar Meta Pixel
- [ ] Configurar Hotjar para heatmaps
- [ ] Integrar Mailchimp para newsletter

### 🔒 7. Configuración de Seguridad

#### Headers de seguridad recomendados:
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

#### Configuración en `_headers` (Netlify) o similar:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https:
```

### 🚨 8. Solución de Problemas

#### Problemas comunes:
1. **DNS no propaga**: Esperar 24-48 horas
2. **Certificado SSL no válido**: Verificar configuración DNS
3. **404 en rutas**: Configurar redirects en GitHub Pages
4. **Build falla**: Verificar dependencias y sintaxis

#### Comandos útiles:
```bash
# Limpiar caché DNS local
ipconfig /flushdns

# Verificar propagación DNS
dig alenia.online

# Probar build local
npm run build
npm run preview
```

### 📞 9. Contacto y Soporte

Si necesitas ayuda con la configuración:
- **Email**: contacto@alenia.online
- **GitHub Issues**: https://github.com/vjlale/alenia-website/issues
- **Documentación**: Este archivo

---

## 🎯 Próximos Pasos

Una vez completada la configuración DNS y GitHub Pages:

1. **Verificar funcionamiento** en producción
2. **Configurar analytics** y tracking
3. **Implementar SEO** básico
4. **Crear blog básico** con primeros posts
5. **Optimizar performance** y carga

---

*Última actualización: 14 de julio de 2025*
