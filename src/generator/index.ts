import { BlockType } from '@/generator/config'
import { EnumValues, IGenAIBlockGenerator, IGenAIBlockGeneratorProps } from '@/generator/types'
import { LexicalBlockGenerator } from '@/generator/LexicalBlockGenerator'
import { HeroGradientGenerator } from '@/generator/HeroGradientGenerator'

export const GLOBAL_CONFIG_REPOSITORY: Record<
  EnumValues<typeof BlockType>,
  IGenAIBlockGenerator
> = {
  [BlockType.RichTextContent]: new LexicalBlockGenerator(),
  [BlockType.HeroGradient]: new HeroGradientGenerator(),
}

export class GenAIBlockGenerator implements IGenAIBlockGenerator {
  private readonly _generator: IGenAIBlockGenerator

  constructor(props: IGenAIBlockGeneratorProps) {
    this._generator = GLOBAL_CONFIG_REPOSITORY[props.blockType]
  }

  generate({ prompt }: { prompt: string }) {
    return this._generator.generate({ prompt })
  }
}
