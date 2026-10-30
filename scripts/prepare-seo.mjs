import fs from 'node:fs/promises'
import path from 'node:path'
import { loadEnv } from 'vite'
import { projects } from '../src/data/projects.ts'

const env = { ...loadEnv('production', process.cwd(), ''), ...process.env }
const origin = env.VITE_SITE_URL?.replace(/\/$/, '')
if (origin && !/^https:\/\/[^/]+$/.test(origin)) throw new Error('VITE_SITE_URL precisa ser uma origem HTTPS válida, sem caminho.')
const template = await fs.readFile('dist/index.html', 'utf8')
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const routes = [{ path: '/', title: 'Júnior Maia Müller | Dados, código & possibilidades', description: 'Data Science, desenvolvimento e automação. Transformando dados em decisões. E ideias em tecnologia.' }, ...projects.map(p => ({ path: `/projetos/${p.slug}`, title: `${p.name} | Júnior Maia Müller`, description: p.description }))]

for (const route of routes) {
  let html = template.replace(/<title>.*?<\/title>/, `<title>${escape(route.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${escape(route.description)}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${escape(route.title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${escape(route.description)}`)
  if (origin) {
    html = html.replace('content="/og-cover.png"', `content="${escape(origin)}/og-cover.png"`)
      .replace('</head>', `<link rel="canonical" href="${escape(origin + route.path)}" />\n<meta property="og:url" content="${escape(origin + route.path)}" />\n</head>`)
  } else html = html.replace('</head>', '<meta name="robots" content="noindex, nofollow" />\n</head>')
  const folder = route.path === '/' ? 'dist' : path.join('dist', route.path.slice(1))
  await fs.mkdir(folder, { recursive: true })
  await fs.writeFile(path.join(folder, 'index.html'), html)
  // Extensionless paths are resolved to .html by Vite preview and static hosts.
  if (route.path !== '/') await fs.writeFile(path.join('dist', `${route.path.slice(1)}.html`), html)
}
if (origin) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(r => `\n  <url><loc>${escape(origin + r.path)}</loc></url>`).join('')}\n</urlset>\n`
  await fs.writeFile('dist/sitemap.xml', sitemap)
  await fs.writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`)
  console.log(`SEO: ${routes.length} páginas com metadados, canonical e sitemap gerados.`)
} else {
  await fs.writeFile('dist/robots.txt', 'User-agent: *\nDisallow: /\n')
  console.log('SEO: preview sem indexação. Defina VITE_SITE_URL e rode npm run build:production para gerar canonical e sitemap públicos.')
}
