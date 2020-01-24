const mongoose = require('../mongoose-connect')

const { Schema } = mongoose

/**
 *
 * menu is type object
 * menu contains submenu
 * submenu corresponds to a price structure (like listing by size)
 * items in the submenu are structured as a list of objects
 * item object has name and price
 * price may be a list or a single value, corresponding in order
 */

const FoodTruckSchema = new Schema({
  foodtruckID: { type: String, index: true },
  name: {
    type: String,
    required: true,
  },
  payments: [String],
  start: [String],
  end: [String],
  location: {
    plusCode: String,
    lat: Number,
    lng: Number,
  },
  tags: [String],
  link: String,
  languageTypes: [String],
  priceTypes: [
    {
      name: String,
      options: [String],
    },
  ],
  overallRating: Number,
  image: String,
  description: String,
  menu: [
    {
      name: String,
      items: [
        {
          name: String,
          prices: [Number],
        },
      ],
    },
  ],
  reviews: [
    {
      pennid: Number,
      fullName: String,
      rating: Number,
      comment: String,
      timeCreated: Date,
      timeEdited: Date,
      showName: Boolean,
    },
  ],
  timeUpdated: Date,
})

module.exports = mongoose.model('FoodTruck', FoodTruckSchema)
