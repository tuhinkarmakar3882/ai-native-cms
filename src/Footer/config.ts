import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',

  access: {
    read: () => true,
  },

  fields: [
    {
      name: 'description',
      type: 'textarea',
      label: 'Brand Description',
    },

    {
      name: 'linkGroups',
      type: 'array',
      label: 'Navigation Groups',

      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },

      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },

        {
          name: 'links',
          type: 'array',
          fields: [
            link({
              appearances: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
            }),
          ],
        },
      ],
    },

    {
      name: 'newsletter',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'text' },

        {
          name: 'provider',
          type: 'select',
          options: [
            { label: 'Mailchimp', value: 'mailchimp' },
            { label: 'ConvertKit', value: 'convertkit' },
            { label: 'Custom', value: 'custom' },
          ],
        },
      ],
    },

    {
      name: 'socialLinks',
      type: 'array',

      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'X', value: 'x' },
            { label: 'GitHub', value: 'github' },
            { label: 'LinkedIn', value: 'linkedin' },
            { label: 'YouTube', value: 'youtube' },
          ],
        },

        link({
          appearances: false,
        }),
      ],
    },

    {
      name: 'appLinks',
      type: 'array',

      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [
            { label: 'App Store', value: 'appstore' },
            { label: 'Google Play', value: 'playstore' },
          ],
        },

        link({
          appearances: false,
        }),
      ],
    },

    {
      name: 'legalLinks',
      type: 'array',

      fields: [
        link({
          appearances: false,
        }),
      ],
    },

    {
      name: 'copyright',
      type: 'text',
      defaultValue: '© 2026 Company. All rights reserved.',
    },
  ],

  hooks: {
    afterChange: [revalidateFooter],
  },
}
