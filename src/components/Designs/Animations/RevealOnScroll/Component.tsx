'use client'

import { useEffect, useRef } from 'react'
import RichText from '@/components/RichText'
import { Container } from '@/components/Designs/Structural/Container'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface Props {
  trackId?: string
  content: any
  containerSettings?: {
    useContainer?: boolean
    containerSize?: 'sm' | 'md' | 'lg' | 'full'
  }
}

export const RevealOnScrollComponent: React.FC<Props> = ({
  trackId,
  content,
  containerSettings = { useContainer: true, containerSize: 'lg' },
}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = false

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return

    const elements = sectionRef.current.querySelectorAll(
      'p, h1, h2, h3, h4, h5, h6, blockquote, li',
    )
    if (elements.length === 0) return

    // Set initial state
    gsap.set(elements, { opacity: 0, y: 20 })

    // Create ScrollTrigger for each element
    elements.forEach((el) => {
      ScrollTrigger.create({
        trigger: el as HTMLElement,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: 'power2.out',
          })
        },
        once: true,
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [content, reducedMotion])

  const { useContainer, containerSize } = containerSettings

  const contentElement = (
    <section ref={sectionRef} className="reveal-on-scroll my-8" data-track-section={trackId}>
      <RichText data={content} />
    </section>
  )

  return useContainer ? (
    <Container size={containerSize}>{contentElement}</Container>
  ) : (
    contentElement
  )
}
