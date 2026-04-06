import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../.env');
const content = 'GEMINI_API_KEY=AIzaSyBNPR6p9ub-8PeRMBJWlbuKNdka5Cu9dKs';

fs.writeFileSync(envPath, content, 'utf8');
console.log('✅ Archivo .env creado correctamente en UTF-8');

