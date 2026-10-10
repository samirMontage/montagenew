import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { site } from '../content.js'
import { TelegramIcon } from './Logo.jsx'

/** Модалка со звуком: вертикальная для reels, горизонтальная для подкаста. */
export default function VideoModal({ state, onChange }) {
  const item = state ? state.items[state.index] : null
  const many = state && state.items.length > 1

  const close = () => onChange(null)
  const step = (d) =>
    onChange((s) => (s ? { ...s, index: (s.index + d + s.items.length) % s.items.length } : s))

  useEffect(() => {
    if (!state) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!state])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={close}
        >
          <motion.div
            key={item.src}
            className={`modal ${item.horizontal ? 'modal-h' : 'modal-v'}`}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10, transition: { duration: 0.22 } }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-media">
              <video key={item.src} src={item.src} poster={item.poster || undefined} controls autoPlay playsInline />
            </div>

            <div className="modal-bar">
              {many ? (
                <span className="modal-counter">
                  {String(state.index + 1).padStart(2, '0')} / {String(state.items.length).padStart(2, '0')}
                </span>
              ) : (
                <span className="modal-counter">{item.horizontal ? 'podcast · 16:9' : 'reels · 9:16'}</span>
              )}
              {many && (
                <p className="modal-hint hidden md:block">
                  <kbd>←</kbd> <kbd>→</kbd> листать · <kbd>esc</kbd> закрыть
                </p>
              )}
              <a href={site.telegram} target="_blank" rel="noreferrer" className="btn btn-dark btn-sm">
                <TelegramIcon className="w-4 h-4" />
                обсудить проект
                <span aria-hidden>↗</span>
              </a>
            </div>
          </motion.div>

          <button className="modal-close" onClick={close} aria-label="закрыть">
            ✕
          </button>
          {many && (
            <>
              <button
                className="modal-nav prev"
                aria-label="предыдущее"
                onClick={(e) => {
                  e.stopPropagation()
                  step(-1)
                }}
              >
                ←
              </button>
              <button
                className="modal-nav next"
                aria-label="следующее"
                onClick={(e) => {
                  e.stopPropagation()
                  step(1)
                }}
              >
                →
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
