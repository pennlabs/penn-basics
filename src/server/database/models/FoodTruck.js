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
  name: {
    type: String,
    required: true,
  },
  foodTruckID: Number,
  payments: [String],
  start: [String],
  end: [String],
  location: {
    plusCode: String,
    lat: Number,
    lng: Number,
  },
  link: String,
  tags: [String],
  menu: [
    {
      name: String,
      items: [
        {
          name: String,
          options: [String],
          prices: [Number],
        },
      ],
    },
  ],
})

module.exports = mongoose.model('FoodTruck', FoodTruckSchema)
