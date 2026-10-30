import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
export function useScrollEffects(path: string) {
  useEffect(() => {
    const media = gsap.matchMedia()
    const timer = setTimeout(() => {
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('.reveal').forEach(el => {
          const siblings = el.parentElement?.querySelectorAll('.reveal')
          const index = siblings ? Array.from(siblings).indexOf(el) : 0
          gsap.fromTo(el, { y: 30, opacity: 0, scale: .985 }, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: .85,
            delay: Math.min(index * .08, .24),
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            scrollTrigger: { trigger: el, start: 'top 94%', once: true },
          })
        })
        const track = document.querySelector('.timeline-fill')
        if (track) gsap.fromTo(track, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 80%', end: 'bottom 50%', scrub: true } })
        const glow = document.querySelector('.hero .core-glow')
        if (glow) gsap.to(glow, { y: 85, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } })
      })
      ScrollTrigger.refresh()
    }, 100)
    return () => { clearTimeout(timer); media.revert() }
  }, [path])
}
