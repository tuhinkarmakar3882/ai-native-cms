import { Block } from 'payload'

export const HeroBannerBlock: Block = {
  slug: 'heroBanner',
  labels: {
    singular: 'Hero Banner',
    plural: 'Hero Banners',
  },
  fields: [
    {
      name: 'variant',
      type: 'radio',
      label: 'Variant',
      required: true,
      options: [
        { label: 'Full (with optional backdrop)', value: 'full' },
        { label: 'Split (image side-by-side)', value: 'split' },
      ],
      defaultValue: 'full',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      maxLength: 100,
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading',
      maxLength: 200,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Background / Side Image',
    },
    {
      name: 'actions',
      type: 'array',
      label: 'Call-to-Action Buttons',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
        },
        {
          name: 'style',
          type: 'select',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Outline', value: 'outline' },
            { label: 'Ghost', value: 'ghost' },
          ],
          defaultValue: 'default',
        },
        {
          name: 'trackId',
          type: 'text',
          label: 'Tracking ID (for data-track-id)',
          admin: {
            description: 'Optional unique identifier for click tracking',
          },
        },
      ],
    },
    // Fields specific to Full variant
    {
      name: 'pillText',
      type: 'text',
      label: 'Pill / Badge Text',
      admin: {
        condition: (_, siblingData) => siblingData?.variant === 'full',
      },
    },
    {
      name: 'backdrop',
      type: 'checkbox',
      label: 'Enable backdrop overlay',
      defaultValue: true,
      admin: {
        condition: (_, siblingData) => siblingData?.variant === 'full',
        description: 'Adds a dark translucent overlay and blur effect over the background image',
      },
    },
    // Fields specific to Split variant
    {
      name: 'splitSettings',
      type: 'group',
      label: 'Split Layout Settings',
      admin: {
        condition: (_, siblingData) => siblingData?.variant === 'split',
      },
      fields: [
        {
          name: 'theme',
          type: 'select',
          label: 'Theme',
          options: [
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
          ],
          defaultValue: 'light',
        },
        {
          name: 'imagePosition',
          type: 'select',
          label: 'Image Position',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
          defaultValue: 'right',
        },
      ],
    },
    {
      name: 'sectionId',
      type: 'text',
      label: 'Section ID (for data-track-section)',
      admin: {
        description: 'Optional unique identifier for this hero section',
      },
    },
    {
      name: 'containerSettings',
      type: 'group',
      label: 'Container Settings',
      fields: [
        {
          name: 'useContainer',
          type: 'checkbox',
          label: 'Wrap in container',
          defaultValue: true,
        },
        {
          name: 'containerSize',
          type: 'select',
          label: 'Container Size',
          options: [
            { label: 'Small', value: 'sm' },
            { label: 'Medium', value: 'md' },
            { label: 'Large', value: 'lg' },
            { label: 'Full width', value: 'full' },
          ],
          defaultValue: 'lg',
          admin: {
            condition: (_, siblingData) => siblingData?.useContainer === true,
          },
        },
      ],
    },
  ],
}
