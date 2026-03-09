import { Block, Field } from 'payload'
import {
  BlockquoteFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
} from '@payloadcms/richtext-lexical'

export const widthTokens = [
  { label: 'Auto', value: 'auto' },
  { label: '1 Column', value: 1 },
  { label: '2 Columns', value: 2 },
  { label: '3 Columns', value: 3 },
  { label: '4 Columns', value: 4 },
  { label: '6 Columns (Half)', value: 6 },
  { label: '8 Columns', value: 8 },
  { label: '9 Columns', value: 9 },
  { label: '12 Columns (Full)', value: 12 },
]
export const ResponsiveWidthField: Field = {
  name: 'responsiveWidth',
  label: 'Width',
  type: 'group',

  fields: [
    {
      name: 'base',
      label: 'Default',
      type: 'select',
      defaultValue: '12',
      options: widthTokens,
    },

    {
      type: 'collapsible',
      label: 'Responsive Overrides',

      fields: [
        {
          name: 'sm',
          label: 'Small',
          type: 'select',
          options: widthTokens,
        },
        {
          name: 'md',
          label: 'Medium',
          type: 'select',
          options: widthTokens,
        },
        {
          name: 'lg',
          label: 'Large',
          type: 'select',
          options: widthTokens,
        },
        {
          name: 'xl',
          label: 'XL',
          type: 'select',
          options: widthTokens,
        },
      ],
    },
  ],
}

export const ButtonAtom: Block = {
  slug: 'buttonAtom',
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'variant', type: 'select', options: ['default', 'outline', 'destructive', 'ghost'] },
  ],
}

export const TextAtom: Block = {
  slug: 'textAtom',
  fields: [
    {
      name: 'content',
      type: 'richText',
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
}

export const SeparatorAtom: Block = {
  slug: 'separatorAtom',
  dbName: 'at_sep',
  fields: [
    {
      name: 'spacing',
      type: 'select',
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
    },
  ],
}

export const ImageAtom: Block = {
  slug: 'imageAtom',
  dbName: 'at_img',
  fields: [
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'aspectRatio',
      type: 'select',
      options: ['auto', 'video', 'square', 'wide'],
      defaultValue: 'auto',
    },
    { name: 'caption', type: 'text' },
  ],
}
export const IconAtom: Block = {
  slug: 'iconAtom',
  dbName: 'at_icn',
  fields: [
    { name: 'iconName', type: 'text', admin: { description: 'Lucide icon name' } },
    { name: 'size', type: 'number', defaultValue: 24 },
    { name: 'color', type: 'text', admin: { description: 'Tailwind class or Hex' } },
  ],
}
export const VideoAtom: Block = {
  slug: 'videoAtom',
  dbName: 'at_vid',
  fields: [
    { name: 'url', type: 'text', label: 'YouTube/Vimeo/Direct Link', required: true },
    { name: 'controls', type: 'checkbox', defaultValue: true },
  ],
}

const nestedAtoms = [ButtonAtom, TextAtom, ImageAtom, IconAtom]
