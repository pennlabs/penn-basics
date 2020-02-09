import './mongoose-connect'
import moment from 'moment'
import { Document } from 'mongoose'

import Space from './models/Space'
import Foodtrucks from './models/FoodTruck'
import User from './models/User'
import {
  IFoodTruckUserReview,
  ISpace,
  IUser,
  IFoodTruckDocument,
} from '../../types'

// return all fields except for menu, priceTypes, and reviews
export const findAllFoodtrucks = () => {
  return Foodtrucks.find({}, { menu: 0, priceTypes: 0, reviews: 0 })
}

/**
 * @param {Number} foodtruckID
 */
export function getFoodTruck(foodtruckID: string) {
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

export const updateReview = async (
  foodtruckID: string,
  userReview: IFoodTruckUserReview
) => {
  const data = (await Foodtrucks.findOne(
    { foodtruckID },
    { reviews: 1, overallRating: 1 }
  )) as IFoodTruckDocument | null

  if (!data) {
    console.error(`Truck not found with id of ${foodtruckID}`)
    return data
  }

  let { overallRating } = data
  if (!overallRating) overallRating = 0.0

  const { reviews } = data // reviews in the DB
  const { pennid, rating, comment, showName, fullName } = userReview
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
      reviews[i].fullName = fullName

      break
    }
  }

  if (!exist) {
    // first, compute the new overall rating
    newOverallRating =
      ((overallRating * reviews.length + rating) * 1.0) / (reviews.length + 1)

    // next, update the reviews array
    const newReview: IFoodTruckUserReview = {
      ...userReview,
      timeCreated: moment().format(),
      timeEdited: moment().format(),
    }
    reviews.push(newReview)
  }

  // update the DB
  const foodtruck = Foodtrucks.findOneAndUpdate(
    { foodtruckID },
    { overallRating: newOverallRating, reviews },
    { new: true }
  )
  return foodtruck
}

export const updateFoodtruckReveiwScore = async (
  foodtruckID: string,
  pennid: number,
  amount: number
) => {
  return Foodtrucks.updateOne(
    { foodtruckID, 'reviews.pennid': pennid },
    // update the located sub-document (the review) by the specified amount
    { $inc: { 'reviews.$.pennid': amount } }
  )
}

export function upvoteFoodtruckReview(foodtruckID: string, pennid: number) {
  updateFoodtruckReveiwScore(foodtruckID, pennid, 1)
}

export function downvoteFoodtruckReview(foodtruckID: string, pennid: number) {
  updateFoodtruckReveiwScore(foodtruckID, pennid, -1)
}

export function findAllSpaces() {
  return Space.find()
}

/**
 * @param {boolean} open
 * @param {number} outletLevel
 * @param {number} quietLevel
 * @param {number} groupLevel
 * @param {number} hour
 */
export function filterSpaces(
  open: boolean,
  outletLevel: number,
  quietLevel: number,
  groupLevel: number,
  hour: number
) {
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
export function getSpace(spaceID: string) {
  return Space.findOne({ spaceID })
}

export function deleteReview(foodtruckName: string, pennid: number) {
  if (pennid && foodtruckName)
    return Foodtrucks.findOne({ name: foodtruckName }).then(
      (truck: Document | null) => {
        if (!truck) throw new Error('Truck not found')
        const { reviews } = truck as IFoodTruckDocument
        const newReviews = reviews.filter(
          r => r.pennid !== pennid && r.pennid !== pennid
        )
        return truck.update({ reviews: newReviews })
      }
    )
  return new Error(
    'Both pennid (of the user whose review is to be  deleted) and name (of a foodtruck) are required.'
  )
}

/**
 * @param {object} space
 */
export function insertSpace(space: ISpace) {
  return new Space(space).save()
}

export function getUser(pennid: number) {
  return User.findOne({ pennid })
}

export function insertUser(userData: IUser) {
  return new User(userData).save()
}

export const updateUser = async (pennid: number, displayName: string) => {
  const user = await User.findOneAndUpdate(
    { pennid },
    { displayName },
    { new: true }
  )
  return user
}

export const getUserReviews = async (pennid: number) => {
  const res = await Foodtrucks.find({ 'reviews.pennid': pennid }).then(
    (trucks: Document[]) => {
      console.log(
        `${trucks.length} trucks found with reviews by user with id of ${pennid}`
      )
      return (trucks as IFoodTruckDocument[]).map(truck => {
        const review = truck.reviews.filter(
          (r: IFoodTruckUserReview) => r.pennid === pennid
        )[0]
        return review
      })
    }
  )
  return res
}
