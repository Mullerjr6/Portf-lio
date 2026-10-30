import type { CSSProperties, ReactElement } from 'react'

export type TechTextProps = {
  text?: string
  fontFamily?: string
  fontWeight?: number
  fontSize?: number
  letterSpacing?: number
  color?: string
  accentColor?: string
  align?: 'left' | 'center' | 'right'
  reach?: number
  softness?: number
  dashLength?: number
  dashGap?: number
  strokeWidth?: number
  lineStyle?: 'dashed' | 'solid'
  reveal?: 'letter' | 'area'
  specks?: number
  selection?: boolean
  labels?: boolean
  draggable?: boolean
  bounce?: number
  sweep?: boolean
  speed?: number
  clickKick?: boolean
  intro?: 'none' | 'type' | 'assemble' | 'metrics'
  introDuration?: number
  guides?: boolean
  className?: string
  style?: CSSProperties
}

declare function TechText(props: TechTextProps): ReactElement

export default TechText
