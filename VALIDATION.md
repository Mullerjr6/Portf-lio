# Validação local · 30/10/2026

Implementação e verificações executadas em Windows, Node.js 24.18.0 e Chrome 156, usando Vite e Playwright CLI. A pasta original estava vazia.

## Build e dependências

- `npm run check`: TypeScript aprovado.
- `npm run build`: compilação Vite e geração de páginas/metadados aprovadas.
- `npm run build:production`: aprovado com uma origem `.invalid` temporária, usada exclusivamente para verificar o gerador. O build final foi recriado sem essa origem.
- `npm install --package-lock-only`: dependências compatíveis e lockfile atualizado; auditoria npm retornou zero vulnerabilidades naquele momento.
- Scene 3D, laboratório, partículas e páginas de projetos gerados em chunks separados.
- JavaScript inicial: aproximadamente 185 kB gzip; chunk 3D sob demanda: aproximadamente 244 kB gzip. Estes são tamanhos de build, não medições de Core Web Vitals.

## Navegador real

- Abertura: botão Pular, registro em sessionStorage e não repetição na mesma sessão.
- Núcleo: renderização WebGL e pausa/retomada; fallback CSS verificado com WebGL indisponível.
- Projetos: filtros Todos/Web/Dados/IoT/IA retornam 6/2/2/1/1 cards, respectivamente.
- Seis páginas individuais: acesso direto retorna HTTP 200, conteúdo correto, títulos e Open Graph próprios no HTML recebido.
- Navegação entre projeto e página inicial; projeto inexistente apresenta recuperação.
- Command Palette: Ctrl+K, busca sem acentos, Enter, resultado vazio e Escape.
- Menu mobile: abertura e fechamento ao selecionar uma seção.
- Dashboard: Web/3 meses soma 239; Automação/3 meses soma 210; tabela acompanha os filtros. Todos os números são demonstrativos.
- Terminal: help, about, projects, skills, comando inválido, histórico, clear, abertura real do GitHub em nova aba e navegação com contact.
- Partículas: slider, pausa, reorganização e limite de 40 pontos no mobile.
- Tabs do laboratório respondem à tecla Home.
- Sem overflow horizontal nas larguras 320, 390, 768, 1024, 1440, 1920 e 2560 pixels.
- `prefers-reduced-motion`: abertura pulada e rolagem suave desativada, com conteúdo acessível.
- Capturas inspecionadas da página inicial, projetos, laboratório e página individual em desktop/mobile. Evidências locais em `output/playwright/` (ignoradas pelo Git).
- Teste do build servido em `vite preview`: **zero erros de JavaScript/console e zero avisos** durante os fluxos verificados.

## Acessibilidade e SEO

- Axe-core 4.14.0, regras WCAG 2 A/AA: homepage com laboratório carregado sem violações detectadas após correção dos contrastes apontados. A checagem automatizada complementa os testes por teclado; não é uma certificação de acessibilidade.
- Sitemap de teste com sete URLs; seis projetos com títulos/canonical próprios; Open Graph absoluto, robots e imagem PNG verificados.
- Imagem Open Graph original em SVG, rasterizada em PNG de 1200 × 630 para compartilhamento.
- Build sem `VITE_SITE_URL`: preview com `noindex` e robots bloqueando indexação, sem domínio inventado. Configure a origem real e rode `npm run build:production` para gerar os arquivos públicos.

## Limites da verificação

- Nenhum deploy externo foi realizado. Cloudflare Pages, Vercel, DNS e cabeçalhos reais devem ser conferidos após publicar.
- Responsividade foi verificada por viewport no Chrome; não foi realizado teste em aparelhos físicos, Safari ou Firefox.
- Não foram medidos Lighthouse/Core Web Vitals sob rede móvel real.
- Não há serviço de formulário, e-mail ou LinkedIn configurado. O GitHub é o canal de contato disponível.
- Dados e recursos dos projetos vêm do briefing; os links foram checados publicamente. O portfólio não executa nem audita os sistemas apresentados.
