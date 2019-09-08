require('./mongoose-connect')

// Dining Imports
const _ = require('lodash')
const Space = require('./models/Space')
const Event = require('./models/Event')

// SPACES DATABASE FUNCTIONS

// params: none
function findAllSpaces() {
  return Space.find()
}

// params: filter =
// (open: Boolean, outlets: Integer, noise: Integer, groups: Integer, hour: integer)

function filterSpaces(open, outletLevel, quietLevel, groupLevel, hour) {
  if (open) {
    return Space.find({
      start: { $lte: hour },
      end: { $gt: hour },
      outlets: { $gte: outletLevel },
      quiet: { $gte: quietLevel },
      groups: { $gte: groupLevel },
    })
  }

  return Space.find({
    outlets: { $gte: outletLevel },
    quiet: { $gte: quietLevel },
    groups: { $gte: groupLevel },
  })
}

// params: spaceId
function getSpace(space) {
  return Space.findOne(space)
}

// params: new space
function insertSpace(space) {
  return new Space(space).save()
}

// Events Functions

function getEvents(date) {
  return Event.find({
    start: {
      $lte: date,
    },
    end: {
      $gte: date,
    },
  })
}

module.exports = {
  // Spaces functions
  filterSpaces,
  getSpace,
  insertSpace,
  findAllSpaces,

  // Event Functions
  getEvents,
}
