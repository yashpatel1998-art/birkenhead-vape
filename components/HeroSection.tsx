'use client'

export default function HeroSection() {
  return (
    <section style={{
      background: 'linear-gradient(to bottom, #000 0%, #000B1A 50%, #000 100%)',
      padding: '8rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center',
    }}>

      {/* Glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 600, height: 600,
        background: 'radial-gradient(ellipse, rgba(0,229,255,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <p style={{ fontFamily:'monospace', color:'rgba(0,229,255,0.5)', fontSize:'clamp(10px,1.5vw,13px)', letterSpacing:'0.5em', marginBottom:'2rem', textTransform:'uppercase' }}>
          // Auckland, New Zealand
        </p>
        <h2 style={{ fontFamily:'Orbitron, sans-serif', fontWeight:900, fontSize:'clamp(3rem,10vw,8rem)', color:'#fff', margin:0, lineHeight:0.95, letterSpacing:'-0.02em' }}>
          THE CLOUD
        </h2>
        <h2 style={{ fontFamily:'Orbitron, sans-serif', fontWeight:900, fontSize:'clamp(3rem,10vw,8rem)', color:'#00E5FF', margin:'0 0 2rem', lineHeight:0.95, letterSpacing:'-0.02em', textShadow:'0 0 80px rgba(0,229,255,0.6)' }}>
          HAS LANDED
        </h2>
        <p style={{ fontFamily:'monospace', fontSize:'clamp(10px,1.5vw,13px)', color:'rgba(255,255,255,0.4)', letterSpacing:'0.4em', marginBottom:'3rem' }}>
          PREMIUM VAPING · EXPERT GUIDANCE · OPEN 7 DAYS
        </p>
        <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
          <a href="#products" style={{ padding:'1rem 2.5rem', border:'1px solid #00E5FF', color:'#00E5FF', fontFamily:'Orbitron, sans-serif', fontSize:'clamp(0.6rem,1.5vw,0.75rem)', letterSpacing:'0.2em', textDecoration:'none' }}>
            VIEW PRODUCTS ↓
          </a>
          <a href="#find-us" style={{ padding:'1rem 2.5rem', border:'1px solid #BF00FF', color:'#BF00FF', fontFamily:'Orbitron, sans-serif', fontSize:'clamp(0.6rem,1.5vw,0.75rem)', letterSpacing:'0.2em', textDecoration:'none' }}>
            FIND US ↓
          </a>
        </div>
      </div>
    </section>
  )
}
