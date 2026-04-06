import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../.env');

console.log('--- Diagnóstico de Variables de Entorno ---');
console.log('Ruta esperada del .env:', envPath);
console.log('¿Existe el archivo?:', fs.existsSync(envPath) ? 'SÍ' : 'NO');

if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  console.log('Contenido crudo (primeros 20 caracteres):', content.substring(0, 20).replace(/\n/g, '\\n'));
  
  const result = dotenv.config({ path: envPath });
  
  if (result.error) {
    console.log('Error cargando dotenv:', result.error);
  } else {
    console.log('Dotenv cargado correctamente.');
    console.log('Variables detectadas:', Object.keys(result.parsed || {}));
  }
}

console.log('GEMINI_API_KEY en process.env:', process.env.GEMINI_API_KEY ? 'DETECTADA ✅' : 'NO DETECTADA ❌');

