import { Block } from 'payload'

export const FeatureGridBlock: Block = {
  slug: 'featureGrid',
  fields: [
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'badge', type: 'text' }, // Using your Badge component here
      ],
    },
  ],
}
