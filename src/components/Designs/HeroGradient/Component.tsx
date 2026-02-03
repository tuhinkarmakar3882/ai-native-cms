import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import Image from 'next/image'
import styled from 'styled-components'

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
export const HeroGradientComponent = ({ pillText, heading, subheading, actions, image }) => (
  <StyledSection className="relative overflow-hidden bg-background mb-8">
    {image && (
      <Image className="bg-image" src={image.url} width={1200} height={800} alt="Dashboard" />
    )}

    {image && <div className="layer" />}

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
          <Button key={i} variant={btn.type} size="lg" asChild>
            <a href={btn.link}>{btn.label}</a>
          </Button>
        ))}
      </div>
    </div>
  </StyledSection>
)
