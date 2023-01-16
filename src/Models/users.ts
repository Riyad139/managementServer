import mongoose, { Model, Document } from "mongoose";

export interface Iuser {
  name?: string;
  email?: string;
  profilePicture?: string;
  descriptions?: string;
}
export interface IuserDoc extends Iuser, Document {}

const userModel = new mongoose.Schema({
  name: String,
  email: {
    type: String,
  },
  profilePicture: String,
  descriptions: String,
});

const user = mongoose.model("users", userModel);

export default user;
