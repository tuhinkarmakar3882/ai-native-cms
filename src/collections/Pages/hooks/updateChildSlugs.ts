import { buildFullSlug } from '@/utilities/buildFullSlug'

export const updateChildSlugs = async ({ doc, req }) => {
  const payload = req.payload

  const children = await payload.find({
    collection: 'pages',
    where: {
      parent: {
        equals: doc.id,
      },
    },
    limit: 1000,
    pagination: false,
  })

  for (const child of children.docs) {
    const { slug, fullSlug } = await buildFullSlug({
      data: child,
      req,
    })

    await payload.update({
      collection: 'pages',
      id: child.id,
      data: {
        slug,
        fullSlug,
      },
      depth: 0,
    })

    // recursively update deeper descendants
    await updateChildSlugs({ doc: { ...child, slug, fullSlug }, req })
  }
}
