'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import RichText from '@/components/RichText'
import styled from 'styled-components'

const StyledSection = styled.section`
  .split-word,
  .split-char,
  .split-line {
    display: inline-block;
    will-change: transform, opacity, filter;
  }
`

gsap.registerPlugin(ScrollTrigger)

const getAnimationProps = (animation: string) => {
  switch (animation) {
    case 'fadeIn':
      return {
        opacity: 0,
      }

    case 'slideLeft':
      return {
        x: -80,
        opacity: 0,
      }

    case 'slideRight':
      return {
        x: 80,
        opacity: 0,
      }

    case 'blur':
      return {
        opacity: 0,
        filter: 'blur(10px)',
      }

    case 'scale':
      return {
        opacity: 0,
        scale: 0.8,
      }

    case 'fadeUp':
    default:
      return {
        y: 60,
        opacity: 0,
      }
  }
}

function splitText(element: HTMLElement, type: string) {
  const text = element.textContent || ''

  if (type === 'chars') {
    element.innerHTML = text
      .split('')
      .map((char) => `<span class="split-char">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('')
  }

  if (type === 'words') {
    element.innerHTML = text
      .split(' ')
      .map((word) => `<span class="split-word">${word}</span>`)
      .join(' ')
  }

  if (type === 'lines') {
    element.innerHTML = `<span class="split-line">${text}</span>`
  }
}

export const CinematicTextComponent = ({
  content,
  trackId,
  animation = 'fadeUp',
  splitType = 'words',
  stagger = 0.03,
  duration = 0.8,
  scrollTriggerStart = 'top 80%',
  scrollScrub = false,
  backgroundColor = '#000',
  textColor = '#fff',
}) => {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      const elements = containerRef.current.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li')

      const animationProps = getAnimationProps(animation)

      elements.forEach((el) => {
        splitText(el as HTMLElement, splitType)
      })

      const targets = containerRef.current.querySelectorAll('.split-word, .split-char, .split-line')

      gsap.from(targets, {
        ...animationProps,
        duration,
        stagger,
        ease: 'power3.out',

        scrollTrigger: {
          trigger: containerRef.current,
          start: scrollTriggerStart,
          scrub: scrollScrub,
        },
      })
    },
    { scope: containerRef },
  )

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
