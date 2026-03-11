'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'
import { RenderBlocks } from '@/blocks/RenderBlocks'

interface OverlayContent {
  type: 'none' | 'color' | 'richText'
  color?: string
  richText?: any
}

interface Props {
  trackId?: string
  media: { url: string; alt?: string }
  mediaType: 'image' | 'video'
  startRadius?: number
  endRadius?: number
  overlayStart?: OverlayContent
  overlayEnd?: OverlayContent
}

export const ClipPathMorphBlockComponent: React.FC<Props> = ({
  trackId,
  media,
  mediaType,
  startRadius = 0,
  endRadius = 150,
  overlayStart,
  overlayEnd,
}) => {
  const sectionRef = useRef<HTMLElement>(null)
  const clipRef = useRef<HTMLDivElement>(null)
  const overlayStartRef = useRef<HTMLDivElement>(null)
  const overlayEndRef = useRef<HTMLDivElement>(null)

  const [mediaLoaded, setMediaLoaded] = useState(false)

  useLayoutEffect(() => {
    if (!sectionRef.current || !clipRef.current) return

    const section = sectionRef.current
    const clip = clipRef.current

    let current = 0
    let target = 0
    let rafId: number | null = null

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n

    const updateProgress = () => {
      const scrollY = window.scrollY
      const offsetTop = section.offsetTop
      const windowHeight = window.innerHeight
      const total = section.offsetHeight - windowHeight

      // If total is zero or negative, progress is 0
      const progress = total > 0 ? Math.min(Math.max((scrollY - offsetTop) / total, 0), 1) : 0

      target = progress

      if (!rafId) animate()
    }

    const animate = () => {
      current = lerp(current, target, 0.08)

      const radius = startRadius + (endRadius - startRadius) * current
      clip.style.clipPath = `circle(${radius}% at 50% 50%)`

      if (overlayStartRef.current) {
        overlayStartRef.current.style.opacity = `${1 - current * 10}`
      }

      if (overlayEndRef.current) {
        overlayEndRef.current.style.opacity = `${current}`
      }

      if (Math.abs(current - target) > 0.001) {
        rafId = requestAnimationFrame(animate)
      } else {
        rafId = null
      }
    }

    // Initial update
    updateProgress()

    window.addEventListener('scroll', updateProgress)
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)

      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [mediaLoaded, startRadius, endRadius])

  const renderOverlay = (
    overlay: OverlayContent | undefined,
    ref: React.RefObject<HTMLDivElement | null>,
    initialOpacity: number,
  ) => {
    if (!overlay || overlay.type === 'none') return null

    if (overlay.type === 'color') {
      return (
        <div
          ref={ref}
          className="absolute inset-0"
          style={{
            backgroundColor: overlay.color,
            opacity: initialOpacity,
          }}
        />
      )
    }

    if (overlay.type === 'richText') {
      return (
        <div
          ref={ref}
          className="absolute inset-0 flex items-center justify-center p-8 text-white"
          style={{ opacity: initialOpacity }}
        >
          <div className="max-w-3xl text-center">
            <RichText data={overlay.richText} />
          </div>
        </div>
      )
    }

    if (overlay.type === 'block' && overlay.block && overlay.block.length > 0) {
      const block = overlay.block[0]
      return (
        <div
          ref={ref}
          className="absolute inset-0 flex items-center justify-center p-8 text-white"
          style={{ opacity: initialOpacity }}
        >
          <RenderBlocks blocks={[block]} />
        </div>
      )
    }

    return null
  }

  return (
    <section ref={sectionRef} className="relative h-[220vh] bg-black" data-track-section={trackId}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Media with morphing clip-path */}
        <div
          ref={clipRef}
          className="absolute inset-0 w-full h-full will-change-[clip-path]"
          style={{ clipPath: `circle(${startRadius}% at 50% 50%)` }}
        >
          {mediaType === 'video' ? (
            <video
              src={media?.url || ''}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              onLoadedData={() => setMediaLoaded(true)}
            />
          ) : (
            <Image
              src={media?.url || ''}
              alt={media.alt || ''}
              fill
              className="object-cover"
              onLoadingComplete={() => setMediaLoaded(true)}
            />
          )}
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/90" />

        {renderOverlay(overlayStart, overlayStartRef, 1)}
        {renderOverlay(overlayEnd, overlayEndRef, 0)}
      </div>
    </section>
  )
}
