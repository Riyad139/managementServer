import Task from "../Models/TaskModel";
import Project from "../Models/ProjectModel";
import dayjs from "dayjs";

export const getAllTask: Controller = async (req, res, next) => {
  try {
    const data = await Task.find();
    res.send(data);
  } catch (error: any) {
    res.send(error.message);
  }
};

export const updateTaskToCompleted: Controller = async (req, res, next) => {
  try {
    const id = req.body.Tid;
    await Task.findOneAndUpdate({ _id: id }, { isDone: req.body.status });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const createTask: Controller = async (req, res, next) => {
  try {
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
    res.status(500).send(error.message);
  }
};

export const getDailyUpadetTask: Controller = async (req, res, next) => {
  try {
    const id = req.body.taskIds;
    const data = await Task.find({
      _id: { $in: id },
      updatedAt: { $gte: dayjs().startOf("day"), $lte: dayjs().endOf("day") },
    });
    res.send(data);
  } catch (error: any) {
    res.status(500).send("something went wrong");
  }
};

export const getTaskByIds: Controller = async (req, res, next) => {
  try {
    const ids = req.body.taskIds;

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
