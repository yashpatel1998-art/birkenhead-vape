'use client'

import { useRef, useEffect, useState } from 'react'

export default function GalaxyHero() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [scale,    setScale]    = useState(1)
  const [opacity,  setOpacity]  = useState(1)
  const [titleOp,  setTitleOp]  = useState(1)
  const [titleY,   setTitleY]   = useState(0)
  const [zoomMsg,  setZoomMsg]  = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current
      if (!el) return
      const top    = el.getBoundingClientRect().top
      const avail  = el.offsetHeight - window.innerHeight
      if (avail <= 0) return
      const p = Math.max(0, Math.min(1, -top / avail))

      // ── ZOOM: scale video from 1x → 8x as user scrolls ──
      // Feels like camera flying INTO the galaxy toward Earth
      const zoom = 1 + p * 7          // 1x → 8x
      setScale(zoom)

      // Fade out galaxy when almost fully zoomed
      const fade = p > 0.75 ? 1 - (p - 0.75) / 0.25 : 1
      setOpacity(fade)

      // Title fades and moves up early
      const tFade = p < 0.15 ? 1 - (p / 0.15) : 0
      setTitleOp(tFade)
      setTitleY(p * -60)

      // Show "zoom" hint briefly at start
      setZoomMsg(p > 0.02 && p < 0.12)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    // Tall section — scroll through to zoom in
    <div ref={wrapRef} style={{ height: '400vh', position: 'relative', background: '#000' }}>

      {/* STICKY VIEWPORT */}
      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', width: '100%',
        overflow: 'hidden', background: '#000',
      }}>

        {/* GALAXY VIDEO — zooms in on scroll */}
        <video
          ref={videoRef}
          src="/galaxy.mp4"
          autoPlay loop muted playsInline preload="auto"
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: `translate(-50%, -50%) scale(${scale})`,
            transformOrigin: 'center center',
            minWidth: '100%', minHeight: '100%',
            width: 'auto', height: 'auto',
            objectFit: 'cover',
            opacity: opacity,
            transition: 'transform 0.05s linear',
            willChange: 'transform',
          }}
        />

        {/* Dark vignette edges */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)',
          opacity: opacity,
        }} />

        {/* HERO TITLE — fades out as zoom starts */}
        {titleOp > 0 && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 2,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', padding: '0 2rem',
            pointerEvents: 'none',
            opacity: titleOp,
            transform: `translateY(${titleY}px)`,
          }}>
            <p style={{
              fontFamily: 'monospace', color: '#00E5FF',
              fontSize: 11, letterSpacing: '0.5em',
              marginBottom: 16, opacity: 0.75,
            }}>
              // Birkenhead, Auckland — Est. 2024
            </p>
            <h1 style={{
              fontFamily: 'Orbitron, sans-serif', fontWeight: 900,
              lineHeight: 1, margin: 0, letterSpacing: '-0.02em',
            }}>
              <span style={{
                display: 'block',
                fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                color: '#fff',
                textShadow: '0 0 30px rgba(255,255,255,0.3)',
              }}>BIRKENHEAD</span>
              <span style={{
                display: 'block',
                fontSize: 'clamp(3rem, 9vw, 8rem)',
                color: '#00E5FF',
                textShadow: '0 0 60px rgba(0,229,255,1), 0 0 120px rgba(0,229,255,0.4)',
              }}>VAPE</span>
              <span style={{
                display: 'block',
                fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                color: '#BF00FF',
                textShadow: '0 0 60px rgba(191,0,255,1), 0 0 120px rgba(191,0,255,0.4)',
              }}>SHOP</span>
            </h1>
            <p style={{
              fontFamily: 'monospace', fontSize: 'clamp(0.8rem, 1.5vw, 1.1rem)',
              letterSpacing: '0.35em', color: 'rgba(255,255,255,0.4)',
              marginTop: 16, textTransform: 'uppercase',
            }}>
              The Cloud Has Landed
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: 24, flexWrap: 'wrap', justifyContent: 'center', pointerEvents: 'auto' }}>
              <a href="#blast" style={{
                padding: '0.9rem 2rem', border: '1px solid #00E5FF',
                color: '#00E5FF', fontFamily: 'Orbitron, sans-serif',
                fontSize: '0.7rem', letterSpacing: '0.2em',
                textDecoration: 'none', transition: 'all 0.3s',
              }}>EXPLORE ↓</a>
              <a href="#find-us" style={{
                padding: '0.9rem 2rem', border: '1px solid rgba(191,0,255,0.5)',
                color: '#BF00FF', fontFamily: 'Orbitron, sans-serif',
                fontSize: '0.7rem', letterSpacing: '0.2em',
                textDecoration: 'none', transition: 'all 0.3s',
              }}>FIND US</a>
            </div>
          </div>
        )}

        {/* SCROLL HINT — only at very start */}
        {titleOp > 0.8 && (
          <div style={{
            position: 'absolute', bottom: '2rem', left: '50%',
            transform: 'translateX(-50%)', zIndex: 3,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 8, pointerEvents: 'none',
          }}>
            <span style={{
              fontFamily: 'monospace', color: 'rgba(255,255,255,0.25)',
              fontSize: 11, letterSpacing: '0.4em',
            }}>SCROLL</span>
            <div style={{
              width: 1, height: 40,
              background: 'linear-gradient(to bottom, #00E5FF, transparent)',
              animation: 'bounceDown 1.5s ease-in-out infinite',
            }} />
          </div>
        )}

        {/* ZOOM HINT — appears briefly when scrolling starts */}
        {zoomMsg && (
          <div style={{
            position: 'absolute', bottom: '6rem', left: '50%',
            transform: 'translateX(-50%)', zIndex: 3,
            fontFamily: 'monospace', color: 'rgba(0,229,255,0.6)',
            fontSize: 11, letterSpacing: '0.4em', pointerEvents: 'none',
            animation: 'fadeIn 0.3s ease',
          }}>
            FLYING THROUGH SPACE...
          </div>
        )}

      </div>

      <style>{`
        @keyframes bounceDown {
          0%,100%{transform:translateY(0)}
          50%{transform:translateY(10px)}
        }
        @keyframes fadeIn {
          from{opacity:0} to{opacity:1}
        }
      `}</style>
    </div>
  )
}
