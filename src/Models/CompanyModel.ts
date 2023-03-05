import mongoose, { Document } from "mongoose";
export interface Imember {
  userId?: string;
  roles?: string;
}
export interface Icompany {
  domain?: string;
  name?: string;
  logoUrl?: string;
  projects?: [string];
  members?: Imember[];
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
}

export interface IcompayDoc extends Icompany, Document {}

const model = new mongoose.Schema(
  {
    domain: {
      type: String,

      require: [true, "Must have a domain name"],
    },
    name: {
      type: String,

      require: [true, "Must have a  name"],
    },
    logoUrl: {
      type: String,
    },
    projects: [String],
    members: [
      new mongoose.Schema(
        {
          userId: String,
          role: String,
        },
        { _id: false }
      ),
    ],

    createdBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const company = mongoose.model<IcompayDoc>("company", model);

export default company;
