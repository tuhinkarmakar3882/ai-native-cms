// src/utilities/experiment-logic.ts
export function getBucket(visitorId: string, experimentId: string): number {
  let hash = 0
  const str = visitorId + experimentId
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0 // Convert to 32bit integer
  }
  return Math.abs(hash) % 100 // Returns 0-99
}

export function pickVariant(variants: any[], bucket: number) {
  const totalWeight = variants.reduce((acc, v) => acc + (v.weight || 0), 0)
  let cumulativeWeight = 0

  // Normalize bucket to total weight scale
  const target = (bucket / 100) * totalWeight

  for (const variant of variants) {
    cumulativeWeight += variant.weight
    if (target < cumulativeWeight) return variant
  }
  return variants[0]
}
