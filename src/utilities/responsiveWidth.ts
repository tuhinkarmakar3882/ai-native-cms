export function getResponsiveGridClasses(width) {
  if (!width) return 'col-span-12'

  const classes = []

  classes.push(`col-span-${width.base ?? 12}`)

  if (width.sm) classes.push(`sm:col-span-${width.sm}`)
  if (width.md) classes.push(`md:col-span-${width.md}`)
  if (width.lg) classes.push(`lg:col-span-${width.lg}`)
  if (width.xl) classes.push(`xl:col-span-${width.xl}`)

  return classes.join(' ')
}
