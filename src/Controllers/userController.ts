import { Request, Response, Errback } from "express";
import * as argon from "argon2";
import * as jwt from "jsonwebtoken";
import user from "../Models/users";
import Dayjs from "dayjs";

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const data = await user.find();
    res.send(data);
  } catch (err: any) {
    res.send(err.message);
  }
};

export const getUsersByIds: Controller = async (req, res) => {
  try {
    const ids = req.body.ids;
    const users = await user.find({ _id: { $in: ids } });
    res.send(users);
  } catch (err: any) {
    res.status(501).send(err.message);
  }
};

const generateToken = (us: any) => {
  const data = {
    id: us._id,
  };

  const salt = "YoNIggaThisIsASalt";

  return jwt.sign(data, salt, { expiresIn: "24h" });
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const passwordHased = await argon.hash(req.body.password);

    const data = {
      name: req.body.userName,
      email: req.body.userEmail,
      password: passwordHased,
    };
    const us = await user.create(data);
    res.cookie("access-token", generateToken(us), {
      expires: Dayjs().add(2, "day").toDate(),
      httpOnly: true,
    });

    res.send("success");
  } catch (error: any) {
    res.status(501).send(error.message);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.uid;
    const userId = await user.findOne({ _id: id });
    res.send(userId);
  } catch (err: any) {
    res.send(err.message);
  }
};

export const deletUserById = async (req: Request, res: Response) => {
  const id = req.params.uid;
  try {
    const userId = await user.deleteOne({ _id: id });
    res.send(userId);
  } catch (err: any) {
    res.send(err.message);
  }
};

export const updateUserById = async (req: Request, res: Response) => {
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
