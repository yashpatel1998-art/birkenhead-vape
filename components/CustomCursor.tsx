'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Hide on touch devices — no cursor needed
    if (window.matchMedia('(hover:none)').matches) return
    setVisible(true)

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`
    }

    const animate = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    animate()
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  if (!visible) return null

  return (
    <>
      <div ref={dotRef} style={{ position:'fixed', top:0, left:0, zIndex:99999, width:8, height:8, borderRadius:'50%', background:'#00E5FF', pointerEvents:'none', boxShadow:'0 0 10px rgba(0,229,255,0.8)', mixBlendMode:'difference' }} />
      <div ref={ringRef} style={{ position:'fixed', top:0, left:0, zIndex:99998, width:40, height:40, borderRadius:'50%', border:'1px solid rgba(0,229,255,0.5)', pointerEvents:'none', transition:'transform 0.15s ease' }} />
      <style>{`@media (hover:hover) { * { cursor: none !important; } }`}</style>
    </>
  )
}
