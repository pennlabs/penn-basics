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
    const foodtruckId = Number(req.params.id)
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

  return router
}
