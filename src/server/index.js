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

// TODO Peter better docs--what is web push?
// Should these be env variables?
// web push relevant info
const publicVapidKey =
  'BFlvGJCEH3s7ofWwBy-h-VSzGiQmBD_Mg80qpA-nkBUeRBFJPN4-YjPu5zE3oRy1uFCG9fyfMhyVnElGhI-fQb8'
const privateVapidKey = '_jQNq46LkvTXlvPZVgnmXRFOSIluwGv2s9qXY4laBBw'
webpush.setVapidDetails(
  'mailto:cbaile@seas.upenn.edu',
  publicVapidKey,
  privateVapidKey
)

app.use('/api/spaces', spacesRouter(DB))
app.use('/api/dining', diningRouter(DB))
app.use('/api/laundry', laundryRouter())
app.use('/api/news', newsRouter())
app.use('/', frontendRouter(DB))

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`) // eslint-disable-line no-console
})
