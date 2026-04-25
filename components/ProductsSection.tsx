'use client'

import { useState } from 'react'

const BRANDS = [
  {
    name: 'INMOOD',
    color: '#00E5FF',
    products: [
      { name: 'Inmood Switch — Replacement Pod 26mg', badge: 'POD', badgeColor: '#00E5FF', puffs: '5,000 puffs', price: '$15.00', specs: '10ml · 1.0Ω mesh coil · Fits all Switch battery kits', nicotine: '26mg/ml (High Strength)', note: 'All flavours have an icy finish', flavours: ['Banana (Ice)','Berry Lemon (Pink Lemonade)','Blackberry','Blueberry (Ice)','Blueberry Cherry','Blueberry Lemon','Blueberry Raspberry','Cherry Pomegranate','Grape','Grape Berry (Cranberry Grape)','Guava Passionfruit (Kiwi Passionfruit Guava)','Kiwifruit Pineapple (Ice)','Lemon Mint','Lychee (Ice)','Mango Peach (Ice)','Menthol (Ice)','Mint (Cool Mint)','Peach','Peach Blueberry','Peach Lemon (Peach Lemonade)','Peach Pineapple (Peach Pineapple Lime)','Pineapple (Ice)','Pineapple Passionfruit','Raspberry Grape','Sour Apple','Strawberry','Strawberry Banana','Strawberry Blueberry','Strawberry Kiwifruit','Sweet Berry (Mixed Berries Ice)','Tea (Ice)','Tobacco (Golden Tobacco)','Vanilla Spice (Cola Ice)','Watermelon (Lush Ice)','Banana Custard','Strawberry Custard','Peach Blueberry Custard','Coffee'] },
      { name: 'Inmood Switch — Replacement Pod 16mg', badge: 'POD', badgeColor: '#00E5FF', puffs: '5,000 puffs', price: '$15.00', specs: '10ml · 1.0Ω mesh coil · Fits all Switch battery kits', nicotine: '16mg/ml (Low Strength)', note: '', flavours: ['Peach Blueberry','Blueberry','Watermelon','Vanilla Spice','Sour Apple','Pineapple','Peach Pineapple','Grape Berry','Guava Passionfruit','Mango Peach','Berry Lemon','Mint','Strawberry Kiwifruit','Strawberry Banana','Kiwifruit Pineapple'] },
      { name: 'Inmood Switch — Replacement Pod 0% Nicotine', badge: 'POD', badgeColor: '#22c55e', puffs: '5,000 puffs', price: '$15.00', specs: '10ml · 1.0Ω mesh coil · Fits all Switch battery kits', nicotine: '0% — Zero Nicotine', note: 'Nicotine-free option', flavours: ['Blueberry','Blueberry Raspberry','Cherry Pomegranate','Mango Peach','Mint','Pineapple','Sour Apple','Sweet Berry (Mixed Berries)','Vanilla Spice'] },
      { name: 'Inmood Switch — Twin Pack (2 Pods) 26mg', badge: 'TWIN PACK', badgeColor: '#f59e0b', puffs: '5,000 puffs × 2', price: '$25.00', specs: '2 × pre-filled replacement pods · 26mg/ml', nicotine: '26mg/ml', note: 'Value pack — 2 pods included · Battery sold separately', flavours: ['Sour Lemon','Watermelon Passionfruit','Pineapple Coconut','Strawberry Watermelon','Strawberry Mango'] },
      { name: 'Inmood Switch — Starter Kit', badge: 'STARTER KIT', badgeColor: '#00E5FF', puffs: '5,000 puffs', price: '$20.00', specs: '550mAh removable battery · USB-C · 1.0Ω mesh coil · Adjustable airflow · Child lock', nicotine: '26mg/ml or 16mg/ml', note: 'Includes battery device + 1 pre-filled pod', flavours: [] },
      { name: 'Inmood Switch — Battery Kit', badge: 'DEVICE', badgeColor: '#6b6b90', puffs: 'Device only', price: '$10.00', specs: '550mAh · USB-C · Adjustable airflow · Child lock', nicotine: 'Pods sold separately', note: 'Compatible with all Inmood Switch pods', flavours: [] },
      { name: 'Inmood Switch+ — Battery Kit (Upgraded)', badge: 'DEVICE', badgeColor: '#6b6b90', puffs: 'Device only', price: '$20.00', specs: '650mAh (upgraded) · USB-C · Adjustable airflow · Child lock', nicotine: 'Pods sold separately', note: 'On/Off: tap USB port 5 times · Compatible with all Switch pods', flavours: [] },
      { name: 'Inmood Prism — Starter Kit', badge: 'STARTER KIT', badgeColor: '#BF00FF', puffs: '15,000 puffs', price: '$30.00', specs: '1300mAh removable battery · 16ml · Dual mesh coils · USB-C · LED screen · Child lock', nicotine: '20mg/mL', note: 'Includes battery + pod', flavours: ['Cherry Blueberry','Strawberry Blueberry','Vanilla Spice','Sour Apple','Pineapple Coconut','Blackberry Cherry','Blueberry Raspberry','Raspberry Orange','Lemon Pineapple','Mango Grape','Watermelon Lychee','Strawberry Watermelon','Tropical Watermelon','Cherry Pomegranate','Watermelon Passionfruit','Strawberry Mango'] },
      { name: 'Inmood Prism — Replacement Pods 15K', badge: 'POD', badgeColor: '#BF00FF', puffs: '15,000 puffs', price: '$20.00', specs: '16ml · Dual mesh coils · Requires Prism Battery Kit', nicotine: '20mg/mL', note: 'Requires Inmood Prism Battery Kit (sold separately)', flavours: ['Cherry Blueberry','Strawberry Blueberry','Vanilla Spice','Sour Apple','Pineapple Coconut','Blackberry Cherry','Blueberry Raspberry','Raspberry Orange','Lemon Pineapple','Mango Grape','Watermelon Lychee','Strawberry Watermelon','Tropical Watermelon','Cherry Pomegranate','Watermelon Passionfruit','Strawberry Mango'] },
      { name: 'Inmood Prism 20K — Replacement Pods (Clear)', badge: 'POD', badgeColor: '#BF00FF', puffs: '20,000 puffs', price: '$20.00', specs: 'Clear transparent pod · 18.5ml', nicotine: '10mg or 28mg', note: 'Requires Inmood Prism Battery Kit (sold separately)', flavours: ['Blueberry','Grape Berry','Mint','Passionfruit Pineapple','Peach Blueberry','Pineapple','Pineapple Lemon','Pomegranate Kiwifruit','Sour Lemon','Strawberry Banana','Vanilla Spice'] },
      { name: 'Inmood Prism — Battery Kit', badge: 'DEVICE', badgeColor: '#6b6b90', puffs: 'Device only', price: '$15.00', specs: '1300mAh · USB-C · LED screen · Child lock', nicotine: 'Pods sold separately', note: 'Compatible with all Prism pods', flavours: [] },
      { name: 'Inmood 10K — Starter Kit', badge: 'STARTER KIT', badgeColor: '#FF2079', puffs: '10,000 puffs', price: '$25.00', specs: '15ml · 1.0Ω coil · PG:VG 55:45', nicotine: '26mg/ml (4% Nic Salt)', note: 'All flavours come with an icy cool finish · Includes battery + pod', flavours: ['Pineapple','Kiwifruit Pineapple','Mango Peach','Peach Apple','Cherry Pomegranate','Raspberry Grape','Blueberry Raspberry','Strawberry Kiwifruit','Banana Mango','Pear Lime','Cherry Berry','Strawberry Blueberry','Vanilla Spice','Grape Peach','Apple Grape','Strawberry Raspberry','Watermelon Blackberry','Blueberry Pomegranate','Sour Apple','Caramel Custard','Blueberry','Tobacco','Sour Mango','Sour Lemon','Strawberry Watermelon','Mint','Menthol','Grape Berry'] },
      { name: 'Inmood 10K — Replacement Pods', badge: 'POD', badgeColor: '#FF2079', puffs: '10,000 puffs', price: '$20.00', specs: '15ml · Requires Inmood 10K battery device', nicotine: '26mg/ml (4% Nic Salt)', note: 'All flavours come with an icy cool finish', flavours: ['Pineapple','Kiwifruit Pineapple','Mango Peach','Peach Apple','Cherry Pomegranate','Raspberry Grape','Blueberry Raspberry','Strawberry Kiwifruit','Banana Mango','Pear Lime','Cherry Berry','Strawberry Blueberry','Vanilla Spice','Grape Peach','Apple Grape','Strawberry Raspberry','Watermelon Blackberry','Blueberry Pomegranate','Sour Apple','Caramel Custard','Blueberry','Tobacco','Sour Mango','Sour Lemon','Strawberry Watermelon','Mint','Menthol','Grape Berry'] },
    ],
  },
  {
    name: 'WOTOFO',
    color: '#00E5FF',
    products: [
      { name: 'Wotofo nexPOD Stick — Starter Kit', badge: 'STARTER KIT', badgeColor: '#BF00FF', puffs: '3,500 puffs', price: '$9.99', specs: '5.5ml · Mesh coil · Rechargeable · USB-C', nicotine: '20mg/ml', note: 'Includes battery + pod', flavours: ['Banana','Sour Lemon','Sour Raspberry','Tropical','Peach','Kiwifruit Pineapple','Blue Razz Ice','Cool Mint','Cola Ice','Golden Tobacco','Grape Ice','Kiwi Guava Passionfruit','Menthol Ice','Orange Soda','Peach Blueberry Ice','Peach Lemonade','Sour Apple','Strawberry Mango','Watermelon Ice'] },
      { name: 'Wotofo nexPOD Stick — Replacement Pods', badge: 'POD', badgeColor: '#BF00FF', puffs: '3,500 puffs', price: '$9.99', specs: '5.5ml · Fits nexPOD Stick battery kit', nicotine: '20mg/ml', note: 'Pod only — battery sold separately', flavours: ['Banana','Sour Lemon','Sour Raspberry','Tropical','Peach','Kiwifruit Pineapple','Blue Razz Ice','Cool Mint','Cola Ice','Golden Tobacco','Grape Ice','Kiwi Guava Passionfruit','Menthol Ice','Orange Soda','Peach Blueberry Ice','Peach Lemonade','Sour Apple','Strawberry Mango','Watermelon Ice'] },
      { name: 'Wotofo nexPOD Stick — Battery Kit', badge: 'DEVICE', badgeColor: '#6b6b90', puffs: 'Device only', price: '$10.00', specs: 'Rechargeable battery · USB-C', nicotine: 'Pods sold separately', note: 'Device only — pods sold separately', flavours: [] },
      { name: 'Wotofo Nexpod 25K — Prefilled Starter Kit', badge: 'STARTER KIT', badgeColor: '#00E5FF', puffs: '25,000 puffs', price: '$30.00', specs: '18.5ml · 0.5Ω dual mesh · 1000mAh · USB-C · LED screen · Dual modes · Child lock', nicotine: '20mg/ml or 26.5mg/ml', note: 'Includes battery + pod', flavours: ['Banana','Blackberry Cherry','Blackberry Pomegranate','Blueberry Raspberry','Blueberry Watermelon','Cherry Blueberry','Citrus Sweet','Lychee Passionfruit','Mango Mango','Menthol','Mint','Peach Apple','Peach Watermelon','Peppermint','Pineapple Coconut','Pineapple Mango','Sour Apple','Sour Lemon','Spearmint','Strawberry Cream','Strawberry Grape','Strawberry Lemon','Sweet Cream','Sweet Watermelon','Tobacco','Tropical','Vanilla Spice','Watermelon Passionfruit'] },
      { name: 'Wotofo Nexpod 25K — Replacement Pods', badge: 'POD', badgeColor: '#00E5FF', puffs: '25,000 puffs', price: '$20.00', specs: '18.5ml · 0.5Ω dual mesh · Fits Nexpod 25K device', nicotine: '20mg/ml', note: 'Pod only — requires Nexpod 25K battery device', flavours: ['Banana','Blackberry Cherry','Blackberry Pomegranate','Blueberry Raspberry','Blueberry Watermelon','Cherry Blueberry','Citrus Sweet','Lychee Passionfruit','Mango Mango','Menthol','Mint','Peach Apple','Peach Watermelon','Peppermint','Pineapple Coconut','Pineapple Mango','Sour Apple','Sour Lemon','Spearmint','Strawberry Cream','Strawberry Grape','Strawberry Lemon','Sweet Cream','Sweet Watermelon','Tobacco','Tropical','Vanilla Spice','Watermelon Passionfruit'] },
    ],
  },
]

