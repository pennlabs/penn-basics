const router = require('express').Router()

module.exports = function foodtrucksRouter(DB) {
  router.get('/all', (req, res) => {
    DB.findAllSpaces().then(spaces => {
      res.status(200).json({
        spaces,
      })
    })
  })

  return router
}
