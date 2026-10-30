import { useEffect, useRef, useState } from 'react'
import { Pause, Play, RotateCcw } from 'lucide-react'
import { useInViewport, useMedia } from '../../hooks/useExperience'

export default function ParticleNetwork() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const { ref, visible } = useInViewport<HTMLDivElement>('0px')
  const reduced = useMedia('(prefers-reduced-motion: reduce)')
  const compact = useMedia('(max-width: 760px)')
  const [paused, setPaused] = useState(false)
  const [density, setDensity] = useState(45)
  const [seed, setSeed] = useState(0)
  const pointer = useRef({ x: -9999, y: -9999 })
  useEffect(() => {
    const el = canvas.current, container = ref.current
    if (!el || !container || !visible) return
    const ctx = el.getContext('2d')
    if (!ctx) return
    let width = 0, height = 0, frame = 0, last = 0
    let points: { x: number; y: number; vx: number; vy: number }[] = []
    const draw = (time: number) => {
      const dt = last ? Math.min((time - last) / 16.67, 2) : 1
      last = time
      ctx.clearRect(0, 0, width, height)
      points.forEach((p, i) => {
        if (!paused && !reduced) {
          p.x += p.vx * dt; p.y += p.vy * dt
          if (p.x < 0 || p.x > width) p.vx *= -1
          if (p.y < 0 || p.y > height) p.vy *= -1
          p.x = Math.max(0, Math.min(width, p.x)); p.y = Math.max(0, Math.min(height, p.y))
        }
        const pointerDistanceSquared = (p.x - pointer.current.x) ** 2 + (p.y - pointer.current.y) ** 2
        const d = Math.sqrt(pointerDistanceSquared)
        ctx.beginPath(); ctx.arc(p.x, p.y, d < 100 ? 3 : 1.8, 0, Math.PI * 2); ctx.fillStyle = d < 100 ? '#b5e8ff' : '#518eff'; ctx.fill()
        for (let j = i + 1; j < points.length; j++) {
          const q = points[j]
          const dx = q.x - p.x, dy = q.y - p.y
          const distanceSquared = dx * dx + dy * dy
          if (distanceSquared < 12100) {
            const distance = Math.sqrt(distanceSquared)
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.strokeStyle = `rgba(77, 135, 255, ${(1 - distance / 110) * .5})`; ctx.stroke()
          }
        }
        if (d < 150) { ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(pointer.current.x, pointer.current.y); ctx.strokeStyle = `rgba(154, 219, 255, ${(1 - d / 150) * .7})`; ctx.stroke() }
      })
      if (!paused && !reduced && !document.hidden) frame = requestAnimationFrame(draw)
    }
    const resize = () => {
      width = container.clientWidth; height = 280
      const dpr = Math.min(devicePixelRatio, 1.5)
      el.width = width * dpr; el.height = height * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      points = Array.from({ length: compact ? Math.min(density, 40) : density }, (_, i) => ({ x: ((Math.sin(i * 127.1 + seed) + 1) / 2) * width, y: ((Math.cos(i * 311.7 + seed) + 1) / 2) * height, vx: Math.sin(i * 5.7) * .3, vy: Math.cos(i * 3.8) * .3 }))
      cancelAnimationFrame(frame); draw(0)
    }
    const observer = new ResizeObserver(resize); observer.observe(container)
    const visibility = () => { cancelAnimationFrame(frame); if (!document.hidden) draw(0) }
    const redraw = () => { if (paused || reduced) draw(0) }
    el.addEventListener('pointermove', redraw); document.addEventListener('visibilitychange', visibility)
    return () => { observer.disconnect(); cancelAnimationFrame(frame); el.removeEventListener('pointermove', redraw); document.removeEventListener('visibilitychange', visibility) }
  }, [visible, density, paused, reduced, seed, compact, ref])
  return <div className="particle-experiment"><div className="particle-toolbar"><span><i className="status-dot" /> CONEXÕES EM TEMPO REAL</span><div><button aria-label={paused ? 'Retomar partículas' : 'Pausar partículas'} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={15} /> : <Pause size={15} />}</button><button aria-label="Reorganizar partículas" onClick={() => setSeed(seed + 1)}><RotateCcw size={15} /></button></div></div><div ref={ref} className="particle-canvas"><canvas ref={canvas} aria-label="Rede de partículas interativa; mova o cursor ou toque para conectar os pontos" onPointerMove={e => { const rect = e.currentTarget.getBoundingClientRect(); pointer.current = { x: e.clientX - rect.left, y: e.clientY - rect.top } }} onPointerLeave={() => { pointer.current = { x: -9999, y: -9999 } }} /><span className="particle-hint">{reduced ? 'Movimento reduzido · rede estática' : 'Mova o cursor. Crie conexões.'}</span></div><div className="density-control"><label htmlFor="density">Densidade</label><input id="density" type="range" min="15" max={compact ? '40' : '75'} value={compact ? Math.min(density, 40) : density} onChange={e => setDensity(+e.target.value)} /><output>{compact ? Math.min(density, 40) : density} pontos</output></div></div>
}
