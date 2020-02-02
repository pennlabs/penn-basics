const router = require('express').Router()

module.exports = function profileRouter(DB) {
  router.get('/', (_, res) => {
    res.send("we're all good")
  })

  router.get('/foodtrucks/reviews', async (req, res) => {
    if (!req.user) {
      return res.status(401).json({
        message: 'You must be logged in ',
      })
    }
    let { pennid } = req.body
    pennid = pennid || req.user.pennid
    return DB.getUserReviews(pennid).then(reviews => {
      return res.status(200).json({
        reviews,
      })
    })
  })

  return router
}
