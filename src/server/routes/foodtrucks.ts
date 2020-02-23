import { Router, Request, Response } from 'express'
import { Document } from 'mongoose'
import * as DB from '../database/db'
import { IFoodTruckUserReview } from '../../types/foodtrucks'
import { isLoggedInMiddleware } from '../../utils/helperFunctions'

const router = Router()

const foodtrucksRouter = (): Router => {
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
      const { rating, comment, fullName, showName, votes } = req.body
      const pennid: number =
        req.body.pennid ?? (req.user as Record<string, number>).pennid

      const newReview: IFoodTruckUserReview = {
        pennid: Number(pennid),
        fullName,
        rating: Number(rating),
        comment,
        showName,
        votes,
      }

      const foodtruck = await DB.updateReview(foodtruckId, newReview)
      res.status(200).json({
        foodtruck,
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

export default foodtrucksRouter
