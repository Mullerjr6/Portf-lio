import { useEffect, useRef, useState } from 'react'
import { projects } from '../data/projects'
import { stack } from '../data/profile'
import { useMedia } from '../hooks/useExperience'

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useMedia('(prefers-reduced-motion: reduce)')
  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (reduced) {
      element.textContent = String(value).padStart(2, '0')
      return
    }
    let frame = 0
    let started: number | undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const animate = (time: number) => {
        started ??= time
        const progress = Math.min(1, (time - started) / 850)
        const eased = 1 - (1 - progress) ** 4
        element.textContent = String(Math.round(value * eased)).padStart(2, '0')
        if (progress < 1) frame = requestAnimationFrame(animate)
      }
      frame = requestAnimationFrame(animate)
      observer.disconnect()
    }, { threshold: .6 })
    observer.observe(element)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [reduced, value])
  return <span ref={ref}>{value}</span>
}

const stats = [
  { value: projects.length, label: 'projetos apresentados' },
  { value: stack.length, label: 'frentes de tecnologia' },
  { value: new Set(stack.flatMap(group => group.items.map(([name]) => name))).size, label: 'tecnologias listadas' },
]

export function PortfolioStats() {
  return <div className="portfolio-stats" role="group" aria-label="Resumo do portfólio">{stats.map((stat, index) => <div className="portfolio-stat reveal" key={stat.label}><span className="portfolio-stat-number" aria-hidden="true"><CountUp value={stat.value} /></span><span className="portfolio-stat-label">{stat.label}</span><span className="portfolio-stat-index" aria-hidden="true">0{index + 1}</span><span className="sr-only">{stat.value} {stat.label}</span></div>)}</div>
}
