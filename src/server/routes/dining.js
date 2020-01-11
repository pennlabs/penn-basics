const router = require('express').Router()
const axios = require('axios')

module.exports = function diningRouter() {
  router.get('/venue_hours/:venueId', (req, res) => {
    const {
      params: { venueId },
    } = req
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
