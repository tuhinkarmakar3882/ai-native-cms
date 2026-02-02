import { ComposableSectionComponent } from '@/blocks/Composable/Component'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { HeroComponent } from '@/components/Designs/Hero/Component'
import { FeatureGridComponent } from '@/components/Designs/FeatureGrid/Component'
import { FAQComponent } from '@/components/Designs/FAQ/Component'
import { MediaContentComponent } from '@/components/Designs/MediaContent/Component'
import { ImageGalleryComponent } from '@/components/Designs/ImageGallery/Component'
import { TestimonialComponent } from '@/components/Designs/Testimonials/Component'
import { PricingComponent } from '@/components/Designs/Pricing/Component'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, Terminal } from 'lucide-react'
import { DynamicIcon } from 'lucide-react/dynamic'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import RichText from '@/components/RichText'
import { HeroGradientComponent } from '@/components/Designs/HeroGradient/Component'
import { BentoGridComponent } from '@/components/Designs/BentoGrid/Component'
import { FeatureTabsComponent } from '@/components/Designs/FeatureTabs/Component'
import { LogoMarqueeComponent } from '@/components/Designs/LogoMarquee/Component'
import { TimelineComponent } from '@/components/Designs/Timeline/Component'
import { MetricsComponent } from '@/components/Designs/Metrics/Component'
import { cn } from '@/utilities/ui'
import Image from 'next/image'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SplitBannerComponent } from '@/components/Designs/SplitBanner/Component'
import { TableComponent } from '@/components/Designs/Table/Component'
import { BannerBlock } from '@/blocks/Banner/Component'
import { RichTextComponent } from '@/blocks/RichTextContent/Component'

const Icon = ({ name, ...props }: { name: string; [key: string]: any }) => {
  return <DynamicIcon name={name} {...props} />
}
const spacingMap = { small: 'my-4', medium: 'my-8', large: 'my-16' }
const blockMap = {
  banner: BannerBlock,
  'richtext-content': RichTextComponent,

  // Premade
  heroGradient: HeroGradientComponent,
  bentoGrid: BentoGridComponent,
  featureTabs: FeatureTabsComponent,
  hero: HeroComponent,
  featureGrid: FeatureGridComponent,
  mediaContent: MediaContentComponent,
  faq: FAQComponent,
  composableSection: ComposableSectionComponent,
  imageGallery: ImageGalleryComponent,
  testimonialCarousel: TestimonialComponent,
  pricingTable: PricingComponent,
  logoMarquee: LogoMarqueeComponent,
  timeline: TimelineComponent,
  metrics: MetricsComponent,
  splitBanner: SplitBannerComponent,
  smartTable: TableComponent,

  // Atoms (Used inside ComposableSection)
  buttonAtom: (props) => <Button variant={props.variant}>{props.label}</Button>,
  badgeAtom: (props) => <Badge>{props.label}</Badge>,
  textAtom: (props) => (
    <div className="prose">
      <RichText data={props.content} />
    </div>
  ),
  alertAtom: ({ type, title, message }) => (
    <Alert variant={type}>
      {type === 'destructive' ? (
        <AlertCircle className="h-4 w-4" />
      ) : (
        <Terminal className="h-4 w-4" />
      )}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  ),
  separatorAtom: ({ spacing }) => <Separator className={spacingMap[spacing]} />,
  progressAtom: ({ value, label }) => (
    <div className="w-full space-y-2">
      {label && <small className="text-sm font-medium leading-none">{label}</small>}
      <Progress value={value} className="w-full" />
    </div>
  ),
  imageAtom: ({ image, aspectRatio, caption }) => (
    <figure className="w-full space-y-2">
      <div
        className={cn('relative overflow-hidden rounded-lg', {
          'aspect-video': aspectRatio === 'video',
          'aspect-square': aspectRatio === 'square',
          'aspect-[21/9]': aspectRatio === 'wide',
        })}
      >
        <Image src={image.url} alt={image.alt || ''} fill className="object-cover" />
      </div>
      {caption && (
        <figcaption className="text-center text-sm text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  ),
  iconAtom: ({ iconName, size, color }) => (
    <div style={{ color }}>
      <Icon name={iconName} size={size} />
    </div>
  ),
  videoAtom: ({ url, controls }) => (
    <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
      <video
        src={url}
        controls={controls}
        className="w-full h-full"
        loop={!controls}
        autoPlay={!controls}
        muted={!controls}
      />
    </div>
  ),
  tooltipAtom: ({ triggerText, content }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="underline decoration-dotted cursor-help">
          {triggerText}
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
  avatarGroupAtom: ({ users }) => (
    <div className="flex -space-x-3 overflow-hidden p-1">
      {users?.map((user, i) => (
        <Avatar key={i} className="inline-block border-2 border-background">
          <AvatarImage src={user.image?.url} />
          <AvatarFallback>{user.initials}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
  accordionAtom: ({ items }) => (
    <Accordion type="single" collapsible className="w-full">
      {items?.map((item, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
  // --- LAYOUT ATOMS ---
  stackAtom: ({ direction, gap, align, content }) => (
    <div
      className={cn('flex w-full', {
        'flex-row': direction === 'row',
        'flex-col': direction === 'column',
        'items-start': align === 'start',
        'items-center': align === 'center',
        'items-end': align === 'end',
        'justify-between': align === 'between',
      })}
      style={{ gap: `${Number(gap) * 4}px` }}
    >
      <RenderBlocks blocks={content} />
    </div>
  ),
  cardAtom: ({ padding, glassmorphism, content }) => (
    <div
      className={cn('rounded-xl border bg-card text-card-foreground shadow', {
        'p-0': padding === 'none',
        'p-4': padding === 'small',
        'p-8': padding === 'medium',
        'p-12': padding === 'large',
        'bg-white/10 backdrop-blur-md border-white/20': glassmorphism,
      })}
    >
      <RenderBlocks blocks={content} />
    </div>
  ),
  stateToggle: ({ leftLabel, rightLabel }) => (
    <div className="flex items-center space-x-2 bg-muted p-1 rounded-lg w-fit">
      <Button variant="ghost" size="sm" className="rounded-md">
        {leftLabel}
      </Button>
      <Button variant="secondary" size="sm" className="rounded-md shadow-sm">
        {rightLabel}
      </Button>
    </div>
  ),
}

export const RenderBlocks = ({ blocks }) => {
  if (!blocks) return null
  return (
    <>
      {blocks.map((block, i) => {
        const Component = blockMap[block.blockType]
        return Component ? <Component key={i} {...block} /> : null
      })}
    </>
  )
}
