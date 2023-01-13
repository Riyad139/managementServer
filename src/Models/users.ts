import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  name: String,
  email: {
    type: String,
  },
  profilePicture: String,
  descriptions: String,
});

const user = mongoose.model("users", userModel);

module.exports = user;
