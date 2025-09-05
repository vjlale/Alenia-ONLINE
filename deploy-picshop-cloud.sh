#!/bin/bash

echo "🚀 DESPLIEGUE DE PICSHOOP EN GOOGLE CLOUD RUN"
echo "============================================="

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar que estamos en el directorio correcto
if [ ! -f "picshop/package.json" ]; then
    echo -e "${RED}❌ Error: Ejecutar desde alenia-website-hostinger/${NC}"
    exit 1
fi

cd picshop

echo -e "${YELLOW}📋 PASO 1: Verificando configuración...${NC}"

# Verificar que existe .env.local
if [ ! -f ".env.local" ]; then
    echo -e "${RED}❌ Error: Archivo .env.local no encontrado${NC}"
    exit 1
fi

# Verificar que la API key no sea el placeholder
API_KEY=$(grep "GEMINI_API_KEY" .env.local | cut -d'=' -f2)
if [ "$API_KEY" = "tu_api_key_aqui" ] || [ -z "$API_KEY" ]; then
    echo -e "${RED}❌ Error: API key no configurada en .env.local${NC}"
    echo -e "${YELLOW}💡 Configura tu API key real en picshop/.env.local${NC}"
    exit 1
fi

echo -e "${GREEN}✅ API key configurada correctamente${NC}"

echo -e "${YELLOW}📋 PASO 2: Verificando Google Cloud CLI...${NC}"

# Verificar que gcloud esté instalado
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ Error: Google Cloud CLI no está instalado${NC}"
    echo -e "${YELLOW}💡 Instala desde: https://cloud.google.com/sdk/docs/install${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Google Cloud CLI encontrado${NC}"

echo -e "${YELLOW}📋 PASO 3: Verificando autenticación...${NC}"

# Verificar autenticación
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | head -n 1 > /dev/null; then
    echo -e "${RED}❌ Error: No estás autenticado en Google Cloud${NC}"
    echo -e "${YELLOW}💡 Ejecuta: gcloud auth login${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Autenticación verificada${NC}"

echo -e "${YELLOW}📋 PASO 4: Configurando proyecto...${NC}"

# Obtener proyecto actual
PROJECT_ID=$(gcloud config get-value project)

if [ -z "$PROJECT_ID" ] || [ "$PROJECT_ID" = "(unset)" ]; then
    echo -e "${RED}❌ Error: No hay proyecto configurado${NC}"
    echo -e "${YELLOW}💡 Configura con: gcloud config set project TU_PROJECT_ID${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Proyecto configurado: $PROJECT_ID${NC}"

echo -e "${YELLOW}🚀 PASO 5: Desplegando PicShop...${NC}"

# Desplegar con configuración optimizada
gcloud run deploy picshop \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --concurrency 80 \
  --cpu 1 \
  --memory 512Mi \
  --max-instances 10 \
  --min-instances 0 \
  --timeout 300 \
  --set-env-vars="NODE_ENV=production,GEMINI_API_KEY=$API_KEY"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Despliegue exitoso!${NC}"

    # Obtener la URL del servicio
    SERVICE_URL=$(gcloud run services describe picshop --region=us-central1 --format="value(status.url)")

    echo -e "${GREEN}🌐 URL del servicio: $SERVICE_URL${NC}"
    echo ""
    echo -e "${YELLOW}📝 PASO FINAL: Actualizar configuración${NC}"
    echo -e "${GREEN}1. Copia esta URL: $SERVICE_URL${NC}"
    echo -e "${GREEN}2. Ve a src/components/apps/PicShopEmbed.jsx${NC}"
    echo -e "${GREEN}3. Reemplaza la URL de producción con: $SERVICE_URL${NC}"
    echo ""
    echo -e "${GREEN}🎉 ¡PicShop está listo para usar!${NC}"
else
    echo -e "${RED}❌ Error en el despliegue${NC}"
    exit 1
fi
