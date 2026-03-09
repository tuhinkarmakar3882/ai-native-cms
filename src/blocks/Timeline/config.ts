import { Block } from 'payload'

export const TimelineBlock: Block = {
  slug: 'timeline',
  dbName: 'bg_time',
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'events',
      type: 'array',
      fields: [
        { name: 'year', type: 'text', required: true },
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}
