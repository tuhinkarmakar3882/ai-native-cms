'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useLivePreview } from '@payloadcms/live-preview-react'
import React, { useEffect } from 'react'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { getClientSideURL } from '@/utilities/getURL'
import styled from 'styled-components'
import { usePageAnalytics } from '@/hooks/usePageAnalytics'

const StyledArticle = styled.article`
  &.rtl-mode {
    direction: rtl;
    text-align: right;
  }
`

export const PageClient: React.FC<{ initialData: any; locale?: string; isDraft?: boolean }> = ({
  initialData,
  locale,
  isDraft,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  const { data } = useLivePreview({
    initialData,
    serverURL: getClientSideURL(),
    depth: 2,
  })

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  usePageAnalytics({
    scrollDepths: [20, 40, 60, 80, 100],
    sectionSelector: '[data-track-section]',
    isEnabled: !isDraft,
  })

  // Check RTL based on the live data or current locale
  const isRTL = locale === 'ar' || data?._locale === 'ar'

  return (
    <StyledArticle className={`pb-4 ${isRTL ? 'rtl-mode' : ''}`}>
      <RenderBlocks blocks={data.layout} />
    </StyledArticle>
  )
}
