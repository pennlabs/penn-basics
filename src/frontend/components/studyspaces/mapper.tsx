export function getNoiseLevel(quiet: number): string {
  const map: Record<number, string> = {
    0: 'Talkative',
    1: 'Quiet',
    2: 'Silent',
  }

  return map[quiet]
}

export function getOutletsLevel(outlets: number): string {
  const map: Record<number, string> = {
    0: 'No outlets',
    1: 'Few outlets',
    2: 'Many outlets',
  }

  return map[outlets]
}

export function getGroupLevel(groups: number) {
  const map: Record<number, string> = {
    0: 'No groups',
    1: 'Small groups',
    2: 'Large groups',
  }

  return map[groups]
}
