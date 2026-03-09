import { FAQComponent } from '@/components/Designs/FAQ/Component'
import { TestimonialComponent } from '@/components/Designs/Testimonials/Component'
import { DynamicIcon } from 'lucide-react/dynamic'
import { TableComponent } from '@/components/Designs/Table/Component'
import { RichTextComponent } from '@/blocks/RichTextContent/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { BuildYourOwnSectionComponent } from '@/blocks/Composable/Component'
import { Button } from '@/components/ui/button'
import RichText from '@/components/RichText'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/utilities/ui'
import Image from 'next/image'

const Icon = ({ name, ...props }: { name: string; [key: string]: any }) => {
  return <DynamicIcon name={name} {...props} />
}
const spacingMap = { small: 'my-4', medium: 'my-8', large: 'my-16' }
const blockMap = {
  formBlock: FormBlock,
  'richtext-content': RichTextComponent,
  faq: FAQComponent,
  testimonialCarousel: TestimonialComponent,
  smartTable: TableComponent,
  buildYourOwnSection: BuildYourOwnSectionComponent,

  // ButtonAtom,
  //   TextAtom,
  //   SeparatorAtom,
  //   ImageAtom,
  //   IconAtom,
  //   VideoAtom,
  // Atoms (Used inside ComposableSection)
  buttonAtom: (props) => <Button variant={props.variant}>{props.label}</Button>,
  textAtom: (props) => (
    <div className="prose">
      <RichText data={props.content} enableGutter={false} enableProse={false} />
    </div>
  ),
  separatorAtom: ({ spacing }) => <Separator className={spacingMap[spacing]} />,
  imageAtom: ({ image, aspectRatio, caption }) => (
    <figure className="w-full space-y-2">
      <div
        className={cn('relative overflow-hidden rounded-lg', {
          'aspect-video': aspectRatio === 'video',
          'aspect-square': aspectRatio === 'square',
          'aspect-[21/9]': aspectRatio === 'wide',
        })}
      >
        {image?.url && (
          <Image src={image.url} alt={image.alt || ''} fill className="object-cover" />
        )}
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  ),
  iconAtom: ({ iconName, size, color }) => (
    <div style={{ color }}>
      <Icon name={iconName} size={size} />
    </div>
  ),
  videoAtom: ({ url, controls }) => (
    <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
      <video
        src={url}
        controls={controls}
        className="w-full h-full"
        loop={!controls}
        autoPlay={!controls}
        muted={!controls}
      />
    </div>
  ),
}

export const RenderBlocks = ({ blocks }) => {
  if (!blocks) return null
  return (
    <>
      {blocks.map((block, i) => {
        const Component = blockMap[block.blockType]
        return Component ? <Component key={i} {...block} /> : null
      })}
    </>
  )
}
