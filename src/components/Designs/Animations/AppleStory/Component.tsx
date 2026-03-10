'use client'

import { useEffect, useRef } from 'react'
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

  useEffect(() => {
    if (!sectionRef.current || scenes.length === 0) return

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.story-panel')
      const medias = gsap.utils.toArray<HTMLElement>('.story-media')
      const texts = gsap.utils.toArray<HTMLElement>('.story-text')
      const dots = gsap.utils.toArray<HTMLElement>('.story-dot')

      /**
       * Apple pages often use 180-250vh per scene
       * This ensures effects are perceivable
       */
      const SCENE_SCROLL = 1000
      const totalScroll = SCENE_SCROLL * scenes.length

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalScroll}vh`,
          pin: true,
          scrub: 1.4,
          anticipatePin: 1,
        },
      })

      panels.forEach((panel, i) => {
        const media = medias[i]
        const text = texts[i]
        const dot = dots[i]

        const label = `scene-${i}`

        master.addLabel(label)

        /** Initial states */
        gsap.set(panel, { opacity: 0 })
        gsap.set(media, { scale: 2, yPercent: 10 })
        gsap.set(text, { y: 80, opacity: 0 })

        master
          /** Scene fade in */
          .to(panel, { opacity: 1, duration: 0.35, ease: 'power2.out' }, label)

          /** Dot activation */
          .to(dot, { scale: 1.6, opacity: 1, duration: 0.3 }, label)

          /** Media cinematic parallax */
          .to(
            media,
            {
              scale: 1.35,
              yPercent: -8,
              duration: 1.2,
              ease: 'power2.out',
            },
            label,
          )

          /** Text reveal */
          .to(
            text,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power3.out',
            },
            `${label}+=0.15`,
          )

          /** Hold reading time */
          .to({}, { duration: 1 })

          /** Text exit */
          .to(text, {
            opacity: 0,
            y: -80,
            duration: 0.4,
            ease: 'power2.in',
          })

          /** Scene exit */
          .to(
            panel,
            {
              opacity: 0,
              duration: 0.35,
              ease: 'power2.in',
            },
            '<',
          )

          /** Reset dot */
          .to(
            dot,
            {
              scale: 1,
              opacity: 0.5,
              duration: 0.3,
            },
            '<',
          )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [scenes])

  return (
    <section
      ref={sectionRef}
      className="apple-story relative h-screen overflow-hidden bg-black"
      data-track-section={trackId}
    >
      {/* Progress Dots (Apple style) */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {scenes.map((_, i) => (
          <div
            key={i}
            className="story-dot w-2 h-2 rounded-full bg-white opacity-50 pointer-events-none transition-transform"
          />
        ))}
      </div>

      {/* Vision Pro style sticky media frame */}
      <div className="absolute inset-0 pointer-events-none">
        {scenes.map((scene, idx) => {
          const isVideo = scene.mediaType === 'video'

          return (
            <div
              key={idx}
              className="story-panel absolute inset-0 opacity-0"
              style={{ zIndex: idx + 1 }}
            >
              {/* MEDIA */}
              <div className="story-media absolute inset-0">
                {isVideo ? (
                  <video
                    src={scene?.media?.url || ''}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={scene?.media?.url || ''}
                    alt={scene?.media?.alt || scene?.heading}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={idx === 0}
                  />
                )}
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/70" />

              {/* TEXT (Stripe storytelling layout) */}
              <div
                className={cn(
                  'story-text absolute inset-0 flex text-white p-8',
                  textPositionClasses[scene.textPosition],
                )}
              >
                <div className="max-w-3xl">
                  <h2 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
                    {scene.heading}
                  </h2>

                  {scene.subheading && (
                    <p className="text-xl md:text-2xl mb-6 opacity-90">{scene.subheading}</p>
                  )}

                  {scene.body && <RichText data={scene.body} />}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
