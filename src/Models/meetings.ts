import mongoose from "mongoose";

const meetingModel = new mongoose.Schema({
  hostedBy: String,
  timeStamps: Date,
  title: {
    type: String,
    require: [true, "meetings require a title"],
  },
  duration: Number,
  description: {
    type: String,
    require: [true, "A meetings require a descriptions"],
  },
  invitedUser: [String],
});

const meetings = mongoose.model("meetings", meetingModel);

export default meetings;
