import { lazy, Suspense, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { About, Experience, Technologies } from '../components/About'
import { Projects } from '../components/Projects'
import { Contact } from '../components/Contact'
import { TechMarquee } from '../components/TechMarquee'
import { useInViewport } from '../hooks/useExperience'
import { useSEO } from '../utils/seo'

const Lab = lazy(() => import('../components/Lab'))
export default function Home() {
  const { ref, visible } = useInViewport<HTMLDivElement>('600px')
  const { hash } = useLocation()
  const [loadLab, setLoadLab] = useState(hash === '#laboratorio' || hash === '#contato')
  useEffect(() => { if (visible || hash === '#laboratorio' || hash === '#contato') setLoadLab(true) }, [visible, hash])
  useSEO('Júnior Maia Müller | Dados, código & possibilidades', 'Data Science, desenvolvimento e automação. Transformando dados em decisões. E ideias em tecnologia.')
  return <><Hero /><div className="discipline-strip"><span>DATA SCIENCE</span><i>✳</i><span>DESENVOLVIMENTO</span><i>✳</i><span>AUTOMAÇÃO</span><i>✳</i><span>BUSINESS INTELLIGENCE</span><i>✳</i><span>HARDWARE + SOFTWARE</span></div><TechMarquee /><About /><Experience /><Technologies /><Projects /><div ref={ref}>{loadLab ? <Suspense fallback={<div id="laboratorio" className="lab-placeholder section-shell">Carregando laboratório…</div>}><Lab /></Suspense> : <div id="laboratorio" className="lab-placeholder section-shell">Interactive Lab</div>}</div><Contact /></>
}
