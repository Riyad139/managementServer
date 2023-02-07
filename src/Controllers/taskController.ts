import Task from "../Models/TaskModel";

export const getAllTask: Controller = async (req, res, next) => {
  try {
    const data = await Task.find();
    res.send(data);
  } catch (error: any) {
    res.send(error.message);
  }
};

export const createTask: Controller = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
      board: req.body.board,
      description: req.body.description,
      label: req.body.label,
      isDone: req.body.isDone,
      workedTime: [],
      attachments: req.body.attachments,
      assignTo: req.body.assignTo,
      createdBy: req.userr.name,
      deadLine: new Date(req.body.deadLine),
    };
    await Task.create(data);
    res.send("success");
  } catch (error: any) {
    res.send(error.message);
  }
};

export const addWorkedTime: Controller = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Task.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          workedTime: {
            startTime: req.body.data.stTime,
            endTime: req.body.data.enTime,
          },
        },
      }
    );
    res.send("success");
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};
