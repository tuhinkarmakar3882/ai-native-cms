import { RenderBlocks } from '@/blocks/RenderBlocks'
import { cn } from '@/utilities/ui'

export const ComposableSectionComponent = ({ containerSettings, columns }) => {
  const { layoutType, gap, padding } = containerSettings

  const paddingClasses = {
    none: 'py-0',
    small: 'py-8',
    large: 'py-24',
  }[padding as string]

  return (
    <section className={cn('container', paddingClasses)}>
      <div
        className={cn({
          'flex flex-wrap items-start': layoutType === 'flex',
          'grid grid-cols-12': layoutType === 'grid',
        })}
        style={{ gap: `${gap}px` }}
      >
        {columns?.map((col, i) => {
          // Map simple width names to Tailwind grid/flex classes
          const colClasses = cn({
            'w-full col-span-12': col.width === 'w-full',
            'md:w-1/2 col-span-12 md:col-span-6': col.width === 'w-1/2',
            'md:w-1/3 col-span-12 md:col-span-4': col.width === 'w-1/3',
          })

          return (
            <div key={i} className={colClasses}>
              <RenderBlocks blocks={col.content} />
            </div>
          )
        })}
      </div>
    </section>
  )
}
