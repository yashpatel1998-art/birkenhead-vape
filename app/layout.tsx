import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.birkenheadvape.co.nz'),
  title: 'Birkenhead Vape Shop | INMOOD · WOTOFO · Slapple · Cloudys — Auckland NZ',
  description: 'Auckland\'s premium vape shop in Birkenhead. Stock INMOOD Switch, Prism & 10K pods, Wotofo Nexpod 25K, Slapple e-liquid, Cloudys e-liquid. 50+ flavours. Open 7 days. 18+ only.',
  keywords: [
    // Brand keywords
    'INMOOD pods NZ', 'INMOOD Switch Auckland', 'INMOOD Prism NZ', 'INMOOD 10K Auckland',
    'Wotofo NZ', 'Wotofo Nexpod 25K Auckland', 'Wotofo nexPOD NZ',
    'Slapple e-liquid NZ', 'Slapple vape juice Auckland',
    'Cloudys e-liquid NZ', 'Cloudys vape Auckland',
    // Location keywords
    'vape shop Auckland', 'vape shop Birkenhead', 'vape store Auckland',
    'buy vape Auckland', 'vape pods Auckland', 'e-liquid Auckland NZ',
    'nicotine pods Auckland', 'pod vape NZ',
    // Product keywords
    'nic salt vape NZ', 'disposable pods Auckland', 'vape starter kit NZ',
    'replacement pods Auckland', 'best vape shop NZ',
  ].join(', '),
  authors: [{ name: 'Birkenhead Vape Shop' }],
  creator: 'Birkenhead Vape Shop',
  publisher: 'Birkenhead Vape Shop',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_NZ',
    url: 'https://www.birkenheadvape.co.nz',
    siteName: 'Birkenhead Vape Shop',
    title: 'Birkenhead Vape Shop | INMOOD · WOTOFO · Slapple · Cloudys — Auckland NZ',
    description: 'Auckland\'s premium vape shop. INMOOD, Wotofo, Slapple & Cloudys. 50+ flavours. Birkenhead, Auckland. Open 7 days.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Birkenhead Vape Shop Auckland' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Birkenhead Vape Shop | Auckland NZ',
    description: 'Premium vape shop in Birkenhead Auckland. INMOOD, Wotofo, Slapple & Cloudys. 50+ flavours. Open 7 days.',
  },
  alternates: {
    canonical: 'https://www.birkenheadvape.co.nz',
  },
  verification: {
    google: 'ADD_YOUR_GOOGLE_VERIFICATION_CODE_HERE',
  },
}

import SmoothScroll from '../components/SmoothScroll'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NZ">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        {/* Local Business Schema — tells Google exactly what your business is */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Store',
              name: 'Birkenhead Vape Shop',
              description: 'Premium vape shop in Birkenhead, Auckland selling INMOOD, Wotofo, Slapple and Cloudys products.',
              url: 'https://www.birkenheadvape.co.nz',
              telephone: '+64223286322',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '45 Birkenhead Avenue',
                addressLocality: 'Birkenhead',
                addressRegion: 'Auckland',
                postalCode: '0626',
                addressCountry: 'NZ',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: -36.8109,
                longitude: 174.7398,
              },
              openingHoursSpecification: [
                { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '08:00', closes: '21:00' },
                { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '08:00', closes: '20:00' },
              ],
              priceRange: '$10 - $35',
              currenciesAccepted: 'NZD',
              paymentAccepted: 'Cash, Credit Card',
              hasMap: 'https://share.google/ycGj6DsMJHuL7Iajz',
              sameAs: [],
            })
          }}
        />

        {/* Product catalog schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'Vape Products — Birkenhead Vape Shop',
              description: 'Premium vape pods, devices and e-liquids available at Birkenhead Vape Shop, Auckland.',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'INMOOD Switch Replacement Pod 26mg', description: '5,000 puffs · 10ml · 26mg/ml nic salt · 38 flavours', offers: { '@type': 'Offer', price: '15.00', priceCurrency: 'NZD', availability: 'https://schema.org/InStock' } },
                { '@type': 'ListItem', position: 2, name: 'INMOOD Prism Starter Kit', description: '15,000 puffs · 1300mAh · 16ml · 16 flavours', offers: { '@type': 'Offer', price: '30.00', priceCurrency: 'NZD', availability: 'https://schema.org/InStock' } },
                { '@type': 'ListItem', position: 3, name: 'Wotofo Nexpod 25K Starter Kit', description: '25,000 puffs · 18.5ml · dual mesh · 28 flavours', offers: { '@type': 'Offer', price: '30.00', priceCurrency: 'NZD', availability: 'https://schema.org/InStock' } },
                { '@type': 'ListItem', position: 4, name: 'Slapple E-Liquid 20mg', description: '20mg nic salt · 15 flavours · made for pod systems', offers: { '@type': 'Offer', price: '25.00', priceCurrency: 'NZD', availability: 'https://schema.org/InStock' } },
                { '@type': 'ListItem', position: 5, name: 'Cloudys E-Liquid 30ml', description: 'Nic salt · 3 strengths (11mg/20mg/28mg) · 18 flavours', offers: { '@type': 'Offer', price: '25.00', priceCurrency: 'NZD', availability: 'https://schema.org/InStock' } },
              ],
            })
          }}
        />
      </head>
      <body><SmoothScroll>{children}</SmoothScroll></body>
    </html>
  )
}
