import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: 'var(--black)',
        dark2: 'var(--dark2)',
        dark3: 'var(--dark3)',
        cyan: 'var(--cyan)',
        violet: 'var(--violet)',
        pink: 'var(--pink)',
        text: 'var(--text)',
        muted: 'var(--muted)',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        mono: ['Share Tech Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
