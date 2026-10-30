import { loadEnv } from 'vite'
const env = { ...loadEnv('production', process.cwd(), ''), ...process.env }
if (!env.VITE_SITE_URL || !/^https:\/\/[^/]+\/?$/.test(env.VITE_SITE_URL)) {
  console.error('Configure VITE_SITE_URL com a origem HTTPS pública antes do build de produção, por exemplo na configuração da hospedagem. Consulte .env.example e README.md.')
  process.exit(1)
}
