const mongoose = require('mongoose')
require('dotenv').config()

const { MONGO_URI } = process.env

if (!MONGO_URI) throw new Error('Missing MONGO_URI in env')

mongoose.connect(MONGO_URI, {
  useMongoClient: true,
})

mongoose.connection.on('connected', () => {
  console.log('Successfully connected to database') //eslint-disable-line
})

mongoose.connection.on('error', () => {
  console.log('Error connecting to database') //eslint-disable-line
})

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from database') //eslint-disable-line
})

mongoose.Promise = global.Promise

module.exports = mongoose
