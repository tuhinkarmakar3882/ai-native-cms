export const buildFullSlug = async ({ data, req }) => {
  const segments: string[] = []

  const currentSlug = data.slug || Math.random().toString(36).slice(2, 8)

  segments.unshift(currentSlug)

  let parentID = typeof data.parent === 'string' ? data.parent : data.parent?.id

  while (parentID) {
    const parent = await req.payload.findByID({
      collection: 'pages',
      id: parentID,
      depth: 0,
    })

    if (!parent) break

    segments.unshift(parent.slug)

    parentID = typeof parent.parent === 'string' ? parent.parent : parent.parent?.id
  }

  return {
    slug: currentSlug,
    fullSlug: segments.join('/'),
  }
}
