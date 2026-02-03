import { Block } from 'payload'
import { generateTrackingIdSafe } from '@/utilities/generateTrackId'

export const HeroGradientBlock: Block = {
  slug: 'heroGradient',
  dbName: 'bg_hero_grad',
  fields: [
    { name: 'pillText', type: 'text', label: 'Announcement Pill' },
    { name: 'heading', type: 'textarea', required: true },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'actions',
      type: 'array',
      minRows: 1,
      maxRows: 2,
      fields: [
        { name: 'label', type: 'text' },
        { name: 'link', type: 'text' },
        { name: 'type', type: 'select', options: ['default', 'outline', 'ghost'] },
        {
          name: 'trackId',
          label: 'Tracking ID (Optional)',
          type: 'text',
          defaultValue: () => generateTrackingIdSafe('hero-gradient-action'),
          required: false,
        },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
  imageURL: '/assets/hero-gradient-block.png',
}
