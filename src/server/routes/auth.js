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

module.exports = function authRouter(DB) {
  passport.serializeUser((user, done) => {
    done(null, user.pennid)
  })

  passport.deserializeUser((pennid, done) => {
    DB.getUser(pennid).then(user => {
      if (user) {
        return done(null, user)
      }
      return done(new Error('User not found'), null)
    })
  })
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
            DB.getUser(userData.pennid).then(user => {
              if (user) {
                return done(null, user)
              }
              return DB.insertUser(userData)
                .then(newUser => {
                  if (newUser) {
                    return done(null, newUser)
                  }
                  console.error("User wasn't returned") // eslint-disable-line
                  return new Error("User wasn't returned")
                })
                .catch(err => {
                  console.error('Error in creating user') // eslint-disable-line
                  console.error(err) // eslint-disable-line
                  return done(null, false)
                })
            })
          })
          .catch(err => {
            console.error('Error found in finding user') // eslint-disable-line
            console.error(err) // eslint-disable-line
          })
      }
    )
  )

  router.get('/loggedIn', (req, res) => {
    if (req.user) {
      return res.send({
        pennid: req.user.pennid,
        expires: req.session.cookie.expires,
        loggedIn: true,
      })
    }
    return res.send({
      loggedIn: false,
    })
  })

  router.get('/authenticate', (req, res, next) => {
    const { /*_successRedirect,*/ failureRedirect } = req.query
    const authenticator = passport.authenticate('provider', {
      successRedirect: '/',
      failureRedirect: failureRedirect || '/',
      scope: 'read write introspection',
    })
    authenticator(req, res, next)
  })

  router.get(
    '/provider/callback',
    passport.authenticate('provider', {
      successRedirect: '/',
      failureRedirect: '/',
    })
  )

  router.get(
    '/provider',
    passport.authenticate('provider', { scope: 'read write introspection' })
  )

  router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })

  return router
}
