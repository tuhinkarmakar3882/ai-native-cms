import { cn } from '@/utilities/ui'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { getResponsiveGridClasses } from '@/utilities/responsiveWidth'

export const BuildYourOwnSectionComponent = ({ container }) => {
  return container?.map((block, i) => {
    if (block.blockType === 'container') {
      return <ContainerRenderer key={i} {...block} />
    }
  })
}

export const GridAreaRenderer = ({ gap, items }) => {
  return (
    <div className={cn('grid grid-cols-12')} style={{ gap: `${gap}px` }}>
      {items?.map((item, i) => (
        <GridItemRenderer key={i} {...item} />
      ))}
    </div>
  )
}

export const GridItemRenderer = ({ responsiveWidth, content }) => {
  return (
    <div className={cn(getResponsiveGridClasses(responsiveWidth))}>
      <RenderBlocks blocks={content} />
    </div>
  )
}

export const ContainerRenderer = ({ width, padding, areas }) => {
  return (
    <section className={cn(width, padding)}>
      {areas?.map((area, i) => (
        <GridAreaRenderer key={i} {...area} />
      ))}
    </section>
  )
}
