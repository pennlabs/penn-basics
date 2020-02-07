const router = require('express').Router()

module.exports = function foodtrucksRouter(DB) {
  /**
   * Middleware builder to check if a user is logged in. The resultant middleware prints out a custom message
   * Proper usage is router.get('/your/route', isLoggedInMiddleware, (req, res)=>{/*your handler code/})
   * @param {String} message - The message that you want to display if the user is not logged in.
   */
  const isLoggedInMiddleware = message => {
    const DEFAULT_MESSAGE = 'You must be logged in to perform this action'
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({
          message: message || DEFAULT_MESSAGE,
        })
      }
      return next()
    }
  }

  router.get('/all', (_, res) => {
    DB.findAllFoodtrucks().then(trucks => {
      res.status(200).json({
        trucks,
      })
    })
  })

  router.get('/:id', (req, res) => {
    const truckId = req.params.id
    DB.getFoodTruck(truckId).then(truck => {
      res.status(200).json({
        trucks: truck,
      })
    })
  })

  router.post(
    '/:id/review',
    isLoggedInMiddleware('User must be logged in to create or update reviews.'),
    async (req, res) => {
      console.log(req.body)
      const foodtruckId = req.params.id
      let { pennid } = req.body
      const { rating, comment, fullName, showName } = req.body
      pennid = pennid || req.user.pennid

      console.log(
        `updating review with parameters of rating=${rating}, comment=${comment}, name=${fullName}, showName=${showName}`
      )
      DB.updateReview(foodtruckId, {
        pennid: Number(pennid),
        fullName,
        rating: Number(rating),
        comment,
        showName,
      }).then(foodtruck => {
        res.status(200).json({
          foodtruck,
        })
      })
    }
  )

  router.post(
    '/:id/review/:pennid/upvote',
    isLoggedInMiddleware('User must be logged in to upvote reviews.'),
    async (req, res) => {
      const { id: foodtruckId, pennid } = req.params.id
      return DB.upvoteFoodtruckReview(foodtruckId, pennid).then(() => {
        return res.status(200).send()
      })
    }
  )

  router.post(
    '/:id/review/:pennid/downvote',
    isLoggedInMiddleware('User must be logged in to downvote reviews.'),
    async (req, res) => {
      const { id: foodtruckId, pennid } = req.params.id
      return DB.upvoteFoodtruckReview(foodtruckId, pennid).then(() => {
        res.status(200).send()
      })
    }
  )

  return router
}
