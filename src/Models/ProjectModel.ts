import mongoose from "mongoose";

const projectModel = new mongoose.Schema({
  tasks: [String],
  priority: {
    type: String,
    default: "medium",
  },
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
  createdAt: () => new Date(),
  updetedAt: () => new Date(),
  assignedTo: [String],
});

const project = mongoose.model("projects", projectModel);

module.exports = project;
