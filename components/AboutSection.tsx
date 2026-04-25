'use client'

const F = "'Aharoni','Arial Black',Arial,sans-serif"

const C = {
  bg0:   '#F6F1E9',
  bg1:   '#EDE7DC',
  border:'#D8D1C5',
  ink:   '#1A1820',
  body:  '#3C3650',
  muted: '#7C748A',
  cyan:  '#007A8F',
  violet:'#7700BB',
  pink:  '#BB0044',
}

const STATS = [
  { number:'50+', label:'Flavours Available',           color:C.cyan   },
  { number:'7',   label:'Days A Week',                  color:C.violet },
  { number:'18+', label:'Age Requirement',              color:C.pink   },
  { number:'NZ',  label:'Ministry of Health Compliant', color:C.cyan   },
]

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{ background:`linear-gradient(160deg,${C.bg0} 0%,${C.bg1} 100%)`, padding:'8rem 1.5rem', position:'relative', overflow:'hidden' }}
    >
      {/* Paper grain */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0, opacity:0.045,
        backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize:'200px' }} />
      <div style={{ position:'absolute', top:'5%',    left:'-6%',  width:480, height:480, background:'radial-gradient(ellipse,rgba(0,122,143,0.09),transparent 70%)',  pointerEvents:'none', zIndex:0 }} />
      <div style={{ position:'absolute', bottom:'5%', right:'-6%', width:440, height:440, background:'radial-gradient(ellipse,rgba(119,0,187,0.07),transparent 70%)', pointerEvents:'none', zIndex:0 }} />
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${C.cyan},transparent)`, opacity:0.35, zIndex:1 }} />

      <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:2 }}>

        <div style={{ marginBottom:'4.5rem' }}>
          <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:20 }}>
            <div style={{ height:1, width:28, background:C.cyan, opacity:0.7 }} />
            <p style={{ fontFamily:F, color:C.cyan, fontSize:10, letterSpacing:'0.5em', margin:0, opacity:0.85 }}>01 — OUR STORY</p>
          </div>
          <h2 style={{ fontFamily:F, fontWeight:900, fontSize:'clamp(2.2rem,6vw,4.8rem)', color:C.ink, lineHeight:1.05, margin:0, letterSpacing:'-0.02em' }}>
            BIRKENHEAD&apos;S<br />
            <span style={{ color:C.cyan }}>VAPE EXPERTS</span>
          </h2>
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'4rem', alignItems:'start' }}>

          <div>
            <p style={{ fontFamily:F, color:C.body, fontSize:'clamp(12px,1.5vw,15px)', lineHeight:2.1, letterSpacing:'0.04em', margin:0 }}>
              Located in the heart of Birkenhead, Auckland, we are your local premium vaping destination. We stock the best brands — INMOOD and WOTOFO — with expert guidance to help you find exactly what you need.
            </p>
            <p style={{ fontFamily:F, color:C.body, fontSize:'clamp(12px,1.5vw,15px)', lineHeight:2.1, letterSpacing:'0.04em', marginTop:'1.6rem' }}>
              Whether you are new to vaping or looking for your next favourite flavour, our knowledgeable team is here to help — 7 days a week.
            </p>
            <div style={{ height:1, background:C.border, margin:'2.5rem 0', opacity:0.6 }} />
            <div style={{ padding:'1.2rem 1.5rem', background:'rgba(0,0,0,0.025)', border:`1px solid ${C.border}`, borderLeft:`3px solid rgba(187,0,68,0.45)`, borderRadius:2 }}>
              <p style={{ fontFamily:F, color:C.muted, fontSize:10, letterSpacing:'0.17em', lineHeight:1.9, margin:0 }}>
                <span style={{ color:C.pink }}>⚠ HEALTH WARNING · </span>
                Vaping products contain nicotine which is a highly addictive substance. Not recommended for non-smokers, pregnant women, or persons under 18. Regulated under the Smokefree Environments and Regulated Products Act 1990.
              </p>
            </div>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            {STATS.map(({ number, label, color }) => (
              <div key={label} style={{
                display:'flex', alignItems:'center', gap:'1.4rem',
                padding:'1.1rem 1.4rem',
                background:'rgba(255,255,255,0.55)',
                border:`1px solid ${C.border}`,
                borderLeft:`3px solid ${color}`,
                borderRadius:2,
                boxShadow:'0 2px 14px rgba(0,0,0,0.04)',
                backdropFilter:'blur(4px)',
              }}>
                <span style={{ fontFamily:F, fontWeight:900, fontSize:'clamp(1.4rem,2.8vw,2.2rem)', color, minWidth:70, letterSpacing:'-0.01em' }}>{number}</span>
                <span style={{ fontFamily:F, color:C.body, fontSize:11, letterSpacing:'0.22em', textTransform:'uppercase' as const }}>{label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