function ProductCard({ product, brandColor }: { product: (typeof BRANDS)[0]['products'][0]; brandColor: string }) {
  const [open, setOpen] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const PREVIEW = 14

  return (
    <div className="group relative transition-all duration-500" style={{ background: open ? `linear-gradient(135deg, ${brandColor}08 0%, transparent 60%)` : 'transparent' }}>
      <div className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-500" style={{ background: open ? `linear-gradient(to bottom, ${brandColor}, ${brandColor}00)` : `linear-gradient(to bottom, ${brandColor}30, transparent)` }} />
      <button onClick={() => setOpen(!open)} className="w-full text-left pl-6 pr-5 py-5 flex items-center justify-between gap-4 group-hover:pl-8 transition-all duration-300">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2.5 flex-wrap">
            <span className="font-mono text-[9px] tracking-[0.25em] px-2.5 py-1 uppercase" style={{ color: product.badgeColor, background: product.badgeColor + '12', border: `1px solid ${product.badgeColor}30` }}>{product.badge}</span>
            <span className="font-mono text-[10px] text-white tracking-wider">{product.puffs}</span>
            {product.flavours.length > 0 && (<span className="font-mono text-[9px] tracking-wider px-2 py-0.5" style={{ color: brandColor, background: brandColor + '0a' }}>{product.flavours.length} flavours</span>)}
          </div>
          <h3 className="font-orbitron font-bold text-xs sm:text-sm md:text-base tracking-wide leading-snug" style={{ color: '#fff' }}>{product.name}</h3>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          {product.price && (<span className="font-orbitron font-black text-sm md:text-lg tracking-wider" style={{ color: brandColor, textShadow: open ? `0 0 20px ${brandColor}80` : 'none' }}>{product.price}</span>)}
          <div className="w-7 h-7 flex items-center justify-center border transition-all duration-300" style={{ borderColor: open ? brandColor : brandColor + '30', background: open ? brandColor + '15' : 'transparent' }}>
            <span className="font-orbitron text-sm font-bold leading-none transition-transform duration-300 block" style={{ color: brandColor, transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
          </div>
        </div>
      </button>
      {open && (
        <div className="pl-6 pr-5 pb-6">
          <div className="h-px mb-5" style={{ background: `linear-gradient(to right, ${brandColor}30, transparent)` }} />
          <div className="grid grid-cols-1 gap-3 mb-4">
            <div>
              <p className="font-mono text-[9px] tracking-[0.3em] text-white uppercase mb-1">Specifications</p>
              <p className="font-mono text-[11px] text-white leading-relaxed">{product.specs}</p>
            </div>
            <div>
              <p className="font-mono text-[9px] tracking-[0.3em] text-white uppercase mb-1">Nicotine</p>
              <p className="font-mono text-[12px] text-white">{product.nicotine}</p>
              {product.note && (<p className="font-mono text-[11px] text-white italic mt-1">{product.note}</p>)}
            </div>
          </div>
          {product.flavours.length > 0 && (
            <div>
              <p className="font-mono text-[9px] tracking-[0.3em] text-white uppercase mb-3">Available Flavours — {product.flavours.length} options</p>
              <div className="flex flex-wrap gap-1.5">
                {(showAll ? product.flavours : product.flavours.slice(0, PREVIEW)).map((f) => (
                  <span key={f} className="font-mono text-[10px] px-2.5 py-1 tracking-wide" style={{ color: '#fff', background: brandColor + '0c', border: `1px solid ${brandColor}25` }}>{f}</span>
                ))}
                {product.flavours.length > PREVIEW && (
                  <button onClick={(e) => { e.stopPropagation(); setShowAll(!showAll) }} className="font-mono text-[10px] px-2.5 py-1 text-white" style={{ border: '1px solid rgba(255,255,255,0.4)' }}>
                    {showAll ? '▲ collapse' : `+${product.flavours.length - PREVIEW} more flavours`}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      <div className="ml-6 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
    </div>
  )
}

export default function ProductsSection() {
  const [activeBrand, setActiveBrand] = useState(0)
  const brand = BRANDS[activeBrand]

  return (
    <section className="relative bg-black pt-10 pb-16 px-4 sm:px-6 md:px-8 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full pointer-events-none" style={{ background: `radial-gradient(ellipse, ${brand.color}06 0%, transparent 70%)`, filter: 'blur(60px)' }} />

      <div className="relative max-w-5xl mx-auto">
        <div className="mb-14">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-8" style={{ background: brand.color }} />
            <p className="font-mono text-[10px] tracking-[0.5em] uppercase text-white">02 — Our Products</p>
          </div>
          <h2 className="font-orbitron font-black text-3xl sm:text-4xl md:text-6xl text-white leading-none mb-4 tracking-tight">
            What We <span style={{ color: brand.color, textShadow: `0 0 40px ${brand.color}60` }}>Stock</span>
          </h2>
          <p className="font-mono text-xs text-white max-w-lg leading-relaxed tracking-wider">
            Product names and specifications only · No product images displayed · NZ Smokefree Environments Act compliant
          </p>
          <div className="mt-6 inline-flex items-center gap-3 px-4 py-2.5" style={{ border: '1px solid rgba(234,179,8,0.3)', background: 'rgba(234,179,8,0.04)' }}>
            <span className="text-yellow-400 text-xs">⚠</span>
            <p className="font-mono text-[10px] text-white tracking-wider">Vaping products may contain nicotine — a highly addictive substance · 18+ only</p>
          </div>
        </div>

        <div className="flex gap-4 sm:gap-6 mb-8 flex-wrap">
          {BRANDS.map((b, i) => (
            <button key={b.name} onClick={() => setActiveBrand(i)} className="relative font-orbitron text-sm tracking-[0.25em] transition-all duration-300 bg-transparent border-none outline-none cursor-pointer"
              style={{ color: '#fff', fontWeight: 900, padding: '0.5rem 0', borderBottom: activeBrand === i ? '2px solid #fff' : '2px solid transparent' }}>
              {b.name}
              <span className="ml-2 font-mono text-[10px] text-white">{b.products.length}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${brand.color}25, transparent)` }} />
          <span className="font-mono text-[10px] tracking-[0.4em] text-white">{brand.products.length} PRODUCTS</span>
          <div className="h-px w-8" style={{ background: `${brand.color}30` }} />
        </div>

        <div className="overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
         {brand.products.map((p) => (<ProductCard key={p.name} product={p} brandColor={brand.color} />))}
        </div>

        <div className="mt-10 px-6 py-4" style={{ border: '1px solid rgba(191,0,255,0.2)', background: 'linear-gradient(135deg, rgba(191,0,255,0.04), transparent)' }}>
          <div className="flex items-start gap-3">
            <div className="w-px self-stretch min-h-[3rem]" style={{ background: 'rgba(191,0,255,0.3)' }} />
            <p className="font-mono text-[10px] text-white leading-relaxed tracking-wider">
              <span className="text-violet-400 font-bold uppercase tracking-widest">Important Notice · </span>
              All products sold at Birkenhead Vape Shop are for use by persons aged 18+ only.
              Regulated under the Smokefree Environments and Regulated Products Act 1990.
              Vaping is not without risk. Visit <span className="text-cyan-400">health.govt.nz</span> for more information.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
