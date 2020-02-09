import { Router, Request, Response, NextFunction } from 'express'
import { Document } from 'mongoose'
import * as DB from '../database/db'
import { IFoodTruckUserReview } from '../../types'

const router = Router()

export default function foodtrucksRouter(): Router {
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
          message: message ?? DEFAULT_MESSAGE,
        })
      }
      return next()
    }
  }

  router.get('/all', (_, res: Response) => {
    DB.findAllFoodtrucks().then((trucks: Document[]) => {
      res.status(200).json({
        trucks,
      })
    })
  })

  router.get('/:id', (req: Request, res: Response) => {
    const truckId = req.params.id
    DB.getFoodTruck(truckId).then((truck: Document | null) => {
      res.status(200).json({
        trucks: truck,
      })
    })
  })

  router.post(
    '/:id/review',
    isLoggedInMiddleware('User must be logged in to create or update reviews.'),
    async (req, res) => {
      const foodtruckId = req.params.id
      const { rating, comment, fullName, showName } = req.body
      const pennid: number =
        req.body.pennid || (req.user as Record<string, number>).pennid

      console.log(
        `updating review with parameters of rating=${rating}, comment=${comment}, name=${fullName}, showName=${showName}`
      )

      const newReview: IFoodTruckUserReview = {
        pennid: Number(pennid),
        fullName,
        rating: Number(rating),
        comment,
        showName,
      }

      DB.updateReview(foodtruckId, newReview).then(foodtruck => {
        res.status(200).json({
          foodtruck,
        })
      })
    }
  )

  // router.post(
  //   '/:id/review/:pennid/upvote',
  //   isLoggedInMiddleware('User must be logged in to upvote reviews.'),
  //   async (req: Request, res: Response) => {
  //     const { id: foodtruckId, pennid } = req.params.id
  //     return DB.upvoteFoodtruckReview(foodtruckId, pennid).then(() => {
  //       return res.status(200).send()
  //     })
  //   }
  // )

  // router.post(
  //   '/:id/review/:pennid/downvote',
  //   isLoggedInMiddleware('User must be logged in to downvote reviews.'),
  //   async (req, res) => {
  //     const { id: foodtruckId, pennid } = req.params.id
  //     return DB.upvoteFoodtruckReview(foodtruckId, pennid).then(() => {
  //       res.status(200).send()
  //     })
  //   }
  // )

  return router
}
