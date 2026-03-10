import { FormBlockComponent } from '@/blocks/Form/Component'
import { RichTextComponent } from '@/blocks/RichTextContent/Component'
import { FAQComponent } from '@/components/Designs/FAQ/Component'
import { TestimonialComponent } from '@/components/Designs/Testimonials/Component'
import { TableComponent } from '@/components/Designs/Table/Component'
import { BuildYourOwnSectionComponent } from '@/blocks/Composable/Component'
import { AtomicRendererMap } from '@/blocks/Composable/Atoms/renderder'
import { MediaViewerComponent } from '@/blocks/MediaViewer/Component'
import { HeroBannerComponent } from '@/components/Designs/HeroBanner/Component'
import { BentoGridComponent } from '@/components/Designs/BentoGrid/Component'
import { FeatureTabsComponent } from '@/components/Designs/FeatureTabs/Component'
import { FeatureGridComponent } from '@/components/Designs/FeatureGrid/Component'
import { PricingComponent } from '@/components/Designs/Pricing/Component'
import { TimelineComponent } from '@/components/Designs/Timeline/Component'
import { BannerBlockComponent } from '@/blocks/Banner/Component'
import { RevealOnScrollComponent } from '@/components/Designs/Animations/RevealOnScroll/Component'
import { StickyScrollSectionComponent } from '@/components/Designs/Animations/StickyScrollSection/Component'
import { ParallaxMediaComponent } from '@/components/Designs/Animations/ParallaxMedia/Component'
import { StaggerListComponent } from '@/components/Designs/Animations/StaggerList/Component'

const PremadeRendererMap = {
  banner: BannerBlockComponent,
  bentoGrid: BentoGridComponent,
  faq: FAQComponent,
  featureGrid: FeatureGridComponent,
  featureTabs: FeatureTabsComponent,
  formBlock: FormBlockComponent,
  heroBanner: HeroBannerComponent,
  mediaViewer: MediaViewerComponent,
  pricingTable: PricingComponent,
  'richtext-content': RichTextComponent,
  smartTable: TableComponent,
  testimonialCarousel: TestimonialComponent,
  timeline: TimelineComponent,
}

const AnimatedRendererMap = {
  revealOnScroll: RevealOnScrollComponent,
  stickyScrollSection: StickyScrollSectionComponent,
  parallaxMedia: ParallaxMediaComponent,
  staggerList: StaggerListComponent,
}

export const AvailableRenderBlocks = {
  ...AtomicRendererMap,
  ...PremadeRendererMap,
  ...AnimatedRendererMap,

  buildYourOwnSection: BuildYourOwnSectionComponent,
}
