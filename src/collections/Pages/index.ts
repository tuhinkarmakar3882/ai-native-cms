import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { hero } from '@/heros/config'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { HeroBlock } from '@/blocks/Hero/config'
import { FeatureGridBlock } from '@/blocks/FeatureGrid/config'
import { FAQBlock } from '@/blocks/FAQ/config'
import { ComposableSectionBlock } from '@/blocks/Composable/config'
import { MediaContentBlock } from '@/blocks/MediaContent/config'
import { ImageGalleryBlock } from '@/blocks/ImageGallery/config'
import { PricingBlock } from '@/blocks/Pricing/config'
import { TestimonialBlock } from '@/blocks/Testimonials/config'
import { HeroGradientBlock } from '@/blocks/HeroGradient/config'
import { BentoGridBlock } from '@/blocks/BentoGrid/config'
import { FeatureTabsBlock } from '@/blocks/FeatureTabs/config'
import { LogoMarqueeBlock } from '@/blocks/LogoMarquee/config'
import { TimelineBlock } from '@/blocks/Timeline/config'
import { MetricsBlock } from '@/blocks/Metrics/config'
import { SplitBannerBlock } from '@/blocks/SplitBanner/config'
import { TableBlock } from '@/blocks/Table/config'
import { Banner } from '@/blocks/Banner/config'
import { RichTextContentBlock } from '@/blocks/RichTextContent/config'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'aiBuilder',
              type: 'ui',
              admin: {
                components: {
                  Field: '@/components/BuildWithAI/Component#BuildWithAI',
                },
              },
            },
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                RichTextContentBlock,

                // TRACK 1: Premade
                Banner,
                HeroGradientBlock,
                BentoGridBlock,
                FeatureTabsBlock,
                HeroBlock,
                FAQBlock,
                FeatureGridBlock,
                MediaContentBlock,
                ImageGalleryBlock,
                TestimonialBlock,
                PricingBlock,
                LogoMarqueeBlock,
                TimelineBlock,
                MetricsBlock,
                SplitBannerBlock,
                TableBlock,
                // TRACK 2: Build Your Own
                ComposableSectionBlock,
              ],
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
