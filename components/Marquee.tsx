'use client'

export default function Marquee() {
  const text = [
    'BIRKENHEAD VAPE SHOP',
    'THE CLOUD HAS LANDED',
    'AUCKLAND, NEW ZEALAND',
    '18+ ONLY',
    'EST. 2024',
    'PREMIUM VAPING',
    'OPEN 7 DAYS',
  ]

  const items = [...text, ...text] // duplicate for seamless loop

  return (
    <div style={{
      background: '#000',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '1.2rem 0',
      overflow: 'hidden',
      position: 'relative',
      zIndex: 5,
    }}>
      <div style={{
        display: 'flex',
        gap: '3rem',
        animation: 'marqueeScroll 20s linear infinite',
        width: 'max-content',
      }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '3rem', flexShrink: 0 }}>
            <span style={{
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(0.7rem,1.5vw,0.85rem)',
              color: i % 7 === 1 ? '#00E5FF' : i % 7 === 4 ? '#BF00FF' : '#fff',
              letterSpacing: '0.3em',
              whiteSpace: 'nowrap',
            }}>
              {item}
            </span>
            <span style={{ color: 'rgba(0,229,255,0.3)', fontSize: 8 }}>✦</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0) }
          to   { transform: translateX(-50%) }
        }
      `}</style>
    </div>
  )
}
