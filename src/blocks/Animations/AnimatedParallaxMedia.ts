import { Block } from 'payload'
import {
  AlignFeature,
  BlockquoteFeature,
  BlocksFeature,
  BoldFeature,
  ChecklistFeature,
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  IndentFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import { Code } from '@/blocks/Code/config'

export const AnimatedParallaxMediaBlock: Block = {
  slug: 'parallaxMedia',
  labels: {
    singular: '[Animated] Parallax Block',
    plural: '[Animated] Parallax Block',
  },
  fields: [
    {
      name: 'trackId',
      type: 'text',
      label: 'Tracking ID (Optional)',
    },
    {
      name: 'mediaType',
      type: 'radio',
      label: 'Media Type',
      required: true,
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
      defaultValue: 'image',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.mediaType === 'image',
      },
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.mediaType === 'video',
      },
    },
    {
      name: 'height',
      type: 'select',
      label: 'Section Height',
      options: [
        { label: 'Small (300px)', value: 'small' },
        { label: 'Medium (500px)', value: 'medium' },
        { label: 'Large (700px)', value: 'large' },
        { label: 'Full Screen', value: 'full' },
      ],
      defaultValue: 'full',
    },
    {
      name: 'parallaxIntensity',
      type: 'select',
      label: 'Parallax Intensity',
      options: [
        { label: 'Subtle', value: 'subtle' },
        { label: 'Medium', value: 'medium' },
        { label: 'Strong', value: 'strong' },
      ],
      defaultValue: 'medium',
      admin: {
        description: 'How much the media moves relative to scroll.',
      },
    },
    {
      name: 'parallaxDirection',
      type: 'select',
      label: 'Parallax Direction',
      options: [
        { label: 'Up (normal)', value: 'up' },
        { label: 'Down (reverse)', value: 'down' },
      ],
      defaultValue: 'up',
    },
    {
      name: 'overlay',
      type: 'group',
      label: 'Overlay Settings',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enable Overlay',
          defaultValue: false,
        },
        {
          name: 'color',
          type: 'select',
          label: 'Overlay Color',
          options: [
            { label: 'Dark', value: 'dark' },
            { label: 'Darker', value: 'darker' },
            { label: 'Light', value: 'light' },
            { label: 'Primary', value: 'primary' },
          ],
          defaultValue: 'dark',
          admin: { condition: (_, siblingData) => siblingData?.enabled },
        },
        {
          name: 'opacity',
          type: 'select',
          label: 'Overlay Opacity',
          options: [
            { label: '10%', value: '10' },
            { label: '25%', value: '25' },
            { label: '50%', value: '50' },
            { label: '75%', value: '75' },
            { label: '90%', value: '90' },
          ],
          defaultValue: '50',
          admin: { condition: (_, siblingData) => siblingData?.enabled },
        },
      ],
    },
    {
      name: 'text',
      type: 'group',
      label: 'Overlay Text (Optional)',
      fields: [
        {
          name: 'heading',
          type: 'text',
        },
        {
          name: 'description',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                AlignFeature(),
                BlockquoteFeature(),
                BoldFeature(),
                ChecklistFeature(),
                EXPERIMENTAL_TableFeature(),
                FixedToolbarFeature(),
                HeadingFeature(),
                HorizontalRuleFeature(),
                IndentFeature(),
                InlineCodeFeature(),
                InlineToolbarFeature(),
                ItalicFeature(),
                LinkFeature(),
                OrderedListFeature(),
                ParagraphFeature(),
                StrikethroughFeature(),
                SubscriptFeature(),
                SuperscriptFeature(),
                UnderlineFeature(),
                UnorderedListFeature(),
                UploadFeature(),
                BlocksFeature({
                  blocks: [Code],
                }),
              ]
            },
          }),
        },
        {
          name: 'button',
          type: 'group',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'link', type: 'text' },
            {
              name: 'variant',
              type: 'select',
              options: ['default', 'secondary', 'outline', 'ghost', 'destructive'],
              defaultValue: 'default',
            },
            { name: 'trackId', type: 'text', label: 'Button Tracking ID' },
          ],
        },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.overlay?.enabled === true,
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption (displayed when no overlay)',
      admin: {
        condition: (_, siblingData) => siblingData?.overlay?.enabled !== true,
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
          defaultValue: false,
        },
        {
          name: 'containerSize',
          type: 'select',
          options: ['sm', 'md', 'lg', 'full'],
          defaultValue: 'lg',
          admin: { condition: (_, siblingData) => siblingData?.useContainer },
        },
      ],
    },
  ],
}
