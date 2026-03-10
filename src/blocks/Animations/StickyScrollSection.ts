import { Block } from 'payload'

export const StickyScrollSectionBlock: Block = {
  slug: 'stickyScrollSection',
  labels: {
    singular: 'Sticky Scroll Section',
    plural: 'Sticky Scroll Sections',
  },
  fields: [
    {
      name: 'trackId',
      type: 'text',
      label: 'Tracking ID (Optional)',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Section Title (optional)',
    },
    {
      name: 'stickySide',
      type: 'select',
      label: 'Sticky Side',
      options: [
        { label: 'Left (text sticky, media scrolls)', value: 'left' },
        { label: 'Right (media sticky, text scrolls)', value: 'right' },
      ],
      defaultValue: 'left',
    },
    {
      name: 'mediaWidth',
      type: 'select',
      label: 'Media Column Width',
      options: [
        { label: '1/3', value: '1/3' },
        { label: '1/2', value: '1/2' },
        { label: '2/3', value: '2/3' },
      ],
      defaultValue: '1/2',
    },
    {
      name: 'textAlignment',
      type: 'select',
      label: 'Text Alignment',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'left',
    },
    {
      name: 'showProgress',
      type: 'checkbox',
      label: 'Show progress indicator',
      defaultValue: false,
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Steps',
      minRows: 2,
      maxRows: 10,
      fields: [
        { name: 'heading', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        {
          name: 'mediaType',
          type: 'select',
          options: [
            { label: 'Image', value: 'image' },
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
          name: 'video',
          type: 'upload',
          relationTo: 'media',
          admin: {
            condition: (_, siblingData) => siblingData?.mediaType === 'video',
          },
        },
      ],
    },
    {
      name: 'containerSettings',
      type: 'group',
      label: 'Container Settings',
      fields: [
        {
          name: 'useContainer',
          type: 'checkbox',
          label: 'Wrap content in container',
          defaultValue: true,
        },
        {
          name: 'containerSize',
          type: 'select',
          options: ['sm', 'md', 'lg', 'full'],
          defaultValue: 'lg',
          admin: { condition: (_, siblingData) => siblingData?.useContainer },
        },
      ],
    },
  ],
}
