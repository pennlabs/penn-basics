import { Router, Request, Response, NextFunction } from 'express'
import * as DB from '../database/db'

const router = Router()

export default function profileRouter(): Router {
  /**
   * Middleware builder to check if a user is logged in. The resultant middleware prints out a custom message
   * Proper usage is router.get('/your/route', isLoggedInMiddleware, (req, res)=>{/*your handler code/})
   * @param {String} message - The message that you want to display if the user is not logged in.
   */
  const isLoggedInMiddleware = (message?: string) => {
    const DEFAULT_MESSAGE = 'You must be logged in to perform this action'
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.user) {
        return res.status(401).json({
          message: message || DEFAULT_MESSAGE,
        })
      }
      return next()
    }
  }

  router.get(
    '/foodtrucks/reviews',
    isLoggedInMiddleware('You must be logged in to view your reviews.'),
    async (req, res) => {
      const pennid: number =
        req.body || (req.user && (req.user as Record<string, number>).pennid)
      return DB.getUserReviews(pennid).then(reviews => {
        return res.status(200).json({
          reviews,
        })
      })
    }
  )

  return router
}
