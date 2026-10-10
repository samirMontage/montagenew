import { forwardRef, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { PlayIcon } from './Logo.jsx'

const isTouch = () => typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

/**
 * Карточка видео (как у maploy): в покое приглушена, при наведении оживает
 * и играет без звука, по клику открывается модалка со звуком.
 * На тач-устройствах играет, когда карточка в зоне видимости.
 */
const VideoCard = forwardRef(function VideoCard({ item, onOpen, horizontal = false, index = 0 }, ref) {
  const vref = useRef(null)
  const [hover, setHover] = useState(false)
  const [touch] = useState(isTouch)

  const play = () => {
    const v = vref.current
    if (!v) return
    v.muted = true
    const p = v.play()
    if (p && p.catch) p.catch(() => {})
  }
  const stop = () => {
    const v = vref.current
    if (!v) return
    v.pause()
    try {
      v.currentTime = 0
    } catch {}
  }

  useEffect(() => {
    if (!touch || !vref.current) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.intersectionRatio >= 0.6) {
          setHover(true)
          play()
        } else {
          setHover(false)
          stop()
        }
      },
      { threshold: [0, 0.6, 1] },
    )
    io.observe(vref.current)
    return () => io.disconnect()
  }, [touch])

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={`vcard ${horizontal ? 'vcard-h' : ''} ${hover ? 'is-hover' : ''}`}
      onMouseEnter={() => {
        if (touch) return
        setHover(true)
        play()
      }}
      onMouseLeave={() => {
        if (touch) return
        setHover(false)
        stop()
      }}
      onClick={onOpen}
    >
      <div className={`vmedia ${horizontal ? 'aspect-video' : 'aspect-[9/16]'}`}>
        <video
          ref={vref}
          src={`${item.src}#t=0.001`}
          poster={item.poster || undefined}
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
        />
        <div className="vdim" />
        <div className="vshade" />
        <span className="vbadge">{horizontal ? '16:9 · podcast' : '9:16 · reels'}</span>
        <div className="vplay">
          <span>
            <PlayIcon className="w-5 h-5 ml-0.5" />
          </span>
        </div>
        <span className="vsound">▶ со звуком</span>
      </div>
    </motion.article>
  )
})

export default VideoCard
