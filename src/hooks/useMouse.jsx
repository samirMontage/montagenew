import { createContext, useContext, useEffect } from 'react'
import { useMotionValue } from 'framer-motion'

// Глобальная позиция курсора (-0.5 … 0.5) для параллакса.
// На тач-устройствах остаётся 0 — параллакс там только от скролла.
const Ctx = createContext(null)

export function MouseProvider({ children }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  return <Ctx.Provider value={{ mx, my }}>{children}</Ctx.Provider>
}

export const useMouse = () => useContext(Ctx)
