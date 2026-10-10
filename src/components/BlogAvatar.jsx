import { useEffect, useRef } from 'react'
import { site } from '../content.js'

/**
 * Аватар telegram-блога: зацикленное видео 1000×1000 (без звука),
 * играет только когда видно на экране. Если видео не задано – картинка.
 */
export default function BlogAvatar({ size = 140, radius = 32, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const p = v.play()
          if (p && p.catch) p.catch(() => {})
        } else v.pause()
      },
      { threshold: 0.2 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <div className={`blog-avatar ${className}`} style={{ width: size, height: size, borderRadius: radius }}>
      {site.blog.video ? (
        <video
          ref={ref}
          src={site.blog.video}
          poster={site.blog.avatar || undefined}
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
        />
      ) : (
        <img src={site.blog.avatar} alt="" loading="lazy" decoding="async" />
      )}
    </div>
  )
}
