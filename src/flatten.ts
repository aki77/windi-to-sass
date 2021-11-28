// SEE: https://github.com/nwaughachukwuma/flatten-ihe
export function flattenIhe(obj: any, sep = '.') {
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
