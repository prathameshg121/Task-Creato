const mongoose = require('mongoose');

const connectionString = process.env.MONGO_URI || "mongodb+srv://main:XJGywEZXQBQ7sPp@cluster0.rp6bp.mongodb.net/main";
console.log(process.env.MONGO_URI);
const connectDB = async () => {
  try {
    await mongoose.connect(
        connectionString,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;