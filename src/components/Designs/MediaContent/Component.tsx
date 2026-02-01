import { Button } from '@/components/ui/button'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import RichText from '@/components/RichText'
import Image from 'next/image'

export const MediaContentComponent = (props) => {
  const { image, imageSide, heading, body, cta } = props

  return (
    <section className="container py-8 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div
        className={`flex flex-col md:flex-row items-center gap-12 ${imageSide === 'right' ? 'md:flex-row-reverse' : ''}`}
      >
        <div className="w-full md:w-1/2">
          <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden rounded-xl">
            <Image src={image.url} alt={image.alt || heading} fill className="object-cover" />
          </AspectRatio>
        </div>
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">{heading}</h2>
          <RichText data={body} enableGutter={false} />
          {cta?.label && (
            <Button variant={cta.variant} asChild>
              <a href={cta.link}>{cta.label}</a>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
