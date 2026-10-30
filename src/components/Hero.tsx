import { lazy, Suspense, useEffect, useRef, useState, type CSSProperties, type PointerEvent, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Activity, ArrowDown, ArrowUpRight, Braces, MoveUpRight, Network, Orbit, Pause, Play, RotateCcw, Sparkles, ZoomIn, ZoomOut } from 'lucide-react'
import { profile } from '../data/profile'
import { useInViewport, useMedia, usePageVisible } from '../hooks/useExperience'
import { ErrorBoundary } from './ErrorBoundary'
import TechText from './effects/TechText'
import { HalftoneReveal } from './effects/HalftoneReveal'
import { ScrollRevealText } from './effects/ScrollRevealText'
import { HeroEffects } from './effects/HeroEffects'

const CoreScene = lazy(() => import('./CoreScene'))
type CoreMode = 'orbit' | 'network' | 'pulse'

const coreModes: { id: CoreMode; label: string; icon: typeof Orbit; description: string }[] = [
  { id: 'orbit', label: 'Órbita', icon: Orbit, description: 'Um núcleo em movimento, conectado por órbitas.' },
  { id: 'network', label: 'Rede', icon: Network, description: 'Uma rede viva de pontos e conexões.' },
  { id: 'pulse', label: 'Pulso', icon: Activity, description: 'Um pulso visual que percorre o núcleo.' },
]
const coreFocus = [
  { label: 'Dados & análise', detail: 'Transformar informação em decisões mais claras.', target: '#tecnologias', action: 'Explorar tecnologias' },
  { label: 'Desenvolvimento', detail: 'Conectar interfaces, aplicações e experiências.', target: '#projetos', action: 'Ver projetos' },
  { label: 'Automação & RPA', detail: 'Criar fluxos que conectam etapas e sistemas.', target: '#experiencia', action: 'Ver experiência' },
  { label: 'Business Intelligence', detail: 'Organizar indicadores e dar perspectiva aos dados.', target: '#laboratorio', action: 'Abrir laboratório' },
]

export function CoreFallback({ rotation, cameraZ }: { rotation?: { x: number; y: number }; cameraZ?: number }) {
  return <div className="core-fallback-scene" style={{ '--fallback-rotation-x': `${rotation?.x ?? .2}rad`, '--fallback-rotation-y': `${rotation?.y ?? .3}rad`, '--fallback-zoom': 6.9 / (cameraZ ?? 6.9) } as CSSProperties} aria-hidden="true"><div className="core-fallback"><div /><div /><div /><span /></div></div>
}

