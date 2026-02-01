import { Block } from 'payload'

export const SplitBannerBlock: Block = {
  slug: 'splitBanner',
  dbName: 'blk_split_ban',
  fields: [
    {
      name: 'settings',
      type: 'group',
      fields: [
        {
          name: 'theme',
          type: 'select',
          defaultValue: 'dark',
          options: ['dark', 'light', 'accent'],
        },
        {
          name: 'imagePosition',
          type: 'select',
          defaultValue: 'right',
          options: ['left', 'right'],
        },
      ],
    },
    {
      name: 'content',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'subtext', type: 'textarea' },
        {
          name: 'actions',
          type: 'array',
          maxRows: 2,
          fields: [
            { name: 'label', type: 'text' },
            { name: 'url', type: 'text' },
            { name: 'style', type: 'select', options: ['default', 'outline', 'secondary'] },
          ],
        },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
  ],
}
