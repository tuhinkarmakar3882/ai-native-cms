import { Block } from 'payload'
import {
  AlignFeature,
  BlockquoteFeature,
  BlocksFeature,
  BoldFeature,
  ChecklistFeature,
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  IndentFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import { Code } from '@/blocks/Code/config'

export const RevealOnScrollBlock: Block = {
  slug: 'revealOnScroll',
  labels: {
    singular: 'Reveal on Scroll',
    plural: 'Reveal on Scroll',
  },
  fields: [
    {
      name: 'trackId',
      type: 'text',
      label: 'Tracking ID (Optional)',
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            AlignFeature(),
            BlockquoteFeature(),
            BoldFeature(),
            ChecklistFeature(),
            EXPERIMENTAL_TableFeature(),
            FixedToolbarFeature(),
            HeadingFeature(),
            HorizontalRuleFeature(),
            IndentFeature(),
            InlineCodeFeature(),
            InlineToolbarFeature(),
            ItalicFeature(),
            LinkFeature(),
            OrderedListFeature(),
            ParagraphFeature(),
            StrikethroughFeature(),
            SubscriptFeature(),
            SuperscriptFeature(),
            UnderlineFeature(),
            UnorderedListFeature(),
            UploadFeature(),
            BlocksFeature({
              blocks: [Code],
            }),
          ]
        },
      }),
      required: true,
      label: 'Content',
      admin: {
        description: 'Each paragraph and heading will fade in as it enters the viewport.',
      },
    },
    {
      name: 'containerSettings',
      type: 'group',
      label: 'Container Settings',
      fields: [
        {
          name: 'useContainer',
          type: 'checkbox',
          label: 'Wrap in container',
          defaultValue: true,
        },
        {
          name: 'containerSize',
          type: 'select',
          label: 'Container Size',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
            { label: 'Full width', value: 'full' },
          ],
          defaultValue: 'lg',
          admin: {
            condition: (_, siblingData) => siblingData?.useContainer === true,
          },
        },
      ],
    },
  ],
}
