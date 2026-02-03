import type { Block } from 'payload'

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

export const RichTextContentBlock: Block = {
  dbName: 'richtext-content',
  fields: [
    {
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
      label: false,
      localized: true,
      name: 'content',
      required: true,
      type: 'richText',
    },
  ],
  interfaceName: 'RichTextContentBlock',
  slug: 'richtext-content',
}
