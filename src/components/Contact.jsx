import { contact, site } from '../content.js'
import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import BlogAvatar from './BlogAvatar.jsx'
import { TelegramIcon } from './Logo.jsx'

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="wrap">
        <SectionHead
          label={contact.label}
          title={contact.title}
          accent={contact.titleAccent}
          center
          breakLine
          live={site.available}
          className="max-w-[820px]"
        />

        <div className="mt-12 grid md:grid-cols-2 gap-5 max-w-[920px] mx-auto">
          {contact.cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08} className="glass card p-7 flex flex-col">
              <div className="flex items-center gap-4">
                {c.kind === 'blog' ? (
                  <BlogAvatar size={56} radius={9999} />
                ) : (
                  <div className="w-14 h-14 rounded-full grid place-items-center text-white bg-[linear-gradient(135deg,#2563eb,#38bdf8)] shadow-[0_12px_24px_-10px_rgba(37,99,235,.7)]">
                    <TelegramIcon className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <h3 className="h3">{c.title}</h3>
                  <span className="text-sm font-semibold text-accent">{c.subtitle}</span>
                </div>
              </div>
              <p className="mt-5 text-ink-2 leading-relaxed">{c.text}</p>
              <div className="mt-auto pt-7">
                <a href={c.href} target="_blank" rel="noreferrer" className={`btn w-full ${c.kind === 'dm' ? 'btn-dark' : 'btn-glass'}`}>
                  {c.button}
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
