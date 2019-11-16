const passport = require('passport')
const { OAuth2Strategy } = require('passport-oauth')
const router = require('express').Router()
const axios = require('axios').default
require('dotenv').config()

const providerBaseURL =
  process.env.OAUTH_BASE_URL || 'https://www.provider.com/'
const tokenURL = `${providerBaseURL}accounts/token/`
const introspectURL = `${providerBaseURL}accounts/introspect/`
const authorizationURL = `${providerBaseURL}accounts/authorize`
const clientID = process.env.OAUTH_CLIENT_ID || 'keyboard-cat-id'
const clientSecret = process.env.OAUTH_CLIENT_SECRET || 'keyboard-cat-secret'
// this is localhost when acting locally
const callbackURL =
  process.env.OAUTH_CALLBACK_URL ||
  'https://www.pennbasics.com/api/auth/provider/callback'

console.log(tokenURL)
console.log(callbackURL)

module.exports = function authRouter(DB) {
  passport.use(
    'provider',
    new OAuth2Strategy(
      { tokenURL, authorizationURL, clientID, clientSecret, callbackURL },
      (accessToken, refreshToken, profile, done) => {
        const data = {
          token: accessToken,
        }

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }

        axios
          .get(introspectURL, { params: data, ...config })
          .then(res => {
            const userData = res.data.user
            console.log(userData)
            DB.getUser(userData.pennid).then(user => {
              if (user) {
                console.log('found the user')
                console.log(user)
                return done(null, user)
              }
              DB.insertUser(userData)
                .then(newUser => {
                  if (newUser) {
                    console.log('new user created')
                    console.log(newUser)
                    return done(null, newUser)
                  }
                  throw new Error("User wasn't returned")
                })
                .catch(err => {
                  console.error('Error in creating user')
                  console.error(err)
                  return done(null, null)
                })
            })
          })
          .catch(err => {
            console.error('Error found in finding user')
            console.error(err)
          })
      }
    )
  )
  router.get(
    '/provider',
    passport.authenticate('provider', { scope: 'read write introspection' })
  )

  router.get(
    '/provider/callback',
    passport.authenticate('provider', {
      successRedirect: '/',
      failureRedirect: '/studyspaces',
      scope: 'read write introspection',
    })
  )

  return router
}
