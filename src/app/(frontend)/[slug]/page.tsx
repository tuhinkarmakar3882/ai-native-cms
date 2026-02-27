import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode, headers } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { PageClient } from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import styled from 'styled-components'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
  searchParams: Promise<{
    locale?: string
  }>
}

const StyledArticle = styled.article`
  &.rtl-mode {
    * {
      direction: rtl !important;
    }
  }
`

const isRTL = (locale) => ['ar'].includes(locale)

export default async function Page({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: Args) {
  const { isEnabled: draft } = await draftMode()
  const headerList = await headers()
  const isExperimentRequest = headerList.get('x-is-experiment') === 'true'

  const [params, searchParams] = await Promise.all([paramsPromise, searchParamsPromise])
  const { slug = 'home' } = params
  const { locale = 'en' } = searchParams

  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
    locale,
    draft,
  })

  // Requirement 1: If isVariant and NOT accessed via experiment rewrite, 404.
  if (!page || (page.isVariant && !isExperimentRequest && !draft)) {
    return notFound()
  }

  return (
    <StyledArticle className={`pb-24 ${isRTL(locale) ? 'rtl-mode' : ''}`}>
      {draft ? (
        <PageClient initialData={page} locale={locale} />
      ) : (
        <>
          <RenderHero {...page.hero} />
          <RenderBlocks blocks={page.layout} />
        </>
      )}
      <PayloadRedirects disableNotFound url={'/' + decodedSlug} />
      {draft && <LivePreviewListener />}
    </StyledArticle>
  )
}
export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
    draft: false,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(
  async ({ slug, locale, draft }: { slug: string; locale?: string; draft: boolean }) => {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      locale: locale as any,
      where: {
        slug: {
          equals: slug,
        },
      },
    })

    return result.docs?.[0] || null
  },
)
