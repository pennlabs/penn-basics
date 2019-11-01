const router = require('express').Router()

module.exports = function foodtrucksRouter(DB) {
  router.get('/all', (req, res) => {
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

  return router
}
