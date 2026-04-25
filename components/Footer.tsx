'use client'

const F = "'Aharoni','Arial Black',Arial,sans-serif"

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background:'#000', borderTop:'1px solid rgba(255,255,255,0.06)', padding:'4rem 1.5rem 2rem' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'3rem', marginBottom:'3rem' }}>

          {/* Brand */}
          <div>
            <h2 style={{ fontFamily:F, fontWeight:900, fontSize:'1.8rem', color:'#fff', letterSpacing:'0.2em', margin:'0 0 1rem' }}>
              BVS<span style={{ color:'#00E5FF' }}>.</span>
            </h2>
            <p style={{ fontFamily:F, color:'#fff', fontSize:11, letterSpacing:'0.3em', lineHeight:1.8, margin:0 }}>
              THE CLOUD HAS LANDED<br />Birkenhead, Auckland
            </p>
          </div>

          {/* Links */}
          <div>
            <p style={{ fontFamily:F, color:'#00E5FF', fontSize:10, letterSpacing:'0.5em', marginBottom:'1rem', marginTop:0 }}>NAVIGATE</p>
            {[['#', 'Home'], ['#products', 'Products'], ['#about', 'About'], ['#find-us', 'Find Us']].map(([href, label]) => (
              <a key={label} href={href}
                style={{ display:'block', fontFamily:F, color:'#fff', fontSize:12, letterSpacing:'0.2em', textDecoration:'none', marginBottom:'0.6rem' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#00E5FF')}
                onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
              >{label}</a>
            ))}
          </div>

          {/* Hours */}
          <div>
            <p style={{ fontFamily:F, color:'#00E5FF', fontSize:10, letterSpacing:'0.5em', marginBottom:'1rem', marginTop:0 }}>HOURS</p>
            <p style={{ fontFamily:F, color:'#fff', fontSize:12, lineHeight:2, margin:0 }}>
              Mon–Sat: 8:00AM – 9:00PM<br />Sun: 8:00AM – 8:00PM
            </p>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily:F, color:'#00E5FF', fontSize:10, letterSpacing:'0.5em', marginBottom:'1rem', marginTop:0 }}>CONTACT</p>
            <p style={{ fontFamily:F, color:'#fff', fontSize:12, lineHeight:2, margin:0 }}>
              45 Birkenhead Avenue<br />Birkenhead, Auckland 0626
            </p>
            <a
              href="https://wa.me/64223286322"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily:F, color:'#25D366', fontSize:12, textDecoration:'none', display:'block', marginTop:4 }}
            >
              022 328 6322 ↗
            </a>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)', paddingTop:'2rem', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem' }}>
          <p style={{ fontFamily:F, color:'#fff', fontSize:10, letterSpacing:'0.2em', margin:0 }}>
            © {year} BIRKENHEAD VAPE SHOP · ALL RIGHTS RESERVED
          </p>
          <p style={{ fontFamily:F, color:'#fff', fontSize:10, letterSpacing:'0.2em', margin:0 }}>
            ⚠ 18+ ONLY · NZ SMOKEFREE ACT COMPLIANT
          </p>
        </div>

      </div>
    </footer>
  )
}
