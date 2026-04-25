'use client'

import { useEffect, useRef } from 'react'

export default function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    canvas.width  = 300
    canvas.height = 300

    const draw = () => {
      const img = ctx.createImageData(300, 300)
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255
        img.data[i]   = v
        img.data[i+1] = v
        img.data[i+2] = v
        img.data[i+3] = 18  // opacity of each grain pixel
      }
      ctx.putImageData(img, 0, 0)
    }

    draw()
    const interval = setInterval(draw, 80) // animate grain
    return () => clearInterval(interval)
  }, [])

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', inset: 0, zIndex: 99991,
      width: '100%', height: '100%',
      pointerEvents: 'none',
      opacity: 0.15,
      mixBlendMode: 'overlay',
    }} />
  )
}
