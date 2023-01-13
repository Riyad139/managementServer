import mongoose from "mongoose";

const model = new mongoose.Schema({
  domain: {
    type: String,
    unique: true,
    require: [true, "Must have a domain name"],
  },
  name: {
    type: String,
    unique: true,
    require: [true, "Must have a  name"],
  },
  logoUrl: {
    type: String,
  },
  projects: [String],
  members: [
    [
      {
        userId: String,
        roles: String,
      },
    ],
  ],
  createdAt: {
    default: () => new Date(),
  },
  updatedAt: {
    default: () => new Date(),
  },
  createdBy: {
    type: String,
  },
});

const company = mongoose.model("company", model);

module.exports = company;
