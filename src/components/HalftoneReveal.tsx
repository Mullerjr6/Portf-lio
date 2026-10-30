import { useEffect, useRef } from 'react'
import { useInViewport, useMedia, usePageVisible } from '../hooks/useExperience'

type HalftoneRevealProps = {
  accent: string
  secondary: string
  src?: string
}

function illustration(accent: string, secondary: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="360" height="480" viewBox="0 0 360 480">
      <defs>
        <linearGradient id="portrait" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="${accent}"/>
          <stop offset="1" stop-color="${secondary}"/>
        </linearGradient>
        <radialGradient id="light">
          <stop stop-color="${accent}" stop-opacity=".42"/>
          <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="180" cy="210" r="177" fill="url(#light)"/>
      <g fill="none" stroke="${accent}" stroke-opacity=".42">
        <circle cx="180" cy="212" r="151"/>
        <ellipse cx="180" cy="212" rx="151" ry="56" transform="rotate(-34 180 212)"/>
        <path d="M25 390h310M45 414h270M65 438h230"/>
      </g>
      <path d="M63 446c9-70 34-112 83-133l34-14 34 14c49 21 74 63 83 133v17H63z" fill="url(#portrait)" fill-opacity=".72"/>
      <path d="M148 300c8 19 18 29 32 29s24-10 32-29l-3-31h-58z" fill="url(#portrait)"/>
      <ellipse cx="180" cy="194" rx="67" ry="83" fill="url(#portrait)"/>
      <path d="M113 192c-4-60 23-98 70-98 45 0 71 32 68 88-17-10-29-28-35-49-25 31-60 49-103 52z" fill="#080d18"/>
      <path d="M148 203h5m54 0h5" stroke="#101b2c" stroke-width="7" stroke-linecap="round"/>
      <path d="M166 238c9 7 19 7 28 0" fill="none" stroke="#101b2c" stroke-width="5" stroke-linecap="round"/>
      <circle cx="180" cy="212" r="151" fill="none" stroke="${secondary}" stroke-opacity=".44" stroke-dasharray="2 12"/>
      <circle cx="63" cy="130" r="5" fill="${secondary}"/>
      <circle cx="292" cy="291" r="4" fill="${accent}"/>
    </svg>
  `)}`
}

