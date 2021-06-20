const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    password: String,
    email: String,
});

const User = mongoose.model("user", userSchema);

module.exports = User;