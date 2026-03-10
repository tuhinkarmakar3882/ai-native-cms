'use client'

import { useRowLabel } from '@payloadcms/ui'

export const RowLabel = () => {
  const data = useRowLabel<any>()

  return <span>{data?.data?.title || 'Footer Group'}</span>
}
