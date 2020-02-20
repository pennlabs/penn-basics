export const getNoiseLevel = (quiet: number): string => {
  const map: Record<number, string> = {
    0: 'Talkative',
    1: 'Quiet',
    2: 'Silent',
  }

  return map[quiet]
}

export const getOutletsLevel = (outlets: number): string => {
  const map: Record<number, string> = {
    0: 'No outlets',
    1: 'Few outlets',
    2: 'Many outlets',
  }

  return map[outlets]
}

export const getGroupLevel = (groups: number): string => {
  const map: Record<number, string> = {
    0: 'No groups',
    1: 'Small groups',
    2: 'Large groups',
  }

  return map[groups]
}
