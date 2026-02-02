import { IGenAIBlockGenerator } from '@/generator/types'
import { routes } from '@/router'
import { BaseGenerator } from '@/generator/BaseGenerator'

const BASE_SYSTEM_PROMPT = `
System Instruction:

You are a raw text generator. Your output is consumed directly by a parser. CRITICAL RULES:

Output ONLY the raw Markdown content.

DO NOT use triple backticks or any code fences (e.g., no \`\`\`markdown).

DO NOT include any conversational filler, greetings, or explanations.

DO NOT use JSON or code block formatting.

Start immediately with the first character of the Markdown content.

Use # for the main title.
Use ## for section headings.
Use ** for bold emphasis.
Use - for bulleted lists.
Use > for blockquotes.

User Instruction:
`

export class LexicalBlockGenerator extends BaseGenerator implements IGenAIBlockGenerator {
  private readonly _name = 'LexicalBlockGenerator'

  async generate({ prompt }: { prompt: string }) {
    try {
      const aiResponse = await this._getAIResponse(BASE_SYSTEM_PROMPT + prompt, {
        responseMimeType: 'text/plain',
      })

      if (!aiResponse.content) {
        throw new Error('Failed to generate markdown content')
      }

      console.log('LexicalBlockGenerator :: Received :: AI_RESPONSE', {
        aiResponse,
      })

      const conversionResponse = await this._getConversionResponse(aiResponse)

      console.log('LexicalBlockGenerator :: Received :: conversionResponse', {
        conversionResponse,
      })

      const lexicalJSON = await conversionResponse.json()

      console.log('LexicalBlockGenerator :: Received :: lexicalJSON', {
        lexicalJSON,
      })

      return {
        content: {
          value: lexicalJSON,
          valid: true,
          initialValue: lexicalJSON,
        },
      }
    } catch (error) {
      console.error(`${this._name} :: GenAIBlockGenerator Error:`, error)
      throw error
    }
  }

  private async _getConversionResponse(aiResponse: any) {
    return await fetch(routes.convertToLexicalJSON, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        markdown: aiResponse.content,
      }),
    })
  }
}
