import { Block } from 'payload'
import { AtomBlocks } from './Atoms' // Buttons, Text, Badges, etc.

export const ComposableSectionBlock: Block = {
  slug: 'composableSection',
  dbName: 'b_comp_sec',
  labels: { singular: 'Build Your Own Section', plural: 'Build Your Own Sections' },
  fields: [
    {
      name: 'containerSettings',
      type: 'group',
      fields: [
        {
          name: 'layoutType',
          type: 'select',
          defaultValue: 'flex',
          options: [
            { label: 'Flexbox (Rows/Cols)', value: 'flex' },
            { label: 'CSS Grid', value: 'grid' },
          ],
        },
        { name: 'gap', type: 'number', admin: { description: 'Gap in pixels (e.g. 16, 32)' } },
        { name: 'padding', type: 'select', options: ['none', 'small', 'large'] },
      ],
    },
    {
      name: 'columns',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'width',
          type: 'select',
          defaultValue: 'full',
          options: [
            { label: 'Full Width', value: 'w-full' },
            { label: 'Half (1/2)', value: 'w-1/2' },
            { label: 'One Third (1/3)', value: 'w-1/3' },
          ],
        },
        {
          name: 'content',
          type: 'blocks',
          blocks: AtomBlocks,
        },
      ],
    },
  ],
}
