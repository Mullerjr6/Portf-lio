import { lazy, Suspense, useEffect, useRef } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { Navigation } from './components/Navigation'
import { Intro } from './components/Intro'
import { Footer } from './components/Contact'
import Home from './pages/Home'
import { useScrollEffects } from './animations/useScrollEffects'

const ProjectPage = lazy(() => import('./pages/ProjectPage'))
export default function App() {
  const location = useLocation()
  const progress = useRef<HTMLDivElement>(null)
  const backToTop = useRef<HTMLButtonElement>(null)
  const backToTopProgress = useRef<SVGCircleElement>(null)
  useScrollEffects(location.pathname)
  useEffect(() => {
    let frame = 0
    const footer = document.querySelector<HTMLElement>('.footer')
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const height = document.documentElement.scrollHeight - innerHeight
        const ratio = height > 0 ? Math.min(1, scrollY / height) : 0
        if (progress.current) progress.current.style.transform = `scaleX(${ratio})`
        if (backToTop.current) {
          const footerVisible = !!footer && footer.getBoundingClientRect().top < innerHeight
          const visible = scrollY > 600 && !footerVisible
          backToTop.current.classList.toggle('is-visible', visible)
          backToTop.current.classList.toggle('footer-visible', footerVisible)
          backToTop.current.tabIndex = visible ? 0 : -1
          backToTop.current.setAttribute('aria-hidden', String(!visible))
        }
        if (backToTopProgress.current) backToTopProgress.current.style.strokeDashoffset = String(226.2 * (1 - ratio))
      })
    }
    window.addEventListener('scroll', update, { passive: true }); update()
    const footerObserver = footer ? new IntersectionObserver(() => update()) : null
    if (footer && footerObserver) footerObserver.observe(footer)
    return () => { window.removeEventListener('scroll', update); cancelAnimationFrame(frame); footerObserver?.disconnect() }
  }, [])
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(pointer: fine)').matches) return
    let frame = 0
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`)
        document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`)
      })
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(frame) }
  }, [])
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    let attempts = 0
    const go = () => {
      if (location.hash) {
        const target = document.getElementById(location.hash.slice(1))
        if (target) { target.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth' }); return }
        if (attempts++ < 15) timer = window.setTimeout(go, 100)
      } else { window.scrollTo({ top: 0, behavior: 'instant' }); document.getElementById('main')?.focus({ preventScroll: true }) }
    }
    let timer = window.setTimeout(go, 220)
    return () => clearTimeout(timer)
  }, [location])
  return <><div className="scroll-progress" ref={progress} /><Navigation /><Intro /><main id="main" tabIndex={-1}><Suspense fallback={<div className="page-loading" role="status">Preparando o próximo projeto…</div>}><Routes><Route path="/" element={<Home />} /><Route path="/projetos/:slug" element={<ProjectPage />} /><Route path="*" element={<div className="not-found section-shell"><span className="eyebrow">404 / PÁGINA NÃO ENCONTRADA</span><h1>Vamos encontrar<br />um novo caminho.</h1><Link className="button primary" to="/">Voltar ao início ↗</Link></div>} /></Routes></Suspense></main><Footer /><button ref={backToTop} className="back-to-top" type="button" aria-label="Voltar ao topo" aria-hidden="true" tabIndex={-1} onClick={() => window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}><svg viewBox="0 0 76 76" aria-hidden="true"><circle className="back-to-top-track" cx="38" cy="38" r="36" /><circle ref={backToTopProgress} className="back-to-top-progress" cx="38" cy="38" r="36" /></svg><ArrowUp size={17} /></button></>
}
