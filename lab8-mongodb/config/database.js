const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI || 'MONGODB_URI=mongodb+srv://bogdan:bogdan123123@cluster0.a9kagpx.mongodb.net/?appName=Cluster0'
    );
    console.log(`MongoDB підключено: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Помилка підключення: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;