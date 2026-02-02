'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Button, useConfig, useDocumentInfo, useForm } from '@payloadcms/ui'
import { Check, Languages, Wand2 } from 'lucide-react'
import { BlockType } from '@/generator/config'
import { GenAIBlockGenerator } from '@/generator'
import styled from 'styled-components'

const StyledGenerateTranslatedContent = styled.div`
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

      .locale-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        margin: 20px 0;
      }

      .locale-item {
        padding: 10px;
        border: 1px solid var(--theme-elevation-150);
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;

        &.selected {
          border-color: var(--color-success-200);
          color: var(--color-success-200);
        }
        }
      }
    }
  }
`

export const GenerateTranslatedContent = () => {
  const { config } = useConfig()
  const { id, collectionSlug } = useDocumentInfo()
  const { getData } = useForm()

  // 1. Get available locales from config
  const locales = config.localization ? config.localization.locales : []
  const [selectedLocales, setSelectedLocales] = useState<string[]>([])

  const [isModalVisible, setModalVisibility] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const generator = useRef<GenAIBlockGenerator>(null)

  useEffect(() => {
    generator.current = new GenAIBlockGenerator({ blockType: BlockType.RichTextContent })
  }, [])

  const toggleLocale = (code: string) => {
    setSelectedLocales((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code],
    )
  }

  const handleLocalizePage = async () => {
    if (selectedLocales.length === 0) return
    setIsLoading(true)

    try {
      // 2. Grab current form state (Source of Truth)
      const currentFormData = getData()

      // 3. Trigger your Server Action (we'll define this next)
      // This sends the current block data to be translated and saved
      // into the other locale 'slots' in the DB.
      const response = await fetch('/api/ai/translate-page', {
        method: 'POST',
        body: JSON.stringify({
          docId: id,
          collection: collectionSlug,
          blocks: currentFormData.layout,
          targets: selectedLocales,
        }),
      })

      if (response.ok) {
        setModalVisibility(false)
        // Optionally refresh or show success
      }
    } catch (e) {
      console.error('Translation Error', e)
    } finally {
      setIsLoading(false)
    }
  }

  const renderModal = () => (
    <section className="overlay" onClick={() => setModalVisibility(false)}>
      <div className="container" onClick={(e) => e.stopPropagation()}>
        <header>
          <Wand2 size={28} />
          <h1>Localize Page</h1>
        </header>
        <p>Select target languages to generate translated versions of all current blocks.</p>

        <div className="locale-grid">
          {locales.map((loc) => {
            const code = typeof loc === 'string' ? loc : loc.code
            const label = typeof loc === 'string' ? loc : loc.label
            return (
              <div
                key={code}
                className={`locale-item ${selectedLocales.includes(code) ? 'selected' : ''}`}
                onClick={() => toggleLocale(code)}
              >
                {label}
                {selectedLocales.includes(code) && <Check size={16} />}
              </div>
            )
          })}
        </div>

        <Button
          className="trigger-button"
          onClick={handleLocalizePage}
          disabled={isLoading || selectedLocales.length === 0}
        >
          {isLoading
            ? 'Translating Blocks...'
            : `Localize into ${selectedLocales.length} Languages`}
        </Button>
      </div>
    </section>
  )

  return (
    <StyledGenerateTranslatedContent>
      <Button className="trigger-button" onClick={() => setModalVisibility(true)}>
        <Languages size={16} style={{ marginRight: '8px' }} />
        AI Translate Page
      </Button>
      {isModalVisible && renderModal()}
    </StyledGenerateTranslatedContent>
  )
}
