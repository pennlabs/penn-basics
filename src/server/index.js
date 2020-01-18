const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const PORT = process.env.PORT || 5000

const bodyParser = require('body-parser')
const webpush = require('web-push')
const passport = require('passport')
const session = require('express-session')
const moment = require('moment')

const spacesRouter = require('./routes/spaces')
const diningRouter = require('./routes/dining')
const newsRouter = require('./routes/news')
const laundryRouter = require('./routes/laundry')
const foodtrucksRouter = require('./routes/foodtrucks')
const authRouter = require('./routes/auth')

const DB = require('./database/db')

require('dotenv').config()

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
  app.use('/api/spaces', spacesRouter(DB))
  app.use('/api/foodtrucks', foodtrucksRouter(DB))
  app.use('/api/dining', diningRouter(DB))
  app.use('/api/laundry', laundryRouter())
  app.use('/api/news', newsRouter())
  app.use('/api/auth', authRouter(DB))

  // client-side routing
  app.get('/dining/:id', (req, res) => {
    return nextApp.render(req, res, '/dining', { id: req.params.id })
  })

  app.get('/laundry/:id', (req, res) => {
    return nextApp.render(req, res, '/laundry', { id: req.params.id })
  })

  app.get('/studyspaces/:id', (req, res) => {
    return nextApp.render(req, res, '/studyspaces', { id: req.params.id })
  })

  app.get('/foodtrucks/:id', (req, res) => {
    return nextApp.render(req, res, '/foodtrucks', { id: req.params.id })
  })

  app.all('*', (req, res) => {
    return handle(req, res)
  })

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`) // eslint-disable-line no-console
  })
})
