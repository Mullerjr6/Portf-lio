import { useEffect } from 'react'

export function useSEO(title: string, description: string, path = '/') {
  useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    const origin = import.meta.env.VITE_SITE_URL?.replace(/\/$/, '')
    if (origin) {
      let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
      if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical) }
      canonical.href = `${origin}${path}`
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', `${origin}${path}`)
    }
  }, [title, description, path])
}
