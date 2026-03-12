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

export const AnimatedStoryBlock: Block = {
  slug: 'appleStory',
  labels: {
    singular: 'Story Block',
    plural: '[Animated] Story Block',
  },
  fields: [
    {
      name: 'trackId',
      type: 'text',
    },
    {
      name: 'scenes',
      type: 'array',
      label: 'Story Scenes',
      minRows: 2,
      maxRows: 10,
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'subheading', type: 'text' },
        {
          name: 'body',
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
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
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
          name: 'textPosition',
          type: 'select',
          options: [
            { label: 'Center', value: 'center' },
            { label: 'Bottom Left', value: 'bottom-left' },
            { label: 'Bottom Right', value: 'bottom-right' },
          ],
          defaultValue: 'center',
        },
      ],
    },
    // No container settings – this block is always full width
  ],
}