export function HalftoneReveal({ accent, secondary, src }: HalftoneRevealProps) {
  const { ref, visible } = useInViewport<HTMLDivElement>('160px')
  const reduced = useMedia('(prefers-reduced-motion: reduce)')
  const pageVisible = usePageVisible()
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const host = ref.current
    const element = canvas.current
    const context = element?.getContext('2d', { alpha: true })
    if (!host || !element || !context) return

    const base = document.createElement('canvas')
    const reveal = document.createElement('canvas')
    const baseContext = base.getContext('2d', { alpha: true })
    const revealContext = reveal.getContext('2d', { alpha: true })
    if (!baseContext || !revealContext) return

    let width = 1
    let height = 1
    let ratio = 1
    let frame = 0
    let lastPointer: { x: number; y: number } | null = null
    let pointerInside = false
    let lastPointerAt = 0
    let burst: { x: number; y: number; started: number } | null = null
    let alive = true
    let inView = visible && pageVisible
    let intersecting = visible
    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.decoding = 'async'
    image.src = src || illustration(accent, secondary)

    const drawBase = () => {
      baseContext.clearRect(0, 0, base.width, base.height)
      const step = Math.max(8, Math.round(14 * ratio))
      const sample = document.createElement('canvas')
      sample.width = Math.max(1, Math.ceil(width / 5))
      sample.height = Math.max(1, Math.ceil(height / 5))
      const sampleContext = sample.getContext('2d', { willReadFrequently: true })
      if (!sampleContext) return
      sampleContext.drawImage(image, 0, 0, sample.width, sample.height)
      const pixels = sampleContext.getImageData(0, 0, sample.width, sample.height).data
      const sampleScaleX = sample.width / (width * ratio)
      const sampleScaleY = sample.height / (height * ratio)

      for (let y = step / 2; y < base.height; y += step) {
        for (let x = step / 2; x < base.width; x += step) {
          const pixel = (Math.floor(y * sampleScaleY) * sample.width + Math.floor(x * sampleScaleX)) * 4
          const alpha = pixels[pixel + 3] / 255
          if (alpha < .08) continue
          const luminance = (pixels[pixel] * .2126 + pixels[pixel + 1] * .7152 + pixels[pixel + 2] * .0722) / 255
          const radius = (1 - luminance) * step * .43
          if (radius < .45) continue
          baseContext.beginPath()
          baseContext.arc(x, y, radius, 0, Math.PI * 2)
          baseContext.fillStyle = `rgba(${pixels[pixel]}, ${pixels[pixel + 1]}, ${pixels[pixel + 2]}, ${alpha * .78})`
          baseContext.fill()
        }
      }
    }

    const resize = () => {
      width = Math.max(1, host.clientWidth)
      height = Math.max(1, host.clientHeight)
      ratio = Math.min(window.devicePixelRatio || 1, 1.25)
      element.width = Math.round(width * ratio)
      element.height = Math.round(height * ratio)
      base.width = reveal.width = element.width
      base.height = reveal.height = element.height
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      if (image.complete && image.naturalWidth) drawBase()
      schedule()
    }

    const draw = (now: number) => {
      frame = 0
      if (!alive || !inView || document.hidden) return
      context.clearRect(0, 0, width, height)
      if (!image.complete || !image.naturalWidth) return
      context.drawImage(base, 0, 0, width, height)

      let center = lastPointer
      let radius = 145
      const elapsed = now - lastPointerAt
      let strength = Math.max(0, 1 - elapsed / 1200)
      if (elapsed > 1200) center = null

      if (burst) {
        const progress = Math.min(1, (now - burst.started) / 950)
        const burstRadius = Math.hypot(width, height) * progress
        if (progress < 1) {
          center = burst
          radius = Math.max(radius, burstRadius)
          strength = Math.max(strength, 1 - progress)
        } else burst = null
      }

      if (center && strength > .01) {
        revealContext.clearRect(0, 0, reveal.width, reveal.height)
        revealContext.drawImage(image, 0, 0, reveal.width, reveal.height)
        revealContext.globalCompositeOperation = 'destination-in'
        const gradient = revealContext.createRadialGradient(center.x * ratio, center.y * ratio, 0, center.x * ratio, center.y * ratio, radius * ratio)
        gradient.addColorStop(0, `rgba(255,255,255,${strength})`)
        gradient.addColorStop(.68, `rgba(255,255,255,${strength * .88})`)
        gradient.addColorStop(1, 'rgba(255,255,255,0)')
        revealContext.fillStyle = gradient
        revealContext.fillRect(0, 0, reveal.width, reveal.height)
        revealContext.globalCompositeOperation = 'source-over'
        context.drawImage(reveal, 0, 0, width, height)
      }

      if (!reduced && ((lastPointer && elapsed <= 1200) || burst)) schedule()
    }

    function schedule() {
      if (!frame && alive && inView && !document.hidden) frame = requestAnimationFrame(draw)
    }

    const locate = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect()
      lastPointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top }
      lastPointerAt = performance.now()
    }
    const move = (event: PointerEvent) => {
      if (reduced) return
      const bounds = host.getBoundingClientRect()
      const inside = event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom
      if (!inside) {
        if (!pointerInside) return
        pointerInside = false
        lastPointerAt = performance.now()
        schedule()
        return
      }
      pointerInside = true
      locate(event)
      schedule()
    }
    const down = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect()
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) return
      if (event.pointerType === 'mouse' && event.button !== 0) return
      pointerInside = true
      locate(event)
      if (reduced) {
        schedule()
        return
      }
      burst = { ...lastPointer!, started: performance.now() }
      schedule()
    }
    const leave = () => {
      pointerInside = false
      lastPointerAt = performance.now()
      schedule()
    }
    const observer = new ResizeObserver(resize)
    const intersection = new IntersectionObserver(([entry]) => {
      intersecting = entry.isIntersecting
      inView = intersecting && !document.hidden
      if (inView) schedule()
      else {
        cancelAnimationFrame(frame)
        frame = 0
      }
    }, { rootMargin: '160px' })
    const visibility = () => {
      inView = intersecting && !document.hidden
      if (inView) schedule()
      else {
        cancelAnimationFrame(frame)
        frame = 0
      }
    }

    image.onload = () => {
      if (!alive) return
      drawBase()
      schedule()
    }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', down, { passive: true })
    window.addEventListener('blur', leave)
    observer.observe(host)
    intersection.observe(host)
    document.addEventListener('visibilitychange', visibility)
    resize()
    return () => {
      alive = false
      cancelAnimationFrame(frame)
      image.onload = null
      observer.disconnect()
      intersection.disconnect()
      document.removeEventListener('visibilitychange', visibility)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('blur', leave)
    }
  }, [accent, pageVisible, reduced, ref, secondary, src, visible])

  return <div ref={ref} className="hero-halftone-art" aria-hidden="true">
    <canvas ref={canvas} />
    <span>VISÃO EM CAMADAS <i /> DADOS + CRIATIVIDADE</span>
  </div>
}
