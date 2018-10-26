export function getNoiseLevel(quiet) {
  const map = {
    0: 'Talkative',
    1: 'Quiet',
    2: 'Silent',
  };

  return map[quiet];
}

export function getOutletsLevel(outlets) {
  const map = {
    0: 'No outlets',
    1: 'Few outlets',
    2: 'Many outlets',
  };

  return map[outlets];
}
