# Júnior Maia Müller · Portfólio

Portfólio em português, com React + TypeScript + Vite, Tailwind CSS, Motion for React, GSAP/ScrollTrigger, Three.js, React Three Fiber, Drei e Lucide. Tipografia Inter e Space Grotesk servida localmente. Sem backend ou credenciais necessárias para navegar.

## Executar

Requisito: Node.js 24 LTS e npm. Versões instaladas registradas em `package-lock.json`.

```powershell
npm ci
npm run dev
```

Abra o endereço mostrado pelo Vite. Para verificar e servir o build:

```powershell
npm run check
npm run build
npm run preview
```

`check` verifica TypeScript. `build` verifica tipos, compila e gera HTML com metadados específicos para a página inicial e os seis projetos. O build sem domínio é uma prévia com `noindex`: não publica URLs fictícias.

## Conteúdo e organização

- `src/data/profile.ts`: apresentação, especialidades, navegação, experiência e tecnologias.
- `src/data/projects.ts`: seis projetos, recursos, contexto, problema, solução, tecnologias, diagramas conceituais e links verificados.
- `src/pages/`: página inicial e páginas individuais em `/projetos/:slug`.
- `src/components/`: navegação, abertura, hero, núcleo 3D, visuais, laboratório e seções.
- `src/hooks/`: preferências de mídia e visibilidade.
- `src/animations/`: efeitos de rolagem com limpeza no unmount.
- `src/styles/global.css`: identidade visual, breakpoints, efeitos e regras de acessibilidade; Tailwind também está disponível.
- `src/utils/seo.ts`: atualização dos metadados ao navegar no cliente.
- `scripts/`: geração de HTML/SEO e validação da origem pública.
- `public/`: favicon JM, imagem Open Graph, cabeçalhos e fallback de rotas do Pages.

Os seis projetos possuem material visual próprio. Saphire Line, CRM Studio e Crônicas de Avernor usam capturas reais; SmartLocker combina uma captura do aplicativo com uma visualização conceitual do produto; Automate Crediagora usa diagramas técnicos; Cofre Nerd usa conceitos de interface baseados no briefing. Cada item informa se é captura, conceito ou diagrama. Valores mostrados nas telas e no laboratório são demonstrativos, sem métricas profissionais inventadas.

## Interações

- Abertura animada de 1,8 segundo, uma vez por sessão, com indicador de progresso, botão Pular e Escape. O armazenamento é opcional.
- Esfera 3D no hero com modos Órbita, Rede e Pulso; rotação por arrasto ou teclado, zoom, pausa, reinício e focos de exploração que levam às seções do portfólio. As partículas acompanham o tema; qualidade reduzida no mobile e fallback sem WebGL.
- Menu superior em cápsula, com indicador elástico da seção ativa, links interativos e controles de tema, busca e exploração; menu editorial responsivo com fechamento por Escape, cabeçalho compacto ao rolar, progresso de rolagem, luz ambiente que acompanha o ponteiro, retorno ao topo e atalho `Ctrl+K` / `Cmd+K` para busca. Na busca, use setas, Enter e Escape.
- Menu editorial em diálogo acessível e três identidades visuais (Aurora elétrica, Nebulosa e Editorial solar), que alteram atmosfera, superfícies, acentos, brilhos, formas e tipografia; preferência salva localmente quando o navegador permite.
- Projetos com contagens por categoria, filtros animados, alternância entre grade e galeria horizontal com snap, controles de navegação, tilt discreto e páginas individuais; transições nativas entre projetos e retorno.
- Páginas de projeto com narrativa de contexto, comparação interativa entre desafio e abordagem, arquitetura conceitual e recursos. O resumo numérico do portfólio é calculado a partir dos projetos e tecnologias cadastrados.
- Hero com campo visual de linhas e grade reativas ao ponteiro, nome com tipografia técnica interativa (revelação por proximidade, letras arrastáveis e impulso ao clique), ilustração halftone interativa como placeholder para futura foto pessoal, crachá 3D interativo com retrato vetorial temporário na seção Sobre e faixa contínua de tecnologias (pausa no hover).
- Os efeitos de canvas do hero são limitados a 30 quadros por segundo e param fora da viewport ou com a aba oculta; movimento reduzido mantém somente a versão estática.
- Timeline com detalhes expansíveis; tecnologias com descrições no hover ou foco.
- Data Visualization: categorias, períodos, indicadores calculados e tabela acessível.
- Terminal: `help`, `about`, `projects`, `skills`, `contact`, `github`, `clear`; histórico nas setas ↑ ↓. Terminal simulado, sem execução arbitrária.
- Particle Network: ponteiro/toque, pausa, reorganização e controle de densidade.
- Encerramento visual de contato com texto revelado progressivamente. GitHub disponível como contato; LinkedIn, e-mail e cópia somente quando configurados. Não há formulário sem serviço de envio.

