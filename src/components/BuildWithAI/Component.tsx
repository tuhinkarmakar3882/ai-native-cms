'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useField, useForm } from '@payloadcms/ui'
import { Button } from '@/components/ui/button'
import { Wand2 } from 'lucide-react'
import { BlockType } from '@/generator/config'
import { GenAIBlockGenerator } from '@/generator'
import { IGenAIBlockGenerator } from '@/generator/types'

interface IBuildWithAIProps {
  blockType: BlockType
  config?: any
}

export const BuildWithAI = ({
  blockType = BlockType.RichTextContent,
  config = {},
}: IBuildWithAIProps) => {
  const { path } = useField({ path: 'layout' })
  const { addFieldRow } = useForm()
  const [prompt, setPrompt] = useState('')
  const generator = useRef<IGenAIBlockGenerator>(null)

  useEffect(() => {
    generator.current = new GenAIBlockGenerator({ blockType })
  }, [blockType])

  const handleGenerate = async ({}) => {
    if (!generator.current) {
      console.error('No Generator Instance found')
      return
    }

    try {
      const output = await generator.current.generate({
        prompt,
      })

      console.log('BuildWithAI :: Received :: GeneratorOutput', { output })

      addFieldRow({
        path,
        blockType,
        subFieldState: output,
      })
    } catch (e) {
      console.error('Block Generation Error', e)
    }
  }

  return (
    <Button onClick={handleGenerate} variant="outline" className="w-full">
      <Wand2 size={16} className="mr-2" />
      Generate Block Content
    </Button>
  )
}
