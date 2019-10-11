const router = require('express').Router()
const HttpStatus = require('http-status-codes')
const webpush = require('web-push')

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
    const {
      subscription,
      machineID,
      hallID,
      machineType,
      reminderID,
    } = req.body

    let { timeRemaining } = req.body
    timeRemaining =
      timeRemaining !== 0 ? Number(timeRemaining) * 60 * 1000 : 20000
    // timeRemaining = 2000

    if (!isValidNumericId(hallID)) {
      res.status(HttpStatus.BAD_REQUEST).send('Missing hallID')
      return
    }

    console.log("---Notification entered to backend---")

    // set a timeout that equals to the timeRemaining
    setTimeout(async () => {
      try {
        // use webpush to instruct the service worker to push notification
        await webpush.sendNotification(
          subscription,
          JSON.stringify({ machineID, hallID, reminderID, machineType }) // payload received by the service worker
        )
        // respond to frontend until the instruction is received by the service worker
        console.log("---Notification sent from backend---")
        res.status(200).json({})
      } catch (err) {
        res.status(200).json({ error: err.message })
      }
    }, timeRemaining)
  })

  return router
}
