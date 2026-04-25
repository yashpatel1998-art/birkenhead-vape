'use client'

import { useEffect, useRef } from 'react'

export default function TextSplit({
  text,
  style,
  delay = 0,
}: {
  text: string
  style?: React.CSSProperties
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const letters = el.querySelectorAll<HTMLSpanElement>('.letter')
    letters.forEach((l, i) => {
      l.style.opacity = '0'
      l.style.transform = 'translateY(40px)'
      setTimeout(() => {
        l.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
        l.style.opacity = '1'
        l.style.transform = 'translateY(0)'
      }, delay + i * 50)
    })
  }, [delay])

  return (
    <span ref={ref} style={{ display: 'inline-block', ...style }}>
      {text.split('').map((char, i) => (
        <span key={i} className="letter" style={{
          display: 'inline-block',
          whiteSpace: char === ' ' ? 'pre' : 'normal',
        }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}
