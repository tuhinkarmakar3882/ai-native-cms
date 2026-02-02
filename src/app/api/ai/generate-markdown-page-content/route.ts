import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

export async function POST(req: Request) {
  const { prompt } = await req.json()

  // 1. Prepare Model
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }) // Or Gemini 3 if available

  // 2. Inject Context
  // const systemContext = getSystemPromptWithSchema()
  // const fullPrompt = `${systemContext}\n\nUSER REQUEST: ${prompt}`

  const customSystemContext = `
System Instruction:

You are a raw text generator. Your output is consumed directly by a parser.CRITICAL RULES:

Output ONLY the raw Markdown content.
DO NOT use triple backticks or any code fences (e.g., no \`\`\`markdown).
DO NOT include any conversational filler, greetings, or explanations.
DO NOT use JSON or code block formatting.
Start immediately with the first character of the Markdown content.
User Prompt:

Write a landing page for [Topic] using the following structure:

Use # for the main title.
Use ## for section headings.
Use ** for bold emphasis.
Use - for bulleted lists.
Content Topic: ${prompt}`
  const fullPrompt = customSystemContext

  // 3. Generate
  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
    generationConfig: { responseMimeType: 'text/plain' },
  })

  let responseText = result.response.text()
  responseText = responseText
    .replace(/^```markdown\n?/, '')
    .replace(/```$/, '')
    .trim()

  return NextResponse.json({ content: responseText })
}
