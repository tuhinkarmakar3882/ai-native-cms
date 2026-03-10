'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

gsap.registerPlugin(ScrollTrigger)

interface Scene {
  heading: string
  subheading?: string
  body?: any
  media: { url: string; alt?: string }
  mediaType: 'image' | 'video'
  textPosition: 'center' | 'bottom-left' | 'bottom-right'
}

interface Props {
  trackId?: string
  scenes: Scene[]
}

const textPositionClasses = {
  center: 'items-center justify-center text-center',
  'bottom-left': 'items-end justify-start text-left pb-16 pl-8',
  'bottom-right': 'items-end justify-end text-right pb-16 pr-8',
}

export const AppleStoryBlockComponent: React.FC<Props> = ({ trackId, scenes = [] }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const reducedMotion = false

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || scenes.length === 0) return

    const ctx = gsap.context(() => {
      // Pin the whole section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${scenes.length * 100}vh`,
        pin: true,
        pinSpacing: true,
      })

      // Create a timeline that updates active index based on scroll progress
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${scenes.length * 100}vh`,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress
            const index = Math.floor(progress * scenes.length)
            setActiveIndex(Math.min(index, scenes.length - 1))
          },
        },
      })

      // Add dummy animation to drive the timeline
      tl.to({}, { duration: scenes.length })
    }, sectionRef)

    return () => ctx.revert()
  }, [scenes, reducedMotion])

  return (
    <section
      ref={sectionRef}
      className="apple-story relative h-screen overflow-hidden"
      data-track-section={trackId}
    >
      {scenes.map((scene, idx) => {
        const isActive = idx === activeIndex
        const isVideo = scene.mediaType === 'video'

        return (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Media */}
            {isVideo ? (
              <video
                src={scene?.media?.url || ''}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                style={{
                  zIndex: -1,
                }}
              />
            ) : (
              <Image
                src={scene?.media?.url || ''}
                alt={scene?.media?.alt || scene?.heading}
                fill
                className="object-cover"
                style={{
                  zIndex: -1,
                }}
              />
            )}

            {/* Overlay */}
            <div
              className={cn('absolute inset-0 z-10', 'bg-black/90')}
              style={{
                opacity: 0.85,
                zIndex: 0,
              }}
            />
            {/* Text */}
            <div
              className={`absolute inset-0 flex ${textPositionClasses[scene.textPosition]} text-white p-8`}
            >
              <div className="max-w-3xl">
                <h2 className="text-5xl md:text-7xl font-bold mb-4">{scene.heading}</h2>
                {scene.subheading && <p className="text-xl md:text-2xl mb-6">{scene.subheading}</p>}
                {scene.body && <RichText data={scene.body} />}
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
}