export function Hero() {
  const reduced = useMedia('(prefers-reduced-motion: reduce)')
  const compact = useMedia('(max-width: 760px)')
  const pageVisible = usePageVisible()
  const { ref, visible } = useInViewport<HTMLDivElement>('0px')
  const [paused, setPaused] = useState(false)
  const [mode, setMode] = useState<CoreMode>('orbit')
  const [rotation, setRotation] = useState({ x: .2, y: .3 })
  const [cameraZ, setCameraZ] = useState(6.9)
  const [focus, setFocus] = useState(0)
  const [corePalette, setCorePalette] = useState(() => ({
    accent: getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#70a5ff',
    secondary: getComputedStyle(document.documentElement).getPropertyValue('--accent-soft').trim() || '#a5dcff',
  }))
  const drag = useRef<{ pointerId: number; x: number; y: number; moved: boolean; deltaX: number; deltaY: number } | null>(null)
  const dragFrame = useRef(0)
  const [specialty, setSpecialty] = useState(0)
  const [revealed, setRevealed] = useState(() => { try { return !!sessionStorage.getItem('jm-intro') } catch { return true } })
  useEffect(() => {
    const reveal = () => setRevealed(true)
    window.addEventListener('jm-intro-complete', reveal)
    return () => window.removeEventListener('jm-intro-complete', reveal)
  }, [])
  useEffect(() => {
    const updatePalette = () => setCorePalette({
      accent: getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#70a5ff',
      secondary: getComputedStyle(document.documentElement).getPropertyValue('--accent-soft').trim() || '#a5dcff',
    })
    const observer = new MutationObserver(updatePalette)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    updatePalette()
    return () => observer.disconnect()
  }, [])
  const [webgl] = useState(() => {
    try { const c = document.createElement('canvas'); const context = c.getContext('webgl2'); if (!context) return false; context.getExtension('WEBGL_lose_context')?.loseContext(); return true } catch { return false }
  })
  useEffect(() => {
    if (reduced || paused || !visible || !pageVisible) return
    const timer = window.setInterval(() => setSpecialty(i => (i + 1) % profile.specialties.length), 3500)
    return () => clearInterval(timer)
  }, [reduced, paused, visible, pageVisible])
  const applyDragRotation = () => {
    const current = drag.current
    if (!current || (!current.deltaX && !current.deltaY)) return
    const { deltaX, deltaY } = current
    current.deltaX = 0
    current.deltaY = 0
    setRotation(value => ({ x: Math.max(-1.25, Math.min(1.25, value.x + deltaY * .008)), y: value.y + deltaX * .008 }))
  }
  const moveSphere = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current?.pointerId !== event.pointerId) return
    const dx = event.clientX - drag.current.x
    const dy = event.clientY - drag.current.y
    if (Math.abs(dx) + Math.abs(dy) > 3) drag.current.moved = true
    drag.current.x = event.clientX
    drag.current.y = event.clientY
    if (!drag.current.moved) return
    drag.current.deltaX += dx
    drag.current.deltaY += dy
    if (!dragFrame.current) dragFrame.current = requestAnimationFrame(() => {
      dragFrame.current = 0
      applyDragRotation()
    })
  }
  const startSphereDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === 'mouse') return
    drag.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, moved: false, deltaX: 0, deltaY: 0 }
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  const finishSphereDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.current?.pointerId !== event.pointerId) return
    const wasDragged = drag.current.moved
    cancelAnimationFrame(dragFrame.current)
    dragFrame.current = 0
    applyDragRotation()
    drag.current = null
    if (!wasDragged) setFocus(value => (value + 1) % coreFocus.length)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }
  const handleSphereKey = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? .24 : .12
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault()
      setRotation(value => ({
        x: Math.max(-1.25, Math.min(1.25, value.x + (event.key === 'ArrowUp' ? -step : event.key === 'ArrowDown' ? step : 0))),
        y: value.y + (event.key === 'ArrowLeft' ? -step : event.key === 'ArrowRight' ? step : 0),
      }))
    } else if (event.key === ' ' || event.key.toLowerCase() === 'p') {
      event.preventDefault()
      setPaused(value => !value)
    } else if (event.key === '+' || event.key === '=') {
      event.preventDefault()
      setCameraZ(value => Math.max(5.4, value - .35))
    } else if (event.key === '-') {
      event.preventDefault()
      setCameraZ(value => Math.min(8.5, value + .35))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      setFocus(value => (value + 1) % coreFocus.length)
    } else if (event.key === 'Home') {
      event.preventDefault()
      setRotation({ x: .2, y: .3 })
      setCameraZ(6.9)
    }
  }
  const resetSphere = () => {
    setRotation({ x: .2, y: .3 })
    setCameraZ(6.9)
    setPaused(false)
  }
  const currentFocus = coreFocus[focus]
  return <section id="inicio" className={`hero section-shell${revealed ? ' hero-entered' : ''}`}>
    <HeroEffects />
    <div className="hero-topline"><span><i className="status-dot" /> DADOS. CÓDIGO. POSSIBILIDADES.</span><span className="hero-edition">PORTFÓLIO / 2026</span></div>
    <div className="hero-grid">
      <div className={`hero-copy ${revealed ? 'hero-revealed' : ''}`}>
        <div className="hero-intro"><span className="tiny-line" /> OLÁ, EU SOU</div>
        <h1 aria-label="Júnior Maia Müller.">
          <span className="hero-name-line"><TechText text="Júnior Maia" fontWeight={600} fontSize={150} align="left" reveal="letter" dashLength={4} dashGap={2} specks={15} intro="none" introDuration={2} clickKick guides={false} /></span>
          <span className="hero-name-line"><TechText text="Müller." fontWeight={600} fontSize={150} align="left" reveal="letter" dashLength={4} dashGap={2} specks={15} intro="none" introDuration={2} clickKick guides={false} /></span>
        </h1>
        <div className="specialty"><Braces size={18} /><AnimatePresence mode="wait"><motion.span key={specialty} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? {} : { opacity: 0, y: -8 }}>{profile.specialties[specialty]}</motion.span></AnimatePresence><span className="specialty-line" /></div>
        <h2><ScrollRevealText text="Transformando dados em decisões." /><br /><ScrollRevealText text="E ideias em tecnologia." /></h2>
        <ScrollRevealText as="p" text={profile.description} />
        <div className="hero-actions"><a className="button primary magnetic" href="#projetos">Explorar projetos <ArrowUpRight size={17} /></a><a className="button ghost" href="#contato">Entrar em contato <MoveUpRight size={16} /></a></div>
      </div>
      <div className={`core-stage core-mode-${mode}`} ref={ref} style={{ '--core-accent': corePalette.accent, '--core-secondary': corePalette.secondary } as CSSProperties}>
        <div className="core-grid" /><div className="core-glow" /><HalftoneReveal accent={corePalette.accent} secondary={corePalette.secondary} />
        <div className="core-mode-switch" role="group" aria-label="Modos de visualização da esfera">
          {coreModes.map(({ id, label, icon: Icon, description }) => <button key={id} type="button" className={mode === id ? 'selected' : ''} aria-pressed={mode === id} onClick={() => setMode(id)} title={description}><Icon size={13} /><span>{label}</span></button>)}
        </div>
        <div className="core-canvas" role="group" aria-label="Esfera interativa. Arraste para girar, clique para explorar áreas. Use as setas para girar, mais e menos para zoom, espaço para pausar e Home para reiniciar." aria-describedby="core-description" tabIndex={0} onPointerDown={startSphereDrag} onPointerMove={moveSphere} onPointerUp={finishSphereDrag} onPointerCancel={finishSphereDrag} onKeyDown={handleSphereKey}>
          <div className="core-description sr-only" id="core-description" aria-live="polite" aria-atomic="true">{currentFocus.label}: {currentFocus.detail} Modo {coreModes.find(item => item.id === mode)?.label}. {paused || reduced ? 'Animação pausada.' : 'Animação ativa.'}</div>
          {webgl && visible ? <ErrorBoundary fallback={<CoreFallback rotation={rotation} cameraZ={cameraZ} />}><Suspense fallback={<CoreFallback rotation={rotation} cameraZ={cameraZ} />}><CoreScene compact={compact} paused={paused || reduced || !visible || !pageVisible} mode={mode} rotation={rotation} cameraZ={cameraZ} accent={corePalette.accent} secondary={corePalette.secondary} /></Suspense></ErrorBoundary> : <CoreFallback rotation={rotation} cameraZ={cameraZ} />}
        </div>
        <div className="core-tag core-tag-top"><i /> DATA → INTELLIGENCE</div>
        <div className="core-tag core-tag-left"><span>0{focus + 1}</span><div>{currentFocus.label.toUpperCase()}<br /><b>{currentFocus.detail}</b></div></div>
        <a className="core-focus-link" href={currentFocus.target}><span>{currentFocus.action}</span><ArrowUpRight size={13} /></a>
        <div className="core-controls" role="group" aria-label="Controles da esfera">
          <button type="button" aria-label="Diminuir zoom" title="Diminuir zoom (-)" disabled={cameraZ >= 8.5} onClick={() => setCameraZ(value => Math.min(8.5, value + .35))}><ZoomOut size={14} /></button>
          <button type="button" aria-label="Aumentar zoom" title="Aumentar zoom (+)" disabled={cameraZ <= 5.4} onClick={() => setCameraZ(value => Math.max(5.4, value - .35))}><ZoomIn size={14} /></button>
          <span aria-hidden="true" />
          <button type="button" aria-label="Reiniciar esfera" title="Reiniciar posição (Home)" onClick={resetSphere}><RotateCcw size={14} /></button>
        </div>
        <div className="core-caption"><span><i /> {coreModes.find(item => item.id === mode)?.description}</span><button onClick={() => setPaused(!paused)} disabled={reduced} aria-label={reduced ? 'Movimento reduzido está ativo' : paused ? 'Retomar animação da esfera' : 'Pausar animação da esfera'} aria-pressed={paused}>{reduced ? <Sparkles size={12} /> : paused ? <Play size={12} /> : <Pause size={12} />}{reduced ? 'MOVIMENTO REDUZIDO' : paused ? 'RETOMAR' : 'PAUSAR'}</button></div>
        <div className="core-interaction-hint"><Sparkles size={11} /> ARRASTE · CLIQUE · EXPLORE</div>
      </div>
    </div>
    <div className="hero-bottom"><a href="#sobre"><ArrowDown size={15} /> ROLE PARA EXPLORAR</a><span>Entre a lógica e a criatividade, <b>eu construo.</b></span><span className="coordinates">DESIGN × TECHNOLOGY</span></div>
  </section>
}
