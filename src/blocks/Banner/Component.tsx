import type { BannerBlock as BannerBlockProps } from 'src/payload-types'
import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { Container } from '@/components/Designs/Structural/Container'

type Props = {
  className?: string
} & BannerBlockProps

export const BannerBlockComponent: React.FC<Props> = ({
  className,
  style,
  content,
  trackId,
  containerSettings = { useContainer: false, containerSize: 'lg' },
}) => {
  const { useContainer, containerSize } = containerSettings

  const bannerContent = (
    <div className={cn('mx-auto my-8 w-full', className)} data-track-section={trackId}>
      <div
        className={cn('border py-3 px-6 flex items-center rounded', {
          'border-border bg-card': style === 'info',
          'border-error bg-error/30': style === 'error',
          'border-success bg-success/30': style === 'success',
          'border-warning bg-warning/30': style === 'warning',
        })}
      >
        <RichText data={content} enableGutter={false} enableProse={true} />
      </div>
    </div>
  )

  if (useContainer) {
    return <Container size={containerSize}>{bannerContent}</Container>
  }
  return bannerContent
}
