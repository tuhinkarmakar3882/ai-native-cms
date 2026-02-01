import { Block } from 'payload'

export const ImageGalleryBlock: Block = {
  slug: 'imageGallery',
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
  ],
}
