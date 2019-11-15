const passport = require('passport')
const OAuthStrategy = require('passport-oauth').OAuth2Strategy
const router = require('express').Router()

require('dotenv').config()

const tokenURL =
  process.env.OAUTH_TOKEN_URL || 'https://www.provider.com/oauth/token'
const authorizationURL =
  process.env.OAUTH_USER_AUTHORIZATION_URL ||
  'https://platform-dev.pennlabs.org/accounts/authorize'
const clientID = process.env.OAUTH_CLIENT_ID || 'keyboard-cat-id'
const clientSecret = process.env.OAUTH_CLIENT_SECRET || 'keyboard-cat-secret'
// this is localhost when acting locally
const callbackURL =
  process.env.OAUTH_CALLBACK_URL ||
  'https://www.pennbasics.com/api/auth/provider/callback'

console.log(callbackURL)

module.exports = function authRouter(DB) {
  passport.use(
    'provider',
    new OAuthStrategy(
      { tokenURL, authorizationURL, clientID, clientSecret, callbackURL },
      (_accessToken, _refreshToken, profile, done) => {
        console.log('found a profile: ')
        console.log(profile)
        DB.getUser(profile.pennID)
          .then(user => {
            if (user) {
              console.log('found the user!')
              console.log(user)
              return done(null, user)
            }
            return DB.insertUser(profile)
              .then(u => {
                console.log('made the user!')
                console.log(u)
                return done(null, u)
              })
              .catch(err => {
                console.log('some kind of error inserting')
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

  router.get(
    '/provider/callback',
    passport.authenticate('provider', {
      successRedirect: '/',
      failureRedirect: '/studyspaces',
    })
  )

  return router
}
