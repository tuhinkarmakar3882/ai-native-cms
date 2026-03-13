'use client'

import { RenderBlocks } from '@/blocks/RenderBlocks'

type Props = {
  layout: string
  stickySide?: 'left' | 'right' | 'none'
  leftColumn: any[]
  rightColumn: any[]
}

export const TwoColumnLayoutComponent: React.FC<Props> = ({
  layout = '60-40',
  stickySide = 'right',
  leftColumn,
  rightColumn,
}) => {
  const layoutMap: Record<string, string> = {
    '50-50': 'grid-cols-2',
    '60-40': 'grid-cols-[3fr_2fr]',
    '40-60': 'grid-cols-[2fr_3fr]',
    '70-30': 'grid-cols-[7fr_3fr]',
    '30-70': 'grid-cols-[3fr_7fr]',
  }

  const stickyClass = 'sticky top-24 self-start'

  return (
    <section className="container mx-auto py-12">
      <div className={`grid gap-12 ${layoutMap[layout]}`}>
        <div className={stickySide === 'left' ? stickyClass : 'self-start'}>
          <RenderBlocks blocks={leftColumn} />
        </div>

        <div className={stickySide === 'right' ? stickyClass : 'self-start'}>
          <RenderBlocks blocks={rightColumn} />
        </div>
      </div>
    </section>
  )
}
