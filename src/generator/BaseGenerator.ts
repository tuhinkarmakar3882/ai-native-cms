import { routes } from '@/router'

interface IRequestConfig {
  responseMimeType: string
}
export abstract class BaseGenerator {
  async _getAIResponse(prompt: string, config?: IRequestConfig) {
    return await fetch(routes.generateMarkdownPageContent, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt,
        config,
      }),
    }).then((res) => res.json())
  }
}
