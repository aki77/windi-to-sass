export function flattenObject(obj: any, sep = '.') {
  const result = {} as Record<string, any>

  function recurse(obj: any, current?: string) {
    for (const key in obj) {
      const value = obj[key]
      const newKey = current ? current + sep + key : key // joined key with separator

      if (value && typeof value === 'object' && !(value instanceof Date)) {
        recurse(value, newKey) // nested object - do it again
      } else {
        result[newKey] = value // not an object - set the property
      }
    }
  }

  recurse(obj)

  return result
}

export function normalizeObject(obj: Record<string, any>): Record<string, any> {
  const entries = Object.entries(obj)
  const newEntries = entries.map(([key, value]) => {
    const newValue = (value && typeof value === 'object') ? normalizeObject(value) : value
    return [key, newValue]
  })

  return Object.fromEntries(newEntries)
}
