import express from 'express'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const PORT = process.env.PORT || 5000

import bodyParser from 'body-parser'
import webpush from 'web-push'
import passport from 'passport'
import session from 'express-session'
import moment from 'moment'

import spacesRouter from './routes/spaces'
import diningRouter from './routes/dining'
import newsRouter from './routes/news'
import laundryRouter from './routes/laundry'
import foodtrucksRouter from './routes/foodtrucks'
import authRouter from './routes/auth'
import profileRouter from './routes/profile'

require('dotenv').config()

declare global {
  namespace Express {
    interface Request {
      state?: {
        successRedirect?: boolean
        failureRedirect?: boolean
      }
    }
  }
}

nextApp.prepare().then(() => {
  const app = express()
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  app.use(
    session({
      cookie: {
        // expire in 24 hours (expressed in ms)
        maxAge: moment.duration(24, 'hours').asMilliseconds(),
        /*
        // enable secure in dev
        secure: process.env.prod ? true : false
        */
      },
      saveUninitialized: false,
      resave: true,
      secret: process.env.SESSION_SECRET || 'keyboard cat',
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  const { publicKey, privateKey } = webpush.generateVAPIDKeys()
  webpush.setVapidDetails('mailto:contact@pennlabs.org', publicKey, privateKey)

  // api routing
  app.use('/api/getPublicVapidKey', (_, res) => {
    res.status(200).json({ publicKey })
  })
  app.use('/api/spaces', spacesRouter())
  app.use('/api/foodtrucks', foodtrucksRouter())
  app.use('/api/dining', diningRouter())
  app.use('/api/laundry', laundryRouter())
  app.use('/api/profile', profileRouter())
  app.use('/api/news', newsRouter())
  app.use('/api/auth', authRouter())

  // client-side routing
  app.get('/dining/:id', (req, res) => nextApp.render(req, res, '/dining', { id: req.params.id }))

  app.get('/laundry/:id', (req, res) => nextApp.render(req, res, '/laundry', { id: req.params.id }))

  app.get('/studyspaces/:id', (req, res) => nextApp.render(req, res, '/studyspaces', { id: req.params.id }))

  app.get('/foodtrucks/:id', (req, res) => nextApp.render(req, res, '/foodtrucks', { id: req.params.id }))

  app.all('*', (req, res) => handle(req, res))

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`) // eslint-disable-line no-console
  })
})
