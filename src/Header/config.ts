import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',

  access: {
    read: () => true,
  },

  fields: [
    {
      name: 'navItems',
      type: 'array',
      maxRows: 8,

      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },

      fields: [
        link({ appearances: false }),

        {
          name: 'description',
          type: 'text',
        },

        {
          name: 'children',
          type: 'array',
          label: 'Dropdown Links',

          fields: [
            link({ appearances: false }),

            {
              name: 'description',
              type: 'text',
            },
          ],
        },
      ],
    },

    {
      name: 'ctas',
      type: 'array',
      maxRows: 2,
      admin: {
        initCollapsed: true,
      },
      fields: [link({ appearances: ['default', 'outline'] })],
    },
  ],

  hooks: {
    afterChange: [revalidateHeader],
  },
}
