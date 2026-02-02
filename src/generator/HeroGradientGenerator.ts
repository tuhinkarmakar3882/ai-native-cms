import { BaseGenerator } from '@/generator/BaseGenerator'
import { IGenAIBlockGenerator } from '@/generator/types'
import { routes } from '@/router'

const createHeroGradientContent = () => ({
  pillText: 'AI Generated Content',
  heading: 'It finally works!',
  subheading: 'Content is now appearing because we used subFieldState.',
  actions: [
    {
      label: 'test',
      link: '/',
      type: 'default',
    },
  ],
})

export class HeroGradientGenerator extends BaseGenerator implements IGenAIBlockGenerator {
  private readonly _name = 'LexicalBlockGenerator'

  async generate({ prompt }: { prompt: string }) {
    try {
      return createHeroGradientContent()
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
    }).then((res) => res.json())
  }
}
