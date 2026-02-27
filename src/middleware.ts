// src/middleware.ts
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getBucket, pickVariant } from './utilities/experiment-logic'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const slug = pathname.split('/').pop() || 'home'

  // 1. Check if this slug is an active experiment
  // Note: In production, you'd want to cache this lookup or use a faster Edge-compatible DB
  const expRes = await fetch(`${request.nextUrl.origin}/api/experiment-lookup?slug=${slug}`)
  const experiment = await expRes.json()

  if (experiment && experiment.enabled) {
    // 2. Handle Visitor ID
    let visitorId = request.cookies.get('visitor_id')?.value
    if (!visitorId) {
      visitorId = crypto.randomUUID()
    }

    // 3. Deterministically pick variant
    const bucket = getBucket(visitorId, experiment.experimentId)
    const variant = pickVariant(experiment.variants, bucket)
    const variantPage = variant.page // This is the Page object from Payload

    // 4. Rewrite to the variant slug
    // We add a header to 'authorize' the variant access
    const response = NextResponse.rewrite(new URL(`/${variantPage.slug}`, request.url))

    response.headers.set('x-is-experiment', 'true')
    response.cookies.set('visitor_id', visitorId, { path: '/', maxAge: 60 * 60 * 24 * 30 })

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
