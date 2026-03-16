'use client'

import { RenderBlocks } from '@/blocks/RenderBlocks'

type Props = {
  layout: string
  stickySide?: 'left' | 'right' | 'none'
  mobileStack?: 'left-first' | 'right-first'
  leftColumn: any[]
  rightColumn: any[]
}

export const TwoColumnLayoutComponent: React.FC<Props> = ({
  layout = '60-40',
  stickySide = 'right',
  mobileStack = 'left-first',
  leftColumn,
  rightColumn,
}) => {
  const layoutMap: Record<string, string> = {
    '50-50': 'lg:grid-cols-2',
    '60-40': 'lg:grid-cols-[3fr_2fr]',
    '40-60': 'lg:grid-cols-[2fr_3fr]',
    '70-30': 'lg:grid-cols-[7fr_3fr]',
    '30-70': 'lg:grid-cols-[3fr_7fr]',
  }

  const stickyClass = 'lg:sticky lg:top-24 self-start'

  const leftOrder = mobileStack === 'right-first' ? 'order-2 lg:order-1' : 'order-1'

  const rightOrder = mobileStack === 'right-first' ? 'order-1 lg:order-2' : 'order-2'

  return (
    <section className="container mx-auto py-12">
      <div className={`grid grid-cols-1 gap-12 ${layoutMap[layout]}`}>
        <div className={`${leftOrder} ${stickySide === 'left' ? stickyClass : 'self-start'}`}>
          <RenderBlocks blocks={leftColumn} />
        </div>

        <div className={`${rightOrder} ${stickySide === 'right' ? stickyClass : 'self-start'}`}>
          <RenderBlocks blocks={rightColumn} />
        </div>
      </div>
    </section>
  )
}
