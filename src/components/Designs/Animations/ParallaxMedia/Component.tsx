'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/Designs/Structural/Container'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'

interface Props {
  trackId?: string
  mediaType: 'image' | 'video'
  image?: { url: string; alt?: string }
  video?: { url: string; alt?: string }
  height: 'small' | 'medium' | 'large' | 'full'
  parallaxIntensity: 'subtle' | 'medium' | 'strong'
  parallaxDirection: 'up' | 'down'
  overlay?: {
    enabled: boolean
    color: 'dark' | 'darker' | 'light' | 'primary'
    opacity: '10' | '25' | '50' | '75' | '90'
  }
  text?: {
    heading?: string
    description?: string
    button?: { label?: string; link?: string; trackId?: string }
  }
  caption?: string
  containerSettings?: {
    useContainer?: boolean
    containerSize?: 'sm' | 'md' | 'lg' | 'full'
  }
}

const heightClasses = {
  small: 'h-[300px]',
  medium: 'h-[500px]',
  large: 'h-[700px]',
  full: 'h-screen',
}

const intensityMap = {
  subtle: 15,
  medium: 25,
  strong: 35,
}

const overlayColorMap = {
  dark: 'bg-black',
  darker: 'bg-black/90',
  light: 'bg-white',
  primary: 'bg-primary',
}

export const ParallaxMediaComponent: React.FC<Props> = ({
  trackId,
  mediaType,
  image,
  video,
  height = 'full',
  parallaxIntensity = 'medium',
  parallaxDirection = 'up',
  overlay,
  text,
  caption,
  containerSettings = { useContainer: false, containerSize: 'lg' },
}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !mediaRef.current) return

    const intensity = intensityMap[parallaxIntensity]
    const direction = parallaxDirection === 'up' ? 1 : -1

    let rafId: number

    const update = () => {
      if (!sectionRef.current || !mediaRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const progress = (windowHeight - rect.top) / (windowHeight + rect.height)

      const movement = (progress - 0.5) * intensity * direction

      mediaRef.current.style.transform = `translateY(${movement}%)`

      rafId = requestAnimationFrame(update)
    }

    rafId = requestAnimationFrame(update)

    return () => cancelAnimationFrame(rafId)
  }, [parallaxIntensity, parallaxDirection])

  const { useContainer, containerSize } = containerSettings
  const mediaUrl = mediaType === 'image' ? image?.url : video?.url
  const mediaAlt = mediaType === 'image' ? image?.alt : video?.alt

  const content = (
    <section
      ref={sectionRef}
      className={cn('relative overflow-hidden w-full', heightClasses[height])}
      data-track-section={trackId}
    >
      <div
        ref={mediaRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0 will-change-transform"
      >
        {mediaType === 'video' && video?.url ? (
          <video
            src={video.url}
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
              alt={mediaAlt || text?.heading || caption || ''}
              fill
              className="object-cover"
              priority
            />
          )
        )}
      </div>

      {overlay?.enabled && (
        <div
          className={cn(
            'absolute inset-0 z-10',
            overlayColorMap[overlay.color],
            `opacity-${overlay.opacity}`,
          )}
        />
      )}

      {overlay?.enabled && text && (text.heading || text.description || text.button?.label) && (
        <div className="absolute inset-0 flex items-center justify-center text-white p-8 z-20">
          <div className="max-w-3xl text-center space-y-6">
            {text.heading && <h2 className="text-4xl md:text-6xl font-bold">{text.heading}</h2>}
            {text.description && (
              <RichText enableGutter={false} enableProse={true} data={text.description} />
            )}
            {text.button?.label && text.button?.link && (
              <Button variant="default" size="lg" asChild data-track-id={text.button.trackId}>
                <a href={text.button.link}>{text.button.label}</a>
              </Button>
            )}
          </div>
        </div>
      )}

      {!overlay?.enabled && caption && (
        <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 px-2 py-1 rounded z-20">
          {caption}
        </div>
      )}
    </section>
  )

  return useContainer ? <Container size={containerSize}>{content}</Container> : content
}
