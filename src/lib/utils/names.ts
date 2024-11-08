export function checkNameAvailability(names: string[], name: string) {
  return !names.includes(name)
}
export function resolveNextName(names: string[], prefix: string) {
  let i = 1
  while(!checkNameAvailability(names, `${prefix} (${i})`)) {
    i++
  }
  return `${prefix} (${i})`
}
export function nameToId(name: string) {
  if (name) {
    return name
      .trim()
      .toLowerCase()
      .split(' ').filter(s => s).join('_')
  }
  return ''
}