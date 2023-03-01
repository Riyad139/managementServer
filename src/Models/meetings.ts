import mongoose, { Document } from "mongoose";

export interface Imeetings {
  hostedBy?: string;
  timeStamps?: Date;
  title?: string;
  duration?: number;
  descriptions?: string;
  invitedUser?: string[];
}

export interface ImeetingsDoc extends Imeetings, Document {}

const meetingModel = new mongoose.Schema({
  hostedBy: String,
  timeStamps: Date,
  title: {
    type: String,
    require: [true, "meetings require a title"],
  },
  duration: Number,
  descriptions: {
    type: String,
    require: [true, "A meetings require a descriptions"],
  },
  invitedUser: [String],
});

const meetings = mongoose.model<ImeetingsDoc>("meetings", meetingModel);

export default meetings;
