'use client'

const F = "'Aharoni','Arial Black',Arial,sans-serif"

const C = {
  bg0:   '#EDE7DC',
  bg1:   '#E4DDD1',
  border:'#D0C9BC',
  ink:   '#1A1820',
  body:  '#3C3650',
  muted: '#7C748A',
  cyan:  '#007A8F',
  green: '#1A8040',
}

export default function FindUsSection() {
  return (
    <section
      id="find-us"
      style={{ background:`linear-gradient(160deg,${C.bg0} 0%,${C.bg1} 100%)`, padding:'6rem 1.5rem', position:'relative', overflow:'hidden' }}
    >
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0, opacity:0.04,
        backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize:'200px' }} />
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${C.cyan},transparent)`, opacity:0.35, zIndex:1 }} />

      <div style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:2 }}>

        <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
          <p style={{ fontFamily:F, color:C.cyan, fontSize:10, letterSpacing:'0.5em', marginBottom:12, opacity:0.8 }}>// FIND US</p>
          <h2 style={{ fontFamily:F, fontWeight:900, fontSize:'clamp(2rem,5vw,3.5rem)', color:C.ink, margin:0, letterSpacing:'0.04em' }}>
            VISIT THE <span style={{ color:C.cyan }}>SHOP</span>
          </h2>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'3rem', alignItems:'center' }}>

          {/* NZ Map — transparent with teal glow */}
          <div style={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
            <a href="https://maps.google.com/?q=45+Birkenhead+Avenue+Auckland" target="_blank" rel="noopener noreferrer"
              style={{ display:'block', cursor:'pointer', transition:'transform 0.3s ease', maxWidth:650, width:'100%' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
              <img
                src="/nz-map.png"
                alt="New Zealand Map — Birkenhead Vape Shop, Auckland"
                style={{ width:'100%', height:'auto', display:'block' }}
              />
            </a>
          </div>

          {/* Info */}
          <div style={{ display:'flex', flexDirection:'column', gap:'1.8rem' }}>

            <div style={{ display:'flex', gap:'1rem', alignItems:'flex-start' }}>
              <div style={{ width:40, height:40, border:`1px solid ${C.border}`, background:'rgba(255,255,255,0.5)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0, borderRadius:2 }}>📍</div>
              <div>
                <p style={{ fontFamily:F, color:C.muted, fontSize:10, letterSpacing:'0.3em', margin:'0 0 5px' }}>ADDRESS</p>
                <p style={{ fontFamily:F, color:C.ink, fontSize:'clamp(0.9rem,2vw,1.1rem)', margin:0, lineHeight:1.7, whiteSpace:'pre-line' }}>{'45 Birkenhead Avenue\nBirkenhead, Auckland 0626'}</p>
              </div>
            </div>

            <div style={{ height:1, background:C.border, opacity:0.55 }} />

            <div style={{ display:'flex', gap:'1rem', alignItems:'flex-start' }}>
              <div style={{ width:40, height:40, border:'1px solid rgba(26,128,64,0.35)', background:'rgba(26,128,64,0.05)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, borderRadius:2 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#1A8040"/>
                </svg>
              </div>
              <div>
                <p style={{ fontFamily:F, color:C.muted, fontSize:10, letterSpacing:'0.3em', margin:'0 0 5px' }}>WHATSAPP / PHONE</p>
                <a href="https://wa.me/64223286322" target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily:F, color:C.ink, fontSize:'clamp(0.9rem,2vw,1.1rem)', textDecoration:'none', display:'flex', alignItems:'center', gap:8 }}>
                  022 328 6322
                  <span style={{ fontFamily:F, fontSize:9, color:'rgba(26,128,64,0.6)', letterSpacing:'0.2em' }}>TAP TO CHAT ↗</span>
                </a>
              </div>
            </div>

            <div style={{ height:1, background:C.border, opacity:0.55 }} />

            <div style={{ display:'flex', gap:'1rem', alignItems:'flex-start' }}>
              <div style={{ width:40, height:40, border:`1px solid ${C.border}`, background:'rgba(255,255,255,0.5)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0, borderRadius:2 }}>🕐</div>
              <div>
                <p style={{ fontFamily:F, color:C.muted, fontSize:10, letterSpacing:'0.3em', margin:'0 0 5px' }}>HOURS</p>
                <p style={{ fontFamily:F, color:C.ink, fontSize:'clamp(0.9rem,2vw,1.1rem)', margin:0, lineHeight:1.7, whiteSpace:'pre-line' }}>{'Mon–Sat: 8:00AM – 9:00PM\nSun: 8:00AM – 8:00PM'}</p>
              </div>
            </div>

            <a href="https://maps.google.com/?q=45+Birkenhead+Avenue+Auckland" target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'0.85rem 2rem', border:`1px solid ${C.cyan}`, color:C.cyan, fontFamily:F, fontSize:'clamp(0.55rem,1.5vw,0.7rem)', letterSpacing:'0.22em', textDecoration:'none', alignSelf:'flex-start', borderRadius:2 }}>
              GET DIRECTIONS ↗
            </a>

            <p style={{ fontFamily:F, color:C.muted, fontSize:10, letterSpacing:'0.18em', borderTop:`1px solid ${C.border}`, paddingTop:'1rem', margin:0, opacity:0.75 }}>
              ⚠ 18+ ONLY — ID REQUIRED · NZ SMOKEFREE ACT COMPLIANT
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
