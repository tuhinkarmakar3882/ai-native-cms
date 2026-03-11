import { Block } from 'payload'
import {
  BlockquoteFeature,
  BoldFeature,
  ChecklistFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnderlineFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

export const BannerBlock: Block = {
  slug: 'banner',
  interfaceName: 'BannerBlock',

  fields: [
    {
      name: 'trackId',
      type: 'text',
      label: 'Tracking ID',
      admin: {
        description: 'Unique identifier for analytics tracking',
      },
    },

    {
      name: 'variant',
      type: 'select',
      label: 'Banner Variant',
      defaultValue: 'info',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' },
      ],
    },

    {
      name: 'layout',
      type: 'select',
      defaultValue: 'inline',
      options: [
        { label: 'Inline (icon left)', value: 'inline' },
        { label: 'Stacked (icon top)', value: 'stacked' },
      ],
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

    {
      name: 'title',
      type: 'text',
    },

    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          ParagraphFeature(),
          HeadingFeature(),
          BoldFeature(),
          UnderlineFeature(),
          LinkFeature(),
          OrderedListFeature(),
          UnorderedListFeature(),
          ChecklistFeature(),
          BlockquoteFeature(),
          HorizontalRuleFeature(),
          InlineToolbarFeature(),
          FixedToolbarFeature(),
        ],
      }),
    },

    {
      name: 'cta',
      type: 'array',
      label: 'Call to Actions',
      maxRows: 2,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'primary',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Ghost', value: 'ghost' },
          ],
        },
      ],
    },

    {
      name: 'customColors',
      type: 'group',
      label: 'Custom Colors',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'background',
              type: 'text',
              defaultValue: '#CCCCCC',
              admin: {
                width: '48%',
                components: {
                  Field: '@/components/ColorPicker#ColorInputComponent',
                },
              },
            },
            {
              name: 'border',
              type: 'text',
              defaultValue: '#CCCCCC',
              admin: {
                width: '48%',
                components: {
                  Field: '@/components/ColorPicker#ColorInputComponent',
                },
              },
            },
          ],
        },
      ],
    },

    {
      name: 'containerSettings',
      type: 'group',
      label: 'Container Settings',
      fields: [
        {
          name: 'useContainer',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'containerSize',
          type: 'select',
          defaultValue: 'lg',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
            { label: 'Full width', value: 'full' },
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.useContainer,
          },
        },
      ],
    },
  ],
}
