const spaces = require('../resources/spaces.json')
const Space = require('./models/Space')

function deleteSpacesInDB() {
  return Space.find().remove()
}

function loadSpacesIntoDB() {
  return Promise.all(spaces.map(space => (
    new Space(space)
      .save()
      .then(console.log) // eslint-disable-line
  )))
}

const { MONGO_URI } = process.env

if (!MONGO_URI) {
  console.log('Missing MONGO_URI') // eslint-disable-line
  process.exit(1)
}

deleteSpacesInDB()
  .then(loadSpacesIntoDB)
  .then(() => process.exit(0))
