import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'

interface Upload {
  id: string
  filename: string
  url: string
  mimeType?: string
  alt?: string
}

interface ContainerSettings {
  useContainer?: boolean
}

interface MediaViewerProps {
  mediaType: 'image' | 'pdf' | 'video'
  image?: Upload
  pdf?: Upload
  video?: Upload
  caption?: string
  showCard?: boolean
  ratio?: 'none' | '1:1' | '4:3' | '16:9' | '21:9'
  width?: number
  height?: number
  containerSettings?: ContainerSettings
}

const ratioMap: Record<string, number> = {
  '1:1': 1,
  '4:3': 4 / 3,
  '16:9': 16 / 9,
  '21:9': 21 / 9,
}

export const MediaViewerComponent: React.FC<MediaViewerProps> = ({
  mediaType,
  image,
  pdf,
  video,
  caption,
  showCard = true,
  ratio = '16:9',
  width,
  height,
  containerSettings = { useContainer: false },
}) => {
  const { useContainer, containerSize } = containerSettings

  const renderMedia = () => {
    const commonClasses = 'rounded-md object-cover w-full h-full'

    if (mediaType === 'image' && image?.url) {
      return (
        <img
          src={image.url}
          alt={caption || image.alt || image.filename}
          className={commonClasses}
        />
      )
    }

    if (mediaType === 'pdf' && pdf?.url) {
      return (
        <iframe
          src={pdf.url}
          title={caption || pdf.filename || 'Embedded Media'}
          className="w-full h-full rounded-md"
          frameBorder="0"
        />
      )
    }

    if (mediaType === 'video' && video?.url) {
      return <video src={video.url} controls className="w-full h-full rounded-md" />
    }

    return null
  }

  const mediaContainer =
    ratio === 'none' && width && height ? (
      <div style={{ width: `${width}%`, height: `${height}px` }} className="mx-auto">
        {renderMedia()}
      </div>
    ) : (
      <AspectRatio ratio={ratioMap[ratio] || 16 / 9}>{renderMedia()}</AspectRatio>
    )

  const mediaOutput = !showCard ? (
    <div className="my-6">
      {mediaContainer}
      {caption && <p className="mt-2 text-sm text-muted-foreground text-center">{caption}</p>}
    </div>
  ) : (
    <Card className="my-6 overflow-hidden">
      <CardContent className="p-0">{mediaContainer}</CardContent>
      {caption && (
        <CardFooter>
          <p className="text-sm text-muted-foreground w-full text-center">{caption}</p>
        </CardFooter>
      )}
    </Card>
  )

  if (useContainer) {
    return <div className="container">{mediaOutput}</div>
  }

  return mediaOutput
}
