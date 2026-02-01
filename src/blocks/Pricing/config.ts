import { Block } from 'payload'

export const PricingBlock: Block = {
  slug: 'pricingTable',
  dbName: 'prc_tbl',
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'plans',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'price', type: 'text', required: true },
        { name: 'description', type: 'text' },
        { name: 'isPopular', type: 'checkbox', label: 'Mark as Popular' },
        {
          name: 'features',
          type: 'array',
          fields: [{ name: 'feature', type: 'text' }],
        },
        { name: 'buttonText', type: 'text', defaultValue: 'Get Started' },
        { name: 'buttonLink', type: 'text' },
      ],
    },
  ],
}
