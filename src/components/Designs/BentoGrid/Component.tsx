import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/utilities/ui'
import { Container } from '@/components/Designs/Structural/Container'
import { DynamicIcon } from 'lucide-react/dynamic'

interface CardItem {
  trackId?: string
  title: string
  content?: string
  icon?: string
  span?: '1' | '2' | 'row-2'
  link?: { url?: string; newTab?: boolean }
}

interface BentoGridProps {
  trackId?: string
  title?: string
  cards?: CardItem[]
  containerSettings?: { useContainer?: boolean; containerSize?: 'sm' | 'md' | 'lg' | 'full' }
}

const spanClasses = {
  '1': '',
  '2': 'md:col-span-2',
  'row-2': 'md:row-span-2',
}

export const BentoGridComponent: React.FC<BentoGridProps> = ({
  trackId,
  title,
  cards = [],
  containerSettings = { useContainer: true, containerSize: 'lg' },
}) => {
  const { useContainer, containerSize } = containerSettings

  const gridContent = (
    <section className="py-20" data-track-section={trackId}>
      {title && <h2 className="text-3xl font-bold mb-10">{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[200px] gap-4">
        {cards.map((card, i) => {
          const Icon = card.icon ? (
            <DynamicIcon name={card.icon} className="h-8 w-8 mb-2 text-primary" />
          ) : null
          const Wrapper = card.link?.url ? 'a' : 'div'
          const wrapperProps = card.link?.url
            ? {
                href: card.link.url,
                target: card.link.newTab ? '_blank' : undefined,
                rel: card.link.newTab ? 'noopener noreferrer' : undefined,
                'data-track-id': card.trackId,
              }
            : {}

          return (
            <Wrapper
              key={i}
              {...wrapperProps}
              className={cn(
                spanClasses[card.span || '1'],
                card.link?.url && 'cursor-pointer transition-transform hover:scale-[1.02]',
              )}
            >
              <Card className="flex flex-col justify-between overflow-hidden hover:shadow-lg transition-shadow h-full">
                <CardHeader>
                  {Icon}
                  <CardTitle>{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{card.content}</p>
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
