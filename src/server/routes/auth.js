const passport = require('passport')
const OAuthStrategy = require('passport-oauth').OAuth2Strategy
const router = require('express').Router()

require('dotenv').config()

const tokenURL =
  process.env.OAUTH_TOKEN_URL || 'https://www.provider.com/oauth/token'
const authorizationURL =
  process.env.OAUTH_USER_AUTHORIZATION_URL ||
  'https://platform.pennlabs.org/accounts/authorize'
const clientID = process.env.OAUTH_CLIENT_ID || 'keyboard-cat-id'
const clientSecret = process.env.OAUTH_CLIENT_SECRET || 'keyboard-cat-secret'
// this is localhost when acting locally
const callbackURL =
  process.env.callbackURL ||
  'https://www.pennbasics.com/api/auth/provider/callback'

module.exports = function authRouter(DB) {
  passport.use(
    'provider',
    new OAuthStrategy(
      { tokenURL, authorizationURL, clientID, clientSecret, callbackURL },
      (accessToken, refreshToken, profile, done) => {
        DB.getUser(profile.pennID)
          .then(user => {
            if (user) {
              return done(null, user)
            }
            return DB.insertUser(profile)
              .then(u => done(null, u))
              .catch(err => {
                throw err
              })
          })
          .catch(err => {
            console.error(`Error when authorizing${err}`) // eslint-disable-line
            done(err, null)
          })
      }
    )
  )
  router.get('/provider', passport.authenticate('provider'))

  router.post('/provider/callback', (req, res, next, ...handlers) => {
    const successRedirect = req.param(
      'successRedirect',
      '/' // default
    )
    const failureRedirect = req.param(
      'failureRedirect',
      '/' // default
    )
    return passport.authenticate('provider', {
      successRedirect,
      failureRedirect,
    })(req, res, next, handlers)
  })

  return router
}

passport.authenticate('provider')
