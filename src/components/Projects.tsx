import { useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Grid2X2, PanelsTopLeft } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Github } from './BrandIcons'
import { projects } from '../data/projects'
import { SectionHeading } from './SectionHeading'
import { ProjectVisual } from './ProjectVisual'
import { useMedia } from '../hooks/useExperience'
import { clearSpotlight, updateSpotlight } from '../animations/spotlight'

export function Projects() {
  const [filter, setFilter] = useState('Todos')
  const [view, setView] = useState<'grid' | 'gallery'>('grid')
  const reduced = useMedia('(prefers-reduced-motion: reduce)')
  const fine = useMedia('(pointer: fine)')
  const gallery = useRef<HTMLDivElement>(null)
  const filteredProjects = projects.filter(p => filter === 'Todos' || p.type === filter)
  const filters = ['Todos', 'Web', 'Dados', 'IoT', 'IA']
  const moveGallery = (direction: -1 | 1) => {
    const element = gallery.current
    if (!element) return
    element.scrollBy({ left: direction * element.clientWidth * .82, behavior: reduced ? 'instant' : 'smooth' })
  }
  const tilt = (e: PointerEvent<HTMLElement>) => {
    if (reduced || !fine) return
    updateSpotlight(e)
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--rx', `${-(e.clientY - rect.top - rect.height / 2) / rect.height * 4}deg`)
    e.currentTarget.style.setProperty('--ry', `${(e.clientX - rect.left - rect.width / 2) / rect.width * 4}deg`)
  }
  return <section id="projetos" className="section-shell section-space">
    <SectionHeading number="04" eyebrow="IDEIAS QUE SAÍRAM DO PAPEL" title="Código com propósito." description="Uma seleção de projetos que conectam tecnologia a problemas reais." />
    <div className="project-toolbar"><div className="filter-tabs" role="group" aria-label="Filtrar projetos">{filters.map(f => {
      const count = f === 'Todos' ? projects.length : projects.filter(project => project.type === f).length
      return <button key={f} className={filter === f ? 'selected' : ''} aria-pressed={filter === f} onClick={() => { setFilter(f); gallery.current?.scrollTo({ left: 0, behavior: 'instant' }) }}>{filter === f && <motion.span className="filter-indicator" layoutId="project-filter-indicator" transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }} aria-hidden="true" />}{f}<span className="filter-count">{String(count).padStart(2, '0')}</span></button>
    })}</div><span className="project-count" aria-live="polite">{String(filteredProjects.length).padStart(2, '0')} PROJETOS</span></div>
    <div className="project-view-toolbar"><div className="project-view-switch" role="group" aria-label="Modo de visualização dos projetos"><button type="button" className={view === 'grid' ? 'selected' : ''} aria-pressed={view === 'grid'} onClick={() => setView('grid')}><Grid2X2 size={15} /> Grade</button><button type="button" className={view === 'gallery' ? 'selected' : ''} aria-pressed={view === 'gallery'} onClick={() => setView('gallery')}><PanelsTopLeft size={15} /> Galeria</button></div>{view === 'gallery' && <div className="gallery-controls"><button type="button" aria-label="Projeto anterior" onClick={() => moveGallery(-1)}><ArrowLeft size={16} /></button><button type="button" aria-label="Próximo projeto" onClick={() => moveGallery(1)}><ArrowRight size={16} /></button><span>DESLIZE OU USE AS SETAS</span></div>}</div>
    <div ref={gallery} className={`projects-grid${view === 'gallery' ? ' is-gallery' : ''}`} tabIndex={view === 'gallery' ? 0 : undefined} aria-label={view === 'gallery' ? 'Galeria horizontal de projetos' : undefined}><AnimatePresence initial={false} mode="popLayout">{filteredProjects.map(p => <motion.div className="project-card-motion" key={p.slug} layout={!reduced} initial={reduced ? false : { opacity: 0, y: 20, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduced ? undefined : { opacity: 0, y: -10, scale: .98 }} transition={{ duration: reduced ? 0 : .32, ease: [.22, 1, .36, 1] }}><article className="project-card spotlight-card" style={{ '--project-accent': p.accent } as CSSProperties} onPointerMove={tilt} onPointerLeave={e => { e.currentTarget.style.setProperty('--rx', '0deg'); e.currentTarget.style.setProperty('--ry', '0deg'); clearSpotlight(e.currentTarget) }}>
      <Link to={`/projetos/${p.slug}`} viewTransition={!reduced} className="project-image-link" aria-label={`Conhecer ${p.name}`}><ProjectVisual project={p} /><span className="project-open"><ArrowUpRight size={23} /></span></Link>
      <div className="project-info"><div className="project-category">{p.category}</div><h3><Link to={`/projetos/${p.slug}`} viewTransition={!reduced}>{p.name}</Link></h3><p>{p.description}</p><div className="tech-tags">{p.technologies.map(t => <span key={t}>{t}</span>)}</div><div className="project-links"><Link to={`/projetos/${p.slug}`} viewTransition={!reduced}>Explorar projeto <ArrowUpRight size={15} /></Link><div className="project-external-links">{p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" aria-label={`Abrir ${p.name}`}><ArrowUpRight size={15} /> Ao vivo</a>}{p.repository && <a href={p.repository} target="_blank" rel="noreferrer" aria-label={`Repositório de ${p.name}`}><Github size={16} /> Código</a>}</div></div></div>
    </article></motion.div>)}</AnimatePresence></div>
  </section>
}
