import { AvailableRenderBlocks } from '@/blocks/RenderBlocks/mapper'

export const RenderBlocks = ({ blocks }) => {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block, i) => {
        if (!block?.blockType) {
          console.warn(`A Block without a type is found: ${block}`)
          return null
        }

        const Component = AvailableRenderBlocks[block.blockType]

        if (!Component) {
          return `Missing renderer for block: ${block.blockType}`
        }

        return <Component key={i} {...block} />
      })}
    </>
  )
}
