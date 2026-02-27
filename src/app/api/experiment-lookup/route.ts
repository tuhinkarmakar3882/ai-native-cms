// src/app/api/experiment-lookup/route.ts
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'experiments',
    where: {
      slug: { equals: slug },
      enabled: { equals: true },
    },
    depth: 1, // Get the page object too
  })

  return NextResponse.json(result.docs[0] || null)
}
