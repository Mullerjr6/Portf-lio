import { useEffect, useRef, useState } from 'react'
import { useMedia } from '../hooks/useExperience'

export function Intro() {
  const reduced = useMedia('(prefers-reduced-motion: reduce)')
  const [open, setOpen] = useState(() => { try { return !sessionStorage.getItem('jm-intro') } catch { return false } })
  const [closing, setClosing] = useState(false)
  const [progress, setProgress] = useState(0)
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    if (!open || reduced) return
    const element = dialog.current
    element?.showModal()
    const startedAt = performance.now()
    const progressTimer = window.setInterval(() => setProgress(Math.min(100, ((performance.now() - startedAt) / 1450) * 100)), 40)
    const exitTimer = window.setTimeout(() => setClosing(true), 1450)
    const finishTimer = window.setTimeout(() => setOpen(false), 1800)
    return () => { clearInterval(progressTimer); clearTimeout(exitTimer); clearTimeout(finishTimer); element?.close() }
  }, [open, reduced])
  useEffect(() => { if (!open || reduced) { try { sessionStorage.setItem('jm-intro', '1') } catch { /* Storage is optional. */ } window.dispatchEvent(new Event('jm-intro-complete')) } }, [open, reduced])
  if (!open || reduced) return null
  const skip = () => {
    setClosing(true)
    window.setTimeout(() => setOpen(false), 320)
  }
  const value = Math.round(progress)
  return <dialog ref={dialog} className={`intro-screen${closing ? ' intro-screen-leaving' : ''}`} aria-label="Abertura do portfólio" onCancel={skip}>
    <div className="intro-ambient" aria-hidden="true"><span /><span /><span /></div>
    <div className="intro-content">
      <div className="intro-mark">
        <i className="intro-orbit intro-orbit-one" /><i className="intro-orbit intro-orbit-two" />
        <svg className="intro-symbol" viewBox="0 0 160 90" aria-hidden="true"><path d="M12 20h34v40L30 72 12 60M65 70V20l32 35 32-35v50M12 84h117" /></svg>
      </div>
      <div className="intro-copy">
        <span className="intro-kicker"><i /> PORTFÓLIO INTERATIVO · 2026</span>
        <p>JÚNIOR MAIA MÜLLER</p>
        <div className="intro-status"><span>INICIANDO EXPERIÊNCIA</span><strong aria-live="polite">{String(value).padStart(2, '0')}%</strong></div>
        <div className="intro-progress" role="progressbar" aria-label="Carregando a experiência" aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}>
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      </div>
    </div>
    <button onClick={skip}>Pular abertura <span aria-hidden="true">↗</span></button>
  </dialog>
}
