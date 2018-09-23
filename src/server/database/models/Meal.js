const mongoose = require('../mongoose-connect');

const { Schema } = mongoose;

const mealSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  venue: {
    type: Schema.ObjectId,
    required: true,
  },
  category: String,
  meals: [{
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    tags: [{
      type: String,
    }],
  }],
});

module.exports = mongoose.model('Meal', mealSchema);
