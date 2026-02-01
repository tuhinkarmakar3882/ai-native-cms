import { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'actions',
      type: 'array',
      maxRows: 2,
      fields: [
        { name: 'label', type: 'text' },
        {
          name: 'variant',
          type: 'select',
          options: [
            { label: 'Primary', value: 'default' },
            { label: 'Outline', value: 'outline' },
          ],
        },
      ],
    },
  ],
}
