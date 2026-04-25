'use client'

import { useRef, ReactNode } from 'react'

export default function MagneticCard({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 12
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 12
    el.style.transform = `perspective(600px) rotateX(${-y}deg) rotateY(${x}deg) scale(1.02)`
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.5s ease'
    el.style.transform  = 'perspective(600px) rotateX(0) rotateY(0) scale(1)'
    setTimeout(() => { if (el) el.style.transition = '' }, 500)
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ transformStyle:'preserve-3d', willChange:'transform', ...style }}>
      {children}
    </div>
  )
}
