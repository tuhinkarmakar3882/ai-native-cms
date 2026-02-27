import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'

export const Experiments: CollectionConfig = {
  slug: 'experiments',
  labels: {
    singular: 'Experiment',
    plural: 'Experiments',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'enabled'],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  hooks: {
    // afterChange: [revalidateExperiment],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Public route where the experiment runs (e.g. "landing")',
      },
    },
    {
      name: 'experimentId',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Unique experiment identifier for hashing/analytics',
      },
    },
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'variants',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
          filterOptions: {
            isVariant: {
              equals: true,
            },
          },
        },
        {
          name: 'weight',
          type: 'number',
          required: true,
          min: 1,
        },
        {
          name: 'label',
          type: 'text',
          required: false,
          admin: { description: 'Optional label for analytics (e.g. "control")' },
        },
      ],
    },
  ],
}
