import { RequestHandler } from "express";
import user from "../Models/users";

const addUserToReq: RequestHandler = async (req, res, next) => {
  try {
    req.userr = await user.findOne({ _id: req.cookies.id });
    next();
  } catch (error) {}
};

export default addUserToReq;
