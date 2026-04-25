'use client'

import { useEffect, useRef, createContext, useContext, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// Context so any child component can access lenis instance
const LenisContext = createContext<{ lenis: Lenis | null }>({ lenis: null })
export const useLenis = () => useContext(LenisContext)

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration:        1.2,
      easing:          (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation:     'vertical',
      smoothWheel:     true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      infinite:        false,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const tickerFn = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(tickerFn)
      lenisRef.current = null
    }
  }, [])

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </LenisContext.Provider>
  )
}
