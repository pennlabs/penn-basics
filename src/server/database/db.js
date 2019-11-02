require('./mongoose-connect')

const Space = require('./models/Space')
const Event = require('./models/Event')
const Foodtrucks = require('./models/FoodTruck')

function findAllFoodtrucks() {
  return Foodtrucks.find()
}

const filterFoodtrucks = () => {
  
}

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
 * @param {any} spaceId
 */
function getSpace(spaceId) {
  return Space.findOne(spaceId)
}

/**
 * @param {Number} truckId
 */
function getFoodTruck(truckId) {
  return Foodtrucks.findOne({
    foodTruckID: { $in: [truckId] },
  })
}

/**
 * @param {object} space
 */
function insertSpace(space) {
  return new Space(space).save()
}

module.exports = {
  filterSpaces,
  getSpace,
  getFoodTruck,
  insertSpace,
  findAllSpaces,
  findAllFoodtrucks,
  getEvents,
}
