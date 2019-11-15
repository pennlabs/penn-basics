const mongoose = require('../mongoose-connect')

const { Schema } = mongoose

const UserSchema = new Schema({
  pennID: { type: Number, required: true },
  pennKey: String,
  name: String,
})

module.exports = mongoose.model('User', UserSchema)
