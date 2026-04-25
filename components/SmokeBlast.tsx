'use client'

import { useRef, useEffect, useState } from 'react'

export default function SmokeBlast() {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [beat, setBeat] = useState(0) // 0=none, 1=A, 2=B, 3=C, 4=D

  // ── TIME-BASED TEXT — triggers as Earth rotates ───────────
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onTimeUpdate = () => {
      const t   = video.currentTime
      const dur = video.duration || 20

      // Map video time to text beats
      const p = t / dur

      if      (p >= 0.00 && p < 0.25) setBeat(1) // THE CLOUD HAS LANDED
      else if (p >= 0.25 && p < 0.50) setBeat(2) // YOUR LOCAL EXPERTS
      else if (p >= 0.50 && p < 0.75) setBeat(3) // OPEN 7 DAYS
      else if (p >= 0.75 && p <= 1.00) setBeat(4) // COME VISIT US
      else setBeat(0)
    }

    video.addEventListener('timeupdate', onTimeUpdate)
    return () => video.removeEventListener('timeupdate', onTimeUpdate)
  }, [])

  return (
    <div id="blast" ref={wrapRef}
      style={{ height: '140vh', position: 'relative', background: '#000' }}>

      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', width: '100%',
        overflow: 'hidden', background: 'transparent',
      }}>

        {/* 🌍 EARTH VIDEO */}
        <video
          ref={videoRef}
          src="/earth.mp4"
          autoPlay loop muted playsInline preload="auto"
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '100%', minHeight: '100%',
            width: 'auto', height: 'auto',
            objectFit: 'cover',
          }}
        />

        {/* Vignette — soft edges only */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%)',
        }} />

        {/* ── BEAT A: THE CLOUD HAS LANDED ── */}
        {beat === 1 && (
          <div style={ov('center')}>
            <h2 style={{ ...ht, textShadow: '0 0 40px rgba(0,229,255,0.9)' }}>
              THE CLOUD<br />
              <span style={{ color: '#00E5FF' }}>HAS LANDED</span>
            </h2>
            <p style={sp}>
              Auckland&apos;s finest vape destination,<br />
              right here in Birkenhead.
            </p>
          </div>
        )}

        {/* ── BEAT B: YOUR LOCAL EXPERTS ── */}
        {beat === 2 && (
          <div style={ov('left')}>
            <h2 style={{ ...ht, textShadow: '0 0 30px rgba(191,0,255,0.9)' }}>
              YOUR <span style={{ color: '#BF00FF' }}>LOCAL</span><br />EXPERTS
            </h2>
            <p style={sp}>
              Premium vaping products.<br />
              Expert guidance.<br />
              A welcoming community for smokers<br />making the switch.
            </p>
          </div>
        )}

        {/* ── BEAT C: OPEN 7 DAYS ── */}
        {beat === 3 && (
          <div style={ov('right')}>
            <h2 style={{ ...ht, textShadow: '0 0 30px rgba(255,32,121,0.9)' }}>
              OPEN <span style={{ color: '#FF2079' }}>7 DAYS</span>
            </h2>
            <p style={{ ...sp, textAlign: 'right' }}>
              Mon–Sat 8am–9pm<br />Sun 8am–8pm<br />
              45 Birkenhead Avenue, Auckland 0626
            </p>
          </div>
        )}

        {/* ── BEAT D: COME VISIT US ── */}
        {beat === 4 && (
          <div style={ov('center')}>
            <h2 style={{ ...ht, textShadow: '0 0 40px rgba(0,229,255,0.9)' }}>
              COME <span style={{ color: '#00E5FF' }}>VISIT US</span>
            </h2>
            <p style={{ ...sp, marginBottom: '2rem' }}>
              022 328 6322 · Birkenhead, Auckland · 18+ Only
            </p>
            <div style={{
              display: 'flex', gap: '1rem',
              justifyContent: 'center', flexWrap: 'wrap',
              pointerEvents: 'auto',
            }}>
              <a href="#find-us"  style={btn('#00E5FF')}>[ FIND US ]</a>
              <a href="#products" style={btn('#BF00FF')}>[ OUR PRODUCTS ]</a>
            </div>
          </div>
        )}

        {/* Scroll hint */}
        <div style={{
          position: 'absolute', bottom: '2rem',
          left: '50%', transform: 'translateX(-50%)',
          textAlign: 'center', pointerEvents: 'none',
        }}>
          <div style={{
            fontFamily: 'monospace', color: 'rgba(255,255,255,0.25)',
            fontSize: 11, letterSpacing: '0.4em', marginBottom: 8,
          }}>SCROLL ↓</div>
        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px) }
          to   { opacity: 1; transform: translateY(0) }
        }
      `}</style>
    </div>
  )
}

// ── STYLES ────────────────────────────────────────────────────
const ov = (align: 'center'|'left'|'right'): React.CSSProperties => ({
  position: 'absolute', inset: 0,
  display: 'flex', flexDirection: 'column',
  alignItems: align==='left' ? 'flex-start' : align==='right' ? 'flex-end' : 'center',
  justifyContent: 'center',
  textAlign: align==='right' ? 'right' : align==='left' ? 'left' : 'center',
  padding: align==='center' ? '0 2rem' : '0 clamp(2rem,12vw,9rem)',
  pointerEvents: 'none',
  animation: 'fadeIn 0.6s ease',
})

const ht: React.CSSProperties = {
  fontFamily: 'Orbitron, sans-serif', fontWeight: 900,
  fontSize: 'clamp(2rem, 6.5vw, 5rem)',
  color: '#fff', lineHeight: 1.08,
  letterSpacing: '-0.01em', marginBottom: '1rem',
}

const sp: React.CSSProperties = {
  fontFamily: 'Rajdhani, sans-serif', fontWeight: 300,
  fontSize: 'clamp(1rem, 1.8vw, 1.3rem)',
  color: 'rgba(255,255,255,0.65)', lineHeight: 1.75,
}

const btn = (color: string): React.CSSProperties => ({
  padding: '0.9rem 2.2rem',
  border: `1px solid ${color}`,
  color, fontFamily: 'Orbitron, sans-serif',
  fontSize: '0.7rem', letterSpacing: '0.2em',
  textDecoration: 'none', transition: 'all 0.25s',
  display: 'inline-block',
})
