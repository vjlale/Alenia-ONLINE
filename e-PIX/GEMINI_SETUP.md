# 🔑 Configuración de Gemini API Key

## 🚨 Error Actual
```
DEBUG: GEMINI_API_KEY = NO CONFIGURADA
GEMINI_API_KEY no está configurada. El backend no podrá conectarse a Gemini.
```

## 📋 Pasos para Configurar

### 1. **Obtener API Key de Gemini**
1. Ve a [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Inicia sesión con tu cuenta Google
3. Haz clic en **"Create API Key"**
4. Copia la API key generada

### 2. **Configurar Variable de Entorno**

#### Opción A: Archivo .env (Recomendado)
```bash
# Crear archivo .env en la raíz del proyecto picshop
cd picshop
touch .env
```

Contenido del archivo `.env`:
```env
GEMINI_API_KEY=tu_api_key_aqui_sin_comillas
PORT=8080
```

#### Opción B: Variable de entorno del sistema
```bash
# Windows (PowerShell)
$env:GEMINI_API_KEY="tu_api_key_aqui"

# Windows (CMD)
set GEMINI_API_KEY=tu_api_key_aqui

# Linux/Mac
export GEMINI_API_KEY="tu_api_key_aqui"
```

#### Opción C: Al ejecutar el comando
```bash
# Windows
set GEMINI_API_KEY=tu_api_key_aqui && npm run start

# Linux/Mac
GEMINI_API_KEY=tu_api_key_aqui npm run start
```

### 3. **Verificar Configuración**
```bash
# Reiniciar el servidor
cd picshop
npm run start
```

Deberías ver:
```
DEBUG: GEMINI_API_KEY = AIzaSyDxxx... (primeros 10 caracteres)
Servidor iniciado en puerto 8080
```

## 🔍 Troubleshooting

### Problema: "API key not valid"
**Solución**: Verifica que la API key esté correcta y no tenga espacios

### Problema: "Quota exceeded"
**Solución**: Revisa los límites de uso en [Google AI Studio](https://aistudio.google.com/app/apikey)

### Problema: "Access denied"
**Solución**: Asegúrate de que la API de Gemini esté habilitada en tu proyecto de Google Cloud

## 📝 Notas Importantes

- **Seguridad**: Nunca commits el archivo `.env` al repositorio
- **Límites**: Gemini tiene límites de uso gratuitos y pagos
- **Región**: La API está disponible globalmente
- **Costo**: Revisa los precios en la documentación de Google

## 🎯 Próximos Pasos

Una vez configurada la API key:

1. **Reinicia PicShop**: `npm run start`
2. **Verifica**: Busca "DEBUG: GEMINI_API_KEY = AIzaSyD..." en la consola
3. **Prueba**: Abre PicShop en tu sitio web y genera una imagen
4. **¡Listo!** PicShop funcionará completamente

---

**Estado**: 🔧 Pendiente de configuración - API key requerida
**Última actualización**: Diciembre 2024
