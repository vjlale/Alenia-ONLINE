# 🚀 Deploy PicShop en Hostinger - Guía Paso a Paso

## ✅ **Estado Actual**
- ✅ Build de Alenia Website completado
- ✅ Build de PicShop completado (con favicon.svg)
- ✅ Archivo .htaccess creado para CORS
- ✅ Link actualizado en Apps.jsx

## 📋 **Pasos para Deploy**

### **1. Subir archivos de Alenia Website**
```
Copia todo el contenido de: alenia-website-hostinger/dist/
A: public_html/ en Hostinger
```

### **2. Crear carpeta e-pix en Hostinger**
1. Ve al file manager de Hostinger
2. En `public_html/` crea una nueva carpeta llamada `e-pix`

### **3. Subir archivos de PicShop**
```
Copia todo el contenido de: picshop/dist/
A: public_html/e-pix/ en Hostinger
```

### **4. Configurar subdominio**
1. En el panel de control de Hostinger
2. Ve a "Dominios" → "Subdominios"
3. Crea subdominio: `e-pix`
4. Apunta a: `public_html/e-pix`

## 📁 **Estructura Final en Hostinger**
```
public_html/
├── index.html              # Alenia Website
├── assets/                 # Assets de Alenia
├── e-pix/                  # Carpeta PicShop
│   ├── index.html          # PicShop
│   ├── favicon.svg         # Favicon
│   ├── .htaccess           # Configuración CORS
│   └── assets/             # Assets de PicShop
└── ... (otros archivos de Alenia)
```

## 🔧 **Archivos Incluidos en PicShop**
- ✅ `index.html` (2.7KB)
- ✅ `favicon.svg` (884B) - **NUEVO**
- ✅ `.htaccess` - **NUEVO** (solución CORS)
- ✅ `assets/` (todos los archivos optimizados)

## 🌐 **URLs Finales**
- **Alenia Website**: `https://alenia.online`
- **PicShop**: `https://e-pix.alenia.online`

## ✅ **Problemas Solucionados**
1. ✅ **Favicon 404**: Agregado `favicon.svg`
2. ✅ **CORS Error**: Configurado `.htaccess`
3. ✅ **HTTPS Redirect**: Forzado en `.htaccess`
4. ✅ **PWA Support**: Headers configurados

## 🎯 **Resultado Esperado**
- ✅ PicShop funcionando en `e-pix.alenia.online`
- ✅ Sin errores de CORS
- ✅ PWA instalable
- ✅ Favicon visible
- ✅ HTTPS forzado

---

**Fecha**: 30 de agosto de 2025  
**Estado**: ✅ **LISTO PARA DEPLOY**
