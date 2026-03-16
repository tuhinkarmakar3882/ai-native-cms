import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Progress,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui'

import Image from 'next/image'

import { cn } from '@/utilities/ui'
import { DynamicIcon } from 'lucide-react/dynamic'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { EmbedAnythingBlockComponent } from '@/components/Designs/EmbedAnything/Component'
import { RichTextComponent } from '@/blocks/RichTextContent/Component'

export const TextAtomComponent = ({ content }) => (
  <div className="prose max-w-none">
    <RichTextComponent content={content} />
  </div>
)

export const ButtonAtomComponent = ({ label, url, variant, iconBefore, iconAfter, width }) => (
  <Button
    variant={variant}
    asChild
    style={{
      width,
    }}
  >
    <a href={url} className="inline-flex items-center gap-2">
      {iconBefore && <IconAtomComponent {...iconBefore} />}

      <span>{label}</span>

      {iconAfter && <IconAtomComponent {...iconAfter} />}
    </a>
  </Button>
)

export const BadgeAtomComponent = ({ label, variant }) => <Badge variant={variant}>{label}</Badge>

export const AlertAtomComponent = ({ title, description, variant }) => (
  <Alert variant={variant}>
    <AlertTitle>{title}</AlertTitle>
    <AlertDescription>{description}</AlertDescription>
  </Alert>
)

export const ImageAtomComponent = ({ image, caption, aspect }) => {
  const aspectMap = {
    auto: '',
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[16/6]',
  }

  return (
    <figure className="space-y-2">
      <div className={cn('relative overflow-hidden rounded-lg', aspectMap[aspect])}>
        {image && (
          <Image src={image.url} alt={image.alt || ''} fill className="object-cover w-full" />
        )}
      </div>

      {caption && <figcaption className="text-sm text-muted-foreground">{caption}</figcaption>}
    </figure>
  )
}

export const CardAtomComponent = ({ title, description, image }) => (
  <Card>
    {image && (
      <div className="relative aspect-video">
        <Image src={image.url} alt="" fill className="object-cover" />
      </div>
    )}

    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>

    <CardContent>{description}</CardContent>
  </Card>
)

export const AccordionAtomComponent = ({ items }) => (
  <Accordion type="single" collapsible>
    {items.map((item, i) => (
      <AccordionItem key={i} value={`item-${i}`}>
        <AccordionTrigger>{item.title}</AccordionTrigger>
        <AccordionContent>{item.content}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
)

export const TabsAtomComponent = ({ tabs }) => (
  <Tabs defaultValue={tabs?.[0]?.label}>
    <TabsList>
      {tabs.map((t, i) => (
        <TabsTrigger key={i} value={t.label}>
          {t.label}
        </TabsTrigger>
      ))}
    </TabsList>

    {tabs.map((t, i) => (
      <TabsContent key={i} value={t.label}>
        {t.content}
      </TabsContent>
    ))}
  </Tabs>
)

export const CarouselAtomComponent = ({ slides }) => (
  <Carousel>
    <CarouselContent>
      {slides.map((s, i) => (
        <CarouselItem key={i}>
          {s?.image?.url && <Image src={s.image.url} alt="" width={1200} height={600} />}
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
)

export const AvatarAtomComponent = ({ image, name, role }) => (
  <div className="flex items-center gap-3">
    <Avatar>
      <AvatarImage src={image?.url} />
      <AvatarFallback>{name?.[0]}</AvatarFallback>
    </Avatar>
    <div>
      <p className="font-medium">{name}</p>
      <p className="text-sm text-muted-foreground">{role}</p>
    </div>
  </div>
)

export const SeparatorAtomComponent = ({ spacing }) => {
  const space = { sm: 'my-4', md: 'my-8', lg: 'my-12', xl: 'my-20' }
  return (
    <div className={space[spacing]}>
      <Separator />
    </div>
  )
}

export const ProgressAtomComponent = ({ value }) => <Progress value={value} />

export const TableAtomComponent = ({ rows }) => (
  <table className="w-full border">
    <tbody>
      {rows.map((r, i) => (
        <tr key={i}>
          {r.cells.map((c, j) => (
            <td key={j} className="border p-2">
              {c.value}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
)

export const IconAtomComponent = ({
  iconName,
  size,
  color,
}: {
  iconName: string
  size?: number
  color?: string
}) => {
  return iconName ? <DynamicIcon name={iconName} size={size} color={color} /> : null
}

export const VideoAtomComponent = ({ url, controls }) => (
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
)

export const SpacerAtomComponent = (props) => {
  if (props?.spacing !== 'none') {
    return <div className={`my-${props.spacing}`} />
  }

  return (
    <div
      style={{
        margin: `${props?.top ?? 0}px  ${props?.right ?? 0}px ${props?.bottom ?? 0}px ${props?.left ?? 0}px`,
      }}
    />
  )
}

export const AlignerAtomComponent = ({ direction, gap, items, justify, align }) => {
  return (
    <div
      className={cn('flex', direction === 'column' ? 'flex-col' : 'flex-row')}
      style={{
        gap: `${gap}px`,
        justifyContent: `${justify}`,
        alignItems: `${align}`,
      }}
    >
      {items?.map((item, i) => (
        <RenderBlocks key={i} blocks={[item]} />
      ))}
    </div>
  )
}

export const WrapperAtomComponent = (props) => {
  return (
    <div
      style={{
        marginTop: `${props.marginTop}px`,
        marginBottom: `${props.marginBottom}px`,
        marginLeft: `${props.marginLeft}px`,
        marginRight: `${props.marginRight}px`,

        paddingLeft: `${props.paddingLeft}px`,
        paddingRight: `${props.paddingRight}px`,
        paddingTop: `${props.paddingTop}px`,
        paddingBottom: `${props.paddingBottom}px`,

        backgroundColor: `${props.backgroundColor}`,
        borderRadius: `${props.borderRadius}`,
        borderWidth: `${props.borderWidth}`,
        borderColor: `${props.borderColor}`,
        borderStyle: 'solid',
      }}
    >
      {props?.items?.map((item, i) => (
        <RenderBlocks key={i} blocks={[item]} />
      ))}
    </div>
  )
}

export const AtomicRendererMap = {
  wrapperAtom: WrapperAtomComponent,
  textAtom: TextAtomComponent,
  buttonAtom: ButtonAtomComponent,
  badgeAtom: BadgeAtomComponent,
  alertAtom: AlertAtomComponent,
  imageAtom: ImageAtomComponent,
  cardAtom: CardAtomComponent,
  accordionAtom: AccordionAtomComponent,
  tabsAtom: TabsAtomComponent,
  carouselAtom: CarouselAtomComponent,
  avatarAtom: AvatarAtomComponent,
  separatorAtom: SeparatorAtomComponent,
  progressAtom: ProgressAtomComponent,
  tableAtom: TableAtomComponent,

  iconAtom: IconAtomComponent,
  videoAtom: VideoAtomComponent,
  spacerAtom: SpacerAtomComponent,
  alignerAtom: AlignerAtomComponent,
  embedAnything: EmbedAnythingBlockComponent,
}
