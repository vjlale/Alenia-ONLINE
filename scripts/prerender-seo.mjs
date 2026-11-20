// Genera HTML estático por ruta para buscadores e IA (GEO/AEO).
//
// El sitio es una SPA: sin esto, Google, ChatGPT, Perplexity o Claude solo ven
// "Cargando experiencia interactiva...". Este script toma dist/index.html y escribe:
//   - dist/index.html        → Inicio, con su texto y schema
//   - dist/p/<ruta>.html      → cada página de src/data/seoPages.js y cada nota del blog
// El .htaccess sirve dist/p/<ruta>.html cuando alguien pide /<ruta>. React arranca
// igual que siempre y reemplaza el contenido; el texto queda debajo del cargador,
// así la persona ve la animación de carga y el robot lee el texto.
//
// Uso: node scripts/prerender-seo.mjs (lo llama post-build.js)

import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dist = path.join(root, 'dist')

const { SITE, SEO_PAGES } = await import(pathToFileURL(path.join(root, 'src/data/seoPages.js')).href)
const { blogPosts } = await import(pathToFileURL(path.join(root, 'src/data/blogData.js')).href)

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const abs = (p) => (p.startsWith('http') ? p : `${SITE.url}${p === '/' ? '/' : p}`)

/* ------------------------------- Schema.org ------------------------------- */

const ORG_ID = `${SITE.url}/#organizacion`

const organization = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE.name,
  alternateName: SITE.legalName,
  url: SITE.url,
  logo: SITE.logo,
  description: SITE.description,
  email: SITE.email,
  telephone: SITE.whatsapp,
  address: { '@type': 'PostalAddress', addressLocality: SITE.city, addressCountry: SITE.country },
  areaServed: 'AR',
  knowsAbout: [
    'Automatización de máquinas',
    'Lavanderías self-service',
    'Cobros con Mercado Pago',
    'Control de accesos con QR',
    'IoT',
    'Asistentes con inteligencia artificial',
    'Desarrollo de apps y webs',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: SITE.email,
    telephone: SITE.whatsapp,
    availableLanguage: ['es'],
  },
  sameAs: SITE.sameAs,
}

const website = {
  '@type': 'WebSite',
  '@id': `${SITE.url}/#sitio`,
  url: SITE.url,
  name: SITE.name,
  inLanguage: 'es-AR',
  publisher: { '@id': ORG_ID },
}

function breadcrumb(page) {
  if (page.path === '/') return null
  const parts = page.path.split('/').filter(Boolean)
  const items = [{ name: 'Inicio', item: `${SITE.url}/` }]
  let acc = ''
  parts.forEach((part, i) => {
    acc += `/${part}`
    const known = SEO_PAGES.find((p) => p.path === acc)
    const name = i === parts.length - 1 ? page.h1 : known?.h1 || part
    items.push({ name, item: abs(acc) })
  })
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, ...it })),
  }
}

function pageSchema(page) {
  const url = abs(page.path)
  const graph = [organization, website]
  const webPage = {
    '@type': 'WebPage',
    '@id': `${url}#pagina`,
    url,
    name: page.title,
    description: page.description,
    inLanguage: 'es-AR',
    isPartOf: { '@id': `${SITE.url}/#sitio` },
    about: { '@id': ORG_ID },
  }
  graph.push(webPage)

  if (page.schemaType === 'Service') {
    graph.push({
      '@type': 'Service',
      '@id': `${url}#servicio`,
      name: 'ALENIA HUB',
      serviceType: 'Automatización de máquinas con hardware y software',
      description: page.summary,
      provider: { '@id': ORG_ID },
      areaServed: 'AR',
      url,
    })
  }
  if (page.schemaType === 'Article' || page.article) {
    graph.push({
      '@type': 'Article',
      '@id': `${url}#articulo`,
      headline: page.h1,
      description: page.description,
      inLanguage: 'es-AR',
      author: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
      mainEntityOfPage: url,
      ...(page.article?.image ? { image: abs(page.article.image) } : {}),
      ...(page.article?.datePublished ? { datePublished: page.article.datePublished } : {}),
    })
  }
  if (page.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#preguntas`,
      mainEntity: page.faq.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    })
  }
  const crumbs = breadcrumb(page)
  if (crumbs) graph.push(crumbs)

  // "<" escapado para que nada dentro del JSON pueda cerrar el <script>.
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')
  return `<script type="application/ld+json">${json}</script>`
}

