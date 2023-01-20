import mongoose, { Types, Document } from "mongoose";

export interface Iproject {
  name?: string;
  task?: string[];
  priority?: string;
  projectStatus?: string;
  coverImage?: string;
  tags?: string[];
  dueDate?: Date;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  assignedTo?: string[];
}

export interface IprojectDoc extends Iproject, Document {}

const projectModel = new mongoose.Schema(
  {
    tasks: [String],
    priority: {
      type: String,
      default: "medium",
    },

    name: String,
    projectStatus: {
      type: String,
      default: "In progress",
      enum: ["In progress", "Working", "Completed"],
    },
    coverImage: {
      type: String,
      require: [true, "select an image"],
    },
    tags: [String],
    dueDate: Date,
    createdBy: String,

    assignedTo: [String],
  },
  {
    timestamps: true,
  }
);

const project = mongoose.model<IprojectDoc>("projects", projectModel);

export default project;
