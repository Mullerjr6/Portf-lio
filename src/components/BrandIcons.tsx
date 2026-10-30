import type { SVGProps } from 'react'
type IconProps = SVGProps<SVGSVGElement> & { size?: number }
export function Github({ size = 20, ...props }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="M9 19c-4 1-4-2-6-2m12 5v-3.5c0-1 .1-1.5-.5-2 3-.4 6-1.5 6-6.5a5 5 0 0 0-1.5-3.5 5 5 0 0 0-.1-3.5S17.7 2.6 15 4a13 13 0 0 0-6 0C6.3 2.6 5.1 3 5.1 3A5 5 0 0 0 5 6.5 5 5 0 0 0 3.5 10c0 5 3 6.1 6 6.5-.6.5-.6 1-.5 2V22" /></svg>
}
export function Linkedin({ size = 20, ...props }: IconProps) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><rect x="3" y="9" width="4" height="12" /><path d="M11 21V9h4v2a4 4 0 0 1 7 3v7h-4v-7a1.5 1.5 0 0 0-3 0v7" /><circle cx="5" cy="4" r="2" /></svg>
}