/* --------------------------------- Head ----------------------------------- */

// Tags genéricos del index.html que se reemplazan por los de cada página.
const GENERIC_HEAD = [
  /<title>[\s\S]*?<\/title>\s*/g,
  /<meta\s+name="description"[^>]*>\s*/g,
  /<meta\s+name="keywords"[^>]*>\s*/g,
  /<link\s+rel="canonical"[^>]*>\s*/g,
  /<meta\s+property="og:(url|title|description|type)"[^>]*>\s*/g,
  /<meta\s+property="twitter:(url|title|description)"[^>]*>\s*/g,
  /<meta\s+name="twitter:(url|title|description)"[^>]*>\s*/g,
]

function headFor(page) {
  const url = abs(page.path)
  // data-rh="true": react-helmet-async los reconoce como propios y los actualiza al navegar.
  const rh = 'data-rh="true"'
  return [
    `<title>${esc(page.title)}</title>`,
    `<meta ${rh} name="description" content="${esc(page.description)}" />`,
    `<link ${rh} rel="canonical" href="${url}" />`,
    `<meta ${rh} property="og:type" content="${page.article ? 'article' : 'website'}" />`,
    `<meta ${rh} property="og:url" content="${url}" />`,
    `<meta ${rh} property="og:title" content="${esc(page.title)}" />`,
    `<meta ${rh} property="og:description" content="${esc(page.description)}" />`,
    `<meta ${rh} name="twitter:url" content="${url}" />`,
    `<meta ${rh} name="twitter:title" content="${esc(page.title)}" />`,
    `<meta ${rh} name="twitter:description" content="${esc(page.description)}" />`,
    pageSchema(page),
  ].join('\n    ')
}

/* --------------------------------- Body ----------------------------------- */

const NAV = [
  ['/', 'Inicio'],
  ['/soluciones/hub', 'ALENIA HUB'],
  ['/casos/laia', 'Caso LaIA'],
  ['/soluciones/digitales', 'Apps y webs'],
  ['/apps', 'Apps'],
  ['/blog', 'Blog'],
  ['/contacto', 'Contacto'],
]

const STATIC_CSS = `
      .seo-static{max-width:46rem;margin:0 auto;padding:3rem 1.25rem 4rem;line-height:1.65;color:#e2e8f0}
      .seo-static a{color:#5eead4}
      .seo-static h1{font-size:1.9rem;line-height:1.2;margin:1.5rem 0 1rem;color:#fff}
      .seo-static h2{font-size:1.3rem;margin:2.25rem 0 .75rem;color:#fff}
      .seo-static h3{font-size:1.05rem;margin:1.25rem 0 .25rem;color:#fff}
      .seo-static nav{display:flex;flex-wrap:wrap;gap:.5rem 1rem;font-size:.9rem}
      .seo-static blockquote{border-left:3px solid #5eead4;margin:1rem 0;padding-left:1rem;color:#cbd5e1}
      .seo-static footer{margin-top:3rem;font-size:.9rem;color:#94a3b8}`

function linkHtml([href, label]) {
  const ext = href.startsWith('http')
  return `<a href="${esc(href)}"${ext ? ' rel="noopener"' : ''}>${esc(label)}</a>`
}

function bodyFor(page, extraHtml = '') {
  const parts = [
    `<div class="seo-static">`,
    `<nav aria-label="Secciones">${NAV.map(linkHtml).join(' ')}</nav>`,
    `<main>`,
    `<h1>${esc(page.h1)}</h1>`,
    page.summary ? `<p>${esc(page.summary)}</p>` : '',
    page.points?.length ? `<ul>${page.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` : '',
    extraHtml,
    page.faq?.length
      ? `<section><h2>Preguntas frecuentes</h2>${page.faq
          .map(({ q, a }) => `<h3>${esc(q)}</h3><p>${esc(a)}</p>`)
          .join('')}</section>`
      : '',
    page.links?.length ? `<p>${page.links.map(linkHtml).join(' · ')}</p>` : '',
    `</main>`,
    `<footer><p>${esc(SITE.name)} · ${esc(SITE.city)}, Argentina · WhatsApp <a href="${SITE.whatsappUrl}">${esc(
      SITE.whatsapp
    )}</a> · <a href="mailto:${SITE.email}">${esc(SITE.email)}</a></p></footer>`,
    `</div>`,
  ]
  return parts.filter(Boolean).join('\n        ')
}

