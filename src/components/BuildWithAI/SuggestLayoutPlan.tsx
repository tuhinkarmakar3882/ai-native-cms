'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@payloadcms/ui'
import { LayoutDashboard, Wand2 } from 'lucide-react'
import { BlockType } from '@/generator/config'
import { GenAIBlockGenerator } from '@/generator'
import { IGenAIBlockGenerator } from '@/generator/types'
import styled from 'styled-components'
import { PlannerOutput, PlannerVisualizer } from '@/components/BuildWithAI/PlannerVisualiser'

const StyledSuggestLayoutPlan = styled.div`
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
      max-height: 800px;
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

      header.modal-header {
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

export const SuggestLayoutPlan = () => {
  const blockType = BlockType.RichTextContent
  const [prompt, setPrompt] = useState('')
  const [plannerData, setPlannerData] = useState<PlannerOutput>('')
  const [isModalVisible, setModalVisibility] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const generator = useRef<IGenAIBlockGenerator>(null)

  useEffect(() => {
    generator.current = new GenAIBlockGenerator({ blockType })
  }, [blockType])

  const prepareLayoutPlan = async ({}) => {
    setIsLoading(true)

    try {
      const { content } = await fetch('/api/ai/generate-plan', {
        method: 'POST',
        body: JSON.stringify({
          prompt,
        }),
      }).then((res) => res.json())

      console.log('BuildWithAI :: SuggestLayoutPlan Received :: GeneratorOutput', {
        content: JSON.parse(content),
      })

      setPlannerData(JSON.parse(content))
      setTimeout(() => {
        setPrompt('')
      }, 3000)
    } catch (e) {
      console.error('Block Generation Error', e)
    } finally {
      setIsLoading(false)
    }
  }

  const closeModal = () => {
    setIsLoading(false)
    setModalVisibility(false)
    setPrompt('')
    setPlannerData('')
  }

  const renderForm = () => (
    <>
      <header className="modal-header">
        <Wand2 size={28} />
        <h1>AI Page Planner Wizard</h1>
      </header>
      <p>
        Not sure what can be a suitable layout? Tell us what do you want to build and we'll suggest
        a layout
      </p>

      <textarea
        autoFocus
        disabled={isLoading}
        placeholder="US growth is solid as sticky inflation pressures the Fed"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <Button
        className="trigger-button"
        onClick={prepareLayoutPlan}
        disabled={isLoading || prompt.trim().length < 5}
      >
        {isLoading ? 'Please wait...' : 'Build with AI'}
      </Button>
    </>
  )

  const renderPlan = () => {
    return <PlannerVisualizer plannerOutput={plannerData} />
  }

  const renderModal = () => {
    return (
      <section className="overlay" onClick={() => closeModal()}>
        <div className="container" onClick={(e) => e.stopPropagation()}>
          {plannerData ? renderPlan() : renderForm()}
        </div>
      </section>
    )
  }

  return (
    <StyledSuggestLayoutPlan>
      <Button className="trigger-button" onClick={() => setModalVisibility(!isModalVisible)}>
        <LayoutDashboard size={16} style={{ marginRight: '8px' }} />
        Suggest Layout Plan
      </Button>

      {isModalVisible && renderModal()}
    </StyledSuggestLayoutPlan>
  )
}
