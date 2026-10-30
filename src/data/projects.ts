export type Project = {
  slug: string; name: string; category: string; type: 'Web' | 'Dados' | 'IoT' | 'IA';
  description: string; technologies: string[]; features: string[];
  context: string; problem: string; solution: string; architecture: string[];
  visual: 'finance' | 'locker' | 'crm' | 'automation' | 'avernor' | 'cards';
  accent: string; repository?: string; liveUrl?: string; demoUrl?: string; note?: string;
  screenshots?: { src: string; alt: string; caption: string; format: 'landscape' | 'portrait'; kind: 'capture' | 'concept' | 'diagram' }[];
}

// Textos baseados no briefing. Links públicos verificados em 30/10/2026.
// Cada imagem informa se é captura real, conceito ou diagrama.
export const projects: Project[] = [
  {
    slug: 'saphire-line', name: 'Saphire Line', category: 'FINANÇAS PESSOAIS', type: 'Web', visual: 'finance', accent: '#7e9dff',
    description: 'Clareza para suas finanças. Controle para suas próximas escolhas.',
    technologies: ['React', 'TypeScript', 'Cloudflare Workers', 'D1', 'Supabase Auth', 'PWA'],
    features: ['Dashboard financeiro', 'Receitas e despesas', 'Metas e cartões', 'Calendário financeiro', 'Relatórios e exportações', 'Autenticação segura', 'Aplicação instalável (PWA)', 'Interface responsiva'],
    context: 'Aplicação de gerenciamento financeiro pessoal, reunindo a visão cotidiana e o planejamento financeiro.',
    problem: 'Receitas, despesas, cartões e metas dispersos dificultam entender o cenário financeiro em conjunto.',
    solution: 'Uma experiência integrada para acompanhar movimentações, organizar cartões, planejar compromissos e analisar resultados em diferentes telas.',
    architecture: ['Interface e PWA · React + TypeScript', 'API e persistência · Cloudflare Workers + D1', 'Identidade · Supabase Auth'],
    repository: 'https://github.com/Mullerjr6/saphire-line',
    liveUrl: 'https://app.saphireline.com.br',
    demoUrl: 'https://app.saphireline.com.br/?demo=1',
    screenshots: [
      { src: '/projects/saphire-line/relatorios-desktop.png', alt: 'Tela de relatórios financeiros do Saphire Line em modo demonstrativo', caption: 'Relatórios financeiros · desktop', format: 'landscape', kind: 'capture' },
      { src: '/projects/saphire-line/calendario-desktop.png', alt: 'Tela de calendário financeiro do Saphire Line em modo demonstrativo', caption: 'Calendário financeiro · desktop', format: 'landscape', kind: 'capture' },
      { src: '/projects/saphire-line/visao-geral-mobile.png', alt: 'Visão geral do Saphire Line em uma tela de celular no modo demonstrativo', caption: 'Visão geral · mobile', format: 'portrait', kind: 'capture' },
    ],
    note: 'As capturas exibem a conta demonstrativa do produto. Os valores são ilustrativos e não correspondem a dados financeiros pessoais.',
  },
  {
    slug: 'smartlocker', name: 'SmartLocker', category: 'HARDWARE + SOFTWARE', type: 'IoT', visual: 'locker', accent: '#70e6cb',
    description: 'Do toque na tela ao mundo físico. Um cofre conectado.',
    technologies: ['ESP32', 'C++', 'React Native', 'Expo', 'Supabase'],
    features: ['ESP32', 'Abertura remota pelo aplicativo', 'RFID', 'Autenticação', 'Monitoramento de estado', 'Integração com Supabase', 'Aplicativo mobile'],
    context: 'Sistema de cofre inteligente que conecta um dispositivo físico a uma aplicação mobile.',
    problem: 'Conectar controle de acesso físico e interação remota em uma experiência de uso compreensível.',
    solution: 'Integração de ESP32, identificação RFID e aplicativo, com autenticação e monitoramento do estado do cofre.',
    architecture: ['Aplicativo · React Native + Expo', 'Autenticação e integração · Supabase', 'Dispositivo · ESP32 + RFID'],
    repository: 'https://github.com/Mullerjr6/SmartLocker',
    screenshots: [
      { src: '/projects/smartlocker/conceito-smartlocker.png', alt: 'Visual conceitual do cofre conectado SmartLocker', caption: 'SmartLocker · visual conceitual do produto', format: 'landscape', kind: 'concept' },
      { src: '/projects/smartlocker/acesso-mobile.png', alt: 'Tela real de acesso do aplicativo SmartLocker', caption: 'Acesso autorizado · aplicativo mobile', format: 'portrait', kind: 'capture' },
    ],
    note: 'A primeira imagem é uma visualização conceitual do produto. A tela de acesso foi capturada diretamente do aplicativo React Native em execução local.',
  },
  {
    slug: 'crm-studio', name: 'CRM Studio', category: 'DADOS + RELACIONAMENTO', type: 'Dados', visual: 'crm', accent: '#b0a3ff',
    description: 'Transformando bases de dados em campanhas organizadas.',
    technologies: ['JavaScript', 'HTML', 'CSS', 'Excel'],
    features: ['Segmentação de clientes', 'Processamento de planilhas', 'Regras de distribuição', 'Indicadores de campanhas', 'Visualizações analíticas'],
    context: 'Plataforma para geração, organização e distribuição de campanhas de relacionamento com clientes.',
    problem: 'Organizar bases, segmentações e regras de distribuição em um processo operacional consistente.',
    solution: 'Uma interface que reúne processamento de planilhas, segmentação e visualização dos indicadores de campanhas.',
    architecture: ['Entrada · planilhas Excel', 'Processamento e regras · JavaScript', 'Visualização e distribuição · interface web'],
    repository: 'https://github.com/Mullerjr6/CRM-Studio',
    screenshots: [
      { src: '/projects/crm-studio/gerador-desktop.png', alt: 'Tela do gerador de campanhas do CRM Studio', caption: 'Gerador de campanhas · desktop', format: 'landscape', kind: 'capture' },
      { src: '/projects/crm-studio/conversoes-desktop.png', alt: 'Painel de conversões e indicadores do CRM Studio', caption: 'Conversões e insights · desktop', format: 'landscape', kind: 'capture' },
      { src: '/projects/crm-studio/gerador-mobile.png', alt: 'Gerador de campanhas do CRM Studio em tela de celular', caption: 'Campanhas por loja · mobile', format: 'portrait', kind: 'capture' },
    ],
    note: 'As telas usam bases de demonstração e não exibem CPFs, telefones ou linhas de clientes.',
  },
  {
    slug: 'automate-crediagora', name: 'Automate Crediagora', category: 'AUTOMAÇÃO DE PROCESSOS', type: 'Dados', visual: 'automation', accent: '#68bdff',
    description: 'Rotinas repetitivas se tornam fluxos inteligentes.',
    technologies: ['Python', 'Selenium', 'Pandas', 'OpenPyXL'],
    features: ['Automação de navegação', 'Exportação de relatórios', 'Processamento de CSV e Excel', 'Atualização automática de bases', 'Logs e validações'],
    context: 'Projeto de automação de rotinas e processamento de dados operacionais.',
    problem: 'Etapas recorrentes de navegação, exportação e consolidação exigem consistência e acompanhamento.',
    solution: 'Fluxos em Python para coordenar navegação, tratar arquivos e acompanhar a execução com logs e validações.',
    architecture: ['Navegação · Selenium', 'Transformação · Pandas + OpenPyXL', 'Saída · bases, logs e validações'],
    repository: 'https://github.com/Mullerjr6/Automate-Crediagora',
    screenshots: [
      { src: '/projects/automate-crediagora/pipeline.svg', alt: 'Diagrama conceitual do pipeline da automação Crediagora', caption: 'Pipeline operacional · diagrama', format: 'landscape', kind: 'diagram' },
      { src: '/projects/automate-crediagora/observabilidade.svg', alt: 'Painel conceitual de monitoramento da automação Crediagora', caption: 'Execução e validações · diagrama', format: 'landscape', kind: 'diagram' },
    ],
    note: 'Os diagramas explicam o fluxo técnico sem reproduzir telas internas, credenciais ou dados operacionais.',
  },
  {
    slug: 'cronicas-de-avernor', name: 'Crônicas de Avernor', category: 'NARRATIVA + INTELIGÊNCIA ARTIFICIAL', type: 'IA', visual: 'avernor', accent: '#c6a5f6',
    description: 'Universos imaginados. Experiências que ganham vida.',
    technologies: ['React', 'JavaScript', 'Vite', 'Cloudflare Pages', 'Workers AI'],
    features: ['Enciclopédia interativa', 'Atlas canônico', 'Busca global', 'Genealogias', 'Catálogos editoriais', 'Crônicas Vivas', 'Interface responsiva'],
    context: 'Enciclopédia web e experiência narrativa do universo original de Avernor, conectando história, personagens, territórios e um capítulo jogável.',
    problem: 'Organizar um universo extenso sem perder relações entre personagens, lugares, eras e acontecimentos.',
    solution: 'Uma experiência editorial com acervos conectados, busca, atlas interativo e o módulo narrativo Crônicas Vivas.',
    architecture: ['Enciclopédia e acervos · React + Vite', 'Conteúdo canônico · índices estruturados', 'Crônicas Vivas · Cloudflare Workers AI'],
    repository: 'https://github.com/Mullerjr6/Avernor',
    liveUrl: 'https://cronicas-de-avernor.pages.dev',
    demoUrl: 'https://cronicas-vivas-avernor.pages.dev',
    screenshots: [
      { src: '/projects/cronicas-de-avernor/enciclopedia.png', alt: 'Página inicial da enciclopédia Crônicas de Avernor', caption: 'Enciclopédia oficial · página inicial', format: 'landscape', kind: 'capture' },
      { src: '/projects/cronicas-de-avernor/atlas.png', alt: 'Tela do Atlas canônico de Avernor', caption: 'Atlas canônico · exploração', format: 'landscape', kind: 'capture' },
      { src: '/projects/cronicas-de-avernor/cronicas-vivas.png', alt: 'Tela inicial do capítulo Crônicas Vivas', caption: 'Crônicas Vivas · capítulo jogável', format: 'landscape', kind: 'capture' },
    ],
    note: 'As capturas foram feitas nas versões públicas da enciclopédia e de Crônicas Vivas.',
  },
  {
    slug: 'cofre-nerd', name: 'Cofre Nerd', category: 'E-COMMERCE', type: 'Web', visual: 'cards', accent: '#f2c572',
    description: 'Uma experiência de compra para quem coleciona histórias.',
    technologies: ['React', 'Axios', 'Context API', 'React Router'],
    features: ['Catálogo de produtos', 'Carrinho de compras', 'Filtros', 'Navegação entre páginas', 'Persistência local'],
    context: 'Projeto de e-commerce voltado a cartas Pokémon.',
    problem: 'Organizar a descoberta de produtos e o fluxo de compra de uma coleção em uma interface web.',
    solution: 'Catálogo com filtros e carrinho, navegação entre páginas e persistência local para manter o estado da experiência.',
    architecture: ['Catálogo e navegação · React Router', 'Dados · Axios', 'Carrinho e persistência · Context API + armazenamento local'],
    screenshots: [
      { src: '/projects/cofre-nerd/catalogo.svg', alt: 'Conceito visual do catálogo de cartas Cofre Nerd', caption: 'Catálogo de cartas · conceito visual', format: 'landscape', kind: 'concept' },
      { src: '/projects/cofre-nerd/carrinho.svg', alt: 'Conceito visual do carrinho de compras Cofre Nerd', caption: 'Carrinho e checkout · conceito visual', format: 'landscape', kind: 'concept' },
    ],
    note: 'Os visuais são conceitos criados a partir do briefing. Não foi identificado um repositório ou endereço público verificável para o projeto.',
  },
]
