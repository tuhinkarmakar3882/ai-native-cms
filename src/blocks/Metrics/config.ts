import { Block } from 'payload'

export const MetricsBlock: Block = {
  slug: 'metrics',
  dbName: 'bg_metrics',
  fields: [
    {
      name: 'stats',
      type: 'array',
      minRows: 2,
      maxRows: 4,
      fields: [
        { name: 'value', type: 'text', required: true }, // e.g., "10M+"
        { name: 'label', type: 'text', required: true }, // e.g., "Users"
        { name: 'description', type: 'text' },
      ],
    },
  ],
}
