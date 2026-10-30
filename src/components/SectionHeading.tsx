import { ScrollRevealText } from './effects/ScrollRevealText'

export function SectionHeading({ number, eyebrow, title, description }: { number: string; eyebrow: string; title: string; description?: string }) {
  return <header className="section-heading reveal"><div className="eyebrow"><span>{number} /</span> {eyebrow}</div><div className="section-heading-row"><h2><ScrollRevealText text={title} /></h2>{description && <ScrollRevealText as="p" text={description} />}</div></header>
}
