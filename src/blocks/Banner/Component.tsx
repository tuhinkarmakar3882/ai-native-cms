import type { BannerBlock as BannerBlockProps } from '@/payload-types'
import React from 'react'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { Container } from '@/components/Designs/Structural/Container'
import Link from 'next/link'
import { DynamicIcon } from 'lucide-react/dynamic'

type Props = {
  className?: string
} & BannerBlockProps

export const BannerBlockComponent: React.FC<Props> = ({
  className,
  trackId,
  variant,
  icon,
  title,
  description,
  cta,
  layout = 'inline',
  customColors,
  iconSize,
  iconColor,
  containerSettings = { useContainer: false, containerSize: 'lg' },
}) => {
  const { useContainer, containerSize } = containerSettings

  const Icon = icon ? (
    <DynamicIcon
      className="shrink-0 opacity-80 mt-2"
      name={icon}
      size={iconSize || 20}
      color={iconColor}
    />
  ) : null

  const variantStyles = {
    info: 'bg-card border-border',
    success: 'bg-success/20 border-success',
    warning: 'bg-warning/20 border-warning',
    error: 'bg-error/20 border-error',
  }

  const content = (
    <div
      data-track-section={trackId}
      className={cn('my-2 w-full rounded-lg border px-6 py-5', variantStyles[variant], className)}
      style={{
        background: customColors?.background,
        borderColor: customColors?.border,
      }}
    >
      <div className={cn('flex gap-4', layout === 'stacked' && 'flex-col items-start')}>
        {Icon}

        <div className="flex-1 space-y-2">
          {title && <h4 className="font-semibold text-base leading-tight my-0">{title}</h4>}
          {description && (
            <RichText data={description} enableGutter={false} className="text-muted-foreground" />
          )}
          {cta?.length ? (
            <div className="flex gap-3 pt-2">
              {cta.map((button, i) => (
                <Link
                  key={i}
                  href={button.href}
                  className={cn('text-sm font-medium px-3 py-1.5 rounded-md border', {
                    'bg-primary text-primary-foreground': button.variant === 'primary',
                    'border-border': button.variant === 'secondary',
                    'border-transparent underline': button.variant === 'ghost',
                  })}
                >
                  {button.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )

  if (useContainer) {
    return <Container size={containerSize}>{content}</Container>
  }

  return content
}
