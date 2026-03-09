import { Block } from 'payload'
import { AtomBlocks } from './Atoms'
import { ResponsiveWidthField } from '@/blocks/Composable/Atoms/config'

export const GridItemBlock: Block = {
  slug: 'gridItem',
  dbName: 'grid_item',

  fields: [
    ResponsiveWidthField,
    {
      name: 'content',
      type: 'blocks',
      blocks: AtomBlocks,
    },
  ],
}

export const GridAreaBlock: Block = {
  slug: 'gridArea',
  dbName: 'grid_area',

  fields: [
    {
      name: 'direction',
      type: 'radio',
      defaultValue: 'row',
      options: [
        { label: 'Row', value: 'row' },
        { label: 'Column', value: 'column' },
      ],
    },

    {
      name: 'justify',
      type: 'select',
      defaultValue: 'start',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },

    {
      name: 'align',
      type: 'select',
      defaultValue: 'start',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
    },

    {
      name: 'gap',
      type: 'number',
      admin: {
        description: 'Gap in pixels',
      },
    },

    {
      name: 'items',
      type: 'blocks',
      blocks: [GridItemBlock],
      minRows: 1,
    },
  ],
}

export const ContainerBlock: Block = {
  slug: 'container',

  fields: [
    {
      name: 'width',
      type: 'select',
      defaultValue: 'container',

      options: [
        { label: 'Container', value: 'container' },
        { label: 'Wide', value: 'wide' },
        { label: 'Full Width', value: 'full' },
      ],
    },

    {
      name: 'padding',
      type: 'select',
      defaultValue: 'medium',

      options: ['none', 'small', 'medium', 'large'],
    },

    {
      name: 'areas',
      type: 'blocks',
      blocks: [GridAreaBlock],
      minRows: 1,
    },
  ],
}
