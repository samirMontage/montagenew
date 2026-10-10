import { useRef } from 'react'
import { motion, useSpring, useTransform, useScroll } from 'framer-motion'
import { useMouse } from '../hooks/useMouse.jsx'

/**
 * Обёртка с параллаксом: едет за курсором (depth, px) и за скроллом (scroll, px).
 */
export default function Parallax({ depth = 20, scroll = 50, className = '', style, children }) {
  const ref = useRef(null)
  const { mx, my } = useMouse()

  const spring = { stiffness: 38, damping: 18, mass: 0.6 }
  const x = useSpring(useTransform(mx, (v) => v * depth), spring)
  const yMouse = useSpring(useTransform(my, (v) => v * depth), spring)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yScroll = useTransform(scrollYProgress, [0, 1], [scroll, -scroll])
  const y = useTransform([yMouse, yScroll], ([a, b]) => a + b)

  return (
    <motion.div ref={ref} className={className} style={{ x, y, ...style }}>
      {children}
    </motion.div>
  )
}
