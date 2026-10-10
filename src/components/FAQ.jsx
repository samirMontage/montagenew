import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { faq } from '../content.js'
import SectionHead from './SectionHead.jsx'
import Reveal from './Reveal.jsx'
import ChessPiece from './ChessPiece.jsx'

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="section">
      <div className="wrap grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16">
        <div className="relative">
          <div className="lg:sticky lg:top-32">
            <SectionHead label={faq.label} title={faq.title} accent={faq.titleAccent} />
            <Reveal delay={0.1}>
              <p className="lead mt-5 max-w-[420px]">{faq.note}</p>
            </Reveal>
            {/* конь — как у maploy, слева в блоке faq */}
            <div className="relative h-[380px] hidden lg:block mt-4">
              <ChessPiece piece="knight" height={400} className="left-[-10px] top-[-10px]" depth={18} scroll={50} duration={7} />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {faq.items.map((it, i) => {
            const isOpen = open === i
            return (
              <Reveal key={it.q} delay={i * 0.05}>
                <div className={`faq-item glass ${isOpen ? 'open glass-strong' : ''}`}>
                  <button onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                    <span>{it.q}</span>
                    <span className="plus" aria-hidden>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M7 1v12M1 7h12" />
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="a"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p>{it.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
