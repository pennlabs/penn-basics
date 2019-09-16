const router = require('express').Router()
const webpush = require('web-push')
const axios = require('axios')

module.exports = function laundryRouter() {
  router.post('/reminder/add', async (req, res) => {
    // a unique reminderID is used to distinguish between multiple reminders
    // that have the same hallID and machineID
    const { subscription, machineID, hallID, hallName, reminderID } = req.body

    // fetch the time remaining using Labs API
    const BASE = 'http://api.pennlabs.org'
    const axiosResponse = await axios.get(`${BASE}/laundry/hall/${hallID}`)
    const { data } = axiosResponse
    const machine = data.machines.details.filter(
      detail => detail.id === machineID
    )
    const { time_remaining: timeRemaining } = machine[0]
    const timeRemainingFormatted =
      timeRemaining !== 0 ? Number(timeRemaining) * 60 * 1000 : 20000
    // time_remaining = 10000

    // set a timeout that equals to the timeRemaining
    setTimeout(async () => {
      try {
        // use webpush to instruct the service worker to push notification
        await webpush.sendNotification(
          subscription,
          JSON.stringify({ machineID, hallID, hallName, reminderID }) // payload received by the service worker
        )
        // respond to frontend until the instruction is received by the service worker
        res.status(200).json({})
      } catch (err) {
        res.status(200).json({ error: err.message })
      }
    }, timeRemainingFormatted)
  })

  return router
}
