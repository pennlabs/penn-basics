const mongoose = require('../mongoose-connect')

const { Schema } = mongoose

const ReviewSchema = new Schema({
  foodtruckID: { type: String, index: true },
  pennid: { type: Number, required: true },
  fullName: String,
  rating: Number,
  upvoteScore: Number,
  comment: String,
  timeCreated: Date,
  timeEdited: Date,
  showName: Boolean,
})

module.exports = mongoose.model('FoodTruckReview', ReviewSchema)
