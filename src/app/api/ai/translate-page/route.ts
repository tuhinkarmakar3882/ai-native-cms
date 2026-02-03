import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'
import {
  AlignFeature,
  BlockquoteFeature,
  BoldFeature,
  ChecklistFeature,
  convertLexicalToMarkdown,
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

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

export async function translateWithGemini(text: string, targetLocale: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' })

  const prompt = `
    Translate the following Markdown content into the language code: ${targetLocale}.
    STRICT RULES:
    1. Do not translate code blocks, URLs, or image syntax.
    2. Maintain all Markdown formatting (hashes, bold, lists).
    3. Return ONLY the translated text, no conversational filler.

    CONTENT:
    ${text}
  `

  const result = await model.generateContent(prompt)
  return result.response.text()
}

export async function POST(req: Request) {
  const { docId, blocks, targets } = await req.json()
  console.log({
    docId,
    blocks,
    targets,
  })
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

  for (const locale of targets) {
    // 2. Map through the blocks provided by the frontend
    const translatedBlocks = await Promise.all(
      blocks.map(async (block) => {
        console.log({ block })
        // Only translate blocks that have richText or text fields
        // You can check block.blockType here to target specific fields
        if (block.blockType === 'richtext-content') {
          const markdown = convertLexicalToMarkdown({
            data: block.content,
            editorConfig,
          })

          console.log('To be translated', { markdown, locale })

          // 3. Send to Gemini (Utility function below)
          const translatedMarkdown = await translateWithGemini(markdown, locale)

          console.log({ translatedMarkdown })

          // 4. Convert back to Lexical
          block.content = convertMarkdownToLexical({
            markdown: translatedMarkdown,
            editorConfig,
          })
        }

        if (block.title) {
          block.title = await translateWithGemini(block.title, locale)
        }

        return block
      }),
    )

    // 5. Save this specific locale's version
    await payload.update({
      collection: 'pages',
      id: docId,
      locale: locale,
      data: {
        layout: translatedBlocks,
      },
    })
  }

  return NextResponse.json({ success: true })
}
