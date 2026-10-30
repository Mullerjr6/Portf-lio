export const profile = {
  name: 'Júnior Maia Müller',
  github: 'https://github.com/Mullerjr6',
  email: import.meta.env.VITE_CONTACT_EMAIL?.trim() || '',
  linkedin: /^https:\/\/(www\.)?linkedin\.com\//.test(import.meta.env.VITE_LINKEDIN_URL || '') ? import.meta.env.VITE_LINKEDIN_URL : '',
  specialties: ['Data Science', 'Desenvolvimento', 'Automação & RPA', 'Business Intelligence'],
  description: 'Desenvolvo soluções inteligentes que conectam dados, automação e experiências digitais.',
}

export const sections = [
  { id: 'inicio', label: 'Início' }, { id: 'sobre', label: 'Sobre' },
  { id: 'experiencia', label: 'Experiência' }, { id: 'tecnologias', label: 'Tecnologias' },
  { id: 'projetos', label: 'Projetos' }, { id: 'laboratorio', label: 'Laboratório' },
  { id: 'contato', label: 'Contato' },
]

export const stack = [
  { name: 'Dados & análise', code: '01', description: 'Da base bruta à decisão informada.', items: [
    ['Python', 'Análise, transformação de dados e scripts.'], ['Pandas', 'Limpeza e consolidação de bases tabulares.'],
    ['Excel', 'Tratamento de planilhas e rotinas operacionais.'], ['Power BI', 'Dashboards, indicadores e análise gerencial.'], ['SQL', 'Consultas e organização de dados relacionais.'],
  ] },
  { name: 'Desenvolvimento', code: '02', description: 'Interfaces que conectam pessoas e soluções.', items: [
    ['JavaScript', 'Interatividade e lógica de aplicações.'], ['TypeScript', 'Código com contratos e tipagem estática.'],
    ['React', 'Interfaces organizadas em componentes.'], ['HTML & CSS', 'Estrutura semântica e interfaces responsivas.'], ['APIs REST', 'Comunicação entre serviços e aplicações.'],
  ] },
  { name: 'Automação', code: '03', description: 'Menos repetição. Mais possibilidades.', items: [
    ['Selenium', 'Automação de navegação e rotinas web.'], ['Processos & RPA', 'Transformação de tarefas repetitivas em fluxos.'], ['Integrações', 'Conexão entre sistemas, dados e dispositivos.'],
  ] },
  { name: 'Infra & ferramentas', code: '04', description: 'A base para construir e colocar no mundo.', items: [
    ['Git', 'Versionamento e evolução do código.'], ['GitHub', 'Repositórios e colaboração.'], ['Supabase', 'Banco de dados e autenticação.'], ['Cloudflare', 'Publicação e serviços na borda.'], ['VS Code', 'Ambiente de desenvolvimento.'],
  ] },
]

export const experience = {
  company: 'Lojas Hoje / Crediagora', role: 'Data Science & Controladoria', period: 'ABR 2026 — ATUAL',
  summary: 'Dados que aproximam a operação da estratégia.',
  activities: ['Power BI e dashboards gerenciais', 'Acompanhamento de indicadores e metas', 'Controle e tratamento de dados comerciais', 'Criação de automações com Python', 'Processamento e consolidação de arquivos Excel e CSV', 'Apoio a campanhas de CRM'],
}
