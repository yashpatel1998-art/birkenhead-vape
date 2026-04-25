'use client'

const F = "'Aharoni','Arial Black',Arial,sans-serif"

export default function AgeGate({ onConfirm }: { onConfirm: () => void }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: '#000',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '2rem',
    }}>

      {/* Glow orbs */}
      <div style={{ position:'absolute', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(0,229,255,0.08) 0%,transparent 70%)', top:'-10%', left:'-10%', filter:'blur(60px)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(191,0,255,0.08) 0%,transparent 70%)', bottom:'-10%', right:'-10%', filter:'blur(60px)', pointerEvents:'none' }} />

      <div style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', gap:'2rem', maxWidth:420, width:'100%' }}>

        {/* Logo */}
        <div>
          <h1 style={{ fontFamily:F, fontWeight:900, fontSize:'clamp(2.5rem,8vw,5rem)', color:'#fff', margin:0, letterSpacing:'0.2em', lineHeight:1 }}>
            BVS<span style={{ color:'#00E5FF' }}>.</span>
          </h1>
          <p style={{ fontFamily:F, color:'rgba(0,229,255,0.5)', fontSize:9, letterSpacing:'0.5em', margin:'8px 0 0' }}>BIRKENHEAD VAPE SHOP</p>
        </div>

        {/* Divider */}
        <div style={{ width:40, height:1, background:'rgba(255,255,255,0.15)' }} />

        {/* Age check */}
        <div>
          <p style={{ fontFamily:F, fontWeight:900, fontSize:'clamp(1.2rem,4vw,1.8rem)', color:'#fff', margin:'0 0 8px', letterSpacing:'0.05em' }}>
            ARE YOU 18+?
          </p>
          <p style={{ fontFamily:F, fontSize:10, color:'rgba(255,255,255,0.35)', letterSpacing:'0.2em', margin:0, lineHeight:1.8 }}>
            You must be 18 or older to enter this site.<br />
            Vaping products contain nicotine.
          </p>
        </div>

        {/* YES button — big, easy to tap */}
        <button
          onClick={onConfirm}
          style={{
            width: '100%',
            padding: '1.4rem 2rem',
            background: 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(191,0,255,0.15))',
            border: '1px solid rgba(0,229,255,0.5)',
            borderRadius: 12,
            color: '#fff',
            fontFamily: F,
            fontWeight: 900,
            fontSize: 'clamp(0.9rem,3vw,1.1rem)',
            letterSpacing: '0.3em',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,229,255,0.25), rgba(191,0,255,0.25))'
            e.currentTarget.style.borderColor = '#00E5FF'
            e.currentTarget.style.transform = 'scale(1.02)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0,229,255,0.15), rgba(191,0,255,0.15))'
            e.currentTarget.style.borderColor = 'rgba(0,229,255,0.5)'
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          YES, I AM 18+ — ENTER ↗
        </button>

        {/* NO button — smaller, less prominent */}
        <a
          href="https://www.google.com"
          style={{
            fontFamily: F,
            fontSize: 9,
            letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.2)',
            textDecoration: 'none',
            padding: '0.8rem 1.5rem',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          NO, EXIT
        </a>

        {/* Legal */}
        <p style={{ fontFamily:F, fontSize:9, color:'rgba(255,255,255,0.15)', letterSpacing:'0.15em', lineHeight:1.8, margin:0 }}>
          ⚠ NZ SMOKEFREE ACT COMPLIANT · 18+ ONLY
        </p>

      </div>
    </div>
  )
}
