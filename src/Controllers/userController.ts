import { Request, Response, Errback } from "express";

import user from "../Models/users";

exports.getAllUser = async (req: Request, res: Response) => {
  try {
    const data = await user.find();
    res.send(data);
  } catch (err: any) {
    res.send(err.message);
  }
};

exports.createUser = async (req: Request, res: Response) => {
  const data = {
    name: req.body.userName,
    email: req.body.userEmail,
    profilePicture: req.body.userProfile,
    descriptions: req.body.userDes,
  };
  await user.create(data);
  res.send("success");
};

exports.getUserById = async (req: Request, res: Response) => {
  const id = req.params.uid;
  try {
    const userId = await user.find({ _id: id });
    res.send(userId);
  } catch (err: any) {
    res.send(err.message);
  }
};

exports.deletUserById = async (req: Request, res: Response) => {
  const id = req.params.uid;
  try {
    const userId = await user.deleteOne({ _id: id });
    res.send(userId);
  } catch (err: any) {
    res.send(err.message);
  }
};

exports.updateUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.uid;
    const userById = await user.findOne({ _id: id });
    const data = {
      name: req.body.userName || userById?.name,
      email: req.body.userEmail || userById?.email,
      profilePicture: req.body.userProfile || userById?.profilePicture,
      descriptions: req.body.userDes || userById?.descriptions,
    };
    await user.findOneAndUpdate({ _id: id }, data);
    res.send("success");
  } catch (err: any) {
    res.send(err.message);
  }
};
