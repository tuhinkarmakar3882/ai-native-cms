import slugify from 'slugify'

export const buildFullSlug = async ({ data, req }) => {
  const segments: string[] = []

  const currentSlug =
    slugify(data.title || '', { lower: true, strict: true }) ||
    Math.random().toString(36).slice(2, 8)

  segments.unshift(currentSlug)

  let parentID = data.parent

  while (parentID) {
    const parent = await req.payload.findByID({
      collection: 'pages',
      id: parentID,
      depth: 0,
    })

    if (!parent) break

    segments.unshift(parent.slug)
    parentID = parent.parent
  }

  return {
    slug: currentSlug,
    fullSlug: segments.join('/'),
  }
}
