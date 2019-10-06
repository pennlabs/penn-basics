const router = require('express').Router()
const HttpStatus = require('http-status-codes')
const webpush = require('web-push')
const axios = require('axios')

const BASE = 'http://api.pennlabs.org'

const isValidNumericId = id => {
  if (id === null || id === undefined) return false
  const num = Number(id)
  if (Number.isNaN(num)) return false
  if (num < 0) return false
  return true
}

module.exports = function laundryRouter() {
  router.post('/reminder/add', async (req, res) => {
    // TODO check for bad request (@peter)

    // a unique reminderID is used to distinguish between multiple reminders
    // that have the same hallID and machineID
    const { subscription, machineID, hallID, hallName, reminderID } = req.body

    if (!isValidNumericId(hallID)) {
      res.status(HttpStatus.BAD_REQUEST).send('Missing hallID')
      return
    }

    // fetch the time remaining using Labs API
    const axiosResponse = await axios.get(`${BASE}/laundry/hall/${hallID}`)
    const { data } = axiosResponse
    const machine = data.machines.details.filter(
      detail => detail.id === machineID
    )
    const { time_remaining: timeRemaining } = machine[0]
    let timeRemainingFormatted =
      timeRemaining !== 0 ? Number(timeRemaining) * 60 * 1000 : 20000
    timeRemainingFormatted = 2000

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
