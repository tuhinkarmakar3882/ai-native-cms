import { NextResponse } from 'next/server'
import {
  AlignFeature,
  BlockquoteFeature,
  BoldFeature,
  ChecklistFeature,
  convertMarkdownToLexical,
  defaultEditorFeatures,
  EXPERIMENTAL_TableFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  IndentFeature,
  InlineCodeFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  sanitizeServerEditorConfig,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
  UnorderedListFeature,
  UploadFeature,
} from '@payloadcms/richtext-lexical'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: Request) {
  const { markdown } = await req.json()
  const payload = await getPayload({ config })

  const editorConfig = await sanitizeServerEditorConfig(
    {
      features: [
        ...defaultEditorFeatures,
        AlignFeature(),
        BlockquoteFeature(),
        BoldFeature(),
        ChecklistFeature(),
        EXPERIMENTAL_TableFeature(),
        HeadingFeature(),
        HorizontalRuleFeature(),
        IndentFeature(),
        InlineCodeFeature(),
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
      ],
    },
    payload.config,
  )

  const lexicalJSON = convertMarkdownToLexical({
    editorConfig,
    markdown: markdown,
  })
  console.log({ lexicalJSON })

  return NextResponse.json(lexicalJSON)
}
