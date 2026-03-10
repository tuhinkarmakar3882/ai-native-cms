'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Container } from '@/components/Designs/Structural/Container'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'

interface Step {
  heading: string
  description?: string
  mediaType: 'image' | 'video'
  image?: { url: string; alt?: string }
  video?: { url: string; alt?: string }
}

interface Props {
  trackId?: string
  title?: string
  stickySide: 'left' | 'right'
  mediaWidth: '1/3' | '1/2' | '2/3'
  textAlignment: 'left' | 'center' | 'right'
  showProgress?: boolean
  steps: Step[]
  containerSettings?: {
    useContainer?: boolean
    containerSize?: 'sm' | 'md' | 'lg' | 'full'
  }
}

const mediaWidthClasses = {
  '1/3': 'md:w-1/3',
  '1/2': 'md:w-1/2',
  '2/3': 'md:w-2/3',
}

const textAlignmentClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

export const StickyScrollSectionComponent: React.FC<Props> = ({
  trackId,
  title,
  stickySide = 'left',
  mediaWidth = '1/2',
  textAlignment = 'left',
  showProgress = false,
  steps = [],
  containerSettings = { useContainer: true, containerSize: 'lg' },
}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  const [activeIndex, setActiveIndex] = useState(0)
  const [isInView, setIsInView] = useState(false)

  const stickyText = stickySide === 'left'
  const stickyMedia = stickySide === 'right'

  /* ------------------------------------------------ */
  /* Section visibility (controls progress indicator) */
  /* ------------------------------------------------ */

  useEffect(() => {
    if (!sectionRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      {
        threshold: 0.2,
      },
    )

    observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [])

  /* ------------------------------------------------ */
  /* Step IntersectionObserver */
  /* ------------------------------------------------ */

  useEffect(() => {
    if (steps.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const index = stepRefs.current.indexOf(entry.target as HTMLDivElement)

          if (index !== -1) setActiveIndex(index)
        })
      },
      {
        threshold: 0.55,
        rootMargin: '-10% 0px -10% 0px',
      },
    )

    stepRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [steps.length])

  /* ------------------------------------------------ */
  /* Dot navigation */
  /* ------------------------------------------------ */

  const handleDotClick = (index: number) => {
    const el = stepRefs.current[index]

    if (!el) return

    el.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  /* ------------------------------------------------ */
  /* Render TEXT */
  /* ------------------------------------------------ */

  const renderTextContent = (idx: number, isActive: boolean, isScrollingSide: boolean) => (
    <div
      ref={(el) => {
        stepRefs.current[idx] = el
      }}
      className={cn(
        'transition-all duration-700 ease-in-out',
        textAlignmentClasses[textAlignment],
        isScrollingSide
          ? 'min-h-screen flex flex-col justify-center px-6 md:px-12'
          : 'absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 md:px-12',
        !isScrollingSide && !isActive ? 'opacity-0 pointer-events-none' : 'opacity-100',
      )}
    >
      <h3 className="text-3xl md:text-4xl font-bold mb-4">{steps[idx].heading}</h3>

      {steps[idx].description && (
        <RichText enableProse={true} enableGutter={false} data={steps[idx].description} />
      )}
    </div>
  )

  /* ------------------------------------------------ */
  /* Render MEDIA */
  /* ------------------------------------------------ */

  const renderMediaContent = (idx: number, isActive: boolean, isScrollingSide: boolean) => {
    const step = steps[idx]

    const isVideo = step.mediaType === 'video'
    const mediaUrl = isVideo ? step.video?.url : step.image?.url

    return (
      <div
        className={cn(
          'w-full',
          isScrollingSide
            ? 'min-h-screen flex items-center justify-center p-6'
            : 'absolute inset-0 p-6 md:p-12 transition-opacity duration-700 ease-in-out',
          !isScrollingSide && !isActive ? 'opacity-0 pointer-events-none' : 'opacity-100',
        )}
      >
        <div className="relative w-full h-full min-h-[50vh] rounded-2xl overflow-hidden shadow-2xl">
          {isVideo ? (
            <video
              src={mediaUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            mediaUrl && (
              <Image
                src={mediaUrl}
                alt={step.image?.alt || step.heading}
                fill
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover"
              />
            )
          )}
        </div>
      </div>
    )
  }

  /* ------------------------------------------------ */
  /* Layout */
  /* ------------------------------------------------ */

  const content = (
    <section ref={sectionRef} className="relative" data-track-section={trackId}>
      {title && <h2 className="text-3xl font-bold text-center mb-16">{title}</h2>}

      <div className="flex flex-col md:flex-row">
        {/* TEXT COLUMN */}

        <div
          className={cn(
            'w-full md:w-1/2 relative',
            stickyText && 'md:sticky md:top-0 md:h-screen overflow-hidden',
          )}
        >
          {steps.map((_, idx) => (
            <div key={idx}>{renderTextContent(idx, idx === activeIndex, !stickyText)}</div>
          ))}
        </div>

        {/* MEDIA COLUMN */}

        <div
          className={cn(
            'w-full relative',
            mediaWidthClasses[mediaWidth],
            stickyMedia && 'md:sticky md:top-0 md:h-screen overflow-hidden',
          )}
        >
          {steps.map((_, idx) => (
            <div key={idx}>{renderMediaContent(idx, idx === activeIndex, !stickyMedia)}</div>
          ))}
        </div>
      </div>

      {/* Progress dots */}

      {showProgress && isInView && (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={cn(
                'w-2.5 h-2.5 rounded-full transition-all duration-300',
                idx === activeIndex ? 'bg-primary scale-150' : 'bg-primary/30 hover:bg-primary/60',
              )}
            />
          ))}
        </div>
      )}
    </section>
  )

  const { useContainer, containerSize } = containerSettings

  return useContainer ? <Container size={containerSize}>{content}</Container> : content
}
