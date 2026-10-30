import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowUpRight, Command, Menu, Search, X } from 'lucide-react'
import { motion } from 'motion/react'
import { Github } from './BrandIcons'
import { profile, sections } from '../data/profile'
import { ThemePicker } from './ThemePicker'
import { useMedia } from '../hooks/useExperience'

export function Navigation() {
  const reducedMotion = useMedia('(prefers-reduced-motion: reduce)')
  const [menu, setMenu] = useState(false)
  const [palette, setPalette] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState('inicio')
  const [scrolled, setScrolled] = useState(false)
  const [selected, setSelected] = useState(0)
  const dialog = useRef<HTMLDialogElement>(null)
  const editorialDialog = useRef<HTMLDialogElement>(null)
  const search = useRef<HTMLInputElement>(null)
  const editorialToggle = useRef<HTMLButtonElement>(null)
  const location = useLocation(), navigate = useNavigate()
  const commands = [...sections.map(s => ({ label: s.label, href: `/#${s.id}` })), { label: 'Abrir GitHub', href: profile.github }].filter(s => s.label.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(query.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')))
  const go = (href: string) => { setPalette(false); setMenu(false); if (href.startsWith('https')) window.open(href, '_blank', 'noopener,noreferrer'); else navigate(href) }
  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPalette(value => !value) }
      if (e.key === 'Escape' && menu && editorialDialog.current?.open) {
        e.preventDefault()
        setMenu(false)
        editorialDialog.current.close()
      }
    }
    window.addEventListener('keydown', keydown)
    return () => window.removeEventListener('keydown', keydown)
  }, [menu])
  useEffect(() => { setMenu(false) }, [location])
  useEffect(() => {
    const element = editorialDialog.current
    if (menu && element && !element.open) element.showModal()
    else if (!menu && element?.open) element.close()
  }, [menu])
  useEffect(() => {
    if (palette) { setQuery(''); setSelected(0); dialog.current?.showModal(); search.current?.focus() }
    else dialog.current?.close()
  }, [palette])
  useEffect(() => {
    if (location.pathname !== '/') return
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        let current = 'inicio'
        sections.forEach(s => { const el = document.getElementById(s.id); if (el && el.getBoundingClientRect().top <= innerHeight * .35) current = s.id })
        if (scrollY + innerHeight >= document.documentElement.scrollHeight - 8) current = 'contato'
        setActive(current)
        setScrolled(scrollY > 24)
      })
    }
    window.addEventListener('scroll', update, { passive: true }); update()
    return () => { window.removeEventListener('scroll', update); cancelAnimationFrame(frame) }
  }, [location.pathname])
  return <>
    <a className="skip-link" href="#main">Pular para o conteúdo</a>
    <header className={`nav-wrap${scrolled ? ' nav-scrolled' : ''}`}><div className="nav-bar">
      <Link className="brand-logo" to="/#inicio" aria-label="Júnior Maia Müller — início"><img src="/jm-logo.svg" alt="" /></Link>
      <nav id="primary-navigation" aria-label="Navegação principal" className="nav-links">{sections.map(s => {
        const isActive = location.pathname === '/' && active === s.id
        return <Link key={s.id} to={`/#${s.id}`} onClick={() => setMenu(false)} className={isActive ? 'active' : ''} aria-current={isActive ? 'location' : undefined}>
          {isActive && <motion.span layoutId="primary-nav-active-pill" className="nav-active-pill" aria-hidden="true" transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }} />}
          <span className="nav-link-label"><span>{s.label}</span><span aria-hidden="true">{s.label}</span></span>
        </Link>
      })}</nav>
      <div className="nav-tools"><ThemePicker /><button className="command-trigger" aria-label="Abrir busca de navegação, Control K ou Command K" onClick={() => setPalette(true)}><Command size={13} /><span>K</span></button><a className="nav-github" href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a><button ref={editorialToggle} className="editorial-toggle" onClick={() => setMenu(value => !value)} aria-label={menu ? 'Fechar menu editorial' : 'Abrir menu editorial'} aria-haspopup="dialog" aria-controls="editorial-navigation" aria-expanded={menu}>{menu ? <X size={19} /> : <Menu size={19} />}<span>{menu ? 'FECHAR' : 'EXPLORAR'}</span></button></div>
    </div></header>
    <dialog ref={editorialDialog} id="editorial-navigation" className="editorial-dialog" aria-labelledby="editorial-title" onCancel={event => { event.preventDefault(); setMenu(false); editorialDialog.current?.close() }} onClose={() => { setMenu(false); editorialToggle.current?.focus() }} onClick={event => { if (event.target === event.currentTarget) setMenu(false) }}>
      <div className="editorial-menu">
        <div className="editorial-menu-top"><span className="eyebrow"><i className="status-dot" /> MAPA DO PORTFÓLIO</span><button type="button" className="editorial-close" onClick={() => setMenu(false)} aria-label="Fechar menu"><X size={20} /></button></div>
        <div className="editorial-menu-grid">
          <div className="editorial-menu-main"><h2 id="editorial-title">O que você<br /><span>quer explorar?</span></h2><nav aria-label="Explorar seções">{sections.map((section, index) => <Link key={section.id} to={`/#${section.id}`} onClick={() => setMenu(false)} className={location.pathname === '/' && active === section.id ? 'active' : ''}><span>0{index + 1}</span>{section.label}<ArrowUpRight size={17} /></Link>)}</nav></div>
          <aside className="editorial-aside"><span className="eyebrow">IDEIAS EM MOVIMENTO</span><p>Dados, código e criatividade conectados a problemas reais.</p><Link to="/#projetos" onClick={() => setMenu(false)} className="editorial-feature"><span>SELEÇÃO DE PROJETOS</span><strong>Construções<br />com propósito.</strong><ArrowUpRight size={20} /></Link><span className="editorial-signature">JÚNIOR MAIA MÜLLER · {new Date().getFullYear()}</span></aside>
        </div>
        <div className="editorial-menu-footer"><span>ESC / FECHAR</span><a href={profile.github} target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={13} /></a></div>
      </div>
    </dialog>
    <dialog ref={dialog} className="command-dialog" onCancel={() => setPalette(false)} onClick={e => { if (e.target === e.currentTarget) setPalette(false) }} aria-labelledby="command-title">
      <div className="command-head"><Search size={20} /><label className="sr-only" id="command-title" htmlFor="command-search">Buscar seção ou abrir GitHub</label><input ref={search} id="command-search" placeholder="Para onde vamos?" value={query} onChange={e => { setQuery(e.target.value); setSelected(0) }} role="combobox" aria-expanded="true" aria-controls="command-results" aria-activedescendant={commands.length ? `command-${selected}` : undefined} autoComplete="off" onKeyDown={e => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); setSelected(i => commands.length ? (i + (e.key === 'ArrowDown' ? 1 : -1) + commands.length) % commands.length : 0) }
        if (e.key === 'Enter' && commands[selected]) { e.preventDefault(); go(commands[selected].href) }
      }} /><button onClick={() => setPalette(false)} aria-label="Fechar busca"><X size={18} /></button></div>
      <p className="command-label">NAVEGAÇÃO RÁPIDA</p><div role="listbox" id="command-results">{commands.map((c, i) => <div role="option" aria-selected={i === selected} id={`command-${i}`} key={c.href} className={`command-item ${i === selected ? 'selected' : ''}`} onMouseEnter={() => setSelected(i)} onClick={() => go(c.href)}>{c.href.startsWith('https') ? <Github size={17} /> : <span className="command-hash">#</span>}{c.label}<ArrowUpRight size={15} /></div>)}</div>{!commands.length && <p className="command-empty">Nenhum resultado. Tente “projetos” ou “GitHub”.</p>}<div className="command-footer"><span>↑ ↓ navegar</span><span>↵ abrir</span><span>esc fechar</span></div>
    </dialog>
  </>
}
