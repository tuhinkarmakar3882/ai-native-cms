import { IGenAIBlockGenerator } from '@/generator/types'
import { routes } from '@/router'
import { BaseGenerator } from '@/generator/BaseGenerator'

export class LexicalBlockGenerator extends BaseGenerator implements IGenAIBlockGenerator {
  private readonly _name = 'LexicalBlockGenerator'

  async generate({ prompt }: { prompt: string }) {
    try {
      // const aiResponse = await this._getAIResponse(prompt)
      //
      // if (!aiResponse.content) {
      //   throw new Error('Failed to generate markdown content')
      // }

      const aiResponse = {
        content: `## *U.S. Economy Broadly Resilient as Inflation Persistence Clouds the Policy Path*

By *Tuhin Karmakar* | **2 February 2026**

The U.S. economy has entered 2026 on a firm footing, with GDP growth running near trend and labour markets remaining resilient. Yet inflation’s gradual retreat — particularly in core services — continues to complicate the Federal Reserve’s strategy, leaving policymakers in a delicate balancing act between price stability and growth support.

---

### **Inflation Easing, But Momentum Slows**

Inflation has made significant progress from its early 2020s highs, with headline CPI and core figures now hovering close to long-run norms. However, core prices — especially in shelter, healthcare, and services — have proven stubborn, slowing only incrementally. This stickiness has constrained expectations for aggressive rate cuts in early 2026 and underscores that disinflation’s final mile is often the toughest. ([Equiti Default][1])

Tariff-induced cost pressures further add to the inflationary backdrop. New import levies enacted in the past year are feeding through supply chains with a lag, complicating the inflation picture and embedding additional uncertainty around the trajectory of prices and real incomes. ([Equiti Default][1])

---

### **Growth Remains Steady, Not Spectacular**

Economic activity is steady, with growth forecasts centred around a 2% pace for 2026. This performance keeps output close to long-term trends and indicates that consumers and businesses have adapted to the post-rate-hike environment without a sharp pullback in spending or investment. AI-linked capital expenditures and ongoing infrastructure projects continue to underpin business investment. ([Equiti Default][1])

Overall, the expansion is durable rather than dynamic — good news for avoiding recession risks, but not hot enough to dramatically shift monetary policy narratives. ([Equiti Default][1])

---

### **Labour Market Cooling But Still Supportive**

The pace of hiring has moderated from the historically strong gains seen during the pandemic recovery. Monthly job growth is expected to settle in the 50,000–60,000 range, while unemployment sits modestly above pre-pandemic lows. Wage pressures are easing, but not rapidly enough to materially alter inflation dynamics. ([Equiti Default][1])

This gradual softening in labour markets gives the Fed room to assess whether jobs data reflect a sustainable downshift or just short-term volatility — a key consideration as the central bank weighs future policy moves. ([Equiti Default][1])

---

### **On the Fed’s Policy Path**

With the federal funds target rate anchored around 3.50%–3.75%, markets are pricing in a continuation of this stance through at least the first quarter of 2026. The first real decision point for potential easing remains later in the year, contingent on both inflation continuing to descend toward target and labour market indicators showing persistent softness. ([Equiti Default][1])

The Federal Reserve’s messaging has also taken on outsized importance — communication may shape market expectations as much as actual policy changes. Given inflation’s slow retreat and political noise surrounding central bank independence, verbal guidance could carry heightened sensitivity in financial markets. ([Equiti Default][1])

---

### **Market and Macro Implications**

Financial markets are pricing in a cautious policy stance, reflecting both the central bank’s reluctance to rush rate cuts and the uncertainty embedded in inflation data. A sustained downward trend in inflation and clearer signs of labour market easing would boost the case for cuts later in 2026, but for now, the Fed remains data dependent.

Meanwhile, the dollar’s technical structure — near key trend support — underscores the broader macro narrative: markets are watching not just economic releases, but how policymakers articulate the risks they see ahead. ([Equiti Default][1])

---

**Bottom Line:** The U.S. expansion enters 2026 with backbone, yet inflation’s stubborn persistence and labour market nuances could delay the next leg of monetary easing. In this environment, central bank communication, data flows, and geopolitical factors will collectively shape market expectations and risk premiums in the quarters ahead.`,
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
