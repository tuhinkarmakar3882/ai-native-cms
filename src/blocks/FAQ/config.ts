import { Block } from 'payload'
import {
  BlockquoteFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
} from '@payloadcms/richtext-lexical'

export const FAQBlock: Block = {
  slug: 'faq',
  fields: [
    { name: 'sectionTitle', type: 'text' },
    { name: 'title', type: 'text' },
    { name: 'description', type: 'text' },
    {
      name: 'items',
      type: 'array',
      dbName: 'faq_items',
      required: true,
      fields: [
        { name: 'question', type: 'text', required: true },
        {
          name: 'answer',
          type: 'richText', // Switched to richText
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
                LinkFeature(),
                BlockquoteFeature(),
                BoldFeature(),
              ]
            },
          }),
        },
      ],
    },
  ],
}
