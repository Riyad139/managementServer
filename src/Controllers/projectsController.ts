import mongoose from "mongoose";
import project, { Iproject } from "../Models/ProjectModel";

export const getAllProject: Controller = async (req, res, next) => {
  try {
    const data = await project.find();
    res.send(data);
  } catch (error: any) {
    res.send(error.message);
  }
};

export const getProjectById: Controller = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await project.find({ _id: id });
    res.send(data);
  } catch (error: any) {
    res.send(error.message);
  }
};

export const createProject: Controller = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
      coverImage: req.body.url,
      tags: req.body.tags,
      priority: req.body.priority,
      projectStatus: req.body.status,
      dueDate: new Date(req.body.dueDate),
      assignedTo: req.body.userId,
      createdBy: req.userr.name,
    };
    await project.create(data);
    res.send("success");
  } catch (error: any) {
    res.send(error.message);
  }
};

export const deleteProjectById: Controller = async (req, res, next) => {
  try {
    await project.deleteOne({ _id: req.params.id });
    res.send("success");
  } catch (err: any) {
    res.send(err.message);
  }
};

export const updateProjectById: Controller = async (req, res, next) => {
  try {
    const id = req.params.id;
    const proj = await project.findOne({ _id: id });
    const data = {
      name: req.body.name || proj?.name,
      coverImage: req.body.url || proj?.coverImage,
      tags: req.body.tags || proj?.tags,
      priority: req.body.priority || proj?.priority,
      projectStatus: req.body.status || proj?.projectStatus,
      dueDate: req.body.dueDate || proj?.dueDate,
    };
    await project.updateOne({ _id: id }, data);
    res.send("success");
  } catch (error: any) {
    res.send(error.message);
  }
};
