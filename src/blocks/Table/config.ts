import { Block } from 'payload'

export const TableBlock: Block = {
  slug: 'smartTable',
  dbName: 'blk_table',
  labels: { singular: 'Smart Table', plural: 'Smart Tables' },
  fields: [
    { name: 'title', type: 'text' },
    {
      name: 'sourceType',
      type: 'select',
      defaultValue: 'static',
      options: [
        { label: 'Manual Entry (Static)', value: 'static' },
        { label: 'External API', value: 'api' },
      ],
    },
    // --- STATIC MODE FIELDS ---
    {
      name: 'headers',
      type: 'array',
      label: 'Table Headers',
      minRows: 1,
      admin: { condition: (_, siblingData) => siblingData.sourceType === 'static' },
      fields: [{ name: 'label', type: 'text' }],
    },
    {
      name: 'rows',
      type: 'array',
      label: 'Table Rows',
      admin: { condition: (_, siblingData) => siblingData.sourceType === 'static' },
      fields: [
        {
          name: 'cells',
          type: 'array',
          label: 'Cells (Must match header count)',
          fields: [{ name: 'value', type: 'text' }],
        },
      ],
    },
    // --- API MODE FIELDS ---
    {
      name: 'apiUrl',
      type: 'text',
      label: 'API Endpoint URL',
      admin: { condition: (_, siblingData) => siblingData.sourceType === 'api' },
    },
    {
      name: 'columnMapping',
      type: 'array',
      label: 'API Column Map',
      admin: {
        description: 'Map JSON keys to Table Headers',
        condition: (_, siblingData) => siblingData.sourceType === 'api',
      },
      fields: [
        { name: 'header', type: 'text', label: 'Column Header', required: true },
        { name: 'dataKey', type: 'text', label: 'JSON Key (e.g. "user.email")', required: true },
      ],
    },
  ],
}
