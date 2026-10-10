import { retention } from '../content.js'
import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'

export default function Retention() {
  return (
    <section id="retention" className="section pt-0 lg:pt-4">
      <div className="wrap">
        <SectionHead label={retention.label} title={retention.title} accent={retention.titleAccent} />
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {retention.cards.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.08} className="glass card p-7 flex flex-col">
              <span className="num">{c.n}</span>
              <h3 className="h3 mt-5">{c.title}</h3>
              <p className="mt-3 text-ink-2 leading-relaxed">{c.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
