import { useEffect, useRef, useState } from 'react'
import { Check, Palette } from 'lucide-react'

const themes = [
  { id: 'blue', label: 'Aurora elétrica', mood: 'Noite digital', color: '#70a5ff', secondary: '#a5dcff' },
  { id: 'violet', label: 'Nebulosa', mood: 'Universo criativo', color: '#bd9cff', secondary: '#f0a8e8' },
  { id: 'amber', label: 'Editorial solar', mood: 'Calor analógico', color: '#efb75e', secondary: '#ef8162' },
] as const

type Theme = typeof themes[number]['id']

export function ThemePicker() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('jm-theme')
      return themes.find(option => option.id === saved)?.id ?? 'blue'
    } catch {
      return 'blue'
    }
  })
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const transitionTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('jm-theme', theme)
    } catch {
      // The selected theme still applies for this visit when storage is unavailable.
    }
  }, [theme])
  useEffect(() => () => window.clearTimeout(transitionTimer.current), [])
  const selectTheme = (nextTheme: Theme) => {
    if (nextTheme !== theme) {
      const element = document.documentElement
      element.classList.add('theme-shifting')
      window.clearTimeout(transitionTimer.current)
      transitionTimer.current = window.setTimeout(() => element.classList.remove('theme-shifting'), 700)
      setTheme(nextTheme)
    }
    setOpen(false)
    trigger.current?.focus()
  }

  useEffect(() => {
    if (!open) return
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !root.current?.contains(event.target)) setOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        trigger.current?.focus()
      }
    }
    document.addEventListener('pointerdown', closeOutside)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOutside)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  return <div className="theme-picker" ref={root}>
    <button ref={trigger} className="theme-trigger" type="button" aria-label={`Escolher tema. Atual: ${themes.find(option => option.id === theme)?.label}`} aria-expanded={open} onClick={() => setOpen(value => !value)}><Palette size={15} /><span>Tema</span><i className="theme-current-dot" style={{ backgroundColor: themes.find(option => option.id === theme)?.color }} aria-hidden="true" /></button>
    {open && <div id="theme-options" className="theme-menu" role="group" aria-label="Escolha uma identidade visual">
      <div className="theme-menu-heading"><span>IDENTIDADE VISUAL</span><small>A atmosfera muda junto com as cores.</small></div>
      {themes.map(option => <button key={option.id} type="button" className={`theme-option${theme === option.id ? ' selected' : ''}`} aria-pressed={theme === option.id} onClick={() => selectTheme(option.id)}>
        <span className="theme-swatches" aria-hidden="true"><i style={{ backgroundColor: option.color }} /><i style={{ backgroundColor: option.secondary }} /><i style={{ backgroundColor: option.id === 'blue' ? '#111d31' : option.id === 'violet' ? '#1b1229' : '#26180e' }} /></span>
        <span className="theme-option-copy"><strong>{option.label}</strong><small>{option.mood}</small></span>{theme === option.id && <Check size={15} />}
      </button>)}
      <p className="theme-menu-footnote">Preferência salva neste dispositivo</p>
    </div>}
  </div>
}
