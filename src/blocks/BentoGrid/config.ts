import { Block } from 'payload'
import { generateTrackingIdSafe } from '@/utilities/generateTrackId'

export const BentoGridBlock: Block = {
  slug: 'bentoGrid',
  dbName: 'bg_bento',
  fields: [
    {
      name: 'trackId',
      type: 'text',
      label: 'Tracking ID (Optional)',
      defaultValue: () => generateTrackingIdSafe('bento-grid-section'),
      required: false,
    },
    { name: 'title', type: 'text' },
    {
      name: 'cards',
      type: 'array',
      fields: [
        {
          name: 'trackId',
          type: 'text',
          label: 'Card Tracking ID (Optional)',
          admin: { description: 'Unique ID for click tracking on this card (if link provided)' },
        },
        { name: 'title', type: 'text', required: true },
        { name: 'content', type: 'textarea' },
        { name: 'icon', type: 'text', admin: { description: 'Lucide icon name' } },
        {
          name: 'span',
          type: 'select',
          defaultValue: '1',
          options: [
            { label: 'Single Box', value: '1' },
            { label: 'Wide Box (2 Cols)', value: '2' },
            { label: 'Tall Box (2 Rows)', value: 'row-2' },
          ],
        },
        {
          name: 'link',
          type: 'group',
          label: 'Card Link (optional)',
          fields: [
            { name: 'url', type: 'text' },
            { name: 'newTab', type: 'checkbox', defaultValue: false },
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
