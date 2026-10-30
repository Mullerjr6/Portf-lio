import { useRef, type PointerEvent } from 'react'
import { useMedia } from '../hooks/useExperience'

export function ProximityText({ text, className = '' }: { text: string; className?: string }) {
  const reduced = useMedia('(prefers-reduced-motion: reduce)')
  const fine = useMedia('(pointer: fine)')
  const frame = useRef(0)
  const update = (event: PointerEvent<HTMLSpanElement>) => {
    if (reduced || !fine) return
    const element = event.currentTarget
    const x = event.clientX
    const y = event.clientY
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      element.querySelectorAll<HTMLElement>('[data-proximity-letter]').forEach(letter => {
        const bounds = letter.getBoundingClientRect()
        const distance = Math.hypot(x - (bounds.left + bounds.width / 2), y - (bounds.top + bounds.height / 2))
        const proximity = Math.max(0, 1 - distance / 105)
        letter.style.transform = `translateY(${-proximity * 4}px) scale(${1 + proximity * .12})`
        const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()
        letter.style.textShadow = `0 0 ${proximity * 14}px color-mix(in srgb, ${accent}, transparent 40%)`
      })
    })
  }
  const reset = (event: PointerEvent<HTMLSpanElement>) => {
    cancelAnimationFrame(frame.current)
    event.currentTarget.querySelectorAll<HTMLElement>('[data-proximity-letter]').forEach(letter => {
      letter.style.transform = ''
      letter.style.textShadow = ''
    })
  }
  return <span className={`proximity-text ${className}`} aria-hidden="true" onPointerMove={update} onPointerLeave={reset}>{Array.from(text).map((letter, index) => <span className="proximity-letter" data-proximity-letter key={`${letter}-${index}`}>{letter === ' ' ? '\u00a0' : letter}</span>)}</span>
}
