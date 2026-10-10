import { useMemo } from 'react'

/** Фон: мягкие пятна света + летящие вверх частицы + пульсирующие звёздочки. */
const isSmall = () => typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches

export default function Background() {
  const particles = useMemo(
    () =>
      Array.from({ length: isSmall() ? 14 : 28 }, () => ({
        left: Math.random() * 100,
        size: 5 + Math.random() * 6, // сама точка меньше: свечение рисуется градиентом
        dur: 16 + Math.random() * 18,
        delay: -Math.random() * 34,
        drift: (Math.random() - 0.5) * 90,
        op: 0.35 + Math.random() * 0.45,
      })),
    [],
  )
  const stars = useMemo(
    () =>
      Array.from({ length: isSmall() ? 6 : 11 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 10 + Math.random() * 16,
        dur: 3 + Math.random() * 4,
        delay: Math.random() * 6,
      })),
    [],
  )

  return (
    <div className="bg-layer" aria-hidden>
      <div className="spot spot-1" />
      <div className="spot spot-2" />
      <div className="spot spot-3" />
      <div className="bg-grid" />
      {particles.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            '--dur': `${p.dur}s`,
            '--delay': `${p.delay}s`,
            '--drift': `${p.drift}px`,
            '--op': p.op,
          }}
        />
      ))}
      {stars.map((s, i) => (
        <svg
          key={i}
          className="star"
          viewBox="0 0 24 24"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            '--dur': `${s.dur}s`,
            '--delay': `${s.delay}s`,
          }}
        >
          <path d="M12 0c.6 7 5 11.4 12 12-7 .6-11.4 5-12 12-.6-7-5-11.4-12-12 7-.6 11.4-5 12-12z" />
        </svg>
      ))}
    </div>
  )
}
