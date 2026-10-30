import { useState } from 'react'
import { ArrowRight, Check, Workflow } from 'lucide-react'
import { motion } from 'motion/react'
import type { Project } from '../data/projects'
import { useMedia } from '../hooks/useExperience'

export function ProjectComparison({ project }: { project: Project }) {
  const [view, setView] = useState<'challenge' | 'approach'>('challenge')
  const reduced = useMedia('(prefers-reduced-motion: reduce)')
  const isApproach = view === 'approach'
  return <section className="project-comparison reveal" aria-labelledby="comparison-title">
    <div className="comparison-heading">
      <div><span className="eyebrow">MUDANÇA DE PERSPECTIVA</span><h2 id="comparison-title">Do desafio à abordagem.</h2><p>Explore os dois lados da ideia. Descrições conceituais, sem métricas inventadas.</p></div>
      <div className="comparison-toggle" role="group" aria-label="Perspectiva do projeto">
        <button type="button" aria-pressed={!isApproach} className={!isApproach ? 'selected' : ''} onClick={() => setView('challenge')}>Desafio</button>
        <button type="button" aria-pressed={isApproach} className={isApproach ? 'selected' : ''} onClick={() => setView('approach')}>Abordagem</button>
      </div>
    </div>
    <div className="comparison-stage">
      <motion.div key={view} className={`comparison-panel ${isApproach ? 'approach' : 'challenge'}`} aria-live="polite" aria-atomic="true" initial={reduced ? false : { opacity: 0, y: 12, filter: 'blur(5px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: reduced ? 0 : .28 }}>
        <span className="comparison-index" aria-hidden="true">0{isApproach ? 2 : 1}</span>
        <div className="comparison-panel-top"><span>{isApproach ? <Check size={16} /> : <Workflow size={16} />}{isApproach ? 'ABORDAGEM' : 'DESAFIO'}</span><span>{project.category}</span></div>
        <h3>{isApproach ? 'Uma resposta em camadas.' : 'O ponto de partida.'}</h3>
        <p>{isApproach ? project.solution : project.problem}</p>
        {isApproach && <ul>{project.architecture.map(item => <li key={item}><i />{item}</li>)}</ul>}
      </motion.div>
      <div className="comparison-arrow" aria-hidden="true"><ArrowRight size={20} /></div>
    </div>
    <p className="comparison-footnote"><span>NOTA</span> {isApproach ? 'A arquitetura é uma visão conceitual baseada nas tecnologias apresentadas.' : 'O desafio é descrito a partir do contexto informado para o projeto.'}</p>
  </section>
}
