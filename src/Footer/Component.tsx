import { getCachedGlobal } from '@/utilities/getGlobals'
import { FooterClient } from './Component.client'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()
  return <FooterClient data={footerData} />
}
