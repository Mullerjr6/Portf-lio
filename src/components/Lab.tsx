import { lazy, Suspense, useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, BarChart3, Network, Terminal as TerminalIcon } from 'lucide-react'
import { profile, stack } from '../data/profile'
import { projects } from '../data/projects'
import { SectionHeading } from './SectionHeading'
import { ErrorBoundary } from './ErrorBoundary'

const ParticleNetwork = lazy(() => import('./ParticleNetwork'))
const demo = {
  web: [42, 58, 49, 76, 69, 94],
  dados: [35, 47, 62, 58, 83, 78],
  automacao: [24, 39, 31, 55, 68, 87],
}
const months = ['Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out']

function DataViz() {
  const [category, setCategory] = useState('todos')
  const [period, setPeriod] = useState('6')
  const data = category === 'todos' ? demo.web.map((v, i) => v + demo.dados[i] + demo.automacao[i]) : demo[category as keyof typeof demo]
  const values = data.slice(-Number(period)), labels = months.slice(-Number(period))
  const total = values.reduce((a, b) => a + b, 0)
  const max = Math.max(...values)
  return <div className="data-viz"><div className="demo-controls"><span className="demo-label">DADOS DEMONSTRATIVOS</span><div><label className="sr-only" htmlFor="demo-category">Categoria dos dados</label><select id="demo-category" value={category} onChange={e => setCategory(e.target.value)}><option value="todos">Todas as áreas</option><option value="web">Web</option><option value="dados">Dados</option><option value="automacao">Automação</option></select><label className="sr-only" htmlFor="demo-period">Período</label><select id="demo-period" value={period} onChange={e => setPeriod(e.target.value)}><option value="6">6 meses</option><option value="3">3 meses</option></select></div></div><div className="demo-metrics" aria-live="polite"><div><span>Eventos simulados</span><strong>{total.toLocaleString('pt-BR')}<ArrowUpRight size={20} /></strong></div><div><span>Média mensal</span><strong>{Math.round(total / values.length)}</strong></div><div><span>Maior volume</span><strong>{labels[values.indexOf(max)]}<small> / {max}</small></strong></div></div><div className="demo-chart" role="img" aria-label={`Eventos simulados por mês: ${labels.map((l, i) => `${l}: ${values[i]}`).join(', ')}`}><div className="chart-axis"><span>{max}</span><span>{Math.round(max / 2)}</span><span>0</span></div><div className="chart-bars">{values.map((value, i) => <div className="chart-column" key={labels[i]}><div className="bar-track"><div className="chart-bar" style={{ height: `${value / max * 100}%` }}><span>{value}</span></div></div><span>{labels[i]}</span></div>)}</div></div><details className="chart-table"><summary>Ver dados em tabela</summary><table><caption>Conjunto fictício para demonstração de filtros e visualização</caption><thead><tr><th>Mês</th><th>Eventos</th></tr></thead><tbody>{values.map((v, i) => <tr key={labels[i]}><th scope="row">{labels[i]}</th><td>{v}</td></tr>)}</tbody></table></details></div>
}

