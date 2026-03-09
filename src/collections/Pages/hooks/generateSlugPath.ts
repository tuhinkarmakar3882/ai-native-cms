import { buildFullSlug } from '@/utilities/buildFullSlug'

export const updateSlugPath = async ({ data, req }) => {
  if (!data) return data

  const { slug, fullSlug } = await buildFullSlug({ data, req })

  data.slug = slug
  data.fullSlug = fullSlug

  return data
}
