'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Button, useField, useForm } from '@payloadcms/ui'
import { Wand2 } from 'lucide-react'
import { BlockType } from '@/generator/config'
import { GenAIBlockGenerator } from '@/generator'
import { IGenAIBlockGenerator } from '@/generator/types'
import styled from 'styled-components'

const StyledGenerateRichTextContent = styled.div`
  .trigger-button {
    padding: 12px 16px;
    width: 100%;
  }

  section.overlay {
    position: fixed;
    top: 0;
    z-index: 5;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;
    place-items: center;
    background: hsla(0deg, 0%, 0%, 0.9);

    .container {
      max-height: 500px;
      overflow: auto;
      max-width: 768px;
      margin: 1rem;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      border-radius: 12px;
      background: var(--theme-bg);
      box-shadow: 0 0 4px var(--color-success-150);

      header {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      textarea {
        min-height: 200px;
        resize: none;
        padding: 1rem;
        width: 100%;
        border-radius: 8px;
        margin-top: 32px;
      }
    }
  }
`

export const GenerateRichTextContent = () => {
  const blockType = BlockType.RichTextContent
  const { path } = useField({ path: 'layout' })
  const { addFieldRow } = useForm()
  const [prompt, setPrompt] = useState('')
  const [isModalVisible, setModalVisibility] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const generator = useRef<IGenAIBlockGenerator>(null)

  useEffect(() => {
    generator.current = new GenAIBlockGenerator({ blockType })
  }, [blockType])

  const handleGenerate = async ({}) => {
    if (!generator.current) {
      console.error('No Generator Instance found')
      return
    }

    setIsLoading(true)

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
      setTimeout(() => {
        setModalVisibility(false)
        setPrompt('')
      }, 3000)
    } catch (e) {
      console.error('Block Generation Error', e)
    } finally {
      setIsLoading(false)
    }
  }

  const renderModal = () => {
    return (
      <section className="overlay" onClick={() => setModalVisibility(false)}>
        <div className="container" onClick={(e) => e.stopPropagation()}>
          <header>
            <Wand2 size={28} />
            <h1>Build with AI Wizard</h1>
          </header>
          <p>
            Empower your creative workflow by instantly transforming raw ideas into polished,
            structured, and SEO-optimized rich text—designed specifically for seamless integration
            with Payload CMS.
          </p>

          <textarea
            autoFocus
            disabled={isLoading}
            placeholder="Write an article on US growth is solid as sticky inflation pressures the Fed"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <Button
            className="trigger-button"
            onClick={handleGenerate}
            disabled={isLoading || prompt.trim().length < 5}
          >
            {isLoading ? 'Please wait...' : 'Build with AI'}
          </Button>
        </div>
      </section>
    )
  }

  return (
    <StyledGenerateRichTextContent>
      <Button className="trigger-button" onClick={() => setModalVisibility(!isModalVisible)}>
        <Wand2 size={16} style={{ marginRight: '8px' }} />
        Generate RichText Content
      </Button>

      {isModalVisible && renderModal()}
    </StyledGenerateRichTextContent>
  )
}
