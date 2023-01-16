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
      new mongoose.Schema(
        {
          userId: String,
          roles: String,
        },
        { _id: false }
      ),
    ],
  ],
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  updatedAt: {
    type: Date,
    default: () => new Date(),
  },

  createdBy: {
    type: String,
  },
});

const company = mongoose.model("company", model);

export default company;
