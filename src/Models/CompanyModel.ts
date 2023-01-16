import mongoose, { Schema, Types, Model } from "mongoose";
export interface Imember {
  userId: string;
  roles: string;
}
export interface iCompany {
  domain?: string;
  name?: string;
  logoUrl?: string;
  projects?: [string];
  members?: Imember[];
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
}

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
  members: {
    type: Array,
    default: [],
  },

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

const company = mongoose.model<iCompany>("company", model);

export default company;
