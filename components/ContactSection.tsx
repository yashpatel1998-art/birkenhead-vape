export default function ContactSection() {
  return (
    <section id="contact" className="py-32 bg-black relative">
      <div className="max-w-[700px] mx-auto px-6 text-center">
        <div className="font-mono text-cyan mb-4 tracking-widest">// 04 — Contact</div>
        <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-white mb-6">Get In Touch</h2>
        <p className="text-text/80 text-lg mb-12">
          Have questions or need expert guidance?<br className="hidden md:block"/>
          Visit us in store or give us a call — our team is always happy to help.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16 text-left">
          <div className="border border-dark3 bg-dark2/50 p-6">
            <div className="text-cyan mb-2">📍 Address</div>
            <div className="font-mono text-sm text-text/80">45 Birkenhead Ave, Birkenhead, Auckland 0626</div>
          </div>
          <div className="border border-dark3 bg-dark2/50 p-6">
            <div className="text-cyan mb-2">📞 Phone</div>
            <a href="tel:0223286322" className="font-mono text-sm text-text/80 hover:text-cyan transition-colors">022 328 6322</a>
          </div>
          <div className="border border-dark3 bg-dark2/50 p-6">
            <div className="text-cyan mb-2">🕐 Mon–Sat</div>
            <div className="font-mono text-sm text-text/80">08:00 — 21:00</div>
          </div>
          <div className="border border-dark3 bg-dark2/50 p-6">
            <div className="text-cyan mb-2">🕐 Sunday</div>
            <div className="font-mono text-sm text-text/80">08:00 — 20:00</div>
          </div>
        </div>

        <div className="border-l-4 border-violet bg-dark2/30 p-6 text-left">
          <p className="font-mono text-xs md:text-sm text-muted leading-relaxed">
            "Important Notice: All products sold at Birkenhead Vape
            Shop are for use by persons aged 18 years and over only.
            Vaping products are regulated under the Smokefree
            Environments and Regulated Products Act 1990.
            Vaping is not without risk. For more information,
            visit the NZ Ministry of Health."
          </p>
        </div>
      </div>
    </section>
  )
}
