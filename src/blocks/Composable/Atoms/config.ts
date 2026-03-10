import { Block, Field } from 'payload'
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

export const widthOptions = [
  { label: 'Auto', value: 'auto' },
  { label: '1 Col', value: '1' },
  { label: '2 Col', value: '2' },
  { label: '3 Col', value: '3' },
  { label: '4 Col', value: '4' },
  { label: '6 Col (½)', value: '6' },
  { label: '8 Col', value: '8' },
  { label: '9 Col', value: '9' },
  { label: '12 Col (Full)', value: '12' },
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
      options: widthOptions,
    },

    {
      type: 'collapsible',
      label: 'Responsive',

      fields: [
        {
          name: 'sm',
          label: 'SM',
          type: 'select',
          options: widthOptions,
        },
        {
          name: 'md',
          label: 'MD',
          type: 'select',
          options: widthOptions,
        },
        {
          name: 'lg',
          label: 'LG',
          type: 'select',
          options: widthOptions,
        },
        {
          name: 'xl',
          label: 'XL',
          type: 'select',
          options: widthOptions,
        },
      ],
    },
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
      name: 'align',
      type: 'select',
      options: ['left', 'center', 'right'],
      defaultValue: 'left',
    },
  ],
}

export const ButtonAtom: Block = {
  slug: 'buttonAtom',
  fields: [
    { name: 'label', type: 'text', required: true },
    { name: 'url', type: 'text' },
    {
      name: 'variant',
      type: 'select',
      options: ['default', 'secondary', 'outline', 'ghost', 'destructive'],
      defaultValue: 'default',
    },
  ],
}

export const BadgeAtom: Block = {
  slug: 'badgeAtom',
  fields: [
    { name: 'label', type: 'text' },
    {
      name: 'variant',
      type: 'select',
      options: ['default', 'secondary', 'outline', 'destructive'],
      defaultValue: 'default',
    },
  ],
}

export const AlertAtom: Block = {
  slug: 'alertAtom',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
    {
      name: 'variant',
      type: 'select',
      options: ['default', 'destructive'],
      defaultValue: 'default',
    },
  ],
}

export const ImageAtom: Block = {
  slug: 'imageAtom',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'aspect',
      type: 'select',
      options: ['square', 'video', 'wide'],
      defaultValue: 'video',
    },
    { name: 'caption', type: 'text' },
  ],
}

export const CardAtom: Block = {
  slug: 'cardAtom',
  fields: [
    { name: 'title', type: 'text' },
    { name: 'description', type: 'textarea' },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    { name: 'link', type: 'text' },
  ],
}

export const AccordionAtom: Block = {
  slug: 'accordionAtom',
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'content', type: 'textarea' },
      ],
    },
  ],
}

export const TabsAtom: Block = {
  slug: 'tabsAtom',
  fields: [
    {
      name: 'tabs',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'content', type: 'textarea' },
      ],
    },
  ],
}

export const CarouselAtom: Block = {
  slug: 'carouselAtom',
  fields: [
    {
      name: 'slides',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        { name: 'caption', type: 'text' },
      ],
    },
  ],
}

export const AvatarAtom: Block = {
  slug: 'avatarAtom',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    { name: 'name', type: 'text' },
    { name: 'role', type: 'text' },
  ],
}

export const SeparatorAtom: Block = {
  slug: 'separatorAtom',
  fields: [
    {
      name: 'spacing',
      type: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      defaultValue: 'md',
    },
  ],
}

export const ProgressAtom: Block = {
  slug: 'progressAtom',
  fields: [{ name: 'value', type: 'number', defaultValue: 50 }],
}

export const TableAtom: Block = {
  slug: 'tableAtom',
  fields: [
    {
      name: 'rows',
      type: 'array',
      fields: [
        {
          name: 'cells',
          type: 'array',
          fields: [{ name: 'value', type: 'text' }],
        },
      ],
    },
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

export const SpacerAtom: Block = {
  slug: 'spacerAtom',
  dbName: 'at_spacer',
  fields: [
    {
      name: 'spacing',
      type: 'select',
      label: 'Spacing Value',
      options: [
        { label: 'None (use custom values)', value: 'none' },
        { label: 'small', value: '8' },
        { label: 'medium', value: '16' },
        { label: 'large', value: '24' },
      ],
      defaultValue: '16',
      admin: {
        description: 'Select a preset spacing value, or choose "None" to set custom values',
      },
    },
    {
      name: 'top',
      type: 'number',
      label: 'Top Margin (px)',
      min: 0,
      admin: {
        condition: (_, siblingData) => siblingData?.spacing === 'none',
      },
    },
    {
      name: 'bottom',
      type: 'number',
      label: 'Bottom Margin (px)',
      min: 0,
      admin: {
        condition: (_, siblingData) => siblingData?.spacing === 'none',
      },
    },
    {
      name: 'left',
      type: 'number',
      label: 'Left Margin (px)',
      min: 0,
      admin: {
        condition: (_, siblingData) => siblingData?.spacing === 'none',
      },
    },
    {
      name: 'right',
      type: 'number',
      label: 'Right Margin (px)',
      min: 0,
      admin: {
        condition: (_, siblingData) => siblingData?.spacing === 'none',
      },
    },
  ],
}

export const AlignerAtom: Block = {
  slug: 'alignerAtom',
  dbName: 'at_aligner',
  fields: [
    {
      name: 'direction',
      type: 'radio',
      defaultValue: 'row',
      options: [
        { label: 'Row', value: 'row' },
        { label: 'Column', value: 'column' },
      ],
    },

    {
      name: 'justify',
      type: 'select',
      defaultValue: 'start',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },

    {
      name: 'align',
      type: 'select',
      defaultValue: 'start',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },

    {
      name: 'gap',
      type: 'number',
      defaultValue: 16,
      admin: {
        description: 'Gap in pixels',
      },
    },

    {
      name: 'items',
      type: 'blocks',
      blocks: [ButtonAtom, IconAtom, SpacerAtom, TextAtom],
    },
  ],
}
