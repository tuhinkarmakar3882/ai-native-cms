import { FormBlock } from '@/blocks/Form/Component'
import { RichTextComponent } from '@/blocks/RichTextContent/Component'
import { FAQComponent } from '@/components/Designs/FAQ/Component'
import { TestimonialComponent } from '@/components/Designs/Testimonials/Component'
import { TableComponent } from '@/components/Designs/Table/Component'
import { BuildYourOwnSectionComponent } from '@/blocks/Composable/Component'
import { AtomicRendererMap } from '@/blocks/Composable/Atoms/renderder'
import { MediaViewerComponent } from '@/blocks/MediaViewer/Component'

const PremadeRendererMap = {
  'richtext-content': RichTextComponent,
  formBlock: FormBlock,
  smartTable: TableComponent,
  faq: FAQComponent,

  testimonialCarousel: TestimonialComponent,
  mediaViewer: MediaViewerComponent,
}

export const AvailableRenderBlocks = {
  ...AtomicRendererMap,
  ...PremadeRendererMap,

  buildYourOwnSection: BuildYourOwnSectionComponent,
}
