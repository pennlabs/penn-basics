const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useMongoClient: true
});

export default mongoose;