import meetings from "../Models/meetings";

export const getAllMeeting: Controller = async (req, res, next) => {
  try {
    const data = await meetings.find();
    res.send(data);
  } catch (error: any) {
    res.send(error.message);
  }
};

export const createMeetings: Controller = async (req, res, next) => {
  try {
    const data = {
      hostedBy: req.userr.name,
      timeStamps: req.body.timeStamps,
      title: req.body.title,
      descriptions: req.body.descriptions,
      duration: req.body.duration,
      invitedUser: req.body.invitedUser || [],
    };
    await meetings.create(data);
    res.send("sucess");
  } catch (error: any) {
    res.send(error.message);
  }
};

export const getMeetingById: Controller = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = meetings.find({ _id: id });
    res.send(data);
  } catch (error: any) {
    res.send(error.message);
  }
};
