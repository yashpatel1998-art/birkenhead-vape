'use client'

import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links: [string, string][] = [
    ['#',         'HOME'],
    ['#products', 'PRODUCTS'],
    ['#about',    'ABOUT'],
    ['#find-us',  'FIND US'],
    ['#contact',  'CONTACT'],
  ]

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '1.2rem 2rem',
        background: 'transparent',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        borderBottom: 'none',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        transition: 'background 0.5s, backdrop-filter 0.5s',
      }}>

        {/* Logo */}
        <a href="#" style={{
          fontFamily: 'Orbitron, sans-serif', fontWeight: 900,
          fontSize: 'clamp(1rem,4vw,1.3rem)', letterSpacing: '0.2em',
          color: '#fff', textDecoration: 'none',
          textShadow: '0 0 20px rgba(0,229,255,0.4)',
        }}>
          BVS<span style={{ color: '#00E5FF' }}>.</span>
        </a>

        {/* Desktop links */}
        <div className="desktop-nav" style={{
          display: 'flex', gap: '2.5rem',
          fontFamily: 'monospace', fontSize: '0.72rem', letterSpacing: '0.2em',
        }}>
          {links.map(([href, label]) => (
            <a key={label} href={href} style={{
              color: 'rgba(255,255,255,0.75)', textDecoration: 'none',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = '#fff'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.75)'}
            >{label}</a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-btn"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', flexDirection: 'column', gap: '5px', display: 'none' }}>
          <span style={{ display: 'block', width: 24, height: 2, background: '#fff', transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none', transition: 'all 0.3s' }} />
          <span style={{ display: 'block', width: 24, height: 2, background: '#fff', transform: menuOpen ? 'rotate(-45deg)' : 'none', transition: 'all 0.3s' }} />
          {!menuOpen && <span style={{ display: 'block', width: 24, height: 2, background: '#fff' }} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: '60px', left: 0, right: 0, zIndex: 999,
          background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)',
          padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem',
        }}>
          {links.map(([href, label]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)} style={{
              color: '#fff', textDecoration: 'none', fontFamily: 'monospace',
              fontSize: '0.9rem', letterSpacing: '0.2em',
              padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}>{label}</a>
          ))}
        </div>
      )}

      <style>{`
        @media(max-width:768px){.desktop-nav{display:none!important}.mobile-btn{display:flex!important}}
        @media(min-width:769px){.mobile-btn{display:none!important}}
      `}</style>
    </>
  )
}
