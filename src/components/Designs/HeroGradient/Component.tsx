import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export const HeroGradientComponent = ({ pillText, heading, subheading, actions, image }) => (
  <section className="relative overflow-hidden py-24 lg:py-32 bg-background">
    {/* Gradient Background Effect */}
    <div className="absolute top-0 -z-10 h-full w-full bg-white dark:bg-black">
      <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
    </div>

    <div className="container flex flex-col items-center text-center gap-8">
      {pillText && (
        <Badge variant="secondary" className="px-4 py-1 rounded-full text-sm">
          {pillText}
        </Badge>
      )}
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-tight">
        {heading}
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl">{subheading}</p>

      <div className="flex gap-4">
        {actions?.map((btn, i) => (
          <Button key={i} variant={btn.type} size="lg" asChild>
            <a href={btn.link}>{btn.label}</a>
          </Button>
        ))}
      </div>

      {image && (
        <div className="mt-12 rounded-xl border bg-muted/50 p-2 shadow-2xl">
          <Image src={image.url} width={1200} height={800} alt="Dashboard" className="rounded-lg" />
        </div>
      )}
    </div>
  </section>
)
