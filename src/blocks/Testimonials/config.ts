import { Block } from 'payload'

export const TestimonialBlock: Block = {
  slug: 'testimonialCarousel',
  dbName: 'testi_car',
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'reviews',
      type: 'array',
      dbName: 'reviews',
      fields: [
        { name: 'quote', type: 'textarea', required: true },
        { name: 'author', type: 'text', required: true },
        { name: 'role', type: 'text' },
        { name: 'avatar', type: 'upload', relationTo: 'media' }, // Optional user image
        { name: 'rating', type: 'number', min: 1, max: 5, defaultValue: 5 },
      ],
    },
  ],
}
