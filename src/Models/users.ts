import mongoose, { Document } from "mongoose";

export interface IUser {
  name?: string;
  SecondName?: string;
  FirstName?: string;
  Gender?: string;
  Jobttitle?: string;
  Phone?: string;
  Country?: string;
  WorkedAt?: string;
  email?: string;
  preferences: string;
  password?: string;
  profilePicture?: string;
  descriptions?: string;
}

export interface IUserDoc extends IUser, Document {}

const userModel = new mongoose.Schema({
  name: String,
  FirstName: String,
  SecondName: String,
  Gender: String,
  Jobtitle: String,
  Phone: String,
  Country: String,
  WorkedAt: String,
  email: {
    type: String,
  },
  preferences: String,
  password: String,
  profilePicture: String,
  descriptions: String,
});

const user = mongoose.model<IUserDoc>("users", userModel);

export default user;
