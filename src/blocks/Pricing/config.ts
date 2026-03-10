import { Block } from 'payload'

export const PricingBlock: Block = {
  slug: 'pricingTable',
  dbName: 'prc_tbl',
  fields: [
    {
      name: 'trackId',
      type: 'text',
      label: 'Tracking ID (Optional)',
    },
    { name: 'heading', type: 'text' },
    {
      name: 'plans',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'price', type: 'text', required: true },
        { name: 'description', type: 'text' },
        { name: 'isPopular', type: 'checkbox', label: 'Mark as Popular' },
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'feature',
              type: 'text',
            },
            {
              name: 'icon',
              type: 'text',
              admin: {
                description: 'Optional Lucide icon name (defaults to Check)',
                components: {
                  Field: '@/components/IconPicker#IconPickerComponent',
                },
              },
            },
          ],
        },
        {
          name: 'button',
          type: 'group',
          label: 'CTA Button',
          fields: [
            { name: 'text', type: 'text', defaultValue: 'Get Started' },
            { name: 'link', type: 'text' },
            { name: 'trackId', type: 'text', label: 'Button Tracking ID' },
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
