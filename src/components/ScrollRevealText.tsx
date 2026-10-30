import { useEffect, useRef, useState, type CSSProperties, type ElementType } from 'react'
import { useMedia } from '../hooks/useExperience'

export function ScrollRevealText({ text, as = 'span', className = '' }: { text: string; as?: ElementType; className?: string }) {
  const Element = as
  const ref = useRef<HTMLElement>(null)
  const reduced = useMedia('(prefers-reduced-motion: reduce)')
  const [visible, setVisible] = useState(reduced)
  useEffect(() => {
    if (reduced) { setVisible(true); return }
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: .2, rootMargin: '0px 0px -5% 0px' })
    observer.observe(element)
    return () => observer.disconnect()
  }, [reduced])
  return <Element ref={ref} className={`scroll-reveal-text${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`} aria-label={text}>
    <span aria-hidden="true">{text.trim().split(/\s+/).map((word, index) => <span className="scroll-reveal-word" key={`${word}-${index}`} style={{ '--word-index': index } as CSSProperties}>{word}</span>)}</span>
  </Element>
}
