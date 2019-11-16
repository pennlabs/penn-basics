const mongoose = require('../mongoose-connect')

const { Schema } = mongoose

const UserSchema = new Schema({
  pennid: { type: Number, required: true },
  email: String,
  first_name: String,
  last_name: String,
  affiliation: [String],
})

module.exports = mongoose.model('User', UserSchema)
