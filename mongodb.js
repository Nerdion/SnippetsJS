const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://localhost:27017/quantFinance';

const connectDB = async () => {
  let connection = await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('DB connected');
  return connection;
};

if (mongoose.connection.readyState) {
  module.exports = mongoose.connection;
} else {
  module.exports = connectDB();
}
