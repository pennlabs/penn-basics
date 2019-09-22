const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const webpush = require('web-push')

const frontendRouter = require('./routes/frontend')
const spacesRouter = require('./routes/spaces')
const diningRouter = require('./routes/dining')
const newsRouter = require('./routes/news')
const laundryRouter = require('./routes/laundry')

const DB = require('./database/db')

const app = express()
const PORT = process.env.PORT || 5000
require('dotenv').config()

global.basedir = path.join(__dirname, '..', '..')
app.use(express.static(path.join(__dirname, '..', '..', 'public')))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const { publicKey, privateKey } = webpush.generateVAPIDKeys()
webpush.setVapidDetails('mailto:contact@pennlabs.org', publicKey, privateKey)

app.use('/api/getPublicVapidKey', (_, res) => {
  res.status(200).json({ publicKey })
})
app.use('/api/spaces', spacesRouter(DB))
app.use('/api/dining', diningRouter(DB))
app.use('/api/laundry', laundryRouter())
app.use('/api/news', newsRouter())
app.use('/', frontendRouter(DB))

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`) // eslint-disable-line no-console
})
