import { useEffect, useRef } from 'react'
import { useInViewport, useMedia, usePageVisible } from '../../hooks/useExperience'

export function HeroEffects() {
  const { ref, visible } = useInViewport<HTMLDivElement>('0px')
  const reduced = useMedia('(prefers-reduced-motion: reduce)')
  const fine = useMedia('(pointer: fine)')
  const pageVisible = usePageVisible()
  const active = visible && pageVisible
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const element = canvas.current
    const host = element?.parentElement
    const context = element?.getContext('2d')
    if (!element || !host || !context) return

    let width = 0
    let height = 0
    let frame = 0
    let lastDraw = 0
    let pointer: { x: number; y: number } | null = null
    let pulse: { x: number; y: number; started: number } | null = null
    const resize = () => {
      const bounds = host.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      width = bounds.width
      height = bounds.height
      element.width = Math.round(width * ratio)
      element.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      draw(0)
    }
    const draw = (time: number) => {
      frame = 0
      if (time && active && !reduced && time - lastDraw < 33) {
        frame = requestAnimationFrame(draw)
        return
      }
      lastDraw = time
      context.clearRect(0, 0, width, height)
      const seconds = time * .001
      const cell = 34

      if (pointer && fine && !reduced) {
        const startX = Math.max(0, Math.floor((pointer.x - 170) / cell))
        const endX = Math.min(Math.ceil(width / cell), Math.ceil((pointer.x + 170) / cell))
        const startY = Math.max(0, Math.floor((pointer.y - 170) / cell))
        const endY = Math.min(Math.ceil(height / cell), Math.ceil((pointer.y + 170) / cell))
        for (let column = startX; column <= endX; column++) {
          for (let row = startY; row <= endY; row++) {
            const x = column * cell + cell / 2
            const y = row * cell + cell / 2
            const distance = Math.hypot(pointer.x - x, pointer.y - y)
            const strength = Math.max(0, 1 - distance / 190)
            if (strength > .04) {
              context.fillStyle = `rgba(117, 169, 255, ${strength * .2})`
              context.fillRect(x - 1, y - 1, 2, 2)
            }
          }
        }
      }

      const lineCount = 15
      for (let line = 0; line < lineCount; line++) {
        const baseY = height * (.2 + line / (lineCount - 1) * .62)
        context.beginPath()
        for (let x = 0; x <= width; x += 16) {
          const wave = Math.sin(x * .006 + line * .43 + seconds * (reduced ? 0 : .42)) * (8 + line % 4 * 3)
          let y = baseY + wave
          let influence = 0
          if (pointer && fine && !reduced) {
            const distance = Math.hypot(x - pointer.x, y - pointer.y)
            influence = Math.max(0, 1 - distance / 220)
            y += Math.sin(distance * .035 - seconds * 2.4) * influence * 22
          }
          if (x === 0) context.moveTo(x, y)
          else context.lineTo(x, y)
          if (x % 32 === 0 && influence > .02) {
            context.fillStyle = `rgba(154, 198, 255, ${influence * .42})`
            context.fillRect(x - 1, y - 1, 2, 2)
          }
        }
        context.strokeStyle = `rgba(98, 148, 232, ${.035 + line % 3 * .012})`
        context.lineWidth = 1
        context.stroke()
      }

      if (pulse && fine && !reduced) {
        const elapsed = Math.max(0, time - pulse.started)
        if (elapsed < 850) {
          const radius = elapsed * .19
          context.beginPath()
          context.arc(pulse.x, pulse.y, radius, 0, Math.PI * 2)
          context.strokeStyle = `rgba(132, 185, 255, ${(1 - elapsed / 850) * .4})`
          context.lineWidth = 1
          context.stroke()
        } else pulse = null
      }

      if (active && !reduced) frame = requestAnimationFrame(draw)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(draw) }
    const move = (event: PointerEvent) => {
      if (!fine || reduced) return
      const bounds = host.getBoundingClientRect()
      pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top }
      schedule()
    }
    const leave = () => { pointer = null; schedule() }
    const click = (event: MouseEvent) => {
      if (!fine || reduced) return
      const bounds = host.getBoundingClientRect()
      pulse = { x: event.clientX - bounds.left, y: event.clientY - bounds.top, started: performance.now() }
      schedule()
    }
    const observer = new ResizeObserver(resize)
    observer.observe(host)
    host.addEventListener('pointermove', move, { passive: true })
    host.addEventListener('pointerleave', leave)
    host.addEventListener('click', click)
    resize()
    if (active && !reduced) schedule()
    return () => {
      observer.disconnect()
      host.removeEventListener('pointermove', move)
      host.removeEventListener('pointerleave', leave)
      host.removeEventListener('click', click)
      cancelAnimationFrame(frame)
    }
  }, [active, fine, reduced])
  return <div ref={ref} className="hero-field" aria-hidden="true"><canvas ref={canvas} /></div>
}
