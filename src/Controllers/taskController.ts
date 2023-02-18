import Task from "../Models/TaskModel";
import Project from "../Models/ProjectModel";

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
    console.log("Hello");
    const data = {
      name: req.body.name,
      board: req.body.board,
      description: req.body.description,
      tags: req.body.tags,
      isDone: false,
      workedTime: [],
      attachments: [req.body.attachments],
      assignTo: req.body.assignTo,
      createdBy: req.userr.name,
      deadLine: new Date(req.body.deadLine),
    };
    const tas = await Task.create(data);
    await Project.findOneAndUpdate(
      { _id: req.body.projectId },
      { $push: { tasks: tas._id } }
    );
    res.send("success");
  } catch (error: any) {
    res.send(error.message);
  }
};

export const getTaskByIds: Controller = async (req, res, next) => {
  try {
    const ids = req.body.taskIds;
    console.log(ids);
    const tasks = await Task.find({ _id: { $in: ids } });
    res.send(tasks);
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
