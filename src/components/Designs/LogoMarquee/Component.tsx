import Image from 'next/image'

export const LogoMarqueeComponent = ({ logos }) => (
  <section className="py-12 border-y bg-slate-50/50">
    <div className="container overflow-hidden">
      <div className="flex gap-16 animate-marquee whitespace-nowrap">
        {[...logos, ...logos].map(
          (
            logo,
            i, // Duplicated for infinite loop
          ) => (
            <div
              key={i}
              className="relative w-32 h-12 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
            >
              <Image src={logo.image.url} fill className="object-contain" alt="Logo" />
            </div>
          ),
        )}
      </div>
    </div>
  </section>
)
