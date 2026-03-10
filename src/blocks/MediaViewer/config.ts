import { Block } from 'payload'

export const MediaViewerBlock: Block = {
  slug: 'mediaViewer',
  labels: {
    singular: 'Media Viewer',
    plural: 'Media Viewers',
  },
  fields: [
    {
      name: 'mediaType',
      type: 'radio',
      label: 'Media Type',
      required: true,
      options: [
        { label: 'Image', value: 'image' },
        { label: 'PDF', value: 'pdf' },
        { label: 'Video', value: 'video' },
      ],
      defaultValue: 'image',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.mediaType === 'image',
      },
    },
    {
      name: 'pdf',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.mediaType === 'pdf',
      },
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.mediaType === 'video',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
    },
    {
      name: 'showCard',
      type: 'checkbox',
      label: 'Show as Card',
      defaultValue: true,
    },
    {
      name: 'ratio',
      type: 'select',
      label: 'Aspect Ratio',
      options: [
        { label: 'None (use custom dimensions)', value: 'none' },
        { label: '1:1 (Square)', value: '1:1' },
        { label: '4:3', value: '4:3' },
        { label: '16:9 (Widescreen)', value: '16:9' },
        { label: '21:9 (Ultrawide)', value: '21:9' },
      ],
      defaultValue: '16:9',
      admin: {
        description: 'Select a preset aspect ratio, or choose "None" to set custom width/height.',
      },
    },
    {
      name: 'width',
      type: 'number',
      label: 'Width (%)',
      min: 0,
      admin: {
        condition: (_, siblingData) => siblingData?.ratio === 'none',
      },
    },
    {
      name: 'height',
      type: 'number',
      label: 'Height (%)',
      min: 0,
      admin: {
        condition: (_, siblingData) => siblingData?.ratio === 'none',
      },
    },
    {
      name: 'containerSettings',
      type: 'group',
      label: 'Container Settings',
      fields: [
        {
          name: 'useContainer',
          type: 'checkbox',
          label: 'Wrap in container',
          defaultValue: true,
        },
      ],
    },
  ],
}
