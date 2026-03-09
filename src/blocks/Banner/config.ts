import { Block } from 'payload'
import {
  BlockquoteFeature,
  BoldFeature,
  ChecklistFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnderlineFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

export const BannerBlock: Block = {
  slug: 'banner',
  fields: [
    {
      name: 'trackId',
      type: 'text',
      label: 'Tracking ID (Optional)',
      admin: {
        description: 'Unique identifier for this section (for analytics)',
      },
    },
    {
      name: 'style',
      type: 'select',
      defaultValue: 'info',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' },
        { label: 'Success', value: 'success' },
      ],
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            InlineToolbarFeature(),
            LinkFeature(),
            OrderedListFeature(),
            UnderlineFeature(),
            UnorderedListFeature(),
            HorizontalRuleFeature(),
            ParagraphFeature(),
            ChecklistFeature(),
            BlockquoteFeature(),
            BoldFeature(),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
      required: true,
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
          defaultValue: false,
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
  interfaceName: 'BannerBlock',
}
