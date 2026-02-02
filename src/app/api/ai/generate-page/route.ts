import { GoogleGenerativeAI } from '@google/generative-ai'
import { getSystemPromptWithSchema } from '@/generator'
import { NextResponse } from 'next/server'

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

// Helper: Lexical is complex. If AI returns plain strings for RichText, wrap them.
// In production, you'd use a parser to convert Markdown -> Lexical JSON.
const basicLexicalNode = (text: string) => ({
  root: {
    children: [
      {
        children: [
          { detail: 0, format: 0, mode: 'normal', style: '', text, type: 'text', version: 1 },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
})

export async function POST(req: Request) {
  const { prompt } = await req.json()

  // 1. Prepare Model
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }) // Or Gemini 3 if available

  // 2. Inject Context
  const systemContext = getSystemPromptWithSchema()
  const fullPrompt = `${systemContext}\n\nUSER REQUEST: ${prompt}`

  // 3. Generate
  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
    generationConfig: { responseMimeType: 'application/json' },
  })

  const responseText = result.response.text()

  try {
    const json = JSON.parse(responseText)

    // 4. Post-Process (Fix RichText fields)
    // We iterate through the blocks and fix text fields that Payload expects as RichText
    const processedLayout = json.layout.map((block: any) => {
      // Example: Convert simple string 'heading' to Lexical if your config requires it
      // For now, assuming your Atoms use standard text for simple fields,
      // but if you have a RichText field, you wrap it here:
      if (block.blockType === 'textAtom' && typeof block.content === 'string') {
        block.content = basicLexicalNode(block.content)
      }
      return block
    })

    return NextResponse.json({ layout: processedLayout })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 })
  }
}
