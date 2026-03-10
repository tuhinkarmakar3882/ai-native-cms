import { CollectionSlug, PayloadRequest } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  pages: '',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  if (slug === undefined || slug === null) {
    return null
  }

  // Encode each segment separately
  const encodedPath = slug
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')

  const encodedParams = new URLSearchParams({
    slug: slug,
    collection,
    path: `${collectionPrefixMap[collection]}/${encodedPath}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  return `/next/preview?${encodedParams.toString()}`
}
