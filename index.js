const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
const PORT = process.env.PORT || 5000

const bodyParser = require('body-parser')
const webpush = require('web-push')

const spacesRouter = require('./src/server/routes/spaces')
const diningRouter = require('./src/server/routes/dining')
const newsRouter = require('./src/server/routes/news')
const laundryRouter = require('./src/server/routes/laundry')

const DB = require('./src/server/database/db')

require('dotenv').config()

nextApp.prepare().then(() => {
  const app = express()
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  const { publicKey, privateKey } = webpush.generateVAPIDKeys()
  webpush.setVapidDetails('mailto:contact@pennlabs.org', publicKey, privateKey)

  // api routing
  app.use('/api/getPublicVapidKey', (_, res) => {
    res.status(200).json({ publicKey })
  })
  app.use('/api/spaces', spacesRouter(DB))
  app.use('/api/dining', diningRouter(DB))
  app.use('/api/laundry', laundryRouter())
  app.use('/api/news', newsRouter())

  // client-side routing
  app.get('/dining/:id', (req, res) => {
    return nextApp.render(req, res, '/dining', { id: req.params.id })
  })

  app.get('/laundry/:id', (req, res) => {
    return nextApp.render(req, res, '/laundry', { id: req.params.id })
  })

  app.all('*', (req, res) => {
    return handle(req, res)
  })

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`) // eslint-disable-line no-console
  })
})
