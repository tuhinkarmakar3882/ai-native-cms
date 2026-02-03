import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)

export async function POST(req: Request) {
  const { prompt, config } = await req.json()

  const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' })

  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: config?.responseMimeType || 'text/plain' },
  })

  let responseText = result.response.text()
  responseText = responseText
    .replace(/^```markdown\n?/, '')
    .replace(/```$/, '')
    .trim()

  return NextResponse.json({ content: responseText })
}
