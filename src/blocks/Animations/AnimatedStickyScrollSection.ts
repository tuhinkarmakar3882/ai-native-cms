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
import { ButtonAtom } from '@/blocks/Composable/Atoms/config'

export const AnimatedStickyScrollSectionBlock: Block = {
  slug: 'stickyScrollSection',
  labels: {
    singular: '[Animated] Sticky Scroll Section',
    plural: '[Animated] Sticky Scroll Sections',
  },
  fields: [
    {
      name: 'trackId',
      type: 'text',
      label: 'Tracking ID (Optional)',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Section Title (optional)',
    },
    {
      name: 'stickySide',
      type: 'select',
      label: 'Sticky Side',
      options: [
        { label: 'Left (text sticky, media scrolls)', value: 'left' },
        { label: 'Right (media sticky, text scrolls)', value: 'right' },
      ],
      defaultValue: 'left',
    },
    {
      name: 'mediaWidth',
      type: 'select',
      label: 'Media Column Width',
      options: [
        { label: '1/3', value: '1/3' },
        { label: '1/2', value: '1/2' },
        { label: '2/3', value: '2/3' },
      ],
      defaultValue: '1/2',
    },
    {
      name: 'textAlignment',
      type: 'select',
      label: 'Text Alignment',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'left',
    },
    {
      name: 'showProgress',
      type: 'checkbox',
      label: 'Show progress indicator',
      defaultValue: false,
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Steps',
      minRows: 2,
      maxRows: 10,
      fields: [
        { name: 'heading', type: 'text', required: true },
        {
          name: 'description',
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
        },
        {
          name: 'mediaType',
          type: 'select',
          options: [
            { label: 'Image', value: 'image' },
            { label: 'Video', value: 'video' },
          ],
          defaultValue: 'image',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => siblingData?.mediaType === 'image',
          },
        },
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => siblingData?.mediaType === 'video',
          },
        },
        {
          name: 'buttons',
          label: 'Buttons',
          type: 'array',
          maxRows: 2,
          fields: ButtonAtom.fields,
        },
      ],
    },
    {
      name: 'containerSettings',
      type: 'group',
      label: 'Container Settings',
      fields: [
        {
          name: 'useContainer',
          type: 'checkbox',
          label: 'Wrap content in container',
          defaultValue: true,
        },
        {
          name: 'containerSize',
          type: 'select',
          options: ['sm', 'md', 'lg', 'full'],
          defaultValue: 'lg',
          admin: { condition: (_, siblingData) => siblingData?.useContainer },
        },
      ],
    },
  ],
}
