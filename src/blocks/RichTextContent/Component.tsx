import type { BannerBlock as BannerBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

type Props = {
  className?: string
} & BannerBlockProps

export const RichTextComponent: React.FC<Props> = ({ className, content, style }) => {
  return (
    <div className={cn('container mx-auto px-4', className)}>
      <RichText data={content} enableGutter={false} enableProse={true} />
    </div>
  )
}
