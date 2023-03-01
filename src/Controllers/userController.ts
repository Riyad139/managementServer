import { Request, Response, Errback } from "express";
import * as argon from "argon2";
import * as jwt from "jsonwebtoken";
import user from "../Models/users";
import Dayjs from "dayjs";
import company from "../Models/CompanyModel";

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const comp = await company.find({
      members: { $elemMatch: { userId: req.userr._id } },
    });
    const myset = new Set();
    for (const cm of comp) {
      if (cm.members)
        for (const mm of cm.members) {
          myset.add(mm.userId);
        }
    }
    const ids = [...myset];

    const data = await user.find({ _id: { $in: ids } });
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

export const signInUser: Controller = async (req, res, next) => {
  try {
    console.log("hello");
    const data = {
      email: req.body.email,
      password: req.body.password,
    };
    console.log(data);
    const client = await user.findOne({ email: data.email });
    console.log(client);
    if (!client?.password) return res.status(404).send("user not found");
    const token = await argon.verify(client.password, data.password);
    if (token) {
      res.cookie("access-token", generateToken(client), {
        expires: Dayjs().add(2, "day").toDate(),
        httpOnly: true,
      });
      res.send("success");
    } else res.status(403).send("Incorrect password");
  } catch (err: any) {
    res.status(501).send("Internal error");
  }
};

export const signOut: Controller = async (req, res, next) => {
  try {
    res.clearCookie("access-token");
    res.send("success");
  } catch (Error: any) {
    res.status(404).send("user Not found");
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const salt = "YoNIggaThisIsASalt";
    if (!req.headers.cookie) return res.status(404).send("user not found");
    const data = jwt.verify(req.headers.cookie?.split("=")[1], salt);
    //@ts-ignore
    const us = await user.findById({ _id: data.id });
    res.send(us);
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

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userById = req.userr;
    const data = {
      name: req.body.userName || userById?.name,
      email: req.body.userEmail || userById?.email,
      profilePicture: req.body.userProfile || userById?.profilePicture,
      descriptions: req.body.userDes || userById?.descriptions,
      FirstName: req.body.FirstName || userById.FirstName,
      SecondName: req.body.SecondName || userById.SecondName,
      Gender: req.body.Gender || userById.Gender,
      Jobtitle: req.body.Jobtitle || userById.Jobtitle,
      Phone: req.body.Phone || userById.Phone,
      Country: req.body.Country || userById.Country,
      WorkedAt: req.body.WorkedAt || userById.WorkedAt,
      preferences: req.body.preferences || userById.preferences,
    };
    await user.findOneAndUpdate({ _id: req.userr._id }, data);
    res.send("success");
  } catch (err: any) {
    res.send(err.message);
  }
};
