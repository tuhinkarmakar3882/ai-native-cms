export type EmbedProvider =
  | 'youtube'
  | 'vimeo'
  | 'spotify'
  | 'twitter'
  | 'instagram'
  | 'tiktok'
  | 'codepen'
  | 'figma'
  | 'google-maps'
  | 'pdf'
  | 'generic'

export function detectProvider(url: string): EmbedProvider {
  const u = url.toLowerCase()

  if (u.includes('youtube.com') || u.includes('youtu.be')) return 'youtube'
  if (u.includes('vimeo.com')) return 'vimeo'
  if (u.includes('spotify.com')) return 'spotify'
  if (u.includes('twitter.com') || u.includes('x.com')) return 'twitter'
  if (u.includes('instagram.com')) return 'instagram'
  if (u.includes('tiktok.com')) return 'tiktok'
  if (u.includes('codepen.io')) return 'codepen'
  if (u.includes('figma.com')) return 'figma'
  if (u.includes('google.com/maps')) return 'google-maps'
  if (u.endsWith('.pdf')) return 'pdf'

  return 'generic'
}
