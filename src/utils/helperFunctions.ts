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
