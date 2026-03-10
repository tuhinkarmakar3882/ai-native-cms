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

export const CinematicTextBlock: Block = {
  slug: 'cinematicText',

  labels: {
    singular: 'Cinematic Text',
    plural: 'Cinematic Text Blocks',
  },

  fields: [
    {
      name: 'trackId',
      type: 'text',
    },

    {
      name: 'content',
      type: 'richText',
      required: true,
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
      name: 'splitType',
      type: 'select',
      options: [
        { label: 'Words', value: 'words' },
        { label: 'Characters', value: 'chars' },
        { label: 'Lines', value: 'lines' },
      ],
      defaultValue: 'words',
    },

    {
      name: 'animation',
      type: 'select',
      options: [
        { label: 'Fade Up', value: 'fadeUp' },
        { label: 'Fade In', value: 'fadeIn' },
        { label: 'Slide Left', value: 'slideLeft' },
        { label: 'Slide Right', value: 'slideRight' },
        { label: 'Blur', value: 'blur' },
        { label: 'Scale', value: 'scale' },
      ],
      defaultValue: 'fadeUp',
    },

    {
      name: 'stagger',
      type: 'number',
      defaultValue: 0.03,
    },

    {
      name: 'duration',
      type: 'number',
      defaultValue: 0.8,
    },

    {
      name: 'scrollTriggerStart',
      type: 'text',
      defaultValue: 'top 80%',
    },

    {
      name: 'scrollScrub',
      type: 'checkbox',
      defaultValue: false,
    },

    {
      name: 'backgroundColor',
      type: 'text',
      defaultValue: '#000000',
    },

    {
      name: 'textColor',
      type: 'text',
      defaultValue: '#ffffff',
    },
  ],
}
