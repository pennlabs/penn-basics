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
 * if there exists a review with the input pennid, update the review
 * otherwise, insert a new review
 * 2. update overallRating of the foodtruck
 * @param {String} foodtruckID the id of the foodtruck
 * @param {Object} userReview an object that contains: pennid, rating, comment, showName
 */

const updateReview = async (foodtruckID, userReview) => {
  const data = await Foodtrucks.findOne(
    { foodtruckID },
    { reviews: 1, overallRating: 1 }
  )

  if (!data) {
    console.error(`Truck not found with id of ${foodtruckID}`)
    return
  }

  let { overallRating } = data
  if (!overallRating) overallRating = 0.0

  const { reviews } = data // reviews in the DB
  const { pennid, rating, comment, showName } = userReview
  let exist = false
  let newOverallRating

  for (let i = 0; i < reviews.length; i += 1) {
    // eslint-disable-line
    if (reviews[i].pennid === pennid) {
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
      reviews[i].showName = showName
      reviews[i].timeEdited = moment().format()

      break
    }
  }

  if (!exist) {
    // first, compute the new overall rating
    newOverallRating =
      ((overallRating * reviews.length + rating) * 1.0) / (reviews.length + 1)

    // next, update the reviews array
    reviews.push({
      ...userReview,
      timeCreated: moment().format(),
      timeEdited: moment().format(),
    })
  }

  // update the DB
  const foodtruck = Foodtrucks.findOneAndUpdate(
    { foodtruckID },
    { overallRating: newOverallRating, reviews },
    { new: true }
  )
  return foodtruck
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
 * @param {String} spaceID
 */
function getSpace(spaceID) {
  return Space.findOne({ spaceID })
}

function deleteReview(foodtruckName, pennid) {
  if (pennid && foodtruckName)
    return Foodtrucks.findOne({ name: foodtruckName }).then(truck => {
      if (!truck) throw new Error('Truck not found')
      const { reviews } = truck
      const newReviews = reviews.filter(
        r => r.pennid !== pennid && r.pennID !== pennid
      )
      return truck.update({ reviews: newReviews })
    })
  return new Error(
    'Both pennid (of the user whose review is to be  deleted) and name (of a foodtruck) are required.'
  )
}

/**
 * @param {object} space
 */
function insertSpace(space) {
  return new Space(space).save()
}

function getUser(pennid) {
  return User.findOne({ pennid })
}

function insertUser(userData) {
  return new User(userData).save()
}

const updateUser = async (pennid, displayName) => {
  const user = await User.findOneAndUpdate(
    { pennid },
    { displayName },
    { new: true }
  )
  return user
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
  updateUser,
  updateReview,
  deleteReview,
}
