import { Block } from 'payload'
import { MediaViewerBlock } from '@/blocks/MediaViewer/config'

export const TabbedMediaViewerBlock: Block = {
  slug: 'tabbedMediaViewer',
  labels: {
    singular: 'Tabbed Media Viewer',
    plural: 'Tabbed Media Viewers',
  },
  fields: [
    {
      name: 'useContainer',
      type: 'checkbox',
      label: 'Use Container',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },

    {
      name: 'tabs',
      type: 'array',
      label: 'Tabs',
      minRows: 1,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          label: 'Slug',
          admin: {
            description: 'Used for deep linking',
          },
        },
        {
          name: 'media',
          type: 'blocks',
          label: 'Media',
          blocks: [MediaViewerBlock],
          maxRows: 1,
        },
      ],
    },

    {
      name: 'layout',
      type: 'select',
      defaultValue: 'sidebar',
      options: [
        { label: 'Sidebar Tabs', value: 'sidebar' },
        { label: 'Top Tabs', value: 'top' },
      ],
    },

    {
      name: 'mobileLayout',
      type: 'select',
      label: 'Mobile Layout',
      defaultValue: 'accordion',
      options: [
        { label: 'Accordion', value: 'accordion' },
        { label: 'Dropdown', value: 'dropdown' },
        { label: 'Scrollable Tabs', value: 'tabs' },
      ],
      admin: {
        description: 'Layout used under md breakpoint',
      },
    },
  ],
}
