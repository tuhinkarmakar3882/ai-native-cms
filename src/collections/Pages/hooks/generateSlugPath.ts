import { buildFullSlug } from '@/utilities/buildFullSlug'
import { PayloadRequest, type RequestContext, SanitizedCollectionConfig, TypeWithID } from 'payload'

interface IBeforeValidateHook<T extends TypeWithID = any> {
  collection: SanitizedCollectionConfig
  context: RequestContext
  data?: Partial<T>
  operation: any
  originalDoc?: T
  req: PayloadRequest
}

export const generateSlugPath = async (props: IBeforeValidateHook) => {
  const { data, req } = props

  if (!data) return data

  const { slug, fullSlug } = await buildFullSlug({ data, req })

  data.slug = slug
  data.fullSlug = fullSlug

  return data
}
