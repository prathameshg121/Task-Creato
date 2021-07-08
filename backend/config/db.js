const mongoose = require("mongoose");

const connectionString =
  process.env.MONGO_URI ||
  "mongodb+srv://chahat123:chahat123@securenotescluster.cryhn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
console.log("Mongo Uri" + process.env.MONGO_URI);
const connectDB = async () => {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
