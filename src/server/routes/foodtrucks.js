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
    const truckId = Number(req.params.id)
    DB.getFoodTruck(truckId).then(truck => {
      res.status(200).json({
        trucks: truck,
      })
    })
  })

  // updateReview(1, { pennID: 19927662, rating: 1, comment: '2this is a nice foodtruck' })

  router.post('/:id/review', async (req, res) => {
    const foodtruckId = Number(req.params.id)
    let { pennid, rating, comment } = req.body
    pennid = pennid || req.user.pennid
    DB.updateReview(foodtruckId, {
      pennid: Number(pennid),
      rating: Number(rating),
      comment,
    }).then(foodtruck => {
      res.status(200).json({
        foodtruck,
      })
    })
  })

  return router
}
