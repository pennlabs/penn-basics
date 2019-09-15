const router = require('express').Router()
const webpush = require('web-push')
const axios = require('axios')

module.exports = function laundryRouter() {
  router.post('/addReminder', async (req, res) => {
    const { subscription, machineID, hallID, hallName, reminderID } = req.body

    const BASE = 'http://api.pennlabs.org'
    const axiosResponse = await axios.get(`${BASE}/laundry/hall/${hallID}`)
    const { data } = axiosResponse
    const machine = data.machines.details.filter(
      detail => detail.id === machineID
    )
    let { time_remaining: timeRemaining } = machine[0]

    timeRemaining =
      timeRemaining !== 0 ? Number(timeRemaining) * 60 * 1000 : 20000
    // timeRemaining = 10000

    setTimeout(async () => {
      try {
        await webpush.sendNotification(
          subscription,
          JSON.stringify({ machineID, hallID, hallName, reminderID })
        )
        res.status(200).json({})
      } catch (err) {
        res.status(200).json({ error: err.message })
      }
    }, timeRemaining)
  })

  return router
}
