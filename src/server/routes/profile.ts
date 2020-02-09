import { Router, Request, Response } from 'express'
import * as DB from '../database/db'

import { isLoggedInMiddleware } from '../../utils/helperFunctions'

const router = Router()

export default function profileRouter(): Router {
  router.get(
    '/foodtrucks/reviews',
    isLoggedInMiddleware('You must be logged in to view your reviews.'),
    async (req: Request, res: Response) => {
      const pennid: number =
        req.body ?? (req.user && (req.user as Record<string, number>).pennid)
      return DB.getUserReviews(pennid).then(reviews => {
        return res.status(200).json({
          reviews,
        })
      })
    }
  )

  return router
}
