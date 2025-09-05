# 🚀 DESPLIEGUE DE PICSHOOP EN GOOGLE CLOUD RUN
# =============================================

Write-Host "🚀 DESPLIEGUE DE PICSHOOP EN GOOGLE CLOUD RUN" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

# Verificar que estamos en el directorio correcto
if (!(Test-Path "picshop/package.json")) {
    Write-Host "❌ Error: Ejecutar desde alenia-website-hostinger/" -ForegroundColor Red
    exit 1
}

Set-Location picshop

Write-Host "📋 PASO 1: Verificando configuración..." -ForegroundColor Yellow

# Verificar que existe .env.local
if (!(Test-Path ".env.local")) {
    Write-Host "❌ Error: Archivo .env.local no encontrado" -ForegroundColor Red
    exit 1
}

# Verificar que la API key no sea el placeholder
$envContent = Get-Content ".env.local"
$apiKeyLine = $envContent | Where-Object { $_ -match "GEMINI_API_KEY" }
if ($apiKeyLine) {
    $apiKey = ($apiKeyLine -split "=")[1]
    if ($apiKey -eq "tu_api_key_aqui" -or [string]::IsNullOrEmpty($apiKey)) {
        Write-Host "❌ Error: API key no configurada en .env.local" -ForegroundColor Red
        Write-Host "💡 Configura tu API key real en picshop/.env.local" -ForegroundColor Yellow
        exit 1
    }
} else {
    Write-Host "❌ Error: GEMINI_API_KEY no encontrada en .env.local" -ForegroundColor Red
    exit 1
}

Write-Host "✅ API key configurada correctamente" -ForegroundColor Green

Write-Host "📋 PASO 2: Verificando Google Cloud CLI..." -ForegroundColor Yellow

# Verificar que gcloud esté instalado
try {
    $gcloudVersion = & gcloud --version 2>$null
    Write-Host "✅ Google Cloud CLI encontrado" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: Google Cloud CLI no está instalado" -ForegroundColor Red
    Write-Host "💡 Instala desde: https://cloud.google.com/sdk/docs/install" -ForegroundColor Yellow
    exit 1
}

Write-Host "📋 PASO 3: Verificando autenticación..." -ForegroundColor Yellow

# Verificar autenticación
try {
    $authCheck = & gcloud auth list --filter=status:ACTIVE --format="value(account)" 2>$null
    if ([string]::IsNullOrEmpty($authCheck)) {
        Write-Host "❌ Error: No estás autenticado en Google Cloud" -ForegroundColor Red
        Write-Host "💡 Ejecuta: gcloud auth login" -ForegroundColor Yellow
        exit 1
    }
    Write-Host "✅ Autenticación verificada" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: No estás autenticado en Google Cloud" -ForegroundColor Red
    Write-Host "💡 Ejecuta: gcloud auth login" -ForegroundColor Yellow
    exit 1
}

Write-Host "📋 PASO 4: Configurando proyecto..." -ForegroundColor Yellow

# Obtener proyecto actual
try {
    $projectId = & gcloud config get-value project 2>$null
    if ([string]::IsNullOrEmpty($projectId) -or $projectId -eq "(unset)") {
        Write-Host "❌ Error: No hay proyecto configurado" -ForegroundColor Red
        Write-Host "💡 Configura con: gcloud config set project TU_PROJECT_ID" -ForegroundColor Yellow
        exit 1
    }
    Write-Host "✅ Proyecto configurado: $projectId" -ForegroundColor Green
} catch {
    Write-Host "❌ Error al obtener proyecto" -ForegroundColor Red
    exit 1
}

Write-Host "🚀 PASO 5: Desplegando PicShop..." -ForegroundColor Yellow

# Desplegar con configuración optimizada
try {
    $deployResult = & gcloud run deploy picshop `
        --source . `
        --platform managed `
        --region us-central1 `
        --allow-unauthenticated `
        --concurrency 80 `
        --cpu 1 `
        --memory 512Mi `
        --max-instances 10 `
        --min-instances 0 `
        --timeout 300 `
        --set-env-vars="NODE_ENV=production,GEMINI_API_KEY=$apiKey" `
        2>&1

    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Despliegue exitoso!" -ForegroundColor Green

        # Obtener la URL del servicio
        $serviceUrl = & gcloud run services describe picshop --region=us-central1 --format="value(status.url)" 2>$null

        Write-Host "🌐 URL del servicio: $serviceUrl" -ForegroundColor Green
        Write-Host ""
        Write-Host "📝 PASO FINAL: Actualizar configuración" -ForegroundColor Yellow
        Write-Host "1. Copia esta URL: $serviceUrl" -ForegroundColor Green
        Write-Host "2. Ve a src/components/apps/PicShopEmbed.jsx" -ForegroundColor Green
        Write-Host "3. Reemplaza la URL de producción con: $serviceUrl" -ForegroundColor Green
        Write-Host ""
        Write-Host "🎉 ¡PicShop está listo para usar!" -ForegroundColor Green
    } else {
        Write-Host "❌ Error en el despliegue" -ForegroundColor Red
        Write-Host $deployResult -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Error durante el despliegue" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}
