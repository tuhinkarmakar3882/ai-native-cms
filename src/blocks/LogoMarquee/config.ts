import { Block } from 'payload'

export const LogoMarqueeBlock: Block = {
  slug: 'logoMarquee',
  dbName: 'bg_logos',
  fields: [
    {
      name: 'logos',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media' }],
    },
  ],
}
