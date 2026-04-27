'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AgeGate from '../components/AgeGate'
import AboutSection from '../components/AboutSection'
import FindUsSection from '../components/FindUsSection'
import { BRANDS, type Product } from '../lib/data'
import Footer from '../components/Footer'


const FRAMES   = 169
const getFrame = (i: number) => `/harbourbridge/ezgif-frame-${String(i+1).padStart(3,'0')}.webp`




/* ─── App ────────────────────────────────────────────────────── */
export default function Home() {
  const [ageOk, setAgeOk] = useState(false)

  if (!ageOk) return <AgeGate onConfirm={() => setAgeOk(true)} />
  return (
    <main style={{ background:'#000', margin:0, padding:0 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700;900&display=swap');

        * { font-family: 'Aharoni', 'Arial Black', Arial, sans-serif; box-sizing:border-box; }
        :root { --font-aharoni: 'Aharoni', 'Exo 2', 'Arial Black', sans-serif; }
        html { scroll-behavior: smooth; }

        @keyframes pulse { 0%,100%{opacity:0.3} 50%{opacity:1} }
        @keyframes blob1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(18px,-10px) scale(1.08)} 66%{transform:translate(-10px,8px) scale(0.95)} }
        @keyframes blob2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-14px,12px) scale(1.05)} 66%{transform:translate(10px,-8px) scale(0.97)} }
        @keyframes blob3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(8px,10px) scale(1.1)} }
        @keyframes navReveal { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatOrb1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(60px,-40px) scale(1.15)} 66%{transform:translate(-30px,30px) scale(0.9)} }
        @keyframes floatOrb2 { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(-80px,50px) scale(1.2)} 70%{transform:translate(40px,-20px) scale(0.85)} }
        @keyframes liq1 { 0%,100%{transform:translate(0,0) scale(1)} 30%{transform:translate(22px,-18px) scale(1.2)} 65%{transform:translate(-14px,12px) scale(0.85)} }
        @keyframes liq2 { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(-20px,22px) scale(1.15)} 75%{transform:translate(16px,-10px) scale(0.9)} }
        @keyframes liq3 { 0%,100%{transform:translate(0,0) scale(1)} 55%{transform:translate(10px,18px) scale(1.1)} }
        @keyframes liq4 { 0%,100%{transform:translate(0,0) scale(1)} 45%{transform:translate(-8px,-14px) scale(1.18)} }
        @keyframes cardIn { from{opacity:0;transform:translateY(28px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes modalIn { from{opacity:0;transform:scale(0.94) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes rippleOut { 0%{transform:scale(0);opacity:0.6} 100%{transform:scale(5);opacity:0} }
        @keyframes heroFadeIn { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes chevronFade { 0%,100%{opacity:0;transform:translateY(-4px)} 50%{opacity:0.8;transform:translateY(2px)} }

        /* Nav */
        .nav-link { font-family:'Aharoni','Arial Black',sans-serif; font-size:clamp(8px,1vw,10px); letter-spacing:0.3em; color:rgba(240,237,230,0.5); text-decoration:none; font-weight:700; transition:color 0.25s; white-space:nowrap; position:relative; z-index:3; }
        .nav-link:hover { color:#B8E8EE; }
        .nav-dot { width:3px;height:3px;border-radius:50%;background:rgba(0,229,255,0.35);flex-shrink:0;position:relative;z-index:3; }

        /* Glass card */
        .gc { position:relative; width:220px; min-height:310px; flex-shrink:0; border-radius:20px; overflow:hidden; cursor:pointer; border:1px solid rgba(255,255,255,0.18); transition:transform 0.4s cubic-bezier(.23,1,.32,1), box-shadow 0.4s ease, border-color 0.4s ease; }
        .gc:hover { transform:translateY(-12px) scale(1.025); box-shadow:0 30px 70px rgba(0,0,0,0.55),0 0 0 1px rgba(142,207,216,0.25),0 0 40px rgba(142,207,216,0.08),inset 0 1px 0 rgba(255,255,255,0.25); border-color:rgba(142,207,216,0.3); }
        .gc-blob { position:absolute; border-radius:50%; pointer-events:none; transition:filter 0.5s ease, opacity 0.5s ease; }
        .gc:hover .gc-blob { filter:blur(10px) brightness(1.8) !important; opacity:0.9 !important; }
        .gc-light { position:absolute; width:160px; height:160px; border-radius:50%; background:radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 65%); pointer-events:none; transform:translate(-50%,-50%); transition:opacity 0.3s ease; opacity:0; z-index:3; }
        .gc:hover .gc-light { opacity:1; }
        .gc-glass { position:absolute; inset:0; background:rgba(5,5,15,0.38); backdrop-filter:blur(22px) saturate(160%); -webkit-backdrop-filter:blur(22px) saturate(160%); z-index:1; }
        .gc-sheen { position:absolute; top:0; left:8%; right:8%; height:1px; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent); z-index:4; opacity:0.6; transition:opacity 0.3s; }
        .gc:hover .gc-sheen { opacity:1; }
        .gc-edge { position:absolute; left:0; top:10%; bottom:10%; width:1px; background:linear-gradient(to bottom,transparent,rgba(255,255,255,0.2),transparent); z-index:4; }
        .gc-content { position:relative; z-index:5; padding:1.4rem 1.3rem 1.3rem; display:flex; flex-direction:column; min-height:310px; gap:0.55rem; }
        .gc-btn { margin-top:auto; padding:0.6rem 0; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.15); border-radius:8px; color:rgba(255,255,255,0.65); font-family:'Aharoni','Arial Black',sans-serif; font-size:9px; letter-spacing:0.3em; font-weight:700; cursor:pointer; transition:all 0.3s ease; width:100%; backdrop-filter:blur(4px); }
        .gc:hover .gc-btn { background:rgba(142,207,216,0.08); border-color:rgba(142,207,216,0.4); color:#B8E8EE; box-shadow:0 0 20px rgba(142,207,216,0.1); }
        .gc-quickview { opacity:0; transform:translateY(4px); transition:opacity 0.3s ease, transform 0.3s ease; }
        .gc:hover .gc-quickview { opacity:1; transform:translateY(0); }
        .cards-row::-webkit-scrollbar{display:none}
        .cards-row{-ms-overflow-style:none;scrollbar-width:none}

        /* Brand tabs */
        .brand-tab { font-family:'Aharoni','Arial Black',sans-serif; font-size:0.8rem; letter-spacing:0.25em; font-weight:900; color:rgba(255,255,255,0.45); background:transparent; border:none; border-bottom:2px solid transparent; outline:none; cursor:pointer; padding:0.5rem 0; transition:all 0.25s; }
        .brand-tab.active { color:#F0EDE6; border-bottom-color:#B8E8EE; }
        .brand-tab:hover { color:rgba(255,255,255,0.8); }

        /* Modal */
        .modal-bg { position:fixed;inset:0; background:rgba(0,0,0,0.8); backdrop-filter:blur(10px); z-index:1000; display:flex;align-items:center;justify-content:center; padding:1.5rem; }
        .modal-box { position:relative; background:rgba(6,6,16,0.92); border:1px solid rgba(0,229,255,0.2); border-radius:18px; max-width:560px;width:100%;max-height:82vh; overflow-y:auto; padding:2.2rem; animation:modalIn 0.28s cubic-bezier(.23,1,.32,1) both; box-shadow:0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,229,255,0.1), inset 0 1px 0 rgba(255,255,255,0.08); }
        .modal-box::-webkit-scrollbar{width:3px}
        .modal-box::-webkit-scrollbar-track{background:transparent}
        .modal-box::-webkit-scrollbar-thumb{background:rgba(0,229,255,0.25);border-radius:2px}
        .fpill { font-family:monospace;font-size:10px;padding:4px 10px; color:rgba(255,255,255,0.85);letter-spacing:0.05em; transition:background 0.2s,border-color 0.2s; cursor:default;border-radius:5px; }
        .fpill:hover{background:rgba(0,229,255,0.18)!important;color:#fff;}

        /* Ripple */
        .ripple-el { position:absolute; width:30px;height:30px; border-radius:50%; background:rgba(0,229,255,0.35); transform:translate(-50%,-50%) scale(0); animation:rippleOut 0.65s ease forwards; pointer-events:none; z-index:10; }

        /* ═══ MOBILE-FIRST RESPONSIVE ═══ */
        .products-wrapper { margin-top:0; position:relative; z-index:10; }
        @media (min-width:768px) {
          .products-wrapper { margin-top:-100vh; }
        }
        @media (hover:none) {
          .gc-quickview { opacity:1 !important; transform:translateY(0) !important; }
          .gc-btn { background:rgba(0,229,255,0.1); border-color:rgba(142,207,216,0.3); color:#B8E8EE; }
          .gc:hover { transform:none; }
          .gc:active { transform:scale(0.97); }
        }
        .gc { width:82vw; min-height:265px; }
        .gc-content { padding:1rem 0.9rem 0.9rem; min-height:265px; }
        .cards-row { padding:0.7rem 1rem 2rem !important; margin-left:-1rem !important; margin-right:-1rem !important; gap:0.75rem !important; }
        .brand-tab { font-size:0.6rem; letter-spacing:0.1em; padding:0.32rem 0; }
        .modal-bg { padding:0 !important; align-items:flex-end !important; }
        .modal-box { padding:1.3rem; max-height:92vh; border-radius:22px 22px 0 0 !important; width:100% !important; max-width:100% !important; }
        .nav-desktop-links { display:none !important; }
        .nav-hamburger { display:flex !important; }
        @media (min-width:480px) {
          .gc { width:72vw; min-height:280px; }
          .gc-content { padding:1.1rem 1rem 1rem; min-height:280px; }
          .brand-tab { font-size:0.64rem; }
        }
        @media (min-width:600px) {
          .nav-desktop-links { display:flex !important; }
          .nav-hamburger { display:none !important; }
          .gc { width:54vw; }
          .cards-row { padding:0.8rem 1.4rem 2rem !important; margin-left:-1.4rem !important; margin-right:-1.4rem !important; gap:1rem !important; }
          .modal-bg { padding:1.2rem !important; align-items:center !important; }
          .modal-box { padding:1.8rem; max-height:85vh; border-radius:18px !important; max-width:540px !important; }
        }
        @media (min-width:768px) {
          .gc { width:42vw; }
          .modal-box { padding:2rem; max-width:560px !important; }
          .brand-tab { font-size:0.74rem; letter-spacing:0.2em; }
        }
        @media (min-width:1024px) {
          .gc { width:220px; min-height:310px; }
          .gc-content { padding:1.4rem 1.3rem 1.3rem; min-height:310px; }
          .cards-row { padding:0.8rem 2rem 2rem !important; margin-left:-2rem !important; margin-right:-2rem !important; gap:1.1rem !important; }
          .brand-tab { font-size:0.8rem; letter-spacing:0.25em; }
        }
      `}</style>

      <LiquidNav />
      <HarbourScroll />
      <ProductsSection />
      <ZAFSection />
      <AboutSection />
      <FindUsSection />
      <Footer />
    </main>
  )
}
function LiquidNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop nav */}
      <nav style={{ position:'fixed', top:'1.2rem', left:'1.2rem', zIndex:100, animation:'navReveal 0.8s ease 0.3s both' }}>
        <div style={{ position:'relative', display:'flex', alignItems:'center', gap:'1.2rem', padding:'0.7rem 1.4rem', borderRadius:'100px', border:'1px solid rgba(0,229,255,0.18)', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.55)', backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)', borderRadius:'100px', zIndex:0 }} />
          <div style={{ position:'absolute', width:80, height:80, borderRadius:'50%', background:'radial-gradient(circle,rgba(0,229,255,0.35) 0%,transparent 70%)', top:'-20px', left:'-10px', animation:'blob1 6s ease-in-out infinite', filter:'blur(4px)', zIndex:1 }} />
          <div style={{ position:'absolute', width:70, height:70, borderRadius:'50%', background:'radial-gradient(circle,rgba(191,0,255,0.28) 0%,transparent 70%)', top:'-15px', right:'20px', animation:'blob2 7s ease-in-out infinite', filter:'blur(4px)', zIndex:1 }} />
          <div style={{ position:'absolute', width:50, height:50, borderRadius:'50%', background:'radial-gradient(circle,rgba(0,229,255,0.18) 0%,transparent 70%)', bottom:'-10px', left:'40%', animation:'blob3 5s ease-in-out infinite', filter:'blur(3px)', zIndex:1 }} />
          <div style={{ position:'absolute', top:0, left:'10%', right:'10%', height:1, background:'linear-gradient(90deg,transparent,rgba(0,229,255,0.45),transparent)', zIndex:2 }} />
          <div style={{ position:'relative', zIndex:3, display:'flex', alignItems:'center', gap:'1.2rem' }}>
            <div style={{ display:'flex', flexDirection:'column', lineHeight:1.15 }}>
              <span style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontWeight:900, fontSize:'clamp(7px,0.9vw,9px)', letterSpacing:'0.25em', color:'rgba(255,255,255,0.9)', whiteSpace:'nowrap' }}>BIRKENHEAD</span>
              <span style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontWeight:700, fontSize:'clamp(6px,0.75vw,8px)', letterSpacing:'0.35em', color:'#8ECFD8', whiteSpace:'nowrap' }}>VAPE SHOP</span>
            </div>
            {/* Desktop links — hidden on mobile */}
            <div style={{ display:'flex', alignItems:'center', gap:'1.2rem' }} className="nav-desktop-links">
              <div style={{ width:1, height:22, background:'rgba(255,255,255,0.1)', flexShrink:0 }} />
              <a href="#products" className="nav-link">PRODUCTS</a>
              <span className="nav-dot" />
              <a href="#find-us" className="nav-link">FIND US</a>
            </div>
            {/* Hamburger — shown on mobile */}
            <button onClick={() => setOpen(o => !o)} className="nav-hamburger" aria-label="Menu"
              style={{ background:'none', border:'none', cursor:'pointer', padding:4, display:'flex', flexDirection:'column', gap:4, zIndex:3, position:'relative' }}>
              <span style={{ display:'block', width:18, height:1.5, background:'#B8E8EE', borderRadius:2, transition:'transform 0.25s, opacity 0.25s', transform: open ? 'rotate(45deg) translate(4px,4px)' : 'none' }} />
              <span style={{ display:'block', width:14, height:1.5, background:'#B8E8EE', borderRadius:2, opacity: open ? 0 : 1, transition:'opacity 0.25s' }} />
              <span style={{ display:'block', width:18, height:1.5, background:'#B8E8EE', borderRadius:2, transition:'transform 0.25s', transform: open ? 'rotate(-45deg) translate(4px,-4px)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {open && (
        <div style={{ position:'fixed', top:'4.5rem', left:'1.2rem', zIndex:99, background:'rgba(0,0,0,0.9)', backdropFilter:'blur(20px)', border:'1px solid rgba(0,229,255,0.2)', borderRadius:12, padding:'1.2rem 1.5rem', display:'flex', flexDirection:'column', gap:'1rem', animation:'navReveal 0.2s ease both' }}>
          <a href="#products" className="nav-link" onClick={() => setOpen(false)} style={{ fontSize:11, letterSpacing:'0.4em' }}>PRODUCTS</a>
          <div style={{ height:1, background:'rgba(255,255,255,0.08)' }} />
          <a href="#find-us"  className="nav-link" onClick={() => setOpen(false)} style={{ fontSize:11, letterSpacing:'0.4em' }}>FIND US</a>
          <div style={{ height:1, background:'rgba(255,255,255,0.08)' }} />
          <a href="https://wa.me/64223286322" target="_blank" rel="noopener noreferrer" style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:11, letterSpacing:'0.3em', color:'#25D366', textDecoration:'none' }}>WHATSAPP ↗</a>
        </div>
      )}

      <style>{`
        .nav-desktop-links { display:none !important; }
        .nav-hamburger { display:flex !important; }
        @media (min-width:600px) {
          .nav-desktop-links { display:flex !important; }
          .nav-hamburger { display:none !important; }
        }
      `}</style>
    </>
  )
}


/* ─── Page 1: Harbour Bridge — Cinematic Scroll ──────────────── */
/* ─── Page 1: Harbour Bridge — Cinematic Scroll ──────────────── */
function HarbourScroll() {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loadPct, setLoadPct] = useState(0)
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  // Hook 1: detect mobile
  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent))
  }, [])

  // Hook 2: desktop frame animation (guarded — skips on mobile)
  useEffect(() => {
    if (isMobile !== false) return // skip on mobile AND on null (not yet detected)

    gsap.registerPlugin(ScrollTrigger)
    const wrap   = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })!
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width  = window.innerWidth  * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width  = window.innerWidth  + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
    }
    resize()
    window.addEventListener('resize', resize)

    let lastW = 0, lastH = 0, lastIW = 0
    let cScale = 1, cX = 0, cY = 0
    const draw = (img: HTMLImageElement) => {
      if (!img?.complete || !img.naturalWidth) return
      const cw = window.innerWidth, ch = window.innerHeight
      if (cw !== lastW || ch !== lastH || img.naturalWidth !== lastIW) {
        cScale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
        cX = (cw - img.naturalWidth  * cScale) / 2
        cY = (ch - img.naturalHeight * cScale) / 2
        lastW = cw; lastH = ch; lastIW = img.naturalWidth
      }
      ctx.drawImage(img, cX, cY, img.naturalWidth * cScale, img.naturalHeight * cScale)
    }

    const imgs: HTMLImageElement[] = new Array(FRAMES)
    let loadCount = 0
    for (let i = 0; i < FRAMES; i++) {
      const img = new Image()
      img.decoding = 'async'
      img.onload = () => {
        img.decode?.().catch(() => {})
        loadCount++
        setLoadPct(Math.round((loadCount / FRAMES) * 100))
        if (i === 0) draw(img)
      }
      img.src = getFrame(i)
      imgs[i] = img
    }

    const nearestLoaded = (n: number) => {
      const ni = Math.round(n)
      if (imgs[ni]?.complete) return ni
      for (let r = 1; r < FRAMES; r++) {
        if (ni - r >= 0     && imgs[ni - r]?.complete) return ni - r
        if (ni + r < FRAMES && imgs[ni + r]?.complete) return ni + r
      }
      return 0
    }

    let targetFrame  = 0
    let currentFrame = 0
    let rafId = 0
    let lastDrawn = -1

    const rafLoop = () => {
      currentFrame += (targetFrame - currentFrame) * 0.12
      const fi = nearestLoaded(currentFrame)
      if (fi !== lastDrawn) { draw(imgs[fi]); lastDrawn = fi }
      rafId = requestAnimationFrame(rafLoop)
    }
    rafId = requestAnimationFrame(rafLoop)

    const hero    = document.getElementById('hero')
    const hint    = document.getElementById('hint')
    const endText = document.getElementById('end-text')

    ScrollTrigger.normalizeScroll(false)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        start:   'top top',
        end:     () => `+=${window.innerHeight * 3}`,
        scrub:   true,
        onUpdate: (self) => { targetFrame = self.progress * (FRAMES - 1) },
      },
    })

    tl.to({}, { duration: 100 })
    if (hero) tl.to(hero, { opacity: 0, y: -60, ease: 'none', duration: 20 }, 0)
    if (hint) tl.to(hint, { opacity: 0, ease: 'none', duration: 12 }, 0)
    if (endText) {
      gsap.set(endText, { opacity: 0, y: 30 })
      tl.fromTo(endText, { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: 'none', duration: 15 }, 80)
    }

    const brandReveals = [
      { name: 'WOTOFO',  start: 22, end: 40, side: 'left'  },
      { name: 'INMOOD',  start: 40, end: 58, side: 'right' },
      { name: 'SLAPPLE', start: 58, end: 76, side: 'left'  },
      { name: 'CLOUDYS', start: 76, end: 90, side: 'right' },
    ]
    brandReveals.forEach(({ name, start, end, side }) => {
      const el = document.getElementById(`brand-reveal-${name}`)
      if (!el) return
      const xIn = side === 'left' ? -30 : 30
      tl.fromTo(el, { opacity: 0, x: xIn }, { opacity: 1, x: 0,  ease: 'none', duration: 5 }, start)
      tl.to(el,     { opacity: 0, x: xIn,   ease: 'none', duration: 5 }, end - 5)
    })

    // Store the trigger for cleanup
    const myTrigger = tl.scrollTrigger

    return () => {
      cancelAnimationFrame(rafId)
      if (myTrigger) myTrigger.kill()
      tl.kill()
      window.removeEventListener('resize', resize)
    }
  }, [isMobile])

  // ── Loading state ──
  if (isMobile === null) return <div style={{ height:'100vh', background:'#000' }} />

  // ── MOBILE RENDER ──
  if (isMobile) {
    return (
      <div style={{ height:'100vh', position:'relative', background:'#000', overflow:'hidden' }}>
        <img src={getFrame(0)} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', opacity:0.5 }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8))' }} />
        <div style={{ position:'absolute', width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle,rgba(142,207,216,0.06) 0%,transparent 70%)', top:'-5%', right:'-5%', filter:'blur(40px)', pointerEvents:'none', animation:'floatOrb1 16s ease-in-out infinite' }} />
        <div style={{ position:'absolute', width:250, height:250, borderRadius:'50%', background:'radial-gradient(circle,rgba(184,160,208,0.05) 0%,transparent 70%)', bottom:'10%', left:'-5%', filter:'blur(40px)', pointerEvents:'none', animation:'floatOrb2 20s ease-in-out infinite' }} />
        <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', zIndex:2, padding:'0 1.5rem', textAlign:'center' }}>
          <p style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", color:'#8ECFD8', fontSize:9, letterSpacing:'0.5em', marginBottom:16 }}>// Birkenhead, Auckland — Est. 2024</p>
          <h1 style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontWeight:900, lineHeight:1, margin:0 }}>
            <span style={{ display:'block', fontSize:'clamp(2rem,10vw,4rem)', color:'#FFFFFF' }}>BIRKENHEAD</span>
            <span style={{ display:'block', fontSize:'clamp(2.8rem,14vw,6rem)', color:'#00E5FF' }}>VAPE</span>
            <span style={{ display:'block', fontSize:'clamp(2rem,10vw,4rem)', color:'#BF00FF' }}>SHOP</span>
          </h1>
          <p style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", color:'#FFFFFF', fontSize:10, letterSpacing:'0.4em', marginTop:20 }}>THE CLOUD HAS LANDED</p>
          <div style={{ display:'flex', gap:'0.8rem', marginTop:30, flexWrap:'wrap', justifyContent:'center' }}>
            <a href="#products" style={{ padding:'0.85rem 2rem', border:'1px solid rgba(142,207,216,0.6)', color:'#B8E8EE', fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:'0.65rem', letterSpacing:'0.25em', textDecoration:'none', fontWeight:700 }}>BROWSE PRODUCTS</a>
            <a href="#find-us" style={{ padding:'0.85rem 2rem', border:'1px solid rgba(255,255,255,0.2)', color:'rgba(240,237,230,0.6)', fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:'0.65rem', letterSpacing:'0.25em', textDecoration:'none', fontWeight:700 }}>FIND US</a>
          </div>
        </div>
        <div style={{ position:'absolute', bottom:'2rem', left:'50%', transform:'translateX(-50%)', zIndex:2, textAlign:'center' }}>
          <div style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", color:'rgba(240,237,230,0.25)', fontSize:8, letterSpacing:'0.4em' }}>SCROLL TO EXPLORE</div>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2, marginTop:6 }}>
            {[0,1,2].map(i => (
              <svg key={i} width="14" height="8" viewBox="0 0 16 10" fill="none" style={{ animation:`chevronFade 1.5s ease-in-out ${i*0.2}s infinite`, opacity:0 }}>
                <path d="M1 1L8 8L15 1" stroke="rgba(142,207,216,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── DESKTOP RENDER ──
  return (
    <div ref={wrapRef} style={{ height:'500vh', position:'relative', background:'#000' }}>
      {loadPct < 100 && (
        <div style={{ position:'fixed', top:0, left:0, right:0, zIndex:200, height:2, background:'rgba(0,0,0,0.4)' }}>
          <div style={{ height:'100%', width:`${loadPct}%`, background:'linear-gradient(90deg,#8ECFD8,#B8A0D0)', transition:'width 0.12s ease' }} />
        </div>
      )}
      <div style={{ position:'sticky', top:0, height:'100vh', overflow:'hidden' }}>
        <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} />
        <div id="hero" style={{ position:'absolute', inset:0, zIndex:4, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'0 1.5rem', pointerEvents:'none' }}>
          <p style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", color:'#8ECFD8', fontSize:'clamp(9px,2vw,11px)', letterSpacing:'0.5em', marginBottom:16 }}>// Birkenhead, Auckland — Est. 2024</p>
          <h1 style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontWeight:900, lineHeight:1, margin:0 }}>
            <span style={{ display:'block', fontSize:'clamp(1.8rem,7vw,6rem)', color:'#FFFFFF' }}>BIRKENHEAD</span>
            <span style={{ display:'block', fontSize:'clamp(2.5rem,11vw,9rem)', color:'#00E5FF' }}>VAPE</span>
            <span style={{ display:'block', fontSize:'clamp(1.8rem,7vw,6rem)', color:'#BF00FF' }}>SHOP</span>
          </h1>
        </div>
        {[
          { name: 'WOTOFO',  sub: '25,000 PUFFS',   color: '#00E5FF', side: 'left'  },
          { name: 'INMOOD',  sub: 'SWITCH · PRISM',  color: '#BF00FF', side: 'right' },
          { name: 'SLAPPLE', sub: 'E-LIQUID 120ML',  color: '#39d353', side: 'left'  },
          { name: 'CLOUDYS', sub: 'NIC SALT 30ML',   color: '#a78bfa', side: 'right' },
        ].map(b => (
          <div key={b.name} id={`brand-reveal-${b.name}`} style={{
            position:'absolute', ...(b.side === 'left' ? { left:'2.5rem' } : { right:'2.5rem' }),
            top:'50%', transform:'translateY(-50%)', zIndex:4, pointerEvents:'none', opacity:0,
            textAlign: b.side === 'right' ? 'right' : 'left',
          }}>
            <div style={{ width:2, height:36, background:b.color, marginBottom:10, marginLeft: b.side === 'right' ? 'auto' : 0, boxShadow:`0 0 16px ${b.color}cc` }} />
            <p style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:9, letterSpacing:'0.45em', color:b.color, margin:'0 0 8px', opacity:0.75, textShadow:`0 0 20px ${b.color}88` }}>{b.sub}</p>
            <h3 style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontWeight:900, fontSize:'clamp(1.8rem,4.5vw,3.5rem)', color:'#fff', margin:0, lineHeight:1, letterSpacing:'0.04em', textShadow:`0 0 40px ${b.color}80, 0 2px 20px rgba(0,0,0,0.9)` }}>{b.name}</h3>
          </div>
        ))}
        <div id="end-text" style={{ position:'absolute', inset:0, zIndex:4, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'0 1.5rem', pointerEvents:'none', opacity:0 }}>
          <h2 style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontWeight:900, lineHeight:1, margin:0 }}>
            <span style={{ display:'block', fontSize:'clamp(2.5rem,10vw,8rem)', color:'#FFFFFF' }}>THE CLOUD</span>
            <span style={{ display:'block', fontSize:'clamp(2.5rem,10vw,8rem)', color:'#00E5FF' }}>HAS LANDED</span>
          </h2>
          <div style={{ display:'flex', gap:'1rem', marginTop:40, pointerEvents:'auto', flexWrap:'wrap', justifyContent:'center' }}>
            <a href="#products" style={{ padding:'1.2rem 3rem', border:'1px solid #fff', color:'#fff', fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:'clamp(0.7rem,1.8vw,1rem)', letterSpacing:'0.25em', textDecoration:'none', fontWeight:700 }}>PRODUCTS +</a>
            <a href="#find-us"  style={{ padding:'1.2rem 3rem', border:'1px solid #fff', color:'#fff', fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:'clamp(0.7rem,1.8vw,1rem)', letterSpacing:'0.25em', textDecoration:'none', fontWeight:700 }}>FIND US +</a>
          </div>
        </div>
        <div id="hint" style={{ position:'absolute', bottom:'2rem', left:'50%', transform:'translateX(-50%)', zIndex:5, textAlign:'center', pointerEvents:'none', display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
          <div style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", color:'rgba(240,237,230,0.25)', fontSize:8, letterSpacing:'0.4em' }}>SCROLL TO EXPLORE</div>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
            {[0,1,2].map(i => (
              <svg key={i} width="16" height="10" viewBox="0 0 16 10" fill="none" style={{ animation:`chevronFade 1.5s ease-in-out ${i*0.2}s infinite`, opacity:0 }}>
                <path d="M1 1L8 8L15 1" stroke="rgba(142,207,216,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


/* ─── Glass Liquid Card ───────────────────────────────────────── */
function GlassCard({ product, brandColor, index, onOpen }: {
  product: Product; brandColor: string; index: number; onOpen: (p: Product) => void
}) {
  const cardRef  = useRef<HTMLDivElement>(null)
  const lightRef = useRef<HTMLDivElement>(null)
  const glowRef  = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const rafRef   = useRef<number | null>(null)
  const mouseRef = useRef({ x:0, y:0 })
  const rotRef   = useRef({ rx:0, ry:0 })
  const isTouch  = useRef(typeof window !== 'undefined' && window.matchMedia('(hover:none)').matches)

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch.current) return
    const card = cardRef.current
    if (!card) return
    const r  = card.getBoundingClientRect()
    const x  = e.clientX - r.left
    const y  = e.clientY - r.top
    mouseRef.current = { x:(x/r.width-0.5)*2, y:(y/r.height-0.5)*2 }
    if (lightRef.current) { lightRef.current.style.left=`${x}px`; lightRef.current.style.top=`${y}px` }
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(circle at ${(x/r.width*100).toFixed(1)}% ${(y/r.height*100).toFixed(1)}%, ${brandColor}28 0%, transparent 60%)`
    }
  }, [brandColor])

  const onMouseEnter = () => {
    if (isTouch.current) return
    if (lightRef.current) lightRef.current.style.opacity = '1'
    cardRef.current?.querySelectorAll<HTMLDivElement>('.gc-blob').forEach(b => {
      b.style.filter = 'blur(10px) brightness(2.2)'
      b.style.opacity = '1'
    })
    const loop = () => {
      const { x, y } = mouseRef.current
      rotRef.current.rx += (y * 15 - rotRef.current.rx) * 0.1
      rotRef.current.ry += (x * 15 - rotRef.current.ry) * 0.1
      if (innerRef.current) {
        innerRef.current.style.transform = `perspective(700px) rotateX(${-rotRef.current.rx}deg) rotateY(${rotRef.current.ry}deg) scale3d(1.04,1.04,1.04)`
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(loop)
  }

  const onMouseLeave = () => {
    if (isTouch.current) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (lightRef.current) lightRef.current.style.opacity = '0'
    if (glowRef.current)  glowRef.current.style.background = 'transparent'
    mouseRef.current = { x:0, y:0 }
    cardRef.current?.querySelectorAll<HTMLDivElement>('.gc-blob').forEach(b => {
      b.style.filter = ''; b.style.opacity = ''
    })
    const spring = () => {
      rotRef.current.rx += (0 - rotRef.current.rx) * 0.1
      rotRef.current.ry += (0 - rotRef.current.ry) * 0.1
      if (innerRef.current) innerRef.current.style.transform = `perspective(700px) rotateX(${-rotRef.current.rx}deg) rotateY(${rotRef.current.ry}deg) scale3d(1,1,1)`
      if (Math.abs(rotRef.current.rx) > 0.01 || Math.abs(rotRef.current.ry) > 0.01) rafRef.current = requestAnimationFrame(spring)
      else { rotRef.current={rx:0,ry:0}; if(innerRef.current) innerRef.current.style.transform='none' }
    }
    rafRef.current = requestAnimationFrame(spring)
  }

  // Touch — tap ripple + pop + open modal
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const t = e.touches[0]
    const r = card.getBoundingClientRect()
    // Liquid glow burst at touch point
    if (glowRef.current) {
      const x = ((t.clientX - r.left) / r.width * 100).toFixed(1)
      const y = ((t.clientY - r.top)  / r.height * 100).toFixed(1)
      glowRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, ${brandColor}35 0%, transparent 65%)`
      setTimeout(() => { if (glowRef.current) glowRef.current.style.background = 'transparent' }, 400)
    }
    // Ripple
    const rip = document.createElement('div')
    rip.className = 'ripple-el'
    rip.style.left = `${t.clientX - r.left}px`
    rip.style.top  = `${t.clientY - r.top}px`
    card.appendChild(rip)
    setTimeout(() => rip.remove(), 700)
    // Scale pop
    gsap.fromTo(innerRef.current, { scale:0.97 }, { scale:1.03, duration:0.15, ease:'power2.out', yoyo:true, repeat:1 })
  }

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const r = card.getBoundingClientRect()
    const rip = document.createElement('div')
    rip.className = 'ripple-el'
    rip.style.left = `${e.clientX-r.left}px`
    rip.style.top  = `${e.clientY-r.top}px`
    card.appendChild(rip)
    setTimeout(() => rip.remove(), 700)
    gsap.fromTo(innerRef.current, { scale:0.96 }, { scale:1.04, duration:0.12, ease:'power2.out', yoyo:true, repeat:1 })
    onOpen(product)
  }

  const d1=[5.5,7,6,8,5,7.5,6.5,8.5,5.8,7.2,6.2,8.2,5.3][index%13]
  const d2=[7,5.5,8,6,7.5,5,8.5,6.5,7.2,5.8,8.2,6.2,7.8][index%13]
  const d3=[6,8,5.5,7,6.5,8.5,5,7.5,6.2,8.2,5.3,7.2,6.8][index%13]
  const d4=[8,6,7,5.5,8.5,6.5,7.5,5,8.2,6.2,7.2,5.3,8.8][index%13]

  return (
    <div ref={cardRef} className="gc" style={{ transformStyle:'preserve-3d', scrollSnapAlign:'start' }}
      onMouseMove={onMouseMove} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart} onClick={onClick}>

      {/* Dynamic glow follows cursor */}
      <div ref={glowRef} style={{ position:'absolute', inset:0, zIndex:0, borderRadius:20, pointerEvents:'none', transition:'background 0.08s ease' }} />

      {/* Liquid blobs */}
      <div className="gc-blob" style={{ width:130,height:130, background:`radial-gradient(circle,${brandColor}50 0%,transparent 65%)`, top:-35,left:-25, animation:`liq1 ${d1}s ease-in-out infinite`, filter:'blur(16px)', opacity:0.7, zIndex:0 }} />
      <div className="gc-blob" style={{ width:110,height:110, background:'radial-gradient(circle,rgba(191,0,255,0.45) 0%,transparent 65%)', bottom:-20,right:-20, animation:`liq2 ${d2}s ease-in-out infinite`, filter:'blur(14px)', opacity:0.65, zIndex:0 }} />
      <div className="gc-blob" style={{ width:80, height:80,  background:'radial-gradient(circle,rgba(0,229,255,0.3) 0%,transparent 65%)', top:'40%',left:'30%', animation:`liq3 ${d3}s ease-in-out infinite`, filter:'blur(12px)', opacity:0.5, zIndex:0 }} />
      <div className="gc-blob" style={{ width:60, height:60,  background:`radial-gradient(circle,${product.badgeColor}40 0%,transparent 65%)`, top:'15%',right:'10%', animation:`liq4 ${d4}s ease-in-out infinite`, filter:'blur(10px)', opacity:0.45, zIndex:0 }} />

      <div className="gc-glass" />
      <div ref={lightRef} className="gc-light" style={{ opacity:0, transition:'opacity 0.3s' }} />
      <div className="gc-sheen" />
      <div className="gc-edge" />

      {/* 3D tilt inner wrapper */}
      <div ref={innerRef} style={{ position:'relative', zIndex:5, transformStyle:'preserve-3d', willChange:'transform' }}>
        <div className="gc-content">
          {/* Badge + flavour count + flavour colour tag */}
          <div style={{ display:'flex', alignItems:'center', gap:7, flexWrap:'wrap' }}>
            <span style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:8, letterSpacing:'0.22em', padding:'3px 9px', color:product.badgeColor, background:product.badgeColor+'1a', border:`1px solid ${product.badgeColor}40`, borderRadius:4 }}>{product.badge}</span>
            {product.flavours.length > 0 && <span style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:8, color:'rgba(255,255,255,0.55)', letterSpacing:'0.08em' }}>{product.flavours.length} flavours</span>}
            {(() => { const t = getFlavourTag(product.flavours); return t ? <span style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:7, letterSpacing:'0.2em', padding:'2px 7px', color:t.color, background:t.color+'15', border:`1px solid ${t.color}35`, borderRadius:10 }}>{t.label}</span> : null })()}
          </div>
          <h3 style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontWeight:900, fontSize:'clamp(0.62rem,1.1vw,0.76rem)', color:'#fff', lineHeight:1.35, margin:0, textShadow:'0 1px 6px rgba(0,0,0,0.6)' }}>{product.name}</h3>
          <p style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:10, color:'rgba(255,255,255,0.55)', letterSpacing:'0.1em', margin:0 }}>{product.puffs}</p>

          {/* ── Variant sub-cards ── */}
          {product.variants ? (
            <div style={{ display:'flex', flexDirection:'column', gap:5, margin:'4px 0' }}>
              {product.variants.map((v) => (
                <div key={v.strength} style={{
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                  padding:'6px 8px',
                  background:`${v.color}10`,
                  border:`1px solid ${v.color}30`,
                  borderRadius:6,
                  gap:8,
                }}>
                  <div style={{ display:'flex', alignItems:'center', gap:6, flexShrink:0 }}>
                    <div style={{ width:6, height:6, borderRadius:'50%', background:v.color, flexShrink:0, boxShadow:`0 0 6px ${v.color}` }} />
                    <span style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontWeight:900, fontSize:10, color:'#fff', letterSpacing:'0.05em', whiteSpace:'nowrap' }}>{v.strength}</span>
                    <span style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:7, color:`${v.color}cc`, letterSpacing:'0.05em', whiteSpace:'nowrap' }}>{v.nicSalt}</span>
                  </div>
                  <span style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:7, color:'rgba(255,255,255,0.45)', letterSpacing:'0.03em', textAlign:'right', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:90 }}>{v.note}</span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:9, color:'rgba(255,255,255,0.4)', margin:0, lineHeight:1.5 }}>{product.nicotine}</p>
          )}

          {!product.variants && product.note ? <p style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:8, color:'rgba(255,255,255,0.32)', margin:0, fontStyle:'italic', lineHeight:1.4 }}>{product.note}</p> : null}
          <p style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontWeight:900, fontSize:'clamp(1.15rem,2.2vw,1.4rem)', color:brandColor, textShadow:`0 0 24px ${brandColor}70`, margin:'auto 0 0', letterSpacing:'0.04em' }}>{product.price}</p>
          {/* Quick view — top 3 flavours, visible on hover via CSS */}
          {product.flavours.length > 0 && (
            <div className="gc-quickview" style={{ display:'flex', flexWrap:'wrap', gap:4, marginTop:'auto' }}>
              {product.flavours.slice(0,3).map(f => (
                <span key={f} style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:7, padding:'2px 7px', color:'rgba(255,255,255,0.6)', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:10, whiteSpace:'nowrap' }}>{f}</span>
              ))}
              {product.flavours.length > 3 && <span style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:7, padding:'2px 7px', color:'rgba(255,255,255,0.3)', background:'transparent', borderRadius:10 }}>+{product.flavours.length-3} more</span>}
            </div>
          )}

          <button className="gc-btn">EXPLORE +</button>
        </div>
      </div>
    </div>
  )
}

/* ─── Product Modal ──────────────────────────────────────────── */
function ProductModal({ product, brandColor, onClose }: { product: Product; brandColor: string; onClose: () => void }) {
  const [showAll, setShowAll] = useState(false)
  const PREVIEW = 18

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key==='Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position:'absolute', top:14, right:14, width:30, height:30, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.15)', color:'rgba(255,255,255,0.6)', fontSize:14, cursor:'pointer', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Aharoni','Arial Black',sans-serif", transition:'all 0.2s' }}>✕</button>

        <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:18 }}>
          <span style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:9, letterSpacing:'0.25em', padding:'3px 10px', color:product.badgeColor, background:product.badgeColor+'1a', border:`1px solid ${product.badgeColor}40`, borderRadius:4 }}>{product.badge}</span>
          <span style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:10, color:'rgba(255,255,255,0.5)', letterSpacing:'0.1em' }}>{product.puffs}</span>
        </div>

        <h2 style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontWeight:900, fontSize:'clamp(1rem,3vw,1.4rem)', color:'#fff', margin:'0 0 0.4rem', lineHeight:1.2 }}>{product.name}</h2>
        <p style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontWeight:900, fontSize:'clamp(1.4rem,4vw,1.9rem)', color:brandColor, textShadow:`0 0 30px ${brandColor}90`, margin:'0 0 1.6rem', letterSpacing:'0.04em' }}>{product.price}</p>

        <div style={{ height:1, background:`linear-gradient(to right,${brandColor}50,transparent)`, marginBottom:'1.4rem' }} />

        <div style={{ marginBottom:'1rem' }}>
          <p style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:9, letterSpacing:'0.35em', color:'rgba(255,255,255,0.35)', textTransform:'uppercase', marginBottom:7 }}>Specifications</p>
          <p style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:11, color:'rgba(255,255,255,0.8)', lineHeight:1.75, margin:0 }}>{product.specs}</p>
        </div>

        <div style={{ marginBottom:'1.4rem' }}>
          <p style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:9, letterSpacing:'0.35em', color:'rgba(255,255,255,0.35)', textTransform:'uppercase', marginBottom:10 }}>Nicotine</p>
          {product.variants ? (
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {product.variants.map(v => (
                <div key={v.strength} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 14px', background:`${v.color}0d`, border:`1px solid ${v.color}30`, borderRadius:8 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <div style={{ width:8, height:8, borderRadius:'50%', background:v.color, boxShadow:`0 0 10px ${v.color}`, flexShrink:0 }} />
                    <div>
                      <p style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontWeight:900, fontSize:13, color:'#fff', margin:0, letterSpacing:'0.05em' }}>{v.strength}</p>
                      <p style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:10, color:v.color, margin:0, letterSpacing:'0.1em' }}>{v.nicSalt}</p>
                    </div>
                  </div>
                  <p style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:10, color:'rgba(255,255,255,0.45)', margin:0, textAlign:'right', letterSpacing:'0.05em' }}>{v.note}</p>
                </div>
              ))}
            </div>
          ) : (
            <>
              <p style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:12, color:'rgba(255,255,255,0.9)', margin:0 }}>{product.nicotine}</p>
              {product.note && <p style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:10, color:'rgba(255,255,255,0.45)', fontStyle:'italic', marginTop:6, marginBottom:0 }}>{product.note}</p>}
            </>
          )}
        </div>

        {product.flavours.length > 0 && (
          <div>
            <div style={{ height:1, background:'rgba(255,255,255,0.07)', marginBottom:'1.4rem' }} />
            <p style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:9, letterSpacing:'0.35em', color:'rgba(255,255,255,0.35)', textTransform:'uppercase', marginBottom:14 }}>Available Flavours — {product.flavours.length} options</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
              {(showAll ? product.flavours : product.flavours.slice(0, PREVIEW)).map(f => (
                <span key={f} className="fpill" style={{ background:brandColor+'10', border:`1px solid ${brandColor}28` }}>{f}</span>
              ))}
              {product.flavours.length > PREVIEW && (
                <button onClick={() => setShowAll(!showAll)} style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:10, padding:'4px 12px', color:'rgba(255,255,255,0.7)', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.2)', cursor:'pointer', borderRadius:5 }}>
                  {showAll ? '▲ show less' : `+${product.flavours.length-PREVIEW} more`}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Flavour Tags ───────────────────────────────────────────── */
const FLAVOUR_TAGS: { keywords: string[]; label: string; color: string }[] = [
  { keywords: ['mint','menthol','spearmint','peppermint','cool','ice','icy','frost'], label: 'MENTHOL', color: '#00e5ff' },
  { keywords: ['tobacco','golden tobacco','nut tobacco','caramel tobacco'],           label: 'TOBACCO', color: '#b8860b' },
  { keywords: ['mango','peach','pineapple','passionfruit','lychee','guava','tropical','kiwi'], label: 'TROPICAL', color: '#f59e0b' },
  { keywords: ['strawberry','blueberry','raspberry','grape','cherry','berry','berries','pomegranate','blackberry','watermelon'], label: 'FRUITY', color: '#e91e8c' },
  { keywords: ['lemon','lime','citrus','sour','orange'],                               label: 'CITRUS',  color: '#84cc16' },
  { keywords: ['vanilla','custard','caramel','banana','cream'],                        label: 'SWEET',   color: '#a78bfa' },
]

function getFlavourTag(flavours: string[]): { label: string; color: string } | null {
  if (!flavours.length) return null
  const all = flavours.join(' ').toLowerCase()
  let best = FLAVOUR_TAGS[3]
  let max  = 0
  for (const tag of FLAVOUR_TAGS) {
    const count = tag.keywords.filter(k => all.includes(k)).length
    if (count > max) { max = count; best = tag }
  }
  return best
}

/* ─── Products Section — horizontal pin scroll ──────────────── */
function ProductsSection() {
  const [activeBrand, setActiveBrand]       = useState(0)
  const [activeCategory, setActiveCategory] = useState<'ALL'|'POD'|'DEVICE'|'STARTER KIT'|'E-LIQUID'|'DISPOSABLE'>('ALL')
  const [search, setSearch]                 = useState('')
  const [modal, setModal]                   = useState<Product | null>(null)
  const pinRef   = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const brand = BRANDS[activeBrand]

  const filtered = brand.products.filter(p => {
    const catMatch = activeCategory === 'ALL' ||
      (activeCategory === 'POD' && (p.badge === 'POD' || p.badge === 'TWIN PACK')) ||
      (activeCategory === 'DISPOSABLE' && p.badge === 'DISPOSABLE') ||
      (activeCategory === 'E-LIQUID' && (p.badge === 'E-LIQUID' || p.badge === 'FREEBASE' || p.badge === 'NIC SALT')) ||
      p.badge === activeCategory
    if (!catMatch) return false
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return p.name.toLowerCase().includes(q) ||
      p.flavours.some(f => f.toLowerCase().includes(q)) ||
      p.nicotine.toLowerCase().includes(q)
  })

  type CatKey = 'ALL'|'POD'|'DEVICE'|'STARTER KIT'|'E-LIQUID'|'DISPOSABLE'
  const cats: Array<{ key: CatKey; label: string }> = [
    { key: 'ALL'         as CatKey, label: `All (${brand.products.length})` },
    { key: 'DISPOSABLE'  as CatKey, label: `Disposables (${brand.products.filter(p=>p.badge==='DISPOSABLE').length})` },
    { key: 'POD'         as CatKey, label: `Pods (${brand.products.filter(p=>p.badge==='POD'||p.badge==='TWIN PACK').length})` },
    { key: 'STARTER KIT' as CatKey, label: `Starter Kits (${brand.products.filter(p=>p.badge==='STARTER KIT').length})` },
    { key: 'DEVICE'      as CatKey, label: `Devices (${brand.products.filter(p=>p.badge==='DEVICE').length})` },
    { key: 'E-LIQUID'    as CatKey, label: `E-Liquid (${brand.products.filter(p=>p.badge==='E-LIQUID'||p.badge==='FREEBASE'||p.badge==='NIC SALT').length})` },
  ].filter(c => c.key === 'ALL' || parseInt(c.label.match(/\d+/)?.[0]||'0') > 0)

  useEffect(() => { setActiveCategory('ALL'); setSearch('') }, [activeBrand])

  // No GSAP pin — use natural scroll for reliability

  return (
    <>
      {modal && <ProductModal product={modal} brandColor={brand.color} onClose={() => setModal(null)} />}

      {/* Outer shell — handles blanket overlap positioning */}
      <div id="products" className="products-wrapper" style={{ position:'relative', zIndex:10 }}>

        {/* Pin target */}
        <div ref={pinRef} style={{ borderRadius:'28px 28px 0 0', background:'#000', position:'relative', overflow:'hidden' }}>

          {/* Video bg + overlays */}
          <video src="/skytower.mp4" autoPlay muted loop playsInline style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', zIndex:0, opacity:0.55 }} />
          <div style={{ position:'absolute', inset:0, zIndex:1, background:'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.7) 100%)' }} />
          <div style={{ position:'absolute', inset:0, zIndex:2, pointerEvents:'none', overflow:'hidden' }}>
            <div style={{ position:'absolute', width:600, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(142,207,216,0.04) 0%,transparent 70%)', top:'-5%', right:'0%', animation:'floatOrb1 16s ease-in-out infinite', filter:'blur(60px)' }} />
            <div style={{ position:'absolute', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(184,160,208,0.04) 0%,transparent 70%)', bottom:'5%', left:'-5%', animation:'floatOrb2 20s ease-in-out infinite', filter:'blur(60px)' }} />
          </div>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg,transparent,rgba(142,207,216,0.6),rgba(184,160,208,0.5),transparent)', zIndex:4 }} />

          {/* Content */}
          <div style={{ position:'relative', zIndex:5, padding:'clamp(3.5rem,6vh,5.5rem) clamp(1rem,3vw,2rem) clamp(1.5rem,3vh,3rem)' }}>

            {/* Heading */}
            <div style={{ maxWidth:960, margin:'0 auto 1.5rem' }}>
              <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:14 }}>
                <div style={{ height:1, width:28, background:'rgba(142,207,216,0.5)' }} />
                <p style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:10, letterSpacing:'0.55em', color:'rgba(240,237,230,0.5)', textTransform:'uppercase', margin:0 }}>02 — Our Products</p>
              </div>
              <h2 className="products-heading" style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontWeight:900, fontSize:'clamp(2rem,6vw,4.5rem)', color:'#fff', lineHeight:1, margin:'0 0 0.6rem', letterSpacing:'-0.02em', textShadow:'0 2px 20px rgba(0,0,0,0.7)' }}>
                What We <span style={{ color:'#8ECFD8', textShadow:'0 0 40px rgba(142,207,216,0.3)' }}>Stock</span>
              </h2>
              <div className="products-warning" style={{ display:'inline-flex', alignItems:'center', gap:10, padding:'6px 14px', border:'1px solid rgba(234,179,8,0.4)', background:'rgba(0,0,0,0.4)', backdropFilter:'blur(8px)', borderRadius:6 }}>
                <span style={{ color:'#fbbf24', fontSize:12 }}>⚠</span>
                <p style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:10, color:'rgba(255,255,255,0.75)', margin:0 }}>Vaping products may contain nicotine · 18+ only</p>
              </div>
            </div>

            {/* Brand tabs */}
            <div className="brand-tabs-row" style={{ maxWidth:960, margin:'0 auto 1rem', display:'flex', gap:'1.4rem', flexWrap:'wrap', alignItems:'center' }}>
              {BRANDS.map((b, i) => (
                <button key={b.name} className={`brand-tab${activeBrand===i?' active':''}`} onClick={() => setActiveBrand(i)}
                  style={{ borderBottom: activeBrand===i ? `2px solid ${b.color}` : '2px solid transparent', color: activeBrand===i ? '#fff' : 'rgba(255,255,255,0.35)', display:'flex', alignItems:'center', gap:8 }}>
                  {b.name}
                  <span style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:10, marginLeft:2, color:'rgba(255,255,255,0.3)' }}>{b.products.length}</span>
                </button>
              ))}
            </div>

            {/* Search + filters */}
            <div style={{ maxWidth:960, margin:'0 auto 1rem', display:'flex', flexDirection:'column', gap:'0.7rem' }}>
              <div style={{ position:'relative', maxWidth:400 }}>
                <svg style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', opacity:0.4, pointerEvents:'none' }} width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="#fff" strokeWidth="2"/>
                  <path d="m21 21-4.35-4.35" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input type="text" placeholder="Search flavour, name or strength..." value={search} onChange={e => setSearch(e.target.value)}
                  style={{ width:'100%', paddingLeft:36, paddingRight:36, paddingTop:9, paddingBottom:9, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.15)', borderRadius:8, color:'#fff', fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:11, letterSpacing:'0.05em', outline:'none', boxSizing:'border-box' }}
                  onFocus={e=>(e.target.style.borderColor='rgba(142,207,216,0.6)')} onBlur={e=>(e.target.style.borderColor='rgba(255,255,255,0.15)')} />
                {search && <button onClick={()=>setSearch('')} style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'rgba(255,255,255,0.4)', cursor:'pointer', fontSize:14, padding:4 }}>✕</button>}
              </div>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                {cats.map(c => (
                  <button key={c.key} onClick={()=>setActiveCategory(c.key)} style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:9, letterSpacing:'0.25em', padding:'5px 14px', borderRadius:20, border:'1px solid', borderColor: activeCategory===c.key ? brand.color : 'rgba(255,255,255,0.15)', background: activeCategory===c.key ? brand.color+'22' : 'rgba(0,0,0,0.3)', color: activeCategory===c.key ? brand.color : 'rgba(255,255,255,0.45)', cursor:'pointer', backdropFilter:'blur(8px)', transition:'all 0.2s' }}>{c.label}</button>
                ))}
              </div>
              <p style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:9, color:'rgba(240,237,230,0.25)', margin:0, letterSpacing:'0.2em' }}>
                {filtered.length} PRODUCT{filtered.length!==1?'S':''}{search ? ` MATCHING "${search.toUpperCase()}"` : ''} — SCROLL TO BROWSE →
              </p>
            </div>

            {/* Cards — horizontal scroll track */}
            <div ref={cardsRef} className="cards-row products-cards" style={{ display:'flex', gap:'1.1rem', padding:'0.5rem 2rem 1.5rem', overflowX:'auto', scrollSnapType:'x mandatory', WebkitOverflowScrolling:'touch' }}>
              <div style={{ flexShrink:0, width:8 }} />
              {filtered.length > 0 ? filtered.map((p,i) => (
                <GlassCard key={p.name} product={p} brandColor={brand.color} index={i} onOpen={setModal} />
              )) : (
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minWidth:300, padding:'3rem', textAlign:'center', gap:12 }}>
                  <p style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:28, color:'rgba(255,255,255,0.1)', margin:0 }}>🔍</p>
                  <p style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:11, color:'rgba(255,255,255,0.35)', letterSpacing:'0.3em', margin:0 }}>NO PRODUCTS FOUND</p>
                  <button onClick={()=>{setSearch('');setActiveCategory('ALL')}} style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:9, letterSpacing:'0.3em', color:'#B8E8EE', background:'none', border:'1px solid rgba(142,207,216,0.3)', padding:'6px 16px', borderRadius:20, cursor:'pointer' }}>CLEAR FILTERS</button>
                </div>
              )}
              <div style={{ flexShrink:0, width:8 }} />
            </div>

            {/* Health warning */}
            <div style={{ maxWidth:960, margin:'1rem auto 0', padding:'0.8rem 1.2rem', background:'rgba(0,0,0,0.5)', backdropFilter:'blur(12px)', border:'1px solid rgba(191,0,255,0.25)', borderRadius:8, display:'flex', gap:14, alignItems:'flex-start' }}>
              <div style={{ width:1, alignSelf:'stretch', minHeight:'2rem', background:'rgba(191,0,255,0.4)', flexShrink:0 }} />
              <p style={{ fontFamily:"'Aharoni','Arial Black',sans-serif", fontSize:10, color:'rgba(255,255,255,0.6)', lineHeight:1.8, margin:0 }}>
                <span style={{ color:'#a78bfa', fontWeight:700, letterSpacing:'0.15em' }}>Important Notice · </span>
                All products sold at Birkenhead Vape Shop are for use by persons aged 18+ only.
                Regulated under the Smokefree Environments and Regulated Products Act 1990.
                Vaping is not without risk. Visit <span style={{ color:'#8ECFD8' }}>health.govt.nz</span> for more information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/* ─── ZAF Data ───────────────────────────────────────────────── */
const ZAF_FLAVOURS = [
  { name:'BLUEBERRY',    accent:'#3a7bd5', tint:'rgba(20,50,120,0.6)',  img:'/zaf/blueberry.png' },
  { name:'PEACH',        accent:'#d4724a', tint:'rgba(120,50,20,0.6)', img:'/zaf/peach.png' },
  { name:'WATERMELON',   accent:'#e74c3c', tint:'rgba(100,10,15,0.6)', img:'/zaf/watermelon.png' },
  { name:'MANGO',        accent:'#f0a500', tint:'rgba(100,60,0,0.6)',  img:'/zaf/mango.png' },
  { name:'GRAPE',        accent:'#8e44ad', tint:'rgba(50,10,90,0.6)',  img:'/zaf/grape.png' },
  { name:'PEPPERMINT',   accent:'#2ecc71', tint:'rgba(10,80,35,0.6)', img:'/zaf/peppermint.png' },
  { name:'CITRUS',       accent:'#e67e22', tint:'rgba(100,45,0,0.6)', img:'/zaf/citrus.png' },
  { name:'BLUEBERRY RASPBERRY', accent:'#e91e8c', tint:'rgba(100,0,60,0.6)', img:'/zaf/blueberry-raspberry.png' },
  { name:'MINT',         accent:'#1abc9c', tint:'rgba(10,70,55,0.6)', img:'/zaf/mint.png' },
  { name:'BERRIES',      accent:'#c0392b', tint:'rgba(90,10,40,0.6)', img:'/zaf/berries.png' },
]



/* ─── ZAF Section — Pinned scroll + autoplay video bg ────────── */
function ZAFSection() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const bgRef   = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  const fl = ZAF_FLAVOURS[current]
  const F  = "'Aharoni','Arial Black',Arial,sans-serif"

  useEffect(() => {
    const mobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    setIsMobile(mobile)
    if (mobile) return

    gsap.registerPlugin(ScrollTrigger)

    // Wait one frame for refs to be attached after render
    const raf = requestAnimationFrame(() => {
      const wrap = wrapRef.current
      if (!wrap) return

      let lastIdx = -1

      const st = ScrollTrigger.create({
        trigger: wrap,
        pin: true,
        start: 'top top',
        end: () => `+=${window.innerHeight * 5}`,
        scrub: 0.3,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(ZAF_FLAVOURS.length - 1, Math.floor(self.progress * ZAF_FLAVOURS.length))
          if (idx !== lastIdx) {
            lastIdx = idx
            setCurrent(idx)
            const nfl = ZAF_FLAVOURS[idx]

            if (bgRef.current) {
              gsap.to(bgRef.current, {
                background: `radial-gradient(ellipse 80% 70% at 60% 55%, ${nfl.tint} 0%, rgba(0,0,0,0.95) 65%, #000 100%)`,
                duration: 0.6, ease: 'power2.inOut',
              })
            }
            if (nameRef.current) {
              gsap.fromTo(nameRef.current,
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' },
              )
            }
          }
        },
      })

      if (bgRef.current) {
        gsap.set(bgRef.current, {
          background: `radial-gradient(ellipse 80% 70% at 60% 55%, ${ZAF_FLAVOURS[0].tint} 0%, rgba(0,0,0,0.95) 65%, #000 100%)`,
        })
      }

      // Store for cleanup
      ;(wrapRef as any)._st = st
    })

    return () => {
      cancelAnimationFrame(raf)
      const st = (wrapRef as any)?._st
      if (st) { st.kill(); (wrapRef as any)._st = null }
    }
  }, [isMobile])

  // ── MOBILE: simple ZAF section ──
  if (isMobile === null) return <div style={{ height:'50vh', background:'#000' }} />
  if (isMobile) {
    return (
      <section id="zaf" style={{ background:'#000', padding:'4rem 1.5rem', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(ellipse 80% 70% at 50% 50%, ${fl.tint} 0%, #000 70%)` }} />
        <div style={{ position:'relative', zIndex:2 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
            <div style={{ width:24, height:2, background:'#c9a96e' }} />
            <p style={{ fontFamily:F, fontSize:9, letterSpacing:'0.5em', color:'rgba(201,169,110,0.7)', margin:0 }}>ZAF — ENERGY POUCHES</p>
          </div>
          <h2 style={{ fontFamily:F, fontWeight:900, fontSize:'clamp(1.8rem,8vw,3rem)', color:'#F0EDE6', lineHeight:1.1, margin:'0 0 1.5rem' }}>
            ZERO TO <span style={{ color:'#c9a96e' }}>ABSOLUTE</span> FOCUS
          </h2>
          <div style={{ display:'flex', gap:'1.5rem', marginBottom:'1.5rem', flexWrap:'wrap' }}>
            {[{v:'75mg',l:'CAFFEINE'},{v:'20',l:'POUCHES'},{v:'0g',l:'SUGAR'}].map(s=>(
              <div key={s.l}>
                <p style={{ fontFamily:F, fontWeight:900, fontSize:'1.2rem', color:'#c9a96e', margin:0 }}>{s.v}</p>
                <p style={{ fontFamily:F, fontSize:7, color:'rgba(240,237,230,0.3)', letterSpacing:'0.3em', margin:'2px 0 0' }}>{s.l}</p>
              </div>
            ))}
          </div>
          <div className="cards-row" style={{ display:'flex', gap:'0.8rem', overflowX:'auto', margin:'0 -1.5rem', padding:'0 1.5rem 1rem' }}>
            {ZAF_FLAVOURS.map(f => (
              <div key={f.name} style={{ flexShrink:0, width:160, padding:'1rem', background:'rgba(255,255,255,0.04)', border:`1px solid ${f.accent}25`, borderRadius:12, display:'flex', flexDirection:'column', gap:6 }}>
                <div style={{ width:'100%', height:3, borderRadius:2, background:f.accent, opacity:0.6 }} />
                <p style={{ fontFamily:F, fontWeight:900, fontSize:13, color:'#F0EDE6', margin:0 }}>{f.name}</p>
                <p style={{ fontFamily:F, fontSize:9, color:f.accent, margin:0, letterSpacing:'0.1em' }}>75MG CAFFEINE</p>
                <p style={{ fontFamily:F, fontSize:8, color:'rgba(240,237,230,0.3)', margin:0 }}>No nicotine · No tobacco</p>
                <p style={{ fontFamily:F, fontWeight:900, fontSize:16, color:'#c9a96e', margin:'auto 0 0' }}>$12.90</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop:'1rem', display:'flex', gap:6, flexWrap:'wrap' }}>
            {['NO NICOTINE','NO TOBACCO','ZERO CALORIES'].map(t=>(
              <span key={t} style={{ fontFamily:F, fontSize:7, letterSpacing:'0.2em', padding:'3px 10px', borderRadius:12, color:'rgba(240,237,230,0.35)', border:'1px solid rgba(255,255,255,0.08)', background:'rgba(255,255,255,0.03)' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // ── DESKTOP: pinned scroll + video ──
  return (
    <div id="zaf" ref={wrapRef} style={{ height:'100vh', position:'relative', overflow:'hidden', background:'#000' }}>

      {/* Morphing colour bg */}
      <div ref={bgRef} style={{ position:'absolute', inset:0, zIndex:0 }} />

      {/* Video — autoplay loop, screen blend makes black = transparent */}
      <video
        autoPlay muted loop playsInline preload="auto"
        src="https://res.cloudinary.com/dejnpr2ds/video/upload/v1776895744/Zaf-Conveyor_rzfsrl.mp4"
        style={{
          position:'absolute', right:0, top:0,
          width:'clamp(50%,60vw,65%)', height:'100%',
          objectFit:'cover', zIndex:2,
          mixBlendMode:'screen', opacity:0.9,
          maskImage:'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 15%, black 35%)',
          WebkitMaskImage:'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 15%, black 35%)',
        }}
      />

      {/* Subtle bottom fade only */}
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'20%', zIndex:3, pointerEvents:'none',
        background:'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
      }} />

      {/* Giant watermark */}
      <div style={{
        position:'absolute', inset:0, zIndex:1,
        display:'flex', alignItems:'center', justifyContent:'center',
        pointerEvents:'none', overflow:'hidden',
      }}>
        <span style={{
          fontFamily:F, fontWeight:900,
          fontSize:'clamp(6rem,22vw,22vw)',
          color: fl.accent, opacity: 0.04,
          letterSpacing:'-0.04em', lineHeight:0.85,
          whiteSpace:'nowrap', userSelect:'none',
          textTransform:'uppercase',
          transition:'color 0.6s ease',
        }}>
          {fl.name.split(' ')[0]}
        </span>
      </div>

      {/* ── Header bar ── */}
      <div style={{ position:'absolute', top:0, left:0, right:0, zIndex:6, display:'flex', alignItems:'flex-start', justifyContent:'space-between', padding:'clamp(1.5rem,3vh,2.5rem) clamp(1.5rem,4vw,3rem)' }}>
        <div>
          <p style={{ fontFamily:F, fontWeight:900, fontSize:'clamp(1rem,2vw,1.3rem)', color:'#F0EDE6', margin:0, letterSpacing:'0.15em', textShadow:'0 2px 20px rgba(0,0,0,0.8)' }}>ZAF⚡</p>
          <p style={{ fontFamily:F, fontSize:8, color:'rgba(240,237,230,0.35)', letterSpacing:'0.4em', margin:'3px 0 0' }}>ZERO TO ABSOLUTE FOCUS</p>
        </div>
        <div style={{ display:'flex', gap:'clamp(1rem,3vw,2rem)', alignItems:'center' }}>
          {['ENERGY','FOCUS','MOOD'].map(t => (
            <span key={t} style={{ fontFamily:F, fontSize:'clamp(7px,0.85vw,9px)', color:'rgba(240,237,230,0.35)', letterSpacing:'0.3em' }}>{t}</span>
          ))}
        </div>
        <div style={{ fontFamily:F, fontSize:9, color:'rgba(240,237,230,0.35)', border:'1px solid rgba(255,255,255,0.12)', padding:'5px 12px', borderRadius:20, letterSpacing:'0.2em', backdropFilter:'blur(8px)', background:'rgba(0,0,0,0.25)' }}>
          75MG CAFFEINE
        </div>
      </div>

      {/* ── Left panel — flavour info ── */}
      <div style={{
        position:'absolute', left:0, top:0, bottom:0,
        width:'clamp(300px,50vw,55%)',
        display:'flex', flexDirection:'column', justifyContent:'flex-end',
        padding:'clamp(1.5rem,4vw,3.5rem)',
        zIndex:6,
      }}>
        <div style={{ width:32, height:2, background:fl.accent, marginBottom:18, transition:'background 0.5s ease', boxShadow:`0 0 12px ${fl.accent}60` }} />

        <p style={{ fontFamily:F, fontSize:'clamp(9px,1vw,11px)', color:'rgba(240,237,230,0.35)', letterSpacing:'0.5em', margin:'0 0 10px' }}>
          {String(current + 1).padStart(2, '0')} / {String(ZAF_FLAVOURS.length).padStart(2, '0')}
        </p>

        <div ref={nameRef}>
          <h2 style={{
            fontFamily:F, fontWeight:900, margin:0, lineHeight:1.05,
            fontSize: fl.name.length > 12 ? 'clamp(1.5rem,4vw,3rem)' : 'clamp(2.2rem,6vw,5rem)',
            color:'#F0EDE6',
            letterSpacing: fl.name.length > 12 ? '0.02em' : '-0.03em',
            textShadow:`0 0 50px ${fl.accent}50, 0 4px 30px rgba(0,0,0,0.5)`,
          }}>
            {fl.name}
          </h2>
        </div>

        <p style={{ fontFamily:F, fontWeight:900, fontSize:'clamp(1.4rem,3.5vw,2.5rem)', color:'#c9a96e', margin:'0.6rem 0 0', letterSpacing:'0.05em', textShadow:'0 2px 20px rgba(0,0,0,0.6)' }}>
          $12.90
        </p>

        <div style={{ width:60, height:1, background:'rgba(255,255,255,0.08)', margin:'clamp(1rem,2.5vh,2rem) 0' }} />

        <div style={{ display:'flex', gap:'clamp(1.5rem,4vw,3rem)', flexWrap:'wrap', marginBottom:'clamp(1rem,2vh,1.5rem)' }}>
          {[
            { val:'75mg', label:'CAFFEINE' },
            { val:'20',   label:'POUCHES' },
            { val:'0g',   label:'SUGAR' },
          ].map(s => (
            <div key={s.label}>
              <p style={{ fontFamily:F, fontWeight:900, fontSize:'clamp(1rem,2.5vw,1.6rem)', color:fl.accent, margin:0, letterSpacing:'-0.01em', transition:'color 0.5s' }}>{s.val}</p>
              <p style={{ fontFamily:F, fontSize:'clamp(7px,0.8vw,9px)', color:'rgba(240,237,230,0.3)', letterSpacing:'0.3em', margin:'2px 0 0' }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:'clamp(0.8rem,1.5vh,1rem)' }}>
          {['NO NICOTINE','NO TOBACCO','ZERO CALORIES'].map(tag => (
            <span key={tag} style={{
              fontFamily:F, fontSize:'clamp(7px,0.8vw,8px)', letterSpacing:'0.25em',
              padding:'4px 12px', borderRadius:20,
              color:'rgba(240,237,230,0.4)',
              border:'1px solid rgba(255,255,255,0.08)',
              background:'rgba(255,255,255,0.03)',
            }}>{tag}</span>
          ))}
        </div>

        <div style={{ padding:'8px 16px', border:`1px solid ${fl.accent}35`, background:`${fl.accent}08`, borderRadius:4, alignSelf:'flex-start', transition:'all 0.5s ease' }}>
          <p style={{ fontFamily:F, fontSize:'clamp(7px,0.8vw,8px)', color:fl.accent, letterSpacing:'0.3em', margin:0, transition:'color 0.5s' }}>BIRKENHEAD VAPE SHOP · AUCKLAND</p>
        </div>
      </div>

      {/* ── Progress dots ── */}
      <div style={{ position:'absolute', bottom:'clamp(1.5rem,3vh,2.5rem)', left:'clamp(1.5rem,4vw,3.5rem)', display:'flex', gap:6, alignItems:'center', zIndex:6 }}>
        {ZAF_FLAVOURS.map((f, i) => (
          <div key={i} style={{
            height: 3,
            flex: i === current ? 3 : 1,
            background: i === current ? fl.accent : 'rgba(255,255,255,0.12)',
            borderRadius: 2,
            transition: 'all 0.4s cubic-bezier(.23,1,.32,1)',
          }} />
        ))}
      </div>

      {/* Scroll hint */}
      <div style={{ position:'absolute', bottom:'clamp(1.5rem,3vh,2.5rem)', right:'clamp(1.5rem,4vw,3rem)', zIndex:6, display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
        <p style={{ fontFamily:F, fontSize:8, color:'rgba(240,237,230,0.25)', letterSpacing:'0.4em', margin:0 }}>
          SCROLL TO EXPLORE
        </p>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
          {[0,1,2].map(i => (
            <svg key={i} width="14" height="8" viewBox="0 0 16 10" fill="none" style={{ animation:`chevronFade 1.5s ease-in-out ${i*0.2}s infinite`, opacity:0 }}>
              <path d="M1 1L8 8L15 1" stroke={fl.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ))}
        </div>
      </div>
    </div>
  )
}
