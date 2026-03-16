import { Block } from 'payload'
import { BuildYourOwnSectionBlock } from '@/blocks/Composable/config'
import { RichTextContentBlock } from '@/blocks/RichTextContent/config'
import { BannerBlock } from '@/blocks/Banner/config'
import { BentoGridBlock } from '@/blocks/BentoGrid/config'
import { EmbedAnythingBlock } from '@/blocks/Composable/Atoms/EmbedAnything/config'
import { FAQBlock } from '@/blocks/FAQ/config'
import { FeatureGridBlock } from '@/blocks/FeatureGrid/config'
import { FeatureTabsBlock } from '@/blocks/FeatureTabs/config'
import { FormBlock } from '@/blocks/Form/config'
import { HeroBannerBlock } from '@/blocks/HeroBanner/config'
import { MediaViewerBlock } from '@/blocks/MediaViewer/config'
import { PricingBlock } from '@/blocks/Pricing/config'
import { SeparatorAtom, SpacerAtom } from '@/blocks/Composable/Atoms/config'
import { TableBlock } from '@/blocks/Table/config'
import { TabbedMediaViewerBlock } from '@/blocks/TabbedMediaViewer/config'
import { TestimonialBlock } from '@/blocks/Testimonials/config'
import { TimelineBlock } from '@/blocks/Timeline/config'

export const TwoColumnLayoutBlock: Block = {
  slug: 'twoColumnLayout',
  labels: {
    singular: 'Two Column Layout',
    plural: 'Two Column Layouts',
  },
  fields: [
    {
      name: 'layout',
      type: 'select',
      defaultValue: '60-40',
      options: [
        { label: '50 / 50', value: '50-50' },
        { label: '60 / 40', value: '60-40' },
        { label: '40 / 60', value: '40-60' },
        { label: '70 / 30', value: '70-30' },
        { label: '30 / 70', value: '30-70' },
      ],
    },
    {
      name: 'stickySide',
      label: 'Sticky Column',
      type: 'select',
      defaultValue: 'right',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      name: 'mobileStack',
      label: 'Mobile Stack Order',
      type: 'select',
      defaultValue: 'left-first',
      options: [
        { label: 'Left then Right', value: 'left-first' },
        { label: 'Right then Left', value: 'right-first' },
      ],
    },
    {
      name: 'leftColumn',
      label: 'Left Column Content',
      type: 'blocks',
      blocks: [
        BuildYourOwnSectionBlock,

        // Premade Blocks
        BannerBlock,
        BentoGridBlock,
        EmbedAnythingBlock,
        FAQBlock,
        FeatureGridBlock,
        FeatureTabsBlock,
        FormBlock,
        HeroBannerBlock,
        MediaViewerBlock,
        PricingBlock,
        RichTextContentBlock,
        SeparatorAtom,
        SpacerAtom,
        TableBlock,
        TabbedMediaViewerBlock,
        TestimonialBlock,
        TimelineBlock,
      ],
    },

    {
      name: 'rightColumn',
      label: 'Right Column Content',
      type: 'blocks',
      blocks: [
        BuildYourOwnSectionBlock,

        // Premade Blocks
        BannerBlock,
        BentoGridBlock,
        EmbedAnythingBlock,
        FAQBlock,
        FeatureGridBlock,
        FeatureTabsBlock,
        FormBlock,
        HeroBannerBlock,
        MediaViewerBlock,
        PricingBlock,
        RichTextContentBlock,
        SeparatorAtom,
        SpacerAtom,
        TableBlock,
        TabbedMediaViewerBlock,
        TestimonialBlock,
        TimelineBlock,
      ],
    },
  ],
}
