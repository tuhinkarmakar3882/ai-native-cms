import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { FAQBlock } from '@/blocks/FAQ/config'
import { BuildYourOwnSectionBlock } from '@/blocks/Composable/config'
import { TestimonialBlock } from '@/blocks/Testimonials/config'
import { TableBlock } from '@/blocks/Table/config'
import { RichTextContentBlock } from '@/blocks/RichTextContent/config'
import { FormBlock } from '@/blocks/Form/config'
import { generateSlugPath } from '@/collections/Pages/hooks/generateSlugPath'
import { MediaViewerBlock } from '@/blocks/MediaViewer/config'
import { HeroBannerBlock } from '@/blocks/HeroBanner/config'
import { BannerBlock } from '@/blocks/Banner/config'
import { BentoGridBlock } from '@/blocks/BentoGrid/config'
import { FeatureTabsBlock } from '@/blocks/FeatureTabs/config'
import { FeatureGridBlock } from '@/blocks/FeatureGrid/config'
import { PricingBlock } from '@/blocks/Pricing/config'
import { TimelineBlock } from '@/blocks/Timeline/config'
import { AnimatedRevealOnScrollBlock } from '@/blocks/Animations/AnimatedRevealOnScroll'
import { AnimatedStickyScrollSectionBlock } from '@/blocks/Animations/AnimatedStickyScrollSection'
import { AnimatedParallaxMediaBlock } from '@/blocks/Animations/AnimatedParallaxMedia'
import { AnimatedStaggerListBlock } from '@/blocks/Animations/AnimatedStaggerList'
import { AnimatedStoryBlock } from '@/blocks/Animations/AnimatedStoryBlock'
import { AnimatedCinematicTextBlock } from '@/blocks/Animations/AnimatedCinematicTextBlock'
import { AnimatedClipPathMorphBlock } from '@/blocks/Animations/AnimatedClipPathMorphBlock'
import { EmbedAnythingBlock } from '@/blocks/Composable/Atoms/EmbedAnything/config'
import { updateChildSlugs } from '@/collections/Pages/hooks/updateChildSlugs'
import { TabbedMediaViewerBlock } from '@/blocks/TabbedMediaViewer/config'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    fullSlug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.fullSlug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.fullSlug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
    components: {
      edit: {
        beforeDocumentControls: ['@/components/PageBreadcrumb.tsx'],
      },
    },
  },
  fields: [
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'pages',
      admin: { position: 'sidebar' },
    },
    {
      name: 'fullSlug',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
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
                // Animated Blocks
                AnimatedStoryBlock,
                AnimatedCinematicTextBlock,
                AnimatedClipPathMorphBlock,
                AnimatedParallaxMediaBlock,
                AnimatedRevealOnScrollBlock,
                AnimatedStaggerListBlock,
                AnimatedStickyScrollSectionBlock,

                // Composable Blocks
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
                TableBlock,
                TabbedMediaViewerBlock,
                TestimonialBlock,
                TimelineBlock,
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
              hasGenerateFn: true,
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
    {
      name: 'isVariant',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        description:
          'If true, this page is a variant served only via an Experiment. Direct visits to this page will return 404.',
      },
      defaultValue: false,
    },
  ],
  hooks: {
    beforeValidate: [generateSlugPath],
    beforeChange: [populatePublishedAt],
    afterChange: [updateChildSlugs, revalidatePage],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      localizeStatus: true,
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
