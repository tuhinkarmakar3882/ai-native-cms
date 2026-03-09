import { AvailableRenderBlocks } from '@/blocks/RenderBlocks/mapper'

export const RenderBlocks = ({ blocks }) => {
  if (!blocks?.length) return null

  return (
    <div className="w-full">
      {blocks.map((block, i) => {
        const Component = AvailableRenderBlocks[block.blockType]

        if (!Component) {
          return `Missing renderer for block: ${block.blockType}`
        }

        return <Component key={i} {...block} />
      })}
    </div>
  )
}
