/**
 * Sube la carpeta dist/ a Hostinger por FTP/FTPS (sin abrir el gestor web).
 *
 * Uso:
 *   npm run deploy:hostinger
 *
 * Credenciales: copiá .env.deploy.example → .env.deploy (no se sube a git)
 *
 * Opcional tras subir:
 *   OPEN_SITE_AFTER_DEPLOY=1  → abre PUBLIC_SITE_URL en el navegador
 *   OPEN_HPANEL_AFTER_DEPLOY=1 → abre hPanel
 */

import * as ftp from 'basic-ftp';
import { config } from 'dotenv';
import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

config({ path: resolve(root, '.env.deploy') });
config({ path: resolve(root, '.env.deploy.local') });

const distPath = resolve(root, 'dist');

function requireEnv(name) {
  const v = process.env[name];
  if (!v || !String(v).trim()) {
    console.error(`Falta ${name} en .env.deploy (ver .env.deploy.example)`);
    process.exit(1);
  }
  return String(v).trim();
}

async function main() {
  if (!existsSync(distPath)) {
    console.error('No existe dist/. Ejecutá antes: npm run build:hostinger');
    process.exit(1);
  }

  const host = requireEnv('HOSTINGER_FTP_HOST').replace(/^ftp:\/\//i, '').replace(/^ftps:\/\//i, '').split('/')[0];
  const user = requireEnv('HOSTINGER_FTP_USERNAME');
  const password = requireEnv('HOSTINGER_FTP_PASSWORD');
  const proto = (process.env.HOSTINGER_FTP_PROTOCOL || 'ftp').toLowerCase();
  let port = Number(process.env.HOSTINGER_FTP_PORT || (proto === 'ftps-legacy' ? 990 : 21));
  if (!Number.isFinite(port)) port = 21;

  let remote = (process.env.HOSTINGER_FTP_REMOTE_DIR || 'public_html').trim();
  remote = remote.replace(/\/+$/, '');
  if (remote === '.' || remote === './') remote = '';

  let secure = false;
  if (proto === 'ftps') secure = true;
  if (proto === 'ftps-legacy') secure = 'implicit';

  console.log(`Conectando ${proto}://${host}:${port} …`);
  if (remote) console.log(`Carpeta remota: ${remote}/`);

  const client = new ftp.Client(120_000);
  client.ftp.verbose = process.env.FTP_VERBOSE === '1';

  try {
    await client.access({
      host,
      user,
      password,
      port,
      secure,
      secureOptions: { rejectUnauthorized: false },
    });

    if (remote) {
      await client.ensureDir(remote);
      await client.cd(remote);
    }

    await client.uploadFromDir(distPath, '.');
    console.log('Listo: dist/ subido por FTP.');
  } catch (e) {
    console.error('Error FTP:', e.message || e);
    process.exit(1);
  } finally {
    client.close();
  }

  if (process.env.OPEN_SITE_AFTER_DEPLOY === '1') {
    const url = process.env.PUBLIC_SITE_URL || 'https://alenia.online';
    const { default: open } = await import('open');
    await open(url);
    console.log('Navegador:', url);
  }
  if (process.env.OPEN_HPANEL_AFTER_DEPLOY === '1') {
    const url = process.env.HOSTINGER_HPANEL_URL || 'https://hpanel.hostinger.com';
    const { default: open } = await import('open');
    await open(url);
    console.log('Navegador:', url);
  }
}

main();
