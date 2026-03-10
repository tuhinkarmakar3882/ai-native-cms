import { Block } from 'payload'

export const EmbedAnythingBlock: Block = {
  slug: 'embedAnything',
  labels: {
    singular: 'Embed',
    plural: 'Embeds',
  },

  fields: [
    {
      name: 'url',
      label: 'Embed URL',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Paste any URL (YouTube, Tweet, Spotify, CodePen, Maps...)',
      },
    },

    {
      name: 'caption',
      label: 'Caption',
      type: 'text',
    },

    {
      name: 'aspectRatio',
      label: 'Aspect Ratio',
      type: 'select',
      defaultValue: '16/9',
      options: [
        { label: 'Auto', value: 'auto' },
        { label: '16:9', value: '16/9' },
        { label: '4:3', value: '4/3' },
        { label: '1:1', value: '1/1' },
        { label: '21:9', value: '21/9' },
      ],
    },

    {
      name: 'lazy',
      label: 'Lazy Load',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
