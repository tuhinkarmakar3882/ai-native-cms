import { Block } from 'payload'
import { AtomBlocks } from './Atoms'
import {
  AccordionAtom,
  AlertAtom,
  AlignerAtom,
  AvatarAtom,
  BadgeAtom,
  ButtonAtom,
  CardAtom,
  CarouselAtom,
  IconAtom,
  ImageAtom,
  ProgressAtom,
  ResponsiveWidthField,
  SeparatorAtom,
  SpacerAtom,
  TableAtom,
  TabsAtom,
  TextAtom,
  VideoAtom,
} from '@/blocks/Composable/Atoms/config'
import { AnimatedClipPathMorphBlock } from '@/blocks/Animations/AnimatedClipPathMorphBlock'
import { AnimatedParallaxMediaBlock } from '@/blocks/Animations/AnimatedParallaxMedia'
import { AnimatedRevealOnScrollBlock } from '@/blocks/Animations/AnimatedRevealOnScroll'
import { PricingBlock } from '@/blocks/Pricing/config'
import { BannerBlock } from '@/blocks/Banner/config'
import { BentoGridBlock } from '@/blocks/BentoGrid/config'
import { FAQBlock } from '@/blocks/FAQ/config'
import { FeatureGridBlock } from '@/blocks/FeatureGrid/config'
import { FeatureTabsBlock } from '@/blocks/FeatureTabs/config'
import { FormBlock } from '@/blocks/Form/config'
import { HeroBannerBlock } from '@/blocks/HeroBanner/config'
import { MediaViewerBlock } from '@/blocks/MediaViewer/config'
import { TableBlock } from '@/blocks/Table/config'
import { TestimonialBlock } from '@/blocks/Testimonials/config'
import { TimelineBlock } from '@/blocks/Timeline/config'
import { EmbedAnythingBlock } from '@/blocks/Composable/Atoms/EmbedAnything/config'

export const GridItemBlock: Block = {
  slug: 'gridItem',
  dbName: 'grid_item',

  fields: [
    ResponsiveWidthField,
    {
      name: 'content',
      type: 'blocks',
      blocks: [
        ...AtomBlocks,

        AnimatedParallaxMediaBlock,
        AnimatedRevealOnScrollBlock,

        BannerBlock,
        BentoGridBlock,

        FAQBlock,
        FeatureGridBlock,
        FeatureTabsBlock,

        HeroBannerBlock,
        MediaViewerBlock,

        PricingBlock,
        TableBlock,
        TestimonialBlock,
        TimelineBlock,
      ],
    },
  ],
}

export const GridAreaBlock: Block = {
  slug: 'gridArea',
  dbName: 'grid_area',

  fields: [
    {
      name: 'justify',
      type: 'select',
      defaultValue: 'start',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },

    {
      name: 'align',
      type: 'select',
      defaultValue: 'start',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },

    {
      name: 'gap',
      type: 'number',
      defaultValue: 16,
      admin: {
        description: 'Gap in pixels',
      },
    },

    {
      name: 'items',
      type: 'blocks',
      blocks: [GridItemBlock],
      minRows: 1,
    },
  ],
}

export const ContainerBlock: Block = {
  slug: 'container',

  fields: [
    {
      name: 'width',
      type: 'select',
      defaultValue: 'container',

      options: [
        { label: 'Container', value: 'container' },
        { label: 'Wide', value: 'wide' },
        { label: 'Full Width', value: 'full' },
      ],
    },

    {
      name: 'padding',
      type: 'select',
      defaultValue: 'medium',

      options: ['none', 'small', 'medium', 'large'],
    },

    {
      name: 'areas',
      type: 'blocks',
      blocks: [GridAreaBlock],
      minRows: 1,
    },
  ],
}
