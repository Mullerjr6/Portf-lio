import type { PointerEvent } from 'react'
import { BarChart3, Code2, Workflow, ArrowUpRight, Database, Cpu } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { experience, stack } from '../data/profile'
import { clearSpotlight, updateSpotlight } from '../animations/spotlight'
import { PortfolioStats } from './PortfolioStats'
import { ProfileBadge } from './ProfileBadge'

const spotlightHandlers = {
  onPointerMove: updateSpotlight,
  onPointerLeave: (event: PointerEvent<HTMLElement>) => clearSpotlight(event.currentTarget),
}

export function About() {
  return <section id="sobre" className="section-shell section-space about-section"><ProfileBadge /><SectionHeading number="01" eyebrow="POR TRÁS DO CÓDIGO" title="Curiosidade que vira construção." />
    <div className="about-grid"><div className="about-main reveal"><span className="eyebrow"><span className="status-dot" /> CONECTANDO PONTOS</span><h3>Um olhar analítico.<br />Uma mente <span>criativa.</span></h3><p>Sou Júnior Maia Müller. Minha atuação conecta Data Science, Controladoria, Business Intelligence e desenvolvimento de software.</p><p>Gosto de entender o problema, encontrar os padrões e construir soluções que fazem sentido — de uma base de dados a uma aplicação, de uma rotina manual a um processo automatizado.</p><div className="about-sign">Júnior Maia Müller <ArrowUpRight size={20} /></div></div>
    <div className="about-card reveal spotlight-card" {...spotlightHandlers}><BarChart3 /><span className="about-number">01</span><h3>Dados que contam histórias.</h3><p>Tratamento e análise de bases, dashboards e indicadores que ajudam a enxergar o que importa.</p><div className="mini-bars" aria-hidden="true">{[34, 48, 40, 72, 59, 87, 78, 100].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div></div>
    <div className="about-card reveal spotlight-card" {...spotlightHandlers}><Code2 /><span className="about-number">02</span><h3>Ideias que ganham interface.</h3><p>Aplicações web e integrações entre software e hardware, construídas para conectar o digital ao cotidiano.</p><div className="code-decoration" aria-hidden="true"><span>const</span> ideia = <b>criar()</b><br /><span>return</span> possibilidades</div></div>
    <div className="about-wide reveal"><Workflow size={28} /><div><h3>Automatizar para ir além.</h3><p>Rotinas operacionais, planilhas e sistemas conectados em fluxos mais inteligentes.</p></div><span className="about-flow" aria-hidden="true"><Database />···<Cpu />···<ArrowUpRight /></span></div></div>
  </section>
}

export function Experience() {
  return <section id="experiencia" className="section-shell section-space"><SectionHeading number="02" eyebrow="TECNOLOGIA NO MUNDO REAL" title="Onde a prática acontece." />
    <div className="experience-layout"><div className="experience-date"><span className="status-dot" /> {experience.period}<p>Uma visão integrada entre<br />dados, negócio e tecnologia.</p></div><div className="timeline"><div className="timeline-track"><div className="timeline-fill" /></div><article className="experience-card reveal"><div className="experience-top"><span className="eyebrow">{experience.company}</span><span className="current-pill">ATUAL</span></div><h3>{experience.role}</h3><p>{experience.summary}</p><details><summary>Explorar minha atuação <span>+</span></summary><ul>{experience.activities.map(a => <li key={a}>{a}</li>)}</ul></details><div className="tech-tags"><span>Python</span><span>Power BI</span><span>Excel & CSV</span><span>CRM</span></div></article></div></div>
  </section>
}

export function Technologies() {
  const positionTooltip = (item: HTMLDivElement) => {
    const tooltip = item.querySelector<HTMLElement>('.stack-tooltip')
    const card = item.closest<HTMLElement>('.stack-card')
    if (!tooltip || !card) return
    const itemBounds = item.getBoundingClientRect()
    const cardBounds = card.getBoundingClientRect()
    const width = Math.min(190, cardBounds.width - 24)
    const left = Math.max(cardBounds.left + 12, Math.min(itemBounds.left - 10, cardBounds.right - width - 12))
    tooltip.style.setProperty('--tooltip-left', `${left - itemBounds.left}px`)
    tooltip.style.setProperty('--tooltip-width', `${width}px`)
  }
  return <section id="tecnologias" className="section-shell section-space"><SectionHeading number="03" eyebrow="FERRAMENTAS, NÃO LIMITES" title="Minha caixa de possibilidades." description="Cada desafio pede uma combinação. Estas são as tecnologias que conectam minhas ideias." />
    <PortfolioStats />
    <div className="stack-grid">{stack.map((group, index) => <article className="stack-card reveal spotlight-card" {...spotlightHandlers} key={group.name}><div className="stack-header">{[<Database />, <Code2 />, <Workflow />, <Cpu />][index]}<span>{group.code}</span></div><h3>{group.name}</h3><p>{group.description}</p><div className="stack-items">{group.items.map(([name, description]) => <div className="stack-item" tabIndex={0} key={name} onPointerEnter={event => positionTooltip(event.currentTarget)} onFocus={event => positionTooltip(event.currentTarget)}><span>{name}</span><ArrowUpRight size={13} /><div className="stack-tooltip" role="tooltip">{description}</div></div>)}</div></article>)}</div>
  </section>
}
