import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
import ColorInput from '@/components/ColorPicker'

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
        link({
          appearances: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
        }),

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
            {
              type: 'row',
              fields: [
                {
                  name: 'icon',
                  type: 'text',
                  admin: {
                    description: 'Optional Lucide icon name to display next to the link',
                    width: '33%',
                    components: {
                      Field: '@/components/IconPicker#IconPickerComponent',
                    },
                  },
                },
                {
                  name: 'iconSize',
                  type: 'number',
                  defaultValue: 20,
                  admin: {
                    width: '30%',
                  },
                },
                {
                  name: 'iconColor',
                  type: 'text',
                  admin: {
                    width: '33%',
                    components: {
                      Field: '@/components/ColorPicker#ColorInputComponent',
                    },
                  },
                },
              ],
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
      fields: [
        link({
          appearances: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
        }),
      ],
    },
  ],

  hooks: {
    afterChange: [revalidateHeader],
  },
}
