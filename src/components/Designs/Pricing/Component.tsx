import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Container } from '@/components/Designs/Structural/Container'

import { cn } from '@/utilities/ui'
import { DynamicIcon } from 'lucide-react/dynamic'

interface Feature {
  feature: string
  icon?: string
}

interface Plan {
  name: string
  price: string
  description?: string
  isPopular?: boolean
  features?: Feature[]
  button?: {
    text?: string
    link?: string
    trackId?: string
  }
}

interface PricingProps {
  trackId?: string
  heading?: string
  plans?: Plan[]
  containerSettings?: { useContainer?: boolean; containerSize?: 'sm' | 'md' | 'lg' | 'full' }
}

export const PricingComponent: React.FC<PricingProps> = ({
  trackId,
  heading,
  plans = [],
  containerSettings = { useContainer: true, containerSize: 'lg' },
}) => {
  const { useContainer, containerSize } = containerSettings

  const pricingContent = (
    <section className="my-16" data-track-section={trackId}>
      {heading && <h2 className="text-4xl font-bold text-center mb-12">{heading}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => {
          const buttonVariant = plan.isPopular ? 'default' : 'outline'
          const buttonLink = plan.button?.link || '#'
          const buttonText = plan.button?.text || 'Get Started'

          return (
            <Card
              key={i}
              className={cn(
                'flex flex-col',
                plan.isPopular && 'border-primary shadow-lg md:scale-105',
              )}
            >
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{plan.name}</CardTitle>
                  {plan.isPopular && <Badge>Popular</Badge>}
                </div>
                <div className="text-3xl font-bold mt-2">{plan.price}</div>
                {plan.description && <CardDescription>{plan.description}</CardDescription>}
              </CardHeader>
              <Separator />
              <CardContent className="flex-1 mt-6 space-y-3">
                {plan.features?.map((f, j) => {
                  const Icon = (
                    <DynamicIcon
                      name={f?.icon || 'check'}
                      className="text-green-500 h-4 w-4 shrink-0"
                    />
                  )

                  return (
                    <div key={j} className="flex items-center gap-2">
                      {Icon}
                      <span className="text-sm">{f.feature}</span>
                    </div>
                  )
                })}
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={buttonVariant}
                  asChild
                  data-track-id={plan.button?.trackId}
                >
                  <a href={buttonLink}>{buttonText}</a>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </section>
  )

  if (useContainer) {
    return <Container size={containerSize}>{pricingContent}</Container>
  }
  return pricingContent
}
