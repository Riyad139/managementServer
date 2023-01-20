import mongoose from "mongoose";

const TaskModel = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "A task must have a name"],
      trim: true,
    },
    board: {
      type: String,
      enum: ["working", "todo", "completed"],
    },
    description: {
      type: String,
      require: [true, "A task need a description"],
      trim: true,
    },
    label: {
      type: String,
    },
    isDone: Boolean,
    workedTime: [
      {
        startTime: Date,
        endTime: Date,
      },
    ],
    attachments: [
      {
        originalFileName: String,
        fileId: String,
      },
    ],
    assingTo: [String],

    createdBy: String,
    deadLine: Date,
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("tasks", TaskModel);

export default Task;
