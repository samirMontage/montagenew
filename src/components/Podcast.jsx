import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { podcast } from '../content.js'
import Reveal from './Reveal.jsx'
import ChessPiece from './ChessPiece.jsx'
import VideoCard from './VideoCard.jsx'

export default function Podcast({ onOpen }) {
  const [open, setOpen] = useState(false)
  const [settled, setSettled] = useState(false)

  return (
    <section id="podcast" className="section">
      <div className="wrap relative">
        {/* король — выглядывает из-за левого края панели */}
        <ChessPiece
          piece="king"
          height={540}
          className="hidden lg:block left-[-28px] top-[20px]"
          depth={16}
          scroll={70}
          duration={8}
          rotate={-6}
          style={{ zIndex: 2 }}
        />

        <Reveal className="glass panel p-6 md:p-10 lg:p-12 lg:ml-28 relative">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-center">
            <div>
              <span className="label">{podcast.label}</span>
              <h2 className="h2 mt-4">
                {podcast.title} <em>{podcast.titleAccent}</em>
              </h2>
              <p className="lead mt-6">{podcast.text}</p>

              <ul className="mt-7 space-y-3">
                {podcast.features.map((f) => (
                  <li key={f} className="feature">
                    <i>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 6.5l2.5 2.5L10 3.5" />
                      </svg>
                    </i>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`btn ${open ? 'btn-glass' : 'btn-dark'} mt-9`}
                onClick={() => {
                  setSettled(false)
                  setOpen((v) => !v)
                }}
              >
                {open ? podcast.buttonClose : podcast.buttonOpen}
                <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.4 }} aria-hidden>
                  ↓
                </motion.span>
              </button>
            </div>

            {/* схема: 1 выпуск → монтаж → reels */}
            <div className="steps">
              {podcast.flow.map((f, i) => (
                <div key={f.value} className="contents">
                  <div className="step glass glass-strong">
                    <span className="dot">0{i + 1}</span>
                    <div>
                      <b>{f.value}</b>
                      <span>{f.label}</span>
                    </div>
                  </div>
                  {i < podcast.flow.length - 1 && (
                    <div className="step-arrow" aria-hidden>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 3v12M4 10l5 5 5-5" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="podcast-video"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                onAnimationComplete={() => setSettled(true)}
                style={{ overflow: settled ? 'visible' : 'hidden' }}
              >
                <div className="pt-8 lg:pt-10">
                  <div className="max-w-[900px] mx-auto">
                    <VideoCard item={podcast.video} horizontal onOpen={() => onOpen([{ ...podcast.video, horizontal: true }], 0)} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
