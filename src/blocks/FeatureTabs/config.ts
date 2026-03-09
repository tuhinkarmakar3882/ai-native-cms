import { Block } from 'payload'

export const FeatureTabsBlock: Block = {
  slug: 'featureTabs',
  dbName: 'bg_tabs',
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'tabs',
      type: 'array',
      minRows: 2,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
