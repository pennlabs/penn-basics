const router = require('express').Router()

module.exports = function foodtrucksRouter(DB) {
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

  router.post('/:id/review', async (req, res) => {
    if (!req.user) {
      return res.status(401).send('User must be logged in to update reviews.')
    }
    const foodtruckId = req.params.id
    let { pennid } = req.body
    const { rating, comment, fullName } = req.body
    pennid = pennid || req.user.pennid
    DB.updateReview(foodtruckId, {
      pennid: Number(pennid),
      fullName,
      rating: Number(rating),
      comment,
    }).then(foodtruck => {
      res.status(200).json({
        foodtruck,
      })
    })
  })

  router.post('/:id/review/:pennid/upvote', async (req, res) => {
    if (!req.user) {
      return res.status(401).send('User must be logged in to upvote reviews.')
    }
    const { id: foodtruckId, pennid } = req.params.id
    DB.upvoteFoodtruckReview(foodtruckId, pennid).then(() => {
      res.status(200).send()
    })
  })

  router.post('/:id/review/:pennid/downvote', async (req, res) => {
    if (!req.user) {
      return res.status(401).send('User must be logged in to downvote reviews.')
    }
    const { id: foodtruckId, pennid } = req.params.id
    DB.upvoteFoodtruckReview(foodtruckId, pennid).then(() => {
      res.status(200).send()
    })
  })

  return router
}
