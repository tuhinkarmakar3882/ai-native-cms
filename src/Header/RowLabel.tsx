'use client'

import { useRowLabel, RowLabelProps } from '@payloadcms/ui'
import type { Header } from '@/payload-types'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()

  const label = data?.data?.link?.label

  if (!label) return <div>Navigation Item</div>

  return (
    <div className="flex gap-2">
      <span>{label}</span>

      {data?.data?.children?.length ? (
        <span className="opacity-60">({data.data.children.length} items)</span>
      ) : null}
    </div>
  )
}
