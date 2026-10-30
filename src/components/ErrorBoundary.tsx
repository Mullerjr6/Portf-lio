import { Component, type ReactNode } from 'react'

export class ErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (this.state.failed) return this.props.fallback ?? <div className="error-screen"><img className="error-logo" src="/jm-logo.svg" alt="Júnior Maia Müller" /><h1>Vamos tentar de novo?</h1><p>Não foi possível carregar esta experiência.</p><button className="button primary" onClick={() => location.reload()}>Recarregar página</button><a href="https://github.com/Mullerjr6">Visitar GitHub</a></div>
    return this.props.children
  }
}
