const mongoose = require('../mongoose-connect')

const { Schema } = mongoose

const UserSchema = new Schema({
  pennID: Number,
  pennKey: String,
})

module.exports = mongoose.model('User', UserSchema)