## Publicar no Cloudflare Pages ou Vercel

O projeto está preparado para publicação, mas nenhum serviço de hospedagem foi criado ou alterado automaticamente.

1. Coloque este diretório em um repositório Git.
2. Importe-o no Cloudflare Pages (React/Vite) ou Vercel (Vite).
3. Use Node.js 24, instalação `npm ci`, build `npm run build:production` e diretório de saída `dist`.
4. Defina `VITE_SITE_URL` como a origem HTTPS real do site, sem caminho. Use o domínio atribuído pela plataforma ou seu domínio próprio. Se a URL só estiver disponível após criar o projeto de hospedagem, configure-a antes do primeiro build definitivo.
5. Opcionalmente defina `VITE_CONTACT_EMAIL` e `VITE_LINKEDIN_URL`. Copie `.env.example` para `.env.local` apenas no desenvolvimento local.
6. Publique. O script gera `robots.txt`, `sitemap.xml`, canonical e Open Graph absoluto para a origem configurada.
7. Confira `/`, as seis páginas, `/sitemap.xml`, `/robots.txt`, `/og-cover.png` e os links de contato no domínio real.

O arquivo `public/_redirects` fornece fallback de SPA no Pages; arquivos estáticos das páginas de projeto têm precedência. O build gera cada projeto como `.html` e como diretório com `index.html`, atendendo URLs com e sem barra final. `vercel.json` ativa `cleanUrls` e define build, saída, cabeçalhos e rewrite para acesso direto às rotas. Não são necessárias Functions, banco de dados, Supabase ou tokens Cloudflare para este portfólio estático. Os nomes dessas ferramentas nas seções de stack e projetos não configuram serviços externos.

Referências oficiais: [Vite](https://vite.dev/guide/), [React no Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/), [Vite na Vercel](https://vercel.com/docs/frameworks/frontend/vite).

## Verificação dos repositórios

Em 30/10/2026, os links públicos dos projetos foram verificados antes da inclusão. Os repositórios de SmartLocker, CRM Studio, Automate Crediagora e Avernor responderam via Git. A aplicação do Saphire Line, sua demonstração, a enciclopédia Crônicas de Avernor e Crônicas Vivas responderam por HTTPS.

- O Saphire Line apresenta links para a aplicação, a demonstração e o código-fonte, além de capturas reais do modo demonstrativo.
- Crônicas de Avernor apresenta a enciclopédia pública, o capítulo Crônicas Vivas e o código-fonte.
- SmartLocker, CRM Studio e Automate Crediagora apresentam seus repositórios públicos. Nenhum endereço de aplicação foi incluído porque não foi localizado um deploy público verificável.
- Cofre Nerd não foi identificado nos repositórios públicos do autor; nenhum endereço foi inventado.
- Os demais dados profissionais e recursos descritos vêm do briefing do autor. Nenhuma base privada, credencial, URL interna ou detalhe operacional confidencial foi copiado para o site.

## Performance e acessibilidade

Canvas 3D carregado em chunk separado quando visível; laboratório carregado próximo ao viewport; partículas carregadas ao selecionar sua aba; páginas individuais divididas em chunk. A cena é desmontada fora da área visível e usa limite de resolução e menos partículas em telas pequenas. A rede 2D para quando a aba está oculta ou a experiência sai do viewport. `prefers-reduced-motion` desativa movimento contínuo, tilt, animação inicial e transições; o conteúdo permanece disponível.

Diálogo nativo gerencia foco da busca e abertura. HTML semântico, link Pular, estados ARIA, tabs com teclado, tabela alternativa ao gráfico e fallback de erro estão implementados. Smooth scrolling usa comportamento nativo; Lenis e cursor customizado não foram adicionados para preservar simplicidade e navegação.

Não confunda build com validação no domínio de produção. Os resultados da verificação local estão em `VALIDATION.md`; publicação e verificação em aparelho físico dependem do ambiente final.
