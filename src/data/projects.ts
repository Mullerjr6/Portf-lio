export type Project = {
  slug: string; name: string; category: string; type: 'Web' | 'Dados' | 'IoT' | 'IA';
  description: string; technologies: string[]; features: string[];
  context: string; problem: string; solution: string; architecture: string[];
  visual: 'finance' | 'locker' | 'crm' | 'automation' | 'avernor' | 'cards';
  accent: string; repository?: string; note?: string;
}

// Textos baseados no briefing. Links públicos verificados em 30/10/2026.
// Diagramas e miniaturas são representações conceituais, não auditorias do código.
export const projects: Project[] = [
  {
    slug: 'saphire-line', name: 'Saphire Line', category: 'FINANÇAS PESSOAIS', type: 'Web', visual: 'finance', accent: '#7e9dff',
    description: 'Clareza para suas finanças. Controle para suas próximas escolhas.',
    technologies: ['React', 'TypeScript', 'Cloudflare', 'Supabase'],
    features: ['Dashboard financeiro', 'Receitas e despesas', 'Metas financeiras', 'Cartões', 'Calendário financeiro', 'Autenticação', 'Interface responsiva'],
    context: 'Aplicação de gerenciamento financeiro pessoal, reunindo a visão cotidiana e o planejamento financeiro.',
    problem: 'Receitas, despesas, cartões e metas dispersos dificultam entender o cenário financeiro em conjunto.',
    solution: 'Uma experiência integrada para acompanhar movimentações, organizar cartões e visualizar metas e calendário.',
    architecture: ['Interface React + TypeScript', 'Autenticação e dados · Supabase', 'Publicação · Cloudflare'],
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
  },
  {
    slug: 'cronicas-de-avernor', name: 'Crônicas de Avernor', category: 'NARRATIVA + INTELIGÊNCIA ARTIFICIAL', type: 'IA', visual: 'avernor', accent: '#c6a5f6',
    description: 'Universos imaginados. Experiências que ganham vida.',
    technologies: ['React', 'JavaScript', 'APIs de IA'],
    features: ['Conversas dinâmicas', 'Memória contextual', 'Personagens independentes', 'Interface imersiva'],
    context: 'Experiência de interação com personagens por inteligência artificial no universo de Avernor, conforme a proposta do projeto.',
    problem: 'Conectar narrativa, identidade dos personagens e continuidade contextual em uma interface imersiva.',
    solution: 'Conversas dinâmicas com personagens independentes e memória contextual, apresentadas em uma experiência narrativa.',
    architecture: ['Experiência narrativa · React', 'Contexto e personagens · JavaScript', 'Geração de respostas · APIs de IA'],
    repository: 'https://github.com/Mullerjr6/Avernor',
    note: 'O repositório público atual reúne a enciclopédia do universo e o módulo Crônicas Vivas. Esta apresentação destaca a proposta de interação com IA fornecida no briefing.',
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
  },
]
