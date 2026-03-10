import PageTemplate, { generateMetadata } from '@/app/(frontend)/[...slug]/page'

type Args = {
  searchParams: Promise<{
    locale?: string
  }>
}

export default async function HomePage({ searchParams }: Args) {
  console.log('It came here!')
  return PageTemplate({
    params: Promise.resolve({ slug: 'home' }),
    searchParams,
  } as any)
}

export { generateMetadata }
