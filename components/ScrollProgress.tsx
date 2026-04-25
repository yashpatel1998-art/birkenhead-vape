'use client'

import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const bar = barRef.current
      if (!bar) return
      const p = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      bar.style.width = `${Math.min(100, p * 100)}%`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: 2, zIndex: 99995, background: 'rgba(255,255,255,0.05)',
    }}>
      <div ref={barRef} style={{
        height: '100%', width: '0%',
        background: 'linear-gradient(to right, #BF00FF, #00E5FF)',
        transition: 'width 0.1s linear',
        boxShadow: '0 0 8px rgba(0,229,255,0.6)',
      }} />
    </div>
  )
}
