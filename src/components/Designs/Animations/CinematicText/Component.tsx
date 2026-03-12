'use client'

import { useEffect, useRef } from 'react'
import RichText from '@/components/RichText'
import styled from 'styled-components'

const StyledSection = styled.section`
  .cinematic-word {
    display: inline-block;
    opacity: 0;
    transform: translateY(40px);
    filter: blur(12px);
    transition:
      transform 0.2s linear,
      opacity 0.2s linear,
      filter 0.2s linear;
    will-change: transform, opacity, filter;
  }
`

interface Props {
  content: any
  trackId?: string
  splitType?: 'words' | 'chars' | 'lines'

  start?: number
  end?: number

  backgroundColor?: string
  textColor?: string
}

export const CinematicTextComponent = ({
  content,
  trackId,
  splitType = 'words',

  start = 0.3,
  end = 1,

  backgroundColor = '#000',
  textColor = '#fff',
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)

  /* ----------------------------- */
  /* Text Splitting */
  /* ----------------------------- */

  useEffect(() => {
    if (!containerRef.current) return

    const elements = containerRef.current.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li')

    elements.forEach((el) => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)

      const nodes: Text[] = []

      while (walker.nextNode()) {
        nodes.push(walker.currentNode as Text)
      }

      nodes.forEach((textNode) => {
        const text = textNode.nodeValue || ''
        if (!text.trim()) return

        const parent = textNode.parentElement
        if (!parent) return

        let parts: string[] = []

        if (splitType === 'chars') {
          parts = text.split('')
        } else if (splitType === 'words') {
          parts = text.split(/(\s+)/)
        } else {
          parts = [text]
        }

        const fragment = document.createDocumentFragment()

        parts.forEach((part) => {
          const span = document.createElement('span')

          span.textContent = part
          span.style.whiteSpace = 'pre'
          span.className = 'cinematic-word'

          fragment.appendChild(span)
        })

        parent.replaceChild(fragment, textNode)
      })
    })
  }, [splitType])

  /* ----------------------------- */
  /* Scroll Progress Animation */
  /* ----------------------------- */

  useEffect(() => {
    if (!containerRef.current) return

    const words = containerRef.current.querySelectorAll('.cinematic-word')

    const update = () => {
      const rect = containerRef.current!.getBoundingClientRect()
      const vh = window.innerHeight

      const startPx = vh * start
      const endPx = vh * end

      let progress = (startPx - rect.top) / Math.abs(endPx - startPx)

      progress = Math.max(0, Math.min(progress, 1))

      const total = words.length
      const reveal = progress * total

      words.forEach((word, i) => {
        const delta = reveal - i
        const opacity = Math.max(0, Math.min(delta, 1))

        const blur = 0 //(1 - opacity) * 12
        const y = (1 - opacity) * 40

        const el = word as HTMLElement

        el.style.opacity = opacity.toString()
        el.style.filter = `blur(${blur}px)`
        el.style.transform = `translateY(${y}px)`
      })
    }

    const loop = () => {
      update()
      requestAnimationFrame(loop)
    }

    loop()
  }, [start, end])

  return (
    <StyledSection
      data-track-section={trackId}
      style={{ backgroundColor, color: textColor }}
      className="min-h-screen flex items-center justify-center px-8"
    >
      <div ref={containerRef} className="max-w-5xl text-5xl leading-tight space-y-6">
        <RichText data={content} />
      </div>
    </StyledSection>
  )
}
