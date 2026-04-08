# Producción Hostinger (definitivo)

## Qué pasa cuando hacés `git push` a `main`

1. **Husky** ejecuta `npm run build` (solo en push a `main`). Omitir: `SKIP_PREPUSH_BUILD=1 git push`.
2. **GitHub Actions → Deploy to Hostinger (FTP)** construye `dist/` y lo sube por FTP a **`public_html/`** (por defecto).

## Secretos obligatorios en GitHub

Repositorio → **Settings → Secrets and variables → Actions**:

| Secreto | Valor |
|---------|--------|
| `HOSTINGER_FTP_HOST` | Hostname o IP del FTP (sin `ftp://`) |
| `HOSTINGER_FTP_USERNAME` | Usuario FTP (el que muestre hPanel, ej. `u…`) |
| `HOSTINGER_FTP_PASSWORD` | Contraseña FTP |

Opcional: **`HOSTINGER_FTP_REMOTE_DIR`** — solo si tu FTP **ya entra** en `public_html`; entonces poné `./`. Si entrás en la raíz con carpeta `public_html`, **no crees** este secreto (el workflow usa `public_html/`).

Variables opcionales: `HOSTINGER_FTP_PROTOCOL` (`ftp` / `ftps` / `ftps-legacy`), `HOSTINGER_FTP_PORT`.

## GitHub Pages

El workflow **GitHub Pages** es **solo manual** (Actions → Run workflow). No actualiza alenia.online.

## Deploy desde tu PC

```bash
npm run deploy:hostinger
```

Requiere `.env.deploy` (plantilla: `.env.deploy.example`).
