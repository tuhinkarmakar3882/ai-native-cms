import { NextResponse } from 'next/server'
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: Request) {
  const { markdown } = await req.json()
  const payload = await getPayload({ config })

  const lexicalJSON = convertMarkdownToLexical({
    editorConfig: await editorConfigFactory.default({
      config: payload.config,
    }),
    markdown: markdown,
  })
  console.log({ lexicalJSON })

  return NextResponse.json(lexicalJSON)
}
