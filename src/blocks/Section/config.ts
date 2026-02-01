import { Block } from 'payload'
import { ButtonAtom, TextAtom } from '@/blocks/Composable/Atoms/config'

export const SectionBlock: Block = {
  slug: 'section',
  fields: [
    {
      name: 'settings',
      type: 'group',
      fields: [
        { name: 'backgroundColor', type: 'text', admin: { description: 'Hex or Tailwind class' } },
        { name: 'padding', type: 'select', options: ['small', 'medium', 'large'] },
      ],
    },
    {
      name: 'content',
      type: 'blocks', // Recursive blocks!
      blocks: [
        ButtonAtom,
        TextAtom,
        // Add more ShadCN atoms here (Input, Badge, etc.)
      ],
    },
  ],
}
