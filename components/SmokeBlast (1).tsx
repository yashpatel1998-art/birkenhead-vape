'use client'

import { useRef, useEffect, useState } from 'react'

export default function SmokeBlast() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [textA, setTextA] = useState(false)
  const [textB, setTextB] = useState(false)
  const [textC, setTextC] = useState(false)
  const [textD, setTextD] = useState(false)
  const [hint,  setHint]  = useState(true)

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current
      if (!el) return
      const top   = el.getBoundingClientRect().top
      const avail = el.offsetHeight - window.innerHeight
      if (avail <= 0) return
      const p = Math.max(0, Math.min(1, -top / avail))
      setTextA(p >= 0.02 && p <= 0.28)
      setTextB(p >= 0.30 && p <= 0.55)
      setTextC(p >= 0.57 && p <= 0.78)
      setTextD(p >= 0.80 && p <= 1.00)
      setHint(p < 0.05)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div id="blast" ref={wrapRef}
      style={{ height: '400vh', position: 'relative', background: '#000' }}>

      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', width: '100%',
        overflow: 'hidden', background: '#000',
      }}>

        {/* 🌍 EARTH VIDEO — centered, looping forever */}
        <video
          src="/globe.mp4"
          autoPlay loop muted playsInline
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '100%', minHeight: '100%',
            width: 'auto', height: 'auto',
            objectFit: 'cover',
          }}
        />

        {/* Vignette */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.55) 100%)',
        }} />

        {/* BEAT A */}
        {textA && (
          <div style={ov('center')}>
            <h2 style={{ ...ht, textShadow: '0 0 40px rgba(0,229,255,0.9)' }}>
              THE CLOUD<br />
              <span style={{ color: '#00E5FF' }}>HAS LANDED</span>
            </h2>
            <p style={sp}>Auckland&apos;s finest vape destination,<br />right here in Birkenhead.</p>
          </div>
        )}

        {/* BEAT B */}
        {textB && (
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

        {/* BEAT C */}
        {textC && (
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

        {/* BEAT D */}
        {textD && (
          <div style={ov('center')}>
            <h2 style={{ ...ht, textShadow: '0 0 40px rgba(0,229,255,0.9)' }}>
              COME <span style={{ color: '#00E5FF' }}>VISIT US</span>
            </h2>
            <p style={{ ...sp, marginBottom: '2rem' }}>
              022 328 6322 · Birkenhead, Auckland · 18+ Only
            </p>
            <div style={{ display:'flex', gap:'1rem',
              justifyContent:'center', flexWrap:'wrap', pointerEvents:'auto' }}>
              <a href="#find-us"  style={btn('#00E5FF')}>[ FIND US ]</a>
              <a href="#products" style={btn('#BF00FF')}>[ OUR PRODUCTS ]</a>
            </div>
          </div>
        )}

        {/* SCROLL HINT */}
        {hint && (
          <div style={{
            position:'absolute', bottom:'2rem',
            left:'50%', transform:'translateX(-50%)',
            textAlign:'center', pointerEvents:'none',
          }}>
            <div style={{
              fontFamily:'monospace', color:'rgba(255,255,255,0.3)',
              fontSize:11, letterSpacing:'0.4em', marginBottom:8,
            }}>SCROLL</div>
            <div style={{
              width:1, height:40, margin:'0 auto',
              background:'linear-gradient(to bottom, #00E5FF, transparent)',
              animation:'bounceDown 1.5s ease-in-out infinite',
            }} />
          </div>
        )}

      </div>

      <style>{`
        @keyframes bounceDown {
          0%,100%{transform:translateY(0)}
          50%{transform:translateY(10px)}
        }
        @keyframes fadeIn {
          from{opacity:0;transform:translateY(14px)}
          to{opacity:1;transform:translateY(0)}
        }
      `}</style>
    </div>
  )
}

// ── STYLES ────────────────────────────────────────────────────
const ov = (align: 'center'|'left'|'right'): React.CSSProperties => ({
  position: 'absolute', inset: 0,
  display: 'flex', flexDirection: 'column',
  alignItems: align==='left'?'flex-start':align==='right'?'flex-end':'center',
  justifyContent: 'center',
  textAlign: align==='right'?'right':align==='left'?'left':'center',
  padding: align==='center'?'0 2rem':'0 clamp(2rem,12vw,9rem)',
  pointerEvents: 'none', animation: 'fadeIn 0.4s ease',
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
