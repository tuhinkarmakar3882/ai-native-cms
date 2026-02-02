import { routes } from '@/router'

export abstract class BaseGenerator {
  async _getAIResponse(prompt: string) {
    return await fetch(routes.generateMarkdownPageContent, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    }).then((res) => res.json())
  }
}
