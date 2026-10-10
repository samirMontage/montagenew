import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { site, nav } from '../content.js'
import { PawnIcon, TelegramIcon } from './Logo.jsx'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          <a href="#top" className="logo" onClick={() => setOpen(false)}>
            <PawnIcon />
            <span>{site.name}</span>
          </a>

          <nav className="nav hidden md:flex items-center gap-1">
            {nav.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href={site.telegram} target="_blank" rel="noreferrer" className="btn btn-dark btn-sm">
              <TelegramIcon className="w-4 h-4" />
              <span className="hidden sm:inline">telegram</span>
            </a>
            <button className="burger md:hidden" aria-label="меню" onClick={() => setOpen((v) => !v)}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? (
                  <>
                    <path d="M4 4l10 10" />
                    <path d="M14 4L4 14" />
                  </>
                ) : (
                  <>
                    <path d="M3 5h12" />
                    <path d="M3 9h12" />
                    <path d="M3 13h12" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu glass glass-strong md:hidden"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
                {n.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
