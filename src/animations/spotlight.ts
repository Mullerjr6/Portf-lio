import type { PointerEvent } from 'react'

export function updateSpotlight(event: PointerEvent<HTMLElement>) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(pointer: fine)').matches) return
  const element = event.currentTarget
  const bounds = element.getBoundingClientRect()
  const x = event.clientX - bounds.left
  const y = event.clientY - bounds.top
  const edgeDistance = Math.min(x, y, bounds.width - x, bounds.height - y)
  const intensity = Math.round(Math.max(0, Math.min(1, 1 - edgeDistance / 120)) * 36)
  const accent = getComputedStyle(element).getPropertyValue('--project-accent').trim() || '#78aaff'
  element.classList.add('spotlight-active')
  element.style.setProperty('--spot-x', `${x}px`)
  element.style.setProperty('--spot-y', `${y}px`)
  element.style.setProperty('--spot-border', `color-mix(in srgb, ${accent} ${intensity}%, transparent)`)
  element.style.setProperty('--spot-shadow', `color-mix(in srgb, ${accent} ${Math.round(intensity * .45)}%, transparent)`)
  element.style.setProperty('--glow-x', `${x}px`)
  element.style.setProperty('--glow-y', `${y}px`)
}

export function clearSpotlight(element: HTMLElement) {
  element.classList.remove('spotlight-active')
  element.style.removeProperty('--spot-x')
  element.style.removeProperty('--spot-y')
  element.style.setProperty('--spot-border', 'transparent')
  element.style.setProperty('--spot-shadow', 'transparent')
}
