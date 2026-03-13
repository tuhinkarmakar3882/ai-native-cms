import { Block } from 'payload'
import { ContainerBlock } from '@/blocks/Composable/structural-blocks'

export const BuildYourOwnSectionBlock: Block = {
  slug: 'buildYourOwnSection',
  dbName: 'b_sec',

  labels: {
    singular: 'Build Your Own Section',
    plural: 'Build Your Own Sections',
  },

  fields: [
    {
      name: 'container',
      type: 'blocks',
      blocks: [ContainerBlock],
      minRows: 1,
      maxRows: 1,
    },
  ],
}
