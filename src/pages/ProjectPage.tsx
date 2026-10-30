import { Link, useParams } from 'react-router-dom'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { Github } from '../components/BrandIcons'
import { projects } from '../data/projects'
import { ProjectVisual } from '../components/ProjectVisual'
import { ProjectComparison } from '../components/ProjectComparison'
import { useSEO } from '../utils/seo'
import { useMedia } from '../hooks/useExperience'
import type { CSSProperties } from 'react'

export default function ProjectPage() {
  const { slug } = useParams()
  const reduced = useMedia('(prefers-reduced-motion: reduce)')
  const project = projects.find(p => p.slug === slug)
  useSEO(project ? `${project.name} | Júnior Maia Müller` : 'Projeto não encontrado | Júnior Maia Müller', project?.description || 'Explore os projetos de Júnior Maia Müller.', `/projetos/${slug}`)
  if (!project) return <div className="not-found section-shell"><span className="eyebrow">404 / PROJETO NÃO ENCONTRADO</span><h1>Esse caminho ainda<br />não foi construído.</h1><Link className="button primary" to="/#projetos">Explorar projetos <ArrowUpRight size={18} /></Link></div>
  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  const primaryVisual = project.screenshots?.[0]
  const visualDisclaimer = primaryVisual?.kind === 'capture'
    ? 'Captura real da aplicação. Quando houver valores ou registros, eles pertencem ao ambiente demonstrativo.'
    : primaryVisual?.kind === 'diagram'
      ? 'Diagrama explicativo criado para apresentar o fluxo sem expor dados, credenciais ou telas internas.'
      : project.screenshots
        ? 'Visual conceitual criado a partir do projeto e identificado para não ser confundido com uma fotografia ou captura da aplicação.'
        : 'Representação conceitual criada para este portfólio. Não é uma captura da aplicação. Valores e elementos ilustrativos não representam resultados reais.'
  return <article className="project-page section-shell" style={{ '--project-accent': project.accent } as CSSProperties}>
    <Link className="back-link" to="/#projetos" viewTransition={!reduced}><ArrowLeft size={16} /> Todos os projetos</Link>
    <div className="project-page-title">
      <div><span className="eyebrow">{project.category}</span><h1>{project.name}<span>.</span></h1><p>{project.description}</p></div>
      <div className="project-page-actions">
        {project.liveUrl && <a className="button primary" href={project.liveUrl} target="_blank" rel="noreferrer">Abrir aplicação <ArrowUpRight size={17} /></a>}
        {project.demoUrl && <a className="button ghost" href={project.demoUrl} target="_blank" rel="noreferrer">Ver demonstração <ArrowUpRight size={17} /></a>}
        {project.repository && <a className="button ghost" href={project.repository} target="_blank" rel="noreferrer"><Github size={18} /> Repositório <ArrowUpRight size={17} /></a>}
      </div>
    </div>
    <div className="tech-tags">{project.technologies.map(t => <span key={t}>{t}</span>)}</div>
    <ProjectVisual project={project} large />
    <p className="visual-disclaimer">{visualDisclaimer}</p>
    {project.screenshots && <section className="project-gallery reveal" aria-labelledby="project-gallery-title">
      <div className="project-gallery-heading"><span className="eyebrow">POR DENTRO DO PROJETO</span><h2 id="project-gallery-title">Visuais em contexto.</h2><p>Capturas, conceitos e diagramas identificados individualmente para mostrar cada projeto com transparência.</p></div>
      <div className={`project-gallery-grid count-${project.screenshots.length}`}>{project.screenshots.map((screenshot, index) => <figure className={`project-gallery-item ${screenshot.format}`} key={screenshot.src}>
        <div><img src={screenshot.src} alt={screenshot.alt} loading={index === 0 ? 'eager' : 'lazy'} /></div><figcaption><span>0{index + 1}</span>{screenshot.caption}</figcaption>
      </figure>)}</div>
    </section>}
    <div className="case-grid reveal"><div className="case-label"><span className="eyebrow">VISÃO DO PROJETO</span><h2>Do contexto<br />à construção.</h2></div><div className="case-content">{[['01', 'Contexto', project.context], ['02', 'O problema', project.problem], ['03', 'A solução', project.solution]].map(([n, label, value]) => <div key={n}><span className="eyebrow">{n} / {label}</span><p>{value}</p></div>)}</div></div>
    <ProjectComparison project={project} />
    <div className="case-grid architecture-section reveal"><div className="case-label"><span className="eyebrow">COMO AS PARTES SE CONECTAM</span><h2>Arquitetura<br />em perspectiva.</h2><p>Visão conceitual baseada nas tecnologias e nos recursos apresentados.</p></div><div className="architecture">{project.architecture.map((step, i) => <div key={step}><div className="architecture-node"><span>0{i + 1}</span>{step}</div>{i !== project.architecture.length - 1 && <ArrowDown size={20} />}</div>)}</div></div>
    <div className="case-grid reveal"><div className="case-label"><span className="eyebrow">O QUE COMPÕE A EXPERIÊNCIA</span><h2>Recursos.</h2></div><ul className="feature-list">{project.features.map(f => <li key={f}><Check size={17} />{f}</li>)}</ul></div>
    {project.note && <p className="project-note reveal">{project.note}</p>}
    <Link className="next-project" to={`/projetos/${next.slug}`} viewTransition={!reduced}><div><span className="eyebrow">CONTINUE EXPLORANDO</span><h2>{next.name}</h2></div><ArrowRight size={38} /></Link>
  </article>
}
