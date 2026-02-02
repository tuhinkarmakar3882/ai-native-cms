import { BlockType } from '@/generator/config'

export type EnumValues<E> = E[keyof E]

export interface IGenAIBlockGenerator {
  generate: ({ prompt }: { prompt: string }) => Promise<Record<string, any>>
}

export interface IGenAIBlockGeneratorProps {
  blockType: BlockType
}
