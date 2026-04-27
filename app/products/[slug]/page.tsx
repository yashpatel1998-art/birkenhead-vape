import { Metadata } from 'next'
import { BRANDS, slugify, getAllProducts } from '@/lib/data'
import Link from 'next/link'

const F = "'Aharoni','Arial Black',Arial,sans-serif"

// Generate all product URLs at build time
export function generateStaticParams() {
  return getAllProducts().map(p => ({ slug: p.slug }))
}

// Dynamic SEO metadata per product
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const products = getAllProducts()
  const product = products.find(p => p.slug === params.slug)
  if (!product) return { title: 'Product Not Found' }

  const title = `${product.name} | Birkenhead Vape Shop Auckland`
  const description = `${product.name} — ${product.specs}. ${product.flavours.length} flavours available. ${product.price}. Buy at Birkenhead Vape Shop, Auckland NZ. Open 7 days.`

  return {
    title,
    description,
    keywords: [
      product.name, `${product.name} NZ`, `${product.name} Auckland`,
      `buy ${product.name}`, product.brandName,
      `${product.brandName} NZ`, 'vape shop Auckland',
      ...product.flavours.slice(0, 5),
    ].join(', '),
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://www.birkenheadvape.co.nz/products/${params.slug}`,
    },
    alternates: {
      canonical: `https://www.birkenheadvape.co.nz/products/${params.slug}`,
    },
  }
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const products = getAllProducts()
  const product = products.find(p => p.slug === params.slug)

  if (!product) {
    return (
      <div style={{ background:'#000', color:'#fff', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:F }}>
        <div style={{ textAlign:'center' }}>
          <h1 style={{ fontSize:'2rem', margin:'0 0 1rem' }}>Product Not Found</h1>
          <Link href="/#products" style={{ color:'#00E5FF', textDecoration:'none', letterSpacing:'0.2em', fontSize:12 }}>← BACK TO PRODUCTS</Link>
        </div>
      </div>
    )
  }

  // Find related products from same brand
  const brand = BRANDS.find(b => b.name === product.brandName)
  const related = brand?.products.filter(p => p.name !== product.name).slice(0, 4) || []

  // Product schema for Google
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.specs,
    brand: { '@type': 'Brand', name: product.brandName },
    offers: {
      '@type': 'Offer',
      price: product.price.replace('$', ''),
      priceCurrency: 'NZD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Store',
        name: 'Birkenhead Vape Shop',
        address: { '@type': 'PostalAddress', streetAddress: '45 Birkenhead Avenue', addressLocality: 'Birkenhead', addressRegion: 'Auckland', postalCode: '0626', addressCountry: 'NZ' },
      },
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div style={{ background:'#000', color:'#fff', minHeight:'100vh', fontFamily:F }}>

        {/* Nav bar */}
        <nav style={{ padding:'1.5rem 2rem', display:'flex', alignItems:'center', justifyContent:'space-between', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/" style={{ color:'#fff', textDecoration:'none', fontWeight:900, fontSize:'1rem', letterSpacing:'0.15em' }}>
            BIRKENHEAD <span style={{ color:'#00E5FF' }}>VAPE SHOP</span>
          </Link>
          <Link href="/#products" style={{ color:'rgba(255,255,255,0.5)', textDecoration:'none', fontSize:10, letterSpacing:'0.3em' }}>
            ← ALL PRODUCTS
          </Link>
        </nav>

        {/* Product content */}
        <div style={{ maxWidth:900, margin:'0 auto', padding:'4rem 2rem 6rem' }}>

          {/* Breadcrumb */}
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:'2rem', flexWrap:'wrap' }}>
            <Link href="/" style={{ color:'rgba(255,255,255,0.3)', textDecoration:'none', fontSize:10, letterSpacing:'0.2em' }}>HOME</Link>
            <span style={{ color:'rgba(255,255,255,0.15)', fontSize:10 }}>›</span>
            <Link href="/#products" style={{ color:'rgba(255,255,255,0.3)', textDecoration:'none', fontSize:10, letterSpacing:'0.2em' }}>PRODUCTS</Link>
            <span style={{ color:'rgba(255,255,255,0.15)', fontSize:10 }}>›</span>
            <span style={{ color:'rgba(255,255,255,0.5)', fontSize:10, letterSpacing:'0.2em' }}>{product.brandName}</span>
            <span style={{ color:'rgba(255,255,255,0.15)', fontSize:10 }}>›</span>
            <span style={{ color:'#00E5FF', fontSize:10, letterSpacing:'0.2em' }}>{product.name}</span>
          </div>

          {/* Brand + Badge */}
          <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:'1rem', flexWrap:'wrap' }}>
            <span style={{ fontSize:9, letterSpacing:'0.25em', padding:'4px 12px', color:product.brandColor || '#00E5FF', background:`${product.brandColor || '#00E5FF'}18`, border:`1px solid ${product.brandColor || '#00E5FF'}40`, borderRadius:4 }}>
              {product.brandName}
            </span>
            <span style={{ fontSize:9, letterSpacing:'0.25em', padding:'4px 12px', color:product.badgeColor, background:`${product.badgeColor}18`, border:`1px solid ${product.badgeColor}40`, borderRadius:4 }}>
              {product.badge}
            </span>
          </div>

          {/* Product name */}
          <h1 style={{ fontWeight:900, fontSize:'clamp(1.8rem,5vw,3.5rem)', lineHeight:1.1, margin:'0 0 1.5rem', letterSpacing:'-0.02em' }}>
            {product.name}
          </h1>

          {/* Price */}
          <p style={{ fontWeight:900, fontSize:'clamp(1.5rem,4vw,2.5rem)', color:'#00E5FF', margin:'0 0 2rem' }}>
            {product.price}
          </p>

          {/* Divider */}
          <div style={{ height:1, background:'rgba(255,255,255,0.08)', margin:'0 0 2rem' }} />

          {/* Specs */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'1.5rem', marginBottom:'2rem' }}>
            {product.puffs && product.puffs !== '—' && (
              <div>
                <p style={{ fontSize:9, color:'rgba(255,255,255,0.35)', letterSpacing:'0.3em', margin:'0 0 4px' }}>PUFFS</p>
                <p style={{ fontSize:14, color:'#fff', margin:0 }}>{product.puffs}</p>
              </div>
            )}
            <div>
              <p style={{ fontSize:9, color:'rgba(255,255,255,0.35)', letterSpacing:'0.3em', margin:'0 0 4px' }}>NICOTINE</p>
              <p style={{ fontSize:14, color:'#fff', margin:0 }}>{product.nicotine}</p>
            </div>
            <div>
              <p style={{ fontSize:9, color:'rgba(255,255,255,0.35)', letterSpacing:'0.3em', margin:'0 0 4px' }}>TYPE</p>
              <p style={{ fontSize:14, color:'#fff', margin:0 }}>{product.badge}</p>
            </div>
          </div>

          {/* Details */}
          <div style={{ padding:'1.5rem', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, marginBottom:'2rem' }}>
            <p style={{ fontSize:9, color:'rgba(255,255,255,0.35)', letterSpacing:'0.3em', margin:'0 0 8px' }}>SPECIFICATIONS</p>
            <p style={{ fontSize:13, color:'rgba(255,255,255,0.7)', lineHeight:1.8, margin:0 }}>{product.specs}</p>
            {product.note && (
              <p style={{ fontSize:12, color:'rgba(255,255,255,0.45)', marginTop:8, fontStyle:'italic' }}>{product.note}</p>
            )}
          </div>

          {/* Flavours */}
          {product.flavours.length > 0 && (
            <div style={{ marginBottom:'2rem' }}>
              <p style={{ fontSize:9, color:'rgba(255,255,255,0.35)', letterSpacing:'0.3em', margin:'0 0 12px' }}>
                {product.flavours.length} FLAVOURS AVAILABLE
              </p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                {product.flavours.map(f => (
                  <span key={f} style={{
                    fontSize:10, padding:'5px 12px', borderRadius:20,
                    color:'rgba(255,255,255,0.7)',
                    background:'rgba(255,255,255,0.05)',
                    border:'1px solid rgba(255,255,255,0.1)',
                  }}>{f}</span>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div style={{ padding:'2rem', background:'rgba(0,229,255,0.05)', border:'1px solid rgba(0,229,255,0.2)', borderRadius:12, textAlign:'center', marginBottom:'3rem' }}>
            <p style={{ fontSize:11, color:'rgba(255,255,255,0.5)', letterSpacing:'0.2em', margin:'0 0 8px' }}>AVAILABLE AT</p>
            <p style={{ fontWeight:900, fontSize:'1.2rem', margin:'0 0 4px' }}>Birkenhead Vape Shop</p>
            <p style={{ fontSize:11, color:'rgba(255,255,255,0.4)', margin:'0 0 16px' }}>45 Birkenhead Avenue, Auckland 0626</p>
            <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap' }}>
              <a href="https://wa.me/64223286322" target="_blank" rel="noopener noreferrer"
                style={{ padding:'0.8rem 2rem', background:'rgba(37,211,102,0.15)', border:'1px solid rgba(37,211,102,0.5)', borderRadius:8, color:'#25D366', textDecoration:'none', fontSize:11, letterSpacing:'0.2em' }}>
                WHATSAPP ↗
              </a>
              <a href="https://maps.google.com/?q=45+Birkenhead+Avenue+Auckland" target="_blank" rel="noopener noreferrer"
                style={{ padding:'0.8rem 2rem', background:'rgba(0,229,255,0.1)', border:'1px solid rgba(0,229,255,0.4)', borderRadius:8, color:'#00E5FF', textDecoration:'none', fontSize:11, letterSpacing:'0.2em' }}>
                GET DIRECTIONS ↗
              </a>
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div>
              <p style={{ fontSize:9, color:'rgba(255,255,255,0.35)', letterSpacing:'0.3em', margin:'0 0 16px' }}>
                MORE FROM {product.brandName}
              </p>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:'1rem' }}>
                {related.map(r => (
                  <Link key={r.name} href={`/products/${slugify(r.name)}`}
                    style={{ padding:'1.2rem', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, textDecoration:'none', color:'#fff', transition:'border-color 0.2s' }}>
                    <span style={{ fontSize:8, letterSpacing:'0.2em', color:r.badgeColor, display:'block', marginBottom:6 }}>{r.badge}</span>
                    <span style={{ fontSize:12, display:'block', marginBottom:6 }}>{r.name}</span>
                    <span style={{ fontSize:14, fontWeight:900, color:'#00E5FF' }}>{r.price}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Health warning */}
          <div style={{ marginTop:'3rem', padding:'1rem 1.3rem', border:'1px solid rgba(234,179,8,0.3)', borderRadius:8 }}>
            <p style={{ fontSize:9, color:'rgba(255,255,255,0.4)', letterSpacing:'0.15em', lineHeight:1.8, margin:0 }}>
              <span style={{ color:'#fbbf24' }}>⚠ </span>
              Vaping products may contain nicotine which is a highly addictive substance. 18+ only. Regulated under the Smokefree Environments and Regulated Products Act 1990.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
