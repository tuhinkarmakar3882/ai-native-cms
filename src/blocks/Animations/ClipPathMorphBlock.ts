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
import { PricingBlock } from '@/blocks/Pricing/config' // adjust path
import { HeroBannerBlock } from '@/blocks/HeroBanner/config'
import { BuildYourOwnSectionBlock } from '@/blocks/Composable/config'
import { StaggerListBlock } from '@/blocks/Animations/StaggerList'

const NestedBlocks = [PricingBlock, HeroBannerBlock, BuildYourOwnSectionBlock, StaggerListBlock]

export const ClipPathMorphBlock: Block = {
  slug: 'clipPathMorph',
  labels: {
    singular: 'Clip Path Morph with Overlay',
    plural: 'Clip Path Morph with Overlays',
  },
  fields: [
    {
      name: 'trackId',
      type: 'text',
    },
    // --- Background Media ---
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Media (Image/Video)',
      required: true,
    },
    {
      name: 'mediaType',
      type: 'select',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
      ],
      defaultValue: 'image',
    },
    // --- Clip Path Settings ---
    {
      name: 'startClipPath',
      type: 'select',
      label: 'Start Shape',
      options: [
        { label: 'Circle (0%)', value: 'circle(0% at 50% 50%)' },
        { label: 'Inset (Full)', value: 'inset(0% 0% 0% 0%)' },
        { label: 'Inset (Top)', value: 'inset(0% 0% 100% 0%)' },
        { label: 'Polygon (Center Dot)', value: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)' },
      ],
      defaultValue: 'circle(0% at 50% 50%)',
    },
    {
      name: 'endClipPath',
      type: 'select',
      label: 'End Shape',
      options: [
        { label: 'Circle (100%)', value: 'circle(150% at 50% 50%)' },
        { label: 'Inset (Full)', value: 'inset(0% 0% 0% 0%)' },
        { label: 'Polygon (Full Screen)', value: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
      ],
      defaultValue: 'circle(150% at 50% 50%)',
    },
    // --- Animation Settings ---
    {
      name: 'animationDuration',
      type: 'number',
      label: 'Animation Duration (vh)',
      defaultValue: 120,
      min: 50,
      max: 300,
    },
    {
      name: 'easing',
      type: 'select',
      options: [
        { label: 'Power2 In/Out', value: 'power2.inOut' },
        { label: 'Power3 In/Out', value: 'power3.inOut' },
        { label: 'Expo Scale Out', value: 'expo.scaleOut' },
      ],
      defaultValue: 'power2.inOut',
    },
    // --- Overlay Start Component ---
    {
      name: 'overlayStart',
      type: 'group',
      label: 'Overlay – Start',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Solid Color', value: 'color' },
            { label: 'Rich Text', value: 'richText' },
            { label: 'Block', value: 'block' },
          ],
          defaultValue: 'none',
        },
        {
          name: 'color',
          type: 'text',
          label: 'Color (e.g., rgba(0,0,0,0.7))',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'color',
            components: {
              Field: '@/components/ColorPicker#ColorInputComponent',
            },
          },
        },
        {
          name: 'richText',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
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
              BlocksFeature({ blocks: [Code] }),
            ],
          }),
          admin: { condition: (_, siblingData) => siblingData?.type === 'richText' },
        },
        {
          name: 'block',
          type: 'blocks',
          label: 'Block Content',
          maxRows: 1,
          blocks: NestedBlocks,
          admin: { condition: (_, siblingData) => siblingData?.type === 'block' },
        },
      ],
    },
    // --- Overlay End Component ---
    {
      name: 'overlayEnd',
      type: 'group',
      label: 'Overlay – End',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Solid Color', value: 'color' },
            { label: 'Rich Text', value: 'richText' },
            { label: 'Block', value: 'block' },
          ],
          defaultValue: 'none',
        },
        {
          name: 'color',
          type: 'text',
          label: 'Color (e.g., rgba(255,255,255,0.7))',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'color',
            components: {
              Field: '@/components/ColorPicker#ColorInputComponent',
            },
          },
        },
        {
          name: 'richText',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
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
              BlocksFeature({ blocks: [Code] }),
            ],
          }),
          admin: { condition: (_, siblingData) => siblingData?.type === 'richText' },
        },
        {
          name: 'block',
          type: 'blocks',
          label: 'Block Content',
          maxRows: 1,
          blocks: NestedBlocks,
          admin: { condition: (_, siblingData) => siblingData?.type === 'block' },
        },
      ],
    },
  ],
}
