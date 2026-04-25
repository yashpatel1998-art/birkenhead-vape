'use client'

import { useEffect, useState } from 'react'

const F = "'Aharoni','Arial Black',Arial,sans-serif"

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [fade,    setFade]    = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setFade(true),    1800)
    const t2 = setTimeout(() => setVisible(false), 2500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!visible) return null

  return (
    <div style={{
      position:'fixed', inset:0, zIndex:99999,
      background:'#000',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      opacity: fade ? 0 : 1,
      transition:'opacity 0.7s ease',
      pointerEvents: fade ? 'none' : 'all',
    }}>
      <div style={{ textAlign:'center' }}>
        <h1 style={{
          fontFamily: F,
          fontWeight: 900,
          fontSize: 'clamp(2.5rem,8vw,6rem)',
          color: '#fff',
          letterSpacing: '0.2em',
          margin: 0,
          animation: 'bvsPulse 1s ease-in-out infinite',
        }}>
          BVS<span style={{ color:'#00E5FF' }}>.</span>
        </h1>
        <p style={{
          fontFamily: F,
          color: 'rgba(0,229,255,0.5)',
          fontSize: 11,
          letterSpacing: '0.5em',
          marginTop: 16,
          animation: 'bvsFade 1s ease-in-out infinite alternate',
        }}>
          THE CLOUD HAS LANDED
        </p>
        <div style={{ width:200, height:1, background:'rgba(255,255,255,0.1)', margin:'2rem auto 0', overflow:'hidden' }}>
          <div style={{ height:'100%', background:'linear-gradient(to right,#00E5FF,#BF00FF)', animation:'bvsLoad 1.8s ease forwards' }} />
        </div>
      </div>
      <style>{`
        @keyframes bvsPulse { 0%,100%{text-shadow:0 0 20px rgba(0,229,255,0.3)} 50%{text-shadow:0 0 60px rgba(0,229,255,0.8)} }
        @keyframes bvsFade  { from{opacity:0.3} to{opacity:1} }
        @keyframes bvsLoad  { from{width:0%} to{width:100%} }
      `}</style>
    </div>
  )
}
