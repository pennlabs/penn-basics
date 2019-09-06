const router = require('express').Router()
const webpush = require('web-push')

module.exports = function laundryRouter() {
  router.post('/addReminder', (req, res) => {
    let { subscription, time_remaining, hallName } = req.body

    time_remaining = 5000
    // time_remaining = Number(time_remaining) * 60 * 1000

    setTimeout(async () => {
      try {
        await webpush.sendNotification(
          subscription,
          JSON.stringify({ hallName })
        )
        res.status(200).json({})
        console.log('----Web Push: notification pushed----')
      } catch (err) {
        console.error(err)
        res.status(200).json({ error: err.message })
      }
    }, time_remaining)
  })

  return router
}
