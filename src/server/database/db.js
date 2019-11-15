require('./mongoose-connect')
const moment = require('moment')

const Space = require('./models/Space')
const Foodtrucks = require('./models/FoodTruck')
const User = require('./models/User')

// return all fields except for menu, priceTypes, and reviews
const findAllFoodtrucks = () => {
  return Foodtrucks.find({}, { menu: 0, priceTypes: 0, reviews: 0 })
}

/**
 * @param {Number} foodtruckID
 */
function getFoodTruck(foodtruckID) {
  return Foodtrucks.findOne({ foodtruckID })
}

/**
 *
 * 1. look at the reviews in the DB with the foodtruckId and
 * if there exists a review with the input pennID, update the review
 * otherwise, insert a new review
 * 2. update overallRating of the foodtruck
 * @param {*} foodtruckID the id of the foodtruck
 * @param {*} userReview an object contains fields: pennID, rating, comment
 */

const updateReview = (foodtruckID, userReview) => {
  Foodtrucks.findOne(
    { foodtruckID },
    { reviews: 1, overallRating: 1 },
    async (err, data) => {
      let { overallRating } = data
      if (!overallRating) overallRating = 0.0

      const { reviews } = data // reviews in the DB
      const { pennID, rating, comment } = userReview
      let exist = false
      let newOverallRating

      for (let i = 0; i < reviews.length; i++) { // eslint-disable-line
        if (reviews[i].pennID === pennID) {
          exist = true
          // first, compute the new overall rating
          // becareful of no rating initially
          let ratingSum = overallRating * reviews.length
          ratingSum -= reviews[i].rating
          ratingSum += rating
          newOverallRating = (ratingSum * 1.0) / reviews.length

          // next, update the reviews array
          reviews[i].rating = rating
          reviews[i].comment = comment
          reviews[i].timeEdited = moment().format()

          break
        }
      }

      if (!exist) {
        // first, compute the new overall rating
        newOverallRating =
          ((overallRating * reviews.length + rating) * 1.0) /
          (reviews.length + 1)

        // next, update the reviews array
        reviews.push({
          ...userReview,
          timeCreated: moment().format(),
          timeEdited: moment().format(),
        })
      }

      // update the DB
      const foodtruck = await Foodtrucks.findOneAndUpdate(
        { foodtruckID },
        { overallRating: newOverallRating, reviews },
        { new: true }
      )

      // return the updated foodtruck
      return foodtruck
    }
  )
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
  updateReview,
}
