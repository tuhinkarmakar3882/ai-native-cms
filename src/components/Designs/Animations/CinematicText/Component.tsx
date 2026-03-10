'use client'

import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

import RichText from '@/components/RichText'

gsap.registerPlugin(ScrollTrigger)

export const CinematicTextComponent = ({
  content,
  trackId,
  backgroundColor = '#000',
  textColor = '#fff',
}) => {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      const items = gsap.utils.toArray(
        containerRef.current.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li'),
      )

      gsap.from(items, {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.25,
        ease: 'power3.out',

        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
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
