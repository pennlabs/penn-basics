const router = require('express').Router()
const axios = require('axios')

module.exports = function diningRouter() {
  router.post('/venue_hours', (req, res) => {
    const { venueId } = req.body
    axios
      .get(`https://api.pennlabs.org/dining/hours/${venueId}`)
      .then(response => {
        res.json({
          venueHours: response.data.cafes[venueId].days,
        })
      })
  })

  return router
}
