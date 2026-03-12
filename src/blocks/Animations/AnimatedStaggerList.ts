import { Block } from 'payload'

export const AnimatedStaggerListBlock: Block = {
  slug: 'staggerList',
  labels: {
    singular: '[Animated] Stagger List',
    plural: '[Animated] Stagger Lists',
  },

  fields: [
    {
      name: 'trackId',
      type: 'text',
    },

    {
      name: 'heading',
      type: 'text',
    },

    {
      name: 'columns',
      type: 'select',
      label: 'Number of columns',
      options: [
        { label: '1 column', value: '1' },
        { label: '2 columns', value: '2' },
        { label: '3 columns', value: '3' },
      ],
      defaultValue: '3',
    },

    /* polymorphic items */

    {
      name: 'items',
      type: 'blocks',
      minRows: 1,
      blocks: [
        {
          slug: 'featureItem',
          labels: { singular: 'Feature', plural: 'Features' },

          fields: [
            { name: 'title', type: 'text', required: true },

            { name: 'description', type: 'textarea' },

            {
              name: 'icon',
              type: 'text',
              admin: {
                description: 'Lucide icon name (optional)',
                components: {
                  Field: '@/components/IconPicker#IconPickerComponent',
                },
              },
            },

            {
              name: 'link',
              type: 'group',
              fields: [
                { name: 'url', type: 'text' },
                { name: 'newTab', type: 'checkbox' },
                { name: 'trackId', type: 'text' },
              ],
            },
          ],
        },

        {
          slug: 'featureCard',

          labels: { singular: 'Feature Card', plural: 'Feature Cards' },

          fields: [
            { name: 'name', type: 'text', required: true },

            { name: 'price', type: 'text' },

            { name: 'description', type: 'textarea' },

            {
              name: 'isPopular',
              type: 'checkbox',
            },

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
                    description: 'Lucide icon name',
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
              fields: [
                { name: 'text', type: 'text' },
                { name: 'url', type: 'text' },
                { name: 'trackId', type: 'text' },
              ],
            },
          ],
        },
      ],
    },

    {
      name: 'containerSettings',
      type: 'group',
      fields: [
        {
          name: 'useContainer',
          type: 'checkbox',
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
