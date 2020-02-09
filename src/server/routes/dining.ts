import { Router } from 'express'
import axios from 'axios'

const router = Router()

export default function diningRouter(): Router {
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
