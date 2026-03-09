import { Block } from 'payload'

export const FeatureGridBlock: Block = {
  slug: 'featureGrid',
  fields: [
    {
      name: 'trackId',
      type: 'text',
      label: 'Tracking ID (Optional)',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: [
        { label: '2 Columns', value: '2' },
        { label: '3 Columns', value: '3' },
        { label: '4 Columns', value: '4' },
      ],
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'trackId',
          type: 'text',
          label: 'Feature Tracking ID (Optional)',
        },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'badge', type: 'text' },
        { name: 'icon', type: 'text', admin: { description: 'Lucide icon name' } },
        {
          name: 'link',
          type: 'group',
          label: 'Link (optional)',
          fields: [
            { name: 'url', type: 'text' },
            { name: 'newTab', type: 'checkbox' },
          ],
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
          label: 'Wrap in container',
          defaultValue: true,
        },
        {
          name: 'containerSize',
          type: 'select',
          label: 'Container Size',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
            { label: 'Full width', value: 'full' },
          ],
          defaultValue: 'lg',
          admin: {
            condition: (_, siblingData) => siblingData?.useContainer === true,
          },
        },
      ],
    },
  ],
}
