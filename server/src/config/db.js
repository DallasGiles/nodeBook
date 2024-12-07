const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  if (mongoose.connection.readyState > 0) {
    console.log('MongoDB already connected.');
    return mongoose.connection;
  }

  const mongoURI = process.env.NODE_ENV === 'test'
    ? 'mongodb://localhost:27017/testDB'
    : process.env.MONGO_URI;

  try {
    const connectData = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${connectData.connection.host}`);
    return connectData;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    if (process.env.NODE_ENV !== 'test') process.exit(1);
  }
};

const closeDB = async () => {
  if (mongoose.connection.readyState > 0) {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};

module.exports = { connectDB, closeDB };