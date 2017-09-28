const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);

export default mongoose;