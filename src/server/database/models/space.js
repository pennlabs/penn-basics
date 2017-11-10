const mongoose = require('mongoose');

const SpaceSchema = new mongoose.Schema({
  name: String,
  description: String,
  location: String
});

module.exports = mongoose.model('Space', SpaceSchema);