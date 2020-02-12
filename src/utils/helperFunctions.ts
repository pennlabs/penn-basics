import { Response, Request, NextFunction } from 'express'

export const convertDate = (time: string) => {
  if (!time) return 'Closed'
  const colonIdx = time.indexOf(':')
  const hour = parseInt(time.substring(0, colonIdx), 10)
  const minute = parseInt(time.substring(colonIdx + 1), 10)

  if (hour === 12) {
    return minute === 0 ? '12pm' : `12:${minute}pm`
  }

  if (hour >= 13) {
    return minute === 0 ? `${hour - 12}pm` : `${hour - 12}:${minute}pm`
  }

  return minute === 0 ? `${hour}am` : `${hour}:${minute}am`
}

/**
 * Add a 0 to the start of an hour number if the nubmer is < 10
 *
 * @param number
 * @returns the nubmer as a string
 */
export const pad = (number: number): string => {
  return number < 10 ? `0${number}` : `${number}`
}

export const padHours = (hourString: string): string => {
  if (!hourString) return ''
  const colonIdx = hourString.indexOf(':')
  const hour = parseInt(hourString.substring(0, colonIdx), 10)
  const remaining = hourString.substring(colonIdx)
  return `${pad(hour)}${remaining}`
}

/**
 * Return if the provided id is a valid number which can be cast to a non-
 * negative integer
 *
 * @param id
 */
export const isValidNumericId = (id: number): boolean => {
  if (id === null || id === undefined) return false
  const num = Number(id)
  if (Number.isNaN(num)) return false
  if (num < 0) return false
  return true
}

/**
 * Middleware builder to check if a user is logged in. The resultant middleware prints out a custom message
 * Proper usage is router.get('/your/route', isLoggedInMiddleware, (req, res)=>{/*your handler code/})
 * @param {String} message - The message that you want to display if the user is not logged in.
 */
export const isLoggedInMiddleware = (message?: string) => {
  const DEFAULT_MESSAGE = 'You must be logged in to perform this action'
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        message: message ?? DEFAULT_MESSAGE,
      })
    }
    return next()
  }
}

/**
 * Dealing with timestamps for places like studyspaces
 */

/**
 * @param {number} time in MS
 * @returns {number} minutes (between 0 and 59)
 */
export const getMinutes = (time: number): string => {
  // If there is a decimal
  let minutes = ''
  if (time % 1 !== 0) {
    minutes = `${Math.round((time % 1) * 60)}`
  }

  return minutes
}

/**
 * @param {number} time in MS
 * @returns {string} the passed in time
 */
export const getTime = (time: number): string => {
  // Edge case
  if (time < 0) return ''

  const mins = getMinutes(time)
  let hours = Math.floor(time)
  let prefix
  if (hours < 12) {
    hours = hours || 12 // Change 0 to 12
    prefix = 'am'
  } else {
    hours = hours === 12 ? hours : hours - 12
    prefix = 'pm'
  }

  let timeStr = `${hours}`
  if (mins) {
    timeStr += `:${mins}`
  }
  timeStr += prefix

  return timeStr
}

export const getHours = (
  { start, end }: { start: number[]; end: number[] },
  day: number
): string => {
  const startTime = start[day]
  const endTime = end[day]

  if (startTime < 0 || endTime < 0) return 'Closed'

  return `${getTime(startTime)} – ${getTime(endTime)}`
}

export const isOpen = (
  { start, end }: { start: number[]; end: number[] },
  time: number,
  day: number
) => {
  const startTime = start[day]
  const endTime = end[day]

  // If either time is less than 0 then the space is closed
  if (startTime < 0 || endTime < 0) {
    return false
  }

  // If the end time wraps to the next day
  // For example, Huntsman closes at 2am
  if (endTime <= startTime) {
    if (time >= startTime) {
      // This must be before midnight
      return time < endTime + 24
    }

    // If the time is after midnight
    return time < endTime
  }

  // If the building closes before midnight
  return time >= startTime && time < endTime
}

export function noop() {
  /* do nothing */
}
