import { Block } from 'payload'

export const MediaContentBlock: Block = {
  slug: 'mediaContent',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'imageSide',
          type: 'select',
          defaultValue: 'left',
          options: ['left', 'right'],
          admin: { width: '50%' },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'richText' },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'link', type: 'text' },
        { name: 'variant', type: 'select', options: ['default', 'outline', 'secondary'] },
      ],
    },
  ],
}
