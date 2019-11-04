export const convertDate = time => {
  const hour = parseInt(time.substring(0, time.indexOf(':')), 10)
  const minute = parseInt(time.substring(time.indexOf(':') + 1), 10)

  if (hour === 12) {
    return minute === 0 ? '12pm' : `12:${minute}pm`
  }

  if (hour >= 13)
    return minute === 0 ? `${hour - 12}pm` : `${hour - 12}:${minute}pm`
  return minute === 0 ? `${hour}am` : `${hour}:${minute}am`
}

export const pad = number => {
  return number < 10 ? `0${number}` : `${number}`
}

export const padHours = hourString => {
  if (!hourString) return null
  const hour = parseInt(hourString.substring(0, hourString.indexOf(':')), 10)
  const remaining = hourString.substring(hourString.indexOf(':'))
  return `${pad(hour)}${remaining}`
}

export const isValidNumericId = id => {
  if (id === null || id === undefined) return false
  const num = Number(id)
  if (Number.isNaN(num)) return false
  if (num < 0) return false
  return true
}
