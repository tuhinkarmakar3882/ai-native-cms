export const convertToSubFieldState = (obj: any) => {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    acc[key] = {
      value: val,
      valid: true,
      initialValue: val,
    }
    return acc
  }, {} as any)
}
