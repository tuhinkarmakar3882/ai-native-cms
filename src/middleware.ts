// src/middleware.ts
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getBucket, pickVariant } from './utilities/experiment-logic'

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Prevent middleware from running on API routes
  if (pathname.startsWith('/api') || request.headers.get('x-is-experiment')) {
    return NextResponse.next()
  }
  // Convert pathname to slug array
  const slugArray = pathname.split('/').filter(Boolean)
  const slug = slugArray.length ? slugArray.join('/') : 'home'

  try {
    const expRes = await fetch(`${request.nextUrl.origin}/api/experiment-lookup?slug=${slug}`, {
      cache: 'no-store',
    })

    if (!expRes.ok) {
      return NextResponse.next()
    }
    const experiment = await expRes.json()

    if (experiment && experiment.enabled) {
      let visitorId = request.cookies.get('visitor_id')?.value
      if (!visitorId) {
        visitorId = crypto.randomUUID()
      }

      const bucket = getBucket(visitorId, experiment.experimentId)
      const variant = pickVariant(experiment.variants, bucket)
      const variantPage = variant.page

      const response = NextResponse.rewrite(new URL(`/${variantPage.fullSlug}`, request.url))

      response.headers.set('x-is-experiment', 'true')
      response.cookies.set('visitor_id', visitorId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      })

      return response
    }
  } catch (e) {
    console.error({ e })
  }

  return NextResponse.next()
}
