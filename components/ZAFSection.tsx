'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

const FLAVOURS = [
  { name: 'BLUEBERRY',           sub: 'Zero Sugar · Zero Calories',  bg: '#0d3d8c', glow: '#1a6bbf', light: '#4a9fffaa', img: '/zaf/blueberry.jpg' },
  { name: 'PEACH',               sub: 'Zero Sugar · Zero Calories',  bg: '#a05030', glow: '#d4724a', light: '#ffaa8088', img: '/zaf/peach.jpg' },
  { name: 'PEPPERMINT',          sub: 'Zero Sugar · Zero Calories',  bg: '#1a5c28', glow: '#2d9440', light: '#5adc7088', img: '/zaf/peppermint.jpg' },
  { name: 'GRAPE',               sub: 'Zero Sugar · Zero Calories',  bg: '#3d1566', glow: '#7030b0', light: '#b060ff88', img: '/zaf/grape.jpg' },
  { name: 'MANGO',               sub: 'Zero Sugar · Zero Calories',  bg: '#8c5a00', glow: '#c4880a', light: '#ffcc3388', img: '/zaf/mango.jpg' },
  { name: 'BLUEBERRY RASPBERRY', sub: 'Zero Sugar · Zero Calories',  bg: '#8c0048', glow: '#d41478', light: '#ff3aaa88', img: '/zaf/blueberry-raspberry.jpg' },
  { name: 'CITRUS',              sub: 'Zero Sugar · Zero Calories',  bg: '#8c3a00', glow: '#c45c10', light: '#ff8c2088', img: '/zaf/citrus.jpg' },
  { name: 'WATERMELON',         sub: 'Zero Sugar · Zero Calories',  bg: '#8c0c14', glow: '#d41c28', light: '#ff404088', img: '/zaf/watermelon.jpg' },
]

