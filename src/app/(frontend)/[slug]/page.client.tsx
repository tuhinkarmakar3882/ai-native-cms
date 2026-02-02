'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useLivePreview } from '@payloadcms/live-preview-react'
import React, { useEffect } from 'react'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { getClientSideURL } from '@/utilities/getURL'

const PageClient: React.FC<{ initialData: any }> = ({ initialData }) => {
  const { setHeaderTheme } = useHeaderTheme()

  // 1. Listen for live updates
  const { data } = useLivePreview({
    initialData,
    serverURL: getClientSideURL(),
    depth: 2,
  })

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  // 2. Render the LIVE data here
  return (
    <React.Fragment>
      <RenderHero {...data.hero} />
      <RenderBlocks blocks={data.layout} />
    </React.Fragment>
  )
}

export default PageClient
