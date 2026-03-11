'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { Container } from '@/components/Designs/Structural/Container'

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

import { DynamicIcon } from 'lucide-react/dynamic'
import { cn } from '@/utilities/ui'

gsap.registerPlugin(ScrollTrigger)

const columnClasses = {
  '1': 'grid-cols-1',
  '2': 'grid-cols-1 md:grid-cols-2',
  '3': 'grid-cols-1 md:grid-cols-3',
}

export const StaggerListComponent = ({
  trackId,
  heading,
  columns = '3',
  items = [],
  containerSettings = { useContainer: true, containerSize: 'lg' },
}) => {
  const sectionRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    if (!sectionRef.current) return

    const validRefs = itemsRef.current.filter(Boolean)

    if (validRefs.length === 0) return

    gsap.set(validRefs, { opacity: 0, y: 30 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
      },
    })

    tl.to(validRefs, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
    })

    return () => {
      tl.kill()
    }
  }, [items])

  /* -------------------------------- */
  /* Feature Item Renderer */
  /* -------------------------------- */

  const renderFeatureItem = (item) => {
    const Icon = item.icon ? (
      <DynamicIcon name={item.icon} className="h-10 w-10 mx-auto mb-4 text-primary" />
    ) : null

    const Wrapper = item.link?.url ? 'a' : 'div'

    const wrapperProps = item.link?.url
      ? {
          href: item.link.url,
          target: item.link.newTab ? '_blank' : undefined,
          rel: item.link.newTab ? 'noopener noreferrer' : undefined,
          'data-track-id': item.link.trackId,
        }
      : {}

    return (
      <Wrapper {...wrapperProps} className="text-center block">
        {Icon}
        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
        {item.description && <p className="text-muted-foreground">{item.description}</p>}
      </Wrapper>
    )
  }

  /* -------------------------------- */
  /* Feature Card Renderer */
  /* -------------------------------- */

  const renderFeatureCard = (plan) => {
    return (
      <Card
        className={cn('flex flex-col', plan.isPopular && 'border-primary shadow-lg md:scale-105')}
      >
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{plan.name}</CardTitle>
            {plan.isPopular && <Badge>Popular</Badge>}
          </div>

          {plan.price && <div className="text-3xl font-bold mt-2">{plan.price}</div>}

          {plan.description && <CardDescription>{plan.description}</CardDescription>}
        </CardHeader>

        <Separator />

        <CardContent className="flex-1 mt-6 space-y-3">
          {plan.features?.map((f, j) => (
            <div key={j} className="flex items-center gap-2">
              <DynamicIcon name={f.icon || 'check'} className="text-green-500 h-4 w-4 shrink-0" />

              <span className="text-sm">{f.feature}</span>
            </div>
          ))}
        </CardContent>

        {plan.button?.url && (
          <CardFooter>
            <Button className="w-full" asChild data-track-id={plan.button?.trackId}>
              <a href={plan.button.url}>{plan.button.text}</a>
            </Button>
          </CardFooter>
        )}
      </Card>
    )
  }

  const { useContainer, containerSize } = containerSettings

  const content = (
    <section ref={sectionRef} className="py-16" data-track-section={trackId}>
      {heading && <h2 className="text-3xl font-bold mb-10 text-center">{heading}</h2>}

      <div className={`grid gap-8 ${columnClasses[columns]}`}>
        {items.map((item, idx) => {
          const blockType = item.blockType

          return (
            <div key={idx} ref={(el) => (itemsRef.current[idx] = el)}>
              {blockType === 'featureItem' && renderFeatureItem(item)}
              {blockType === 'featureCard' && renderFeatureCard(item)}
            </div>
          )
        })}
      </div>
    </section>
  )

  return useContainer ? <Container size={containerSize}>{content}</Container> : content
}
