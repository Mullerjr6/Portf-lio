import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import { Github, Linkedin } from './BrandIcons'
import { Link } from 'react-router-dom'
import { profile } from '../data/profile'
import { ScrollRevealText } from './ScrollRevealText'

export function Contact() {
  const [copyStatus, setCopyStatus] = useState('')
  const statusTimer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(statusTimer.current), [])
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopyStatus('E-mail copiado!')
    } catch {
      setCopyStatus('Não foi possível copiar. Use o link de e-mail para entrar em contato.')
    }
    window.clearTimeout(statusTimer.current)
    statusTimer.current = window.setTimeout(() => setCopyStatus(''), 3500)
  }
  const copied = copyStatus === 'E-mail copiado!'
  return <section id="contato" className="contact-section section-shell"><div className="contact-orbit" aria-hidden="true" /><div className="eyebrow"><span>06 /</span> O PRÓXIMO PROJETO PODE SER O NOSSO</div><h2><ScrollRevealText text="Tem uma ideia?" /><br /><ScrollRevealText text="Vamos transformá-la" /><br />em <span><ScrollRevealText text="realidade." /></span><ArrowUpRight className="contact-arrow" /></h2><div className="contact-bottom"><p>Boas conversas são o começo<br />de grandes possibilidades.</p><div className="contact-actions"><a href={profile.github} className="button primary" target="_blank" rel="noreferrer"><Github size={18} /> Vamos nos conectar <ArrowUpRight size={17} /></a>{profile.linkedin && <a className="button ghost" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn</a>}{profile.email && <><a className="button ghost" href={`mailto:${profile.email}`}><Mail size={18} />{profile.email}</a><button className={`icon-button${copied ? ' copied' : ''}`} onClick={copy} aria-label={copied ? 'E-mail copiado' : 'Copiar e-mail'} title={copied ? 'E-mail copiado' : 'Copiar e-mail'}>{copied ? <Check size={18} /> : <Copy size={18} />}</button></>}</div></div><p role="status" className={`copy-status${copyStatus ? ' visible' : ''}`}>{copyStatus}</p></section>
}

export function Footer() {
  return <footer className="footer section-shell"><Link className="brand-logo footer-logo" to="/#inicio" aria-label="Voltar ao início"><img src="/jm-logo.svg" alt="" /></Link><p>© {new Date().getFullYear()} Júnior Maia Müller</p><span>Feito de curiosidade, dados e código.</span><Link to="/#inicio">Voltar ao topo ↑</Link></footer>
}
