import { Block } from 'payload'

export const BentoGridBlock: Block = {
  slug: 'bentoGrid',
  dbName: 'bg_bento',
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'cards',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'content', type: 'textarea' },
        { name: 'icon', type: 'text', admin: { description: 'Lucide icon name' } },
        {
          name: 'span',
          type: 'select',
          defaultValue: '1',
          options: [
            { label: 'Single Box', value: '1' },
            { label: 'Wide Box (2 Cols)', value: '2' },
            { label: 'Tall Box (2 Rows)', value: 'row-2' },
          ],
        },
      ],
    },
  ],
}
