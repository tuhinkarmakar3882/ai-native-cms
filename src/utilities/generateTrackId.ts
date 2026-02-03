export function generateTrackingIdSafe(prefix = 'page'): string {
  const word = ['alpha', 'beta', 'gamma', 'delta', 'omega'][Math.floor(Math.random() * 5)]

  const time = Date.now().toString(36).slice(-4)
  const rand = Math.random().toString(36).slice(2, 6)

  return `${prefix}-${word}-${time}-${rand}`
}
