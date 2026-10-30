import { stack } from '../../data/profile'

const technologies = [...new Set(stack.flatMap(group => group.items.map(([name]) => name)))]

export function TechMarquee() {
  return <section className="tech-marquee section-shell" aria-label="Tecnologias utilizadas">
    <p>FERRAMENTAS PARA TRANSFORMAR IDEIAS</p>
    <div className="tech-marquee-window">
      <div className="tech-marquee-track">{[0, 1].map(copy => <div className="tech-marquee-group" key={copy} aria-hidden={copy === 1}>{technologies.map((technology, index) => <span className="tech-marquee-item" key={technology}><i>{String(index + 1).padStart(2, '0')}</i>{technology}<b>✳</b></span>)}</div>)}</div>
    </div>
  </section>
}
