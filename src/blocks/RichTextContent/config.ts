import type { Block } from 'payload'

import {
  AlignFeature,
  BlockquoteFeature,
  BoldFeature,
  ChecklistFeature,
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
} from '@payloadcms/richtext-lexical'

export const RichTextContentBlock: Block = {
  slug: 'richtext-content',
  dbName: 'richtext-content',
  fields: [
    {
      name: 'content',
      type: 'richText',
      localized: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            LinkFeature(),
            AlignFeature(),
            BlockquoteFeature(),
            BoldFeature(),
            InlineCodeFeature(),
            ItalicFeature(),
            StrikethroughFeature(),
            SubscriptFeature(),
            SuperscriptFeature(),
            UnderlineFeature(),
            HorizontalRuleFeature(),
            IndentFeature(),
            ChecklistFeature(),
            OrderedListFeature(),
            UnorderedListFeature(),
            ParagraphFeature(),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
      required: true,
    },
  ],
  interfaceName: 'RichTextContentBlock',
}
