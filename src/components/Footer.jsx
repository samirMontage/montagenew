import { footer, nav } from '../content.js'
import { PawnIcon } from './Logo.jsx'

export default function Footer() {
  return (
    <footer className="relative z-10 pb-8 pt-4">
      <div className="wrap">
        <div className="glass panel px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-semibold text-ink-3">
          <span className="inline-flex items-center gap-2">
            <PawnIcon className="w-5 h-5" />
            {footer.text}
          </span>
          <span className="serif !text-[1.25rem]">{footer.tagline}</span>
          <nav className="flex flex-wrap gap-4">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-ink transition-colors">
                {n.label}
              </a>
            ))}
            <a href="#top" className="hover:text-ink transition-colors">
              наверх ↑
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
