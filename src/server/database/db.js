require('./mongoose-connect')

const Space = require('./models/Space')
const Event = require('./models/Event')

function findAllSpaces() {
  return Space.find()
}

/**
 * @param {boolean} open
 * @param {number} outletLevel
 * @param {number} quietLevel
 * @param {number} groupLevel
 * @param {number} hour
 */
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

/**
 * @param {String} spaceId
 */
function getSpace(spaceId) {
  return Space.findOne({ spaceId })
}

/**
 * @param {object} space
 */
function insertSpace(space) {
  return new Space(space).save()
}

/**
 * @param {Date} date
 */
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
  filterSpaces,
  getSpace,
  insertSpace,
  findAllSpaces,
  getEvents,
}