export default function ZAFSection() {
  const [active, setActive]     = useState(0)
  const [prev, setPrev]         = useState(0)
  const [animating, setAnimating] = useState(false)
  const sectionRef  = useRef<HTMLElement>(null)
  const bgRef       = useRef<HTMLDivElement>(null)
  const imgRef      = useRef<HTMLDivElement>(null)
  const nameRef     = useRef<HTMLHeadingElement>(null)
  const dotRef      = useRef<HTMLDivElement>(null)
  const autoRef     = useRef<ReturnType<typeof setInterval> | null>(null)

  // ── Auto-advance ──
  const startAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current)
    autoRef.current = setInterval(() => {
      goTo((i: number) => (i + 1) % FLAVOURS.length)
    }, 4000)
  }

  const goTo = (idxOrFn: number | ((i: number) => number)) => {
    setActive(prev => {
      const next = typeof idxOrFn === 'function' ? idxOrFn(prev) : idxOrFn
      if (next === prev || animating) return prev
      triggerTransition(prev, next)
      return next
    })
  }

  const triggerTransition = (from: number, to: number) => {
    setAnimating(true)
    setPrev(from)
    const fl  = FLAVOURS[to]
    const bg  = bgRef.current
    const img = imgRef.current
    const nm  = nameRef.current
    if (!bg || !img || !nm) return

    // Fade out image + name
    gsap.to([img, nm], {
      opacity: 0, y: 30, scale: 0.95,
      duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        // Swap background color
        gsap.to(bg, {
          background: `radial-gradient(ellipse 80% 70% at 50% 55%, ${fl.light} 0%, ${fl.glow}88 35%, ${fl.bg} 70%)`,
          duration: 0.5, ease: 'power2.inOut',
        })
        // Fade in new image + name
        gsap.fromTo([img, nm],
          { opacity: 0, y: -30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out',
            onComplete: () => setAnimating(false) }
        )
      }
    })
  }

  // init background
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const fl = FLAVOURS[0]
    if (bgRef.current) {
      gsap.set(bgRef.current, {
        background: `radial-gradient(ellipse 80% 70% at 50% 55%, ${fl.light} 0%, ${fl.glow}88 35%, ${fl.bg} 70%)`
      })
    }
    startAuto()
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [])

  const fl = FLAVOURS[active]

  const handleDot = (i: number) => {
    startAuto() // reset timer
    if (i !== active && !animating) {
      triggerTransition(active, i)
      setActive(i)
    }
  }

  const handleArrow = (dir: 1 | -1) => {
    startAuto()
    const next = (active + dir + FLAVOURS.length) % FLAVOURS.length
    if (!animating) {
      triggerTransition(active, next)
      setActive(next)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="zaf"
      style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}
    >
      {/* ── Morphing background ── */}
      <div ref={bgRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* ── Grain texture overlay ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
        backgroundSize: '200px'
      }} />

      {/* ── Top bar ── */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2rem 2.5rem 0' }}>
        {/* Brand */}
        <div>
          <p style={{ fontFamily: "'Orbitron',monospace", fontWeight: 900, fontSize: 'clamp(1.2rem,3vw,2rem)', color: '#fff', margin: 0, letterSpacing: '0.1em', textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>ZAF</p>
          <p style={{ fontFamily: 'monospace', fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.35em', margin: '2px 0 0', textTransform: 'uppercase' }}>Zero to Absolute Focus</p>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['ENERGY', 'FOCUS', 'MOOD'].map(t => (
            <span key={t} style={{ fontFamily: "'Orbitron',monospace", fontSize: 'clamp(7px,1vw,10px)', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.3em', cursor: 'default' }}>{t}</span>
          ))}
        </div>

        {/* Badge */}
        <div style={{ fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: 20 }}>
          75MG CAFFEINE
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 'calc(100vh - 80px)', padding: '1rem 2rem 3rem' }}>

        {/* ── Product image ── */}
        <div ref={imgRef} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: 900, position: 'relative' }}>

          {/* Glow blob behind image */}
          <div style={{
            position: 'absolute',
            width: 'clamp(300px,55vw,600px)',
            height: 'clamp(300px,55vw,600px)',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${fl.light} 0%, transparent 65%)`,
            filter: 'blur(60px)',
            pointerEvents: 'none',
            animation: 'zafGlow 3s ease-in-out infinite',
          }} />

          {/* Product image — actual img tag, no Next Image needed */}
          <div style={{
            position: 'relative',
            zIndex: 2,
            animation: 'zafFloat 4s ease-in-out infinite',
            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.5))',
          }}>
            <img
              src={fl.img}
              alt={fl.name}
              style={{
                width: 'clamp(280px,48vw,520px)',
                height: 'clamp(280px,48vw,520px)',
                objectFit: 'contain',
                borderRadius: 16,
              }}
            />
          </div>
        </div>

        {/* ── Product name + details ── */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1
            ref={nameRef}
            style={{
              fontFamily: "'Orbitron',sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.5rem,9vw,7rem)',
              color: '#fff',
              margin: '0 0 0.5rem',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              textShadow: `0 0 60px ${fl.light}, 0 4px 30px rgba(0,0,0,0.4)`,
            }}
          >
            {fl.name}
          </h1>
          <p style={{ fontFamily: 'monospace', fontSize: 'clamp(10px,1.5vw,13px)', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.4em', margin: '0 0 0.4rem' }}>
            20 ENERGY POUCHES
          </p>
          <p style={{ fontFamily: 'monospace', fontSize: 'clamp(9px,1.2vw,11px)', color: 'rgba(255,255,255,0.38)', letterSpacing: '0.3em', margin: 0 }}>
            NO TOBACCO · NO NICOTINE · {fl.sub.toUpperCase()}
          </p>
        </div>

        {/* ── Arrow + dot navigation ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {/* Prev */}
          <button
            onClick={() => handleArrow(-1)}
            style={{ width: 42, height: 42, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, transition: 'all 0.2s' }}
            onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.18)')}
            onMouseOut={e  => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
          >‹</button>

          {/* Dots */}
          <div ref={dotRef} style={{ display: 'flex', gap: 8 }}>
            {FLAVOURS.map((f, i) => (
              <button
                key={i}
                onClick={() => handleDot(i)}
                style={{
                  width: i === active ? 28 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === active ? '#fff' : 'rgba(255,255,255,0.3)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.35s cubic-bezier(.23,1,.32,1)',
                }}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={() => handleArrow(1)}
            style={{ width: 42, height: 42, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, transition: 'all 0.2s' }}
            onMouseOver={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.18)')}
            onMouseOut={e  => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
          >›</button>
        </div>

        {/* ── Flavour thumbnails ── */}
        <div style={{ display: 'flex', gap: 10, marginTop: '1.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {FLAVOURS.map((f, i) => (
            <button
              key={i}
              onClick={() => handleDot(i)}
              style={{
                width: 56, height: 56,
                borderRadius: 10,
                overflow: 'hidden',
                border: i === active ? '2px solid #fff' : '2px solid transparent',
                padding: 0,
                cursor: 'pointer',
                opacity: i === active ? 1 : 0.5,
                transition: 'all 0.3s ease',
                transform: i === active ? 'scale(1.12)' : 'scale(1)',
              }}
              onMouseOver={e => { if (i !== active) e.currentTarget.style.opacity = '0.8' }}
              onMouseOut={e  => { if (i !== active) e.currentTarget.style.opacity = '0.5' }}
            >
              <img src={f.img} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>

      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes zafFloat {
          0%,100% { transform: translateY(0px) rotate(-1deg); }
          50%      { transform: translateY(-18px) rotate(1deg); }
        }
        @keyframes zafGlow {
          0%,100% { transform: scale(1); opacity: 0.7; }
          50%      { transform: scale(1.15); opacity: 1; }
        }
      `}</style>
    </section>
  )
}
