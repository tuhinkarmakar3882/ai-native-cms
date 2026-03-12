import React from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { Container } from '@/components/Designs/Structural/Container'
import styled from 'styled-components'

interface Media {
  url: string
  alt?: string
}

interface Action {
  label: string
  link: string
  style?: 'default' | 'outline' | 'ghost'
  trackId?: string
}

interface SplitSettings {
  theme: 'light' | 'dark'
  imagePosition: 'left' | 'right'
}

interface ContainerSettings {
  useContainer?: boolean
  containerSize?: 'sm' | 'md' | 'lg' | 'full'
}

interface HeroBannerProps {
  variant: 'full' | 'split'
  heading: string
  subheading?: string
  image: Media
  actions?: Action[]
  pillText?: string
  backdrop?: boolean
  splitSettings?: SplitSettings
  sectionId?: string
  containerSettings?: ContainerSettings
}

const StyledSection = styled.section`
  isolation: isolate;

  .bg-image {
    position: absolute;
    inset: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .layer {
    position: absolute;
    background: hsla(0, 0%, 0%, 0.75);
    z-index: -1;
    inset: 0;
    backdrop-filter: blur(4px) sepia(0.2) contrast(0.9) brightness(0.9);
  }

  .container {
    z-index: 1;
  }
`

export const HeroBannerComponent: React.FC<HeroBannerProps> = ({
  variant,
  heading,
  subheading,
  image,
  actions = [],
  pillText,
  backdrop = true,
  splitSettings = { theme: 'light', imagePosition: 'right' },
  sectionId,
  containerSettings = { useContainer: true, containerSize: 'lg' },
}) => {
  const { useContainer, containerSize } = containerSettings

  // Full variant
  if (variant === 'full') {
    const sectionContent = (
      <StyledSection
        className={`relative overflow-hidden mb-8 ${backdrop && 'bg-background'}`}
        data-track-section={sectionId}
      >
        {image && (
          <Image className="bg-image" src={image.url} width={1200} height={800} alt="Dashboard" />
        )}

        {image && backdrop && <div className="layer" />}

        <div className="container flex flex-col items-center text-center gap-8 py-16">
          {pillText && (
            <Badge variant="secondary" className="px-4 py-1 rounded-full text-sm">
              {pillText}
            </Badge>
          )}
          <h1
            className={`text-4xl md:text-6xl font-extrabold tracking-tight max-w-6xl leading-tight ${image ? 'text-white' : ''}`}
            style={{
              textShadow: image ? `0 0 4px black` : undefined,
            }}
          >
            {heading}
          </h1>
          <p
            className={`text-lg max-w-4xl font-light ${image ? '' : 'text-muted-foreground'}`}
            style={{
              color: `${image ? 'hsla(0deg, 0%, 80%)' : 'var(--muted-foreground)'}`,
              textShadow: image ? `0 0 4px black` : undefined,
            }}
          >
            {subheading}
          </p>

          <div className="flex gap-4">
            {actions?.map((btn, i) => (
              <Button key={i} variant={btn.style} size="lg" data-track-id={btn?.trackId}>
                <a href={btn.link}>{btn.label}</a>
              </Button>
            ))}
          </div>
        </div>
      </StyledSection>
    )

    return useContainer ? (
      <Container size={containerSize}>{sectionContent}</Container>
    ) : (
      sectionContent
    )
  }

  // Split variant
  const { theme, imagePosition } = splitSettings
  const isDark = theme === 'dark'
  const isRight = imagePosition === 'right'

  const sectionContent = (
    <section
      className={cn('py-8', isDark ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900')}
      data-track-section={sectionId}
    >
      <div
        className={cn(
          'container flex flex-col md:flex-row items-center gap-12',
          !isRight && 'md:flex-row-reverse', // Flip if image is left
        )}
      >
        {/* Text side */}
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{heading}</h2>
          {subheading && (
            <p className={cn('text-lg', isDark ? 'text-slate-300' : 'text-muted-foreground')}>
              {subheading}
            </p>
          )}
          {actions.length > 0 && (
            <div className="flex gap-4 pt-4">
              {actions.map((btn, i) => (
                <Button
                  key={i}
                  variant={
                    btn.style === 'outline' && isDark
                      ? 'secondary'
                      : btn.style === 'outline'
                        ? 'outline'
                        : btn.style === 'ghost'
                          ? 'ghost'
                          : 'default'
                  }
                  size="lg"
                  asChild
                  data-track-id={btn.trackId}
                >
                  <a href={btn.link}>{btn.label}</a>
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Image side */}
        <div className="flex-1 relative w-full h-[300px] md:h-[450px]">
          {image?.url && (
            <Image src={image.url} alt={image.alt || heading} fill className="object-contain" />
          )}
        </div>
      </div>
    </section>
  )

  return useContainer ? (
    <Container size={containerSize}>{sectionContent}</Container>
  ) : (
    sectionContent
  )
}