function Terminal() {
  const [input, setInput] = useState('')
  const [lines, setLines] = useState([{ command: '', result: 'Bem-vindo ao JM Terminal. Digite help para explorar.' }])
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const output = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const run = (e: FormEvent) => {
    e.preventDefault()
    const command = input.trim().toLowerCase()
    if (!command) return
    setInput(''); setHistory(h => [...h, command]); setHistoryIndex(-1)
    if (command === 'clear') { setLines([]); return }
    const answers: Record<string, string> = {
      help: 'help → comandos\nabout → sobre mim\nprojects → projetos\nskills → tecnologias\ncontact → contato\ngithub → abrir GitHub\nclear → limpar terminal',
      about: `${profile.name}\nData Science, Controladoria, desenvolvimento e automação.`,
      projects: projects.map(p => p.name).join(' · '),
      skills: stack.map(s => `${s.name}: ${s.items.map(i => i[0]).join(', ')}`).join('\n'),
      contact: profile.email || 'Vamos nos conectar pelo GitHub: github.com/Mullerjr6',
      github: 'Abrindo github.com/Mullerjr6 em uma nova aba. O link também está disponível no cabeçalho.',
    }
    if (command === 'github') window.open(profile.github, '_blank', 'noopener,noreferrer')
    if (command === 'contact') navigate('/#contato')
    setLines(l => [...l.slice(-39), { command, result: answers[command] || `Comando não encontrado: ${command}. Digite help.` }])
    requestAnimationFrame(() => { output.current?.scrollTo({ top: output.current.scrollHeight }) })
  }
  return <div className="terminal"><div className="terminal-title"><span><i /><i /><i /></span><span>junior@portfolio: ~</span><TerminalIcon size={14} /></div><div className="terminal-output" ref={output} role="log" aria-label="Saída do terminal" aria-live="polite" tabIndex={0}>{lines.map((line, i) => <div key={i}>{line.command && <p className="terminal-command">➜ ~ <span>{line.command}</span></p>}<p>{line.result}</p></div>)}</div><form onSubmit={run} className="terminal-form"><span aria-hidden="true">➜ ~</span><label className="sr-only" htmlFor="terminal-input">Comando do terminal</label><input id="terminal-input" placeholder="Digite help e pressione Enter" autoComplete="off" spellCheck={false} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => {
      if (e.key === 'ArrowUp' && history.length) { e.preventDefault(); const index = historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1); setHistoryIndex(index); setInput(history[index]) }
      if (e.key === 'ArrowDown') { e.preventDefault(); const index = historyIndex + 1; if (historyIndex >= 0 && index < history.length) { setHistoryIndex(index); setInput(history[index]) } else { setHistoryIndex(-1); setInput('') } }
    }} /><button type="submit" aria-label="Executar comando"><ArrowUpRight size={18} /></button></form></div>
}

export default function Lab() {
  const [tab, setTab] = useState(0)
  const tabs = [{ name: 'Data Visualization', icon: BarChart3, component: <DataViz /> }, { name: 'Terminal', icon: TerminalIcon, component: <Terminal /> }, { name: 'Particle Network', icon: Network, component: <ErrorBoundary fallback={<p className="lab-description">Esta experiência não está disponível neste navegador.</p>}><Suspense fallback={<div className="lab-loading">Preparando conexões…</div>}><ParticleNetwork /></Suspense></ErrorBoundary> }]
  return <section id="laboratorio" className="section-shell section-space"><SectionHeading number="05" eyebrow="MENOS TEORIA. MAIS INTERAÇÃO." title="Interactive Lab." description="A melhor forma de conhecer a tecnologia é experimentar. Este espaço é seu." />
    <div className="lab-layout"><div className="lab-sidebar"><span className="eyebrow">ESCOLHA UM EXPERIMENTO</span><div role="tablist" aria-label="Experiências do laboratório" aria-orientation="vertical">{tabs.map((t, i) => <button key={t.name} role="tab" id={`lab-tab-${i}`} aria-controls={`lab-panel-${i}`} aria-selected={tab === i} tabIndex={tab === i ? 0 : -1} className={tab === i ? 'selected' : ''} onClick={() => setTab(i)} onKeyDown={e => { if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) { e.preventDefault(); const next = e.key === 'Home' ? 0 : e.key === 'End' ? 2 : (i + (e.key === 'ArrowDown' ? 1 : -1) + 3) % 3; setTab(next); document.getElementById(`lab-tab-${next}`)?.focus() } }}><span className="lab-tab-number">0{i + 1}</span><t.icon size={18} /><span>{t.name}</span><ArrowUpRight size={16} /></button>)}</div><p className="lab-description">{['Explore os filtros. Observe como os indicadores e o gráfico respondem aos dados.', 'Uma pequena interface para explorar meu universo. Experimente “help” para começar.', 'Mova o cursor ou toque na rede. Ajuste a densidade e descubra novas conexões.'][tab]}</p><span className="lab-note"><i /> EXPERIMENTE. EXPLORE. CONECTE.</span></div><div className="lab-panel" role="tabpanel" id={`lab-panel-${tab}`} aria-labelledby={`lab-tab-${tab}`} tabIndex={0}>{tabs[tab].component}</div></div>
  </section>
}
