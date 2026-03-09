import { FAQComponent } from '@/components/Designs/FAQ/Component'
import { TestimonialComponent } from '@/components/Designs/Testimonials/Component'
import { TableComponent } from '@/components/Designs/Table/Component'
import { RichTextComponent } from '@/blocks/RichTextContent/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { BuildYourOwnSectionComponent } from '@/blocks/Composable/Component'
import { AtomicRendererMap } from '@/blocks/Composable/Atoms/renderder'

const blockMap = {
  formBlock: FormBlock,
  'richtext-content': RichTextComponent,
  faq: FAQComponent,
  testimonialCarousel: TestimonialComponent,
  smartTable: TableComponent,
  buildYourOwnSection: BuildYourOwnSectionComponent,

  ...AtomicRendererMap,
}

export const RenderBlocks = ({ blocks }) => {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block, i) => {
        const Component = blockMap[block.blockType]

        if (!Component) {
          console.warn(`Missing renderer for block: ${block.blockType}`)
          return null
        }

        return <Component key={i} {...block} />
      })}
    </>
  )
}