/* -------------------------- Markdown mínimo (blog) ------------------------- */

function inline(md) {
  return esc(md)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, href) => `<a href="${href}">${t}</a>`)
}

function markdownToHtml(md = '') {
  const out = []
  let list = null
  let para = []
  const flushPara = () => {
    if (para.length) out.push(`<p>${inline(para.join(' '))}</p>`)
    para = []
  }
  const flushList = () => {
    if (list) out.push(`<${list.tag}>${list.items.map((i) => `<li>${inline(i)}</li>`).join('')}</${list.tag}>`)
    list = null
  }
  for (const raw of md.split('\n')) {
    const line = raw.trim()
    if (!line) {
      flushPara()
      flushList()
      continue
    }
    let m
    if ((m = line.match(/^(#{2,4})\s+(.*)$/))) {
      flushPara(); flushList()
      const level = Math.min(m[1].length, 3)
      out.push(`<h${level}>${inline(m[2])}</h${level}>`)
    } else if ((m = line.match(/^[-*]\s+(.*)$/)) || (m = line.match(/^\d+\.\s+(.*)$/))) {
      flushPara()
      const tag = /^\d+\./.test(line) ? 'ol' : 'ul'
      if (!list || list.tag !== tag) { flushList(); list = { tag, items: [] } }
      list.items.push(m[1])
    } else if ((m = line.match(/^>\s?(.*)$/))) {
      flushPara(); flushList()
      out.push(`<blockquote>${inline(m[1])}</blockquote>`)
    } else if (/^(---|\*\*\*)$/.test(line) || line.startsWith('|') || line.startsWith('```')) {
      flushPara(); flushList()
    } else {
      flushList()
      para.push(line)
    }
  }
  flushPara()
  flushList()
  return out.join('\n')
}

const MONTHS = { ene: '01', feb: '02', mar: '03', abr: '04', may: '05', jun: '06', jul: '07', ago: '08', sep: '09', oct: '10', nov: '11', dic: '12', jan: '01', apr: '04', aug: '08', dec: '12' }
function isoDate(date = '') {
  const m = String(date).match(/(\d{1,2})\s+([A-Za-zé]{3})[a-zé]*\s+(\d{4})/)
  if (!m) return undefined
  const mm = MONTHS[m[2].toLowerCase()]
  return mm ? `${m[3]}-${mm}-${m[1].padStart(2, '0')}` : undefined
}

/* --------------------------------- Escribir ------------------------------- */

function render(page, extraHtml) {
  let html = template
  for (const re of GENERIC_HEAD) html = html.replace(re, '')
  // Siempre con función: los textos tienen precios con "$" que String.replace interpretaría.
  html = html.replace('</style>', () => `${STATIC_CSS}\n    </style>`)
  html = html.replace('</head>', () => `    ${headFor(page)}\n  </head>`)
  // El texto va dentro de #root, después del cargador: React lo reemplaza al montar.
  html = html.replace(
    /(<div id="root">[\s\S]*?<div class="loading-indicator">[\s\S]*?<\/p>\s*<\/div>)/,
    (loader) => `${loader}\n        ${bodyFor(page, extraHtml)}`
  )
  return html
}

function write(routePath, html) {
  const file = routePath === '/' ? path.join(dist, 'index.html') : path.join(dist, 'p', `${routePath.slice(1)}.html`)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, html)
  return path.relative(dist, file)
}

if (!template.includes('<div class="loading-indicator">')) {
  throw new Error('prerender-seo: dist/index.html no tiene el cargador esperado; revisar index.html')
}

const written = []
for (const page of SEO_PAGES) {
  let extra = ''
  if (page.path === '/blog') {
    extra = `<ul>${blogPosts
      .map((p) => `<li><a href="/blog/${p.slug}">${esc(p.title)}</a>: ${esc(p.excerpt)}</li>`)
      .join('')}</ul>`
  }
  written.push(write(page.path, render(page, extra)))
}

for (const post of blogPosts) {
  const page = {
    path: `/blog/${post.slug}`,
    title: `${post.title} | Blog de ALENIA`,
    description: post.excerpt,
    h1: post.title,
    article: { image: post.image, datePublished: isoDate(post.date) },
    links: [['/blog', 'Más notas del blog']],
  }
  written.push(write(page.path, render(page, markdownToHtml(post.content))))
}

console.log(`✅ prerender-seo: ${written.length} páginas con texto para buscadores e IA`)
