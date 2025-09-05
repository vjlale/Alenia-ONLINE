// Script post-build para Alenia Website
// Este script debe ejecutarse después de compilar con Vite
// Uso: node post-build.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas
const distFolder = path.resolve(__dirname, 'dist');
const indexFile = path.join(distFolder, 'index.html');

// Asegúrese de que la carpeta js exista en dist
const jsFolder = path.join(distFolder, 'js');
if (!fs.existsSync(jsFolder)) {
  fs.mkdirSync(jsFolder, { recursive: true });
  console.log('✅ Carpeta js creada');
}

// Copia archivos del directorio public/js al directorio dist/js
const publicJsFolder = path.resolve(__dirname, 'public/js');
if (fs.existsSync(publicJsFolder)) {
  const files = fs.readdirSync(publicJsFolder);
  files.forEach(file => {
    const source = path.join(publicJsFolder, file);
    const destination = path.join(jsFolder, file);
    fs.copyFileSync(source, destination);
    console.log(`✅ Archivo copiado: ${file}`);
  });
}

// Copia el archivo static-fallback.html
const sourceStaticFallback = path.resolve(__dirname, 'public/static-fallback.html');
const destinationStaticFallback = path.join(distFolder, 'static-fallback.html');
if (fs.existsSync(sourceStaticFallback)) {
  fs.copyFileSync(sourceStaticFallback, destinationStaticFallback);
  console.log('✅ static-fallback.html copiado');
}

// Copia el archivo .htaccess
const sourceHtaccess = path.resolve(__dirname, '.htaccess');
const destinationHtaccess = path.join(distFolder, '.htaccess');
if (fs.existsSync(sourceHtaccess)) {
  fs.copyFileSync(sourceHtaccess, destinationHtaccess);
  console.log('✅ .htaccess copiado');
}

console.log('✅ Proceso post-build completado');
