import Parallax from './Parallax.jsx'

// размеры нужны браузеру, чтобы знать пропорции картинки до загрузки (нет скачков вёрстки)
const PIECES = {
  queen: { src: '/chess/queen.webp', w: 423, h: 962 },
  'queen-soft': { src: '/chess/queen-soft.webp', w: 314, h: 673 }, // заранее размытая версия для фона на телефонах
  knight: { src: '/chess/knight.webp', w: 495, h: 903 },
  king: { src: '/chess/king.webp', w: 384, h: 1100 },
  pawn: { src: '/chess/pawn.webp', w: 481, h: 842 },
}

/**
 * Серебряная шахматная фигура: левитация + параллакс (мышь + скролл).
 * height – высота в px; className – позиционирование (absolute …).
 * Тень – отдельный статичный градиент (дешевле, чем drop-shadow).
 */
export default function ChessPiece({
  piece = 'queen',
  height = 420,
  className = '',
  depth = 24,
  scroll = 60,
  opacity = 1,
  duration = 7,
  delay = 0,
  rotate = 0,
  shadow = true,
  priority = false,
  style,
}) {
  const vars = { '--dur': `${duration}s`, '--delay': `${delay}s` }
  const p = PIECES[piece] || PIECES.queen
  return (
    <Parallax depth={depth} scroll={scroll} className={`chess ${className}`} style={{ height, ...style }} aria-hidden>
      <div style={{ position: 'relative', height: '100%', transform: `rotate(${rotate}deg)`, opacity }}>
        {shadow && <div className="chess-shadow" style={vars} />}
        <img
          src={p.src}
          width={p.w}
          height={p.h}
          alt=""
          draggable={false}
          className="chess-img"
          loading={priority ? 'eager' : 'lazy'}
          fetchpriority={priority ? 'high' : 'auto'}
          decoding="async"
          style={{ ...vars, position: 'relative' }}
        />
      </div>
    </Parallax>
  )
}
