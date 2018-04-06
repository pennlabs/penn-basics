const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useMongoClient: true
});

mongoose.connection.on('connected', () => {
  console.log('Successfully connected to database')
})

mongoose.Promise = global.Promise;

export default mongoose;