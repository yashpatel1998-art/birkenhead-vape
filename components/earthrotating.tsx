'use client'

import { useEffect, useRef, useState } from 'react'

const EARTH_SECTION_HEIGHT = '100vh'

export default function EarthRotating() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current
      if (!el) return

      const top = el.getBoundingClientRect().top
      const progress = Math.max(0, Math.min(1, -top / window.innerHeight))
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const image = new Image()
    image.src = '/images/ezgif-frame-001.jpg'
  }, [])

  const verticalShift = scrollProgress * 12

  return (
    <div
      id="earth-rotation"
      ref={wrapRef}
      style={{ height: EARTH_SECTION_HEIGHT, position: 'relative', background: '#000' }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: '#000',
        perspective: '1200px',
      }}>

        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100%',
          transform: `translate(-50%, calc(-50% + ${verticalShift}vh))`,
          pointerEvents: 'none',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'center',
        }}>
          <img
            src="/images/ezgif-frame-001.jpg"
            alt="Earth rotating in center"
            decoding="async"
            loading="eager"
            style={{
              width: '50vw',
              maxWidth: '520px',
              height: 'auto',
              objectFit: 'contain',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              willChange: 'transform, opacity, filter',
              opacity: 0.88 + scrollProgress * 0.12,
              filter: `blur(${scrollProgress * 1.2}px)`,
              animation: 'spinEarth 16s linear infinite, earthFade 1.4s ease 0.1s forwards',
            }}
          />
        </div>

        <div style={overlay}>
          <div style={overlayBox}>
            <h1 style={htitle}>The cloud has landed.</h1>
            <p style={sub}>Auckland's finest vape destination, right here in Birkenhead.</p>
          </div>
        </div>

        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)',
          zIndex: 0,
        }} />

      </div>
    </div>
  )
}

const overlay: React.CSSProperties = {
  position: 'absolute', inset: 0,
  display: 'flex', flexDirection: 'column',
  alignItems: 'center', justifyContent: 'center',
  textAlign: 'center', padding: '0 2rem',
  pointerEvents: 'none',
  zIndex: 2,
}

const overlayBox: React.CSSProperties = {
  padding: '1.8rem 2.2rem',
  borderRadius: '28px',
  background: 'rgba(0, 0, 0, 0.40)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 30px 80px rgba(0, 0, 0, 0.45)',
  maxWidth: '780px',
}

const htitle: React.CSSProperties = {
  fontFamily: 'Orbitron, sans-serif',
  fontWeight: 900,
  fontSize: 'clamp(2.2rem, 7vw, 5.5rem)',
  color: '#fff',
  lineHeight: 1.05,
  letterSpacing: '-0.01em',
  marginBottom: '1rem',
  textShadow: '0 0 28px rgba(0,0,0,0.45)',
}

const sub: React.CSSProperties = {
  fontFamily: 'Rajdhani, sans-serif',
  fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
  color: 'rgba(255,255,255,0.92)',
  lineHeight: 1.7,
  fontWeight: 400,
  textShadow: '0 0 18px rgba(0,0,0,0.28)',
}

const btnBase: React.CSSProperties = {
  fontFamily: 'Orbitron, sans-serif',
  fontSize: '0.7rem',
  letterSpacing: '0.2em',
  padding: '0.9rem 2.2rem',
  textDecoration: 'none',
  transition: 'all 0.25s',
  display: 'inline-block',
}

const btnCyan: React.CSSProperties = {
  ...btnBase,
  border: '1px solid #00E5FF',
  color: '#00E5FF',
}

const btnViolet: React.CSSProperties = {
  ...btnBase,
  border: '1px solid #BF00FF',
  color: '#BF00FF',
}
