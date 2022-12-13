const versionPattern = /\d{4}\.\d{2}\.\d{2}.\d{1,5}$/

export function matchVersionPattern(str: string): boolean {
  return versionPattern.test(str)
}

export function generateVersionPrefix(): string {
  const date = new Date()
  return `${date.getFullYear()}.${date.toLocaleString('default', {
    month: '2-digit'
  })}.${date.toLocaleString('default', {
    day: '2-digit'
  })}.`
}

export function toBoolean(str: string): boolean {
  return /true/i.test(str)
}
