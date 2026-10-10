import { about, site } from '../content.js'
import Reveal from './Reveal.jsx'
import ChessPiece from './ChessPiece.jsx'
import BlogAvatar from './BlogAvatar.jsx'
import { TelegramIcon } from './Logo.jsx'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-stretch">
          {/* большая стеклянная панель: фото слева, текст справа, статистика снизу */}
          <Reveal className="glass panel p-4 md:p-6 lg:p-7 flex flex-col">
            <div className="grid md:grid-cols-[minmax(220px,300px)_1fr] gap-6 lg:gap-9 flex-1">
              <div className="relative aspect-[3/4] md:aspect-auto md:min-h-[440px]">
                <img
                  src={site.avatar}
                  alt={about.titleAccent}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover rounded-[26px] shadow-[0_30px_60px_-30px_rgba(30,64,175,.45)]"
                />
                {site.available && (
                  <div className="absolute left-4 bottom-4 glass glass-strong rounded-full px-4 py-2">
                    <span className="label live">available for work</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-center py-2">
                <span className="label">{about.label}</span>
                <h2 className="h2 mt-4">
                  {about.title} <em>{about.titleAccent}</em>
                </h2>
                <div className="mt-6 space-y-4 text-ink-2 leading-[1.65] text-[1rem] lg:text-[1.05rem]">
                  {about.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-2">
                  {about.tools.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {about.stats.map((s) => (
                <li key={s.label} className="stat glass glass-strong rounded-2xl px-5 py-4">
                  <b className="!text-[1.5rem]">{s.value}</b>
                  <span>{s.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* карточка telegram-блога: видео-аватар + пешка */}
          <Reveal delay={0.1} className="glass panel relative overflow-hidden p-6 flex flex-col min-h-[440px]">
            <span className="label">{site.blog.name}</span>

            <div className="relative mt-5 h-[230px]">
              <BlogAvatar size={156} radius={38} className="absolute left-0 top-1/2 -translate-y-1/2" />
              <ChessPiece
                piece="pawn"
                height={240}
                className="right-[-14px] top-1/2"
                style={{ marginTop: -124 }}
                depth={14}
                scroll={28}
                duration={6.5}
                rotate={8}
              />
            </div>

            <p className="mt-5 text-ink-2 leading-relaxed">{site.blog.text}</p>

            <div className="mt-auto pt-6">
              <a href={site.blog.url} target="_blank" rel="noreferrer" className="btn btn-dark w-full">
                <TelegramIcon className="w-4 h-4" />
                {about.blogButton}
                <span aria-hidden>↗</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
