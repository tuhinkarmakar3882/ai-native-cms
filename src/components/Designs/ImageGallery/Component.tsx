import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'

export const ImageGalleryComponent = (props) => {
  const { title, images } = props
  return (
    <section className="container py-20">
      {title && <h2 className="text-3xl font-bold mb-10 text-center">{title}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images?.map((item, i) => (
          <div key={i} className="group relative">
            <AspectRatio ratio={1} className="overflow-hidden rounded-md bg-muted">
              {item?.image?.url && (
                <Image
                  src={item.image.url}
                  alt={item.caption || 'Gallery Image'}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
            </AspectRatio>
            {item.caption && (
              <p className="mt-2 text-xs text-muted-foreground italic text-center">
                {item.caption}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
