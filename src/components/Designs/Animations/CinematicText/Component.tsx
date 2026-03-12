'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import RichText from '@/components/RichText'

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
      const items = gsap.utils.toArray(
        containerRef.current.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li'),
      )

      const animationProps = getAnimationProps(animation)

      gsap.from(items, {
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
    <section
      data-track-section={trackId}
      style={{ backgroundColor, color: textColor }}
      className="min-h-screen flex items-center justify-center px-8"
    >
      <div ref={containerRef} className="max-w-5xl text-5xl leading-tight space-y-6">
        <RichText data={content} />
      </div>
    </section>
  )
}
