const mongoose = require('mongoose');

const { Schema } = mongoose;

const EventSchema = new Schema({
  start: {
    required: true,
    type: Date,
  },
  end: {
    required: true,
    type: Date,
  },
  event: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('Event', EventSchema);
