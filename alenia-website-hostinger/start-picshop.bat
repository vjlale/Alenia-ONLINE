@echo off
echo ====================================
echo    Iniciando PicShop AI Studio
echo ====================================

cd picshop

echo Verificando configuracion...
if not exist ".env.local" (
    echo ERROR: Archivo .env.local no encontrado
    echo Crea el archivo .env.local con tu GEMINI_API_KEY
    pause
    exit /b 1
)

echo Iniciando servidor...
npm run start

pause
