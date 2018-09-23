const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useMongoClient: true,
});

mongoose.connection.on('connected', () => {
  console.log('Successfully connected to database'); //eslint-disable-line
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
