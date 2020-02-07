const router = require('express').Router()

module.exports = function profileRouter(DB) {
  /**
   * Middleware builder to check if a user is logged in. The resultant middleware prints out a custom message
   * Proper usage is router.get('/your/route', isLoggedInMiddleware, (req, res)=>{/*your handler code/})
   * @param {String} message - The message that you want to display if the user is not logged in.
   */
  const isLoggedInMiddleware = message => {
    const DEFAULT_MESSAGE = 'You must be logged in to perform this action'
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({
          message: message || DEFAULT_MESSAGE,
        })
      }
      return next()
    }
  }

  router.get(
    '/foodtrucks/reviews',
    isLoggedInMiddleware('You must be logged in to view your reviews.'),
    async (req, res) => {
      let { pennid } = req.body
      pennid = pennid || req.user.pennid
      return DB.getUserReviews(pennid).then(reviews => {
        return res.status(200).json({
          reviews,
        })
      })
    }
  )

  return router
}
