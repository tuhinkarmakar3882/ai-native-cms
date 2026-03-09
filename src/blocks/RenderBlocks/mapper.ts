import { FormBlock } from '@/blocks/Form/Component'
import { RichTextComponent } from '@/blocks/RichTextContent/Component'
import { FAQComponent } from '@/components/Designs/FAQ/Component'
import { TestimonialComponent } from '@/components/Designs/Testimonials/Component'
import { TableComponent } from '@/components/Designs/Table/Component'
import { BuildYourOwnSectionComponent } from '@/blocks/Composable/Component'
import { AtomicRendererMap } from '@/blocks/Composable/Atoms/renderder'

const PremadeRendererMap = {
  formBlock: FormBlock,
  'richtext-content': RichTextComponent,
  faq: FAQComponent,
  testimonialCarousel: TestimonialComponent,
  smartTable: TableComponent,
}

export const AvailableRenderBlocks = {
  ...AtomicRendererMap,
  ...PremadeRendererMap,

  buildYourOwnSection: BuildYourOwnSectionComponent,
}
