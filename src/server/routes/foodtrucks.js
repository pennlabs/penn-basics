const router = require('express').Router()

module.exports = function foodtrucksRouter(DB) {
  router.get('/all', (req, res) => {
    DB.findAllFoodtrucks().then(trucks => {
      res.status(200).json({
        trucks,
      })
    })
  })

  return router
}
