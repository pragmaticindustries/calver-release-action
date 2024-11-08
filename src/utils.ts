const versionPattern = /\d{2}\.\d{2}.\d{1,5}$/

export function matchVersionPattern(str: string): boolean {
  return versionPattern.test(str)
}

export function generateVersionPrefix(timezone: string): string {
  const dateParts = new Intl.DateTimeFormat('default', {
    month: '2-digit',
    year: '2-digit',
    timeZone: timezone
  }).formatToParts(new Date())
  return `${dateParts.find(it => it.type === 'year')?.value}.${
    dateParts.find(it => it.type === 'month')?.value
  }.`
}

export function toBoolean(str: string): boolean {
  return /true/i.test(str)
}

export function generateReleaseTitle(
  titleFormat: string,
  version = ''
): string {
  return titleFormat.replace(/\$\{version}/g, version)
}
