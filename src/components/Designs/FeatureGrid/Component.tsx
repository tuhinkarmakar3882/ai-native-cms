import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/Designs/Structural/Container'
import { cn } from '@/utilities/ui'
import { DynamicIcon } from 'lucide-react/dynamic'

const columnMap = {
  '2': 'md:grid-cols-2',
  '3': 'md:grid-cols-3',
  '4': 'md:grid-cols-4',
}

interface Feature {
  trackId?: string
  title: string
  description?: string
  badge?: string
  icon?: string
  link?: { url?: string; newTab?: boolean }
}

interface FeatureGridProps {
  trackId?: string
  title?: string
  columns?: '2' | '3' | '4'
  features?: Feature[]
  containerSettings?: { useContainer?: boolean; containerSize?: 'sm' | 'md' | 'lg' | 'full' }
}

export const FeatureGridComponent: React.FC<FeatureGridProps> = ({
  trackId,
  title,
  columns = '3',
  features = [],
  containerSettings = { useContainer: true, containerSize: 'lg' },
}) => {
  const { useContainer, containerSize } = containerSettings

  const gridContent = (
    <section className="py-4" data-track-section={trackId}>
      {title && <h2 className="text-3xl font-bold mb-10">{title}</h2>}
      <div className={cn('grid gap-6', columnMap[columns])}>
        {features.map((feature, i) => {
          const Icon = feature.icon ? (
            <DynamicIcon name={feature.icon} className="h-6 w-6 text-primary mb-2" />
          ) : null
          const Wrapper = feature.link?.url ? 'a' : 'div'
          const wrapperProps = feature.link?.url
            ? {
                href: feature.link.url,
                target: feature.link.newTab ? '_blank' : undefined,
                rel: feature.link.newTab ? 'noopener noreferrer' : undefined,
                'data-track-id': feature.trackId,
              }
            : {}

          return (
            <Wrapper
              key={i}
              {...wrapperProps}
              className={feature.link?.url ? 'block cursor-pointer' : ''}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <CardHeader>
                  {feature.badge && <Badge className="w-fit mb-2">{feature.badge}</Badge>}
                  {Icon}
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </Wrapper>
          )
        })}
      </div>
    </section>
  )

  if (useContainer) {
    return <Container size={containerSize}>{gridContent}</Container>
  }
  return gridContent
}
