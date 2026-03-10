import { detectProvider } from '@/blocks/Composable/Atoms/EmbedAnything/utils'

type Props = {
  url: string
  caption?: string
  aspectRatio?: string
}

function getYoutubeEmbed(url: string) {
  const parsed = new URL(url)

  if (parsed.hostname.includes('youtu.be'))
    return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`

  const id = parsed.searchParams.get('v')
  return `https://www.youtube.com/embed/${id}`
}

function getVimeoEmbed(url: string) {
  const id = url.split('/').pop()
  return `https://player.vimeo.com/video/${id}`
}

export function EmbedAnythingBlockComponent({ url, caption, aspectRatio = '16/9' }: Props) {
  if (!url) return 'Error: No URL provided for embedding'

  const provider = detectProvider(url)

  let embedUrl = url

  if (provider === 'youtube') embedUrl = getYoutubeEmbed(url)
  if (provider === 'vimeo') embedUrl = getVimeoEmbed(url)

  return (
    <figure className="my-8">
      <div
        className="relative w-full overflow-hidden"
        style={aspectRatio !== 'auto' ? { aspectRatio } : undefined}
      >
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full"
          loading="lazy"
          allowFullScreen
        />
      </div>

      {caption && (
        <figcaption className="text-sm text-muted-foreground mt-2 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
