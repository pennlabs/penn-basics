import passport from 'passport'
import { Document } from 'mongoose'
import { Router, Request, Response } from 'express'
import axios from 'axios'
import { INTERNAL_SERVER_ERROR } from 'http-status-codes'

import * as DB from '../database/db'
import { IUser, DoneCallback } from '../../types/authentication'
import { DEFAULT_OAUTH_CALLBACK_URL } from '../../frontend/constants/routes'

const { OAuth2Strategy } = require('passport-oauth')

require('dotenv').config()

const router = Router()

const providerBaseURL = process.env.OAUTH_BASE_URL
const tokenURL = `${providerBaseURL}accounts/token/`
const introspectURL = `${providerBaseURL}accounts/introspect/`
const authorizationURL = `${providerBaseURL}accounts/authorize`
const clientID = process.env.OAUTH_CLIENT_ID ?? 'keyboard-cat-id'
const clientSecret = process.env.OAUTH_CLIENT_SECRET ?? 'keyboard-cat-secret'

// This is localhost when acting locally
const callbackURL = process.env.OAUTH_CALLBACK_URL ?? DEFAULT_OAUTH_CALLBACK_URL

const authRouter = (): Router => {
  passport.serializeUser((user: IUser, done) => {
    done(null, user.pennid)
  })

  passport.deserializeUser((pennid: number, done) => {
    DB.getUser(pennid).then((user: Document | null) => {
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
      (
        accessToken: string,
        _refreshToken: string,
        _profile: any,
        done: DoneCallback
      ) => {
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
            DB.getUser(userData.pennid).then((user: Document | null) => {
              if (user) {
                return done(null, user)
              }

              return DB.insertUser(userData)
                .then((newUser: Document | null) => {
                  if (newUser) {
                    return done(null, newUser)
                  }
                  console.error("User wasn't returned") // eslint-disable-line
                  return new Error("User wasn't returned")
                })
                .catch((err: Error) => {
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

  router.get('/getUserInfo', (req, res) => {
    const { user } = req

    if (!user) {
      return res.send({
        loggedIn: false,
      })
    }

    const { pennid, email, first_name, last_name, displayName } = user as IUser

    const { session } = req
    const expires: any = session && session.cookie && session.cookie.expires

    return res.send({
      pennid,
      email,
      fullName: `${first_name} ${last_name}`,
      displayName,
      expires,
      loggedIn: true,
    })
  })

  router.get('/authenticate', (req, res, next) => {
    const { successRedirect, failureRedirect } = req.query
    const { session } = req

    if (!session) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ error: 'Missing session' })
    }

    session.auth = { successRedirect, failureRedirect }
    const authenticator = passport.authenticate('provider', {
      successRedirect: successRedirect ?? '/',
      failureRedirect: failureRedirect ?? '/',
      scope: 'read write introspection',
    })
    authenticator(req, res, next)
  })

  router.get('/provider/callback', (req: Request, res: Response, next) => {
    const { successRedirect, failureRedirect } = req.query
    const { state, session } = req

    if (!session) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ error: 'Missing session' })
    }

    const authenticator = passport.authenticate('provider', {
      scope: 'read write introspection',
      successRedirect:
        successRedirect ??
        session?.auth?.successRedirect ??
        state?.successRedirect ??
        '/',
      failureRedirect:
        failureRedirect ??
        session?.auth?.failureRedirect ??
        state?.failureRedirect ??
        '/',
    })
    return authenticator(req, res, next)
  })

  router.get(
    '/provider',
    passport.authenticate('provider', { scope: 'read write introspection' })
  )

  router.get('/logout', (req, res) => {
    const { session } = req

    if (!session) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ error: 'Missing session' })
    }

    const user = req.user as IUser

    if (!user) {
      res.redirect('/')
    }

    session.destroy(err => {
      if (err) {
        // eslint-disable-next-line
        console.error(
          `Error encounted while attempting to destroy session for user with pennid of ${user.pennid}`
        )
        // eslint-disable-next-line
        console.error(err)
        res.redirect('/')
      } else {
        res.clearCookie('connect.sid')
        res.redirect('/')
      }
    })
  })

  router.post('/updateUser', (req, res) => {
    const { pennid, displayName } = req.body
    DB.updateUser(pennid, displayName).then(user => {
      res.status(200).json(user)
    })
  })

  return router
}

export default authRouter
