require('./mongoose-connect')
const moment = require('moment')

const Space = require('./models/Space')
const Foodtrucks = require('./models/FoodTruck')
const User = require('./models/User')

// return all fields exceept for menu, priceTypes, and reviews
const findAllFoodtrucks = () => {
  return Foodtrucks.find({}, { menu: 0, priceTypes: 0, reviews: 0 })
}

/**
 * @param {Number} truckId
 */
function getFoodTruck(truckId) {
  return Foodtrucks.findOne({
    foodtruckID: { $in: [truckId] },
  })
}

/**
 *
 * look at the reviews in the DB with the foodtruckId and
 * if there exists a review with the pennID, update the review
 * otherwise, insert a new review
 * @param {*} foodtruckId the id of the foodtruck
 * @param {*} userReview an object contains fields: pennID, rating, comment
 */

const updateReview = (foodtruckId, userReview) => {
  Foodtrucks.findOne(
    { foodtruckID: foodtruckId },
    { reviews: 1 },
    (err, data) => {
      const { reviews } = data // reviews in the DB
      const { rating, comment } = userReview
      let exist = false
      for (let i = 0; i < reviews.length; i++) { // eslint-disable-line
        if (reviews[i].pennID === userReview.pennID) {
          exist = true
          reviews[i] = {
            ...userReview,
            rating,
            comment,
            timeEdited: moment().format(),
          }
          break
        }
      }

      if (!exist) {
        reviews.push({
          ...userReview,
          timeCreated: moment().format(),
          timeEdited: moment().format(),
        })
      }

      console.log(reviews)
      Foodtrucks.findOneAndUpdate(
        { foodtruckID: foodtruckId },
        { reviews },
        { new: true },
        (err, data) => {
          console.log(data)
        }
      )
    }
  )
}

updateReview(1, {
  pennID: 19927664,
  rating: 5,
  comment: 'nice foodtruck from peter',
})

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
 * @param {object} space
 */
function insertSpace(space) {
  return new Space(space).save()
}

function getUser(pennID) {
  return User.findOne({ pennID: { $in: [pennID] } })
}

function insertUser(userData) {
  return new User(userData).save()
}

module.exports = {
  filterSpaces,
  getSpace,
  getFoodTruck,
  insertSpace,
  findAllSpaces,
  findAllFoodtrucks,
  insertUser,
  getUser,
}
