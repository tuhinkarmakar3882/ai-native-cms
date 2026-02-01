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

export const BadgeAtom: Block = {
  slug: 'badgeAtom',
  fields: [{ name: 'label', type: 'text' }],
}

export const AlertAtom: Block = {
  slug: 'alertAtom',
  dbName: 'at_alrt',
  fields: [
    { name: 'type', type: 'select', options: ['default', 'destructive'], defaultValue: 'default' },
    { name: 'title', type: 'text', required: true },
    { name: 'message', type: 'textarea' },
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

export const ProgressAtom: Block = {
  slug: 'progressAtom',
  dbName: 'at_prog',
  fields: [
    { name: 'value', type: 'number', min: 0, max: 100, required: true },
    { name: 'label', type: 'text' }, // "Project Completion", "React Skill", etc.
  ],
}

// --- NEW: CONTENT PRIMITIVES ---
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

// --- NEW: INTERACTIVE PRIMITIVES ---
export const TooltipAtom: Block = {
  slug: 'tooltipAtom',
  dbName: 'at_tip',
  fields: [
    { name: 'triggerText', type: 'text', required: true },
    { name: 'content', type: 'text', required: true },
  ],
}
export const AvatarGroupAtom: Block = {
  slug: 'avatarGroupAtom',
  dbName: 'at_avg',
  fields: [
    {
      name: 'users',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        { name: 'initials', type: 'text' },
      ],
    },
  ],
}
export const AccordianAtom: Block = {
  slug: 'accordionAtom',
  dbName: 'at_acc',
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'trigger', type: 'text', required: true },
        { name: 'content', type: 'textarea', required: true },
      ],
    },
  ],
}

// --- NEW: LAYOUT BUILDER PRIMITIVES (The "Pro" Stuff) ---
export const StackAtom: Block = {
  slug: 'stackAtom',
  dbName: 'at_stk',
  labels: { singular: 'Flex Stack', plural: 'Flex Stacks' },
  fields: [
    {
      name: 'direction',
      type: 'select',
      options: ['row', 'column'],
      defaultValue: 'column',
    },
    { name: 'gap', type: 'select', options: ['0', '2', '4', '8', '12'], defaultValue: '4' },
    { name: 'align', type: 'select', options: ['start', 'center', 'end', 'between'] },
    // {
    //   name: 'content',
    //   type: 'blocks',
    //   blocks: [], // We'll recursively link this below
    // },
  ],
}

const nestedAtoms = [
  ButtonAtom,
  TextAtom,
  BadgeAtom,
  ImageAtom, // see above
  IconAtom,
  TooltipAtom,
]

export const CardAtom: Block = {
  slug: 'cardAtom',
  dbName: 'at_crd',
  fields: [
    {
      name: 'padding',
      type: 'select',
      options: ['none', 'small', 'medium', 'large'],
      defaultValue: 'medium',
    },
    { name: 'glassmorphism', type: 'checkbox', label: 'Enable Glass Effect' },
    {
      name: 'content',
      type: 'blocks',
      blocks: nestedAtoms,
    },
  ],
}

export const StateToggleAtom: Block = {
  slug: 'stateToggle',
  dbName: 'at_tog',
  fields: [
    { name: 'leftLabel', type: 'text', defaultValue: 'Monthly' },
    { name: 'rightLabel', type: 'text', defaultValue: 'Yearly' },
    {
      name: 'stateKey',
      type: 'text',
      admin: { description: 'Unique key to sync with other atoms' },
    },
  ],
}
