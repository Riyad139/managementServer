import user from "../Models/users";
import * as Jwt from "jsonwebtoken";
import { unless } from "express-unless";
const addUserToReq: Controller = async (req, res, next) => {
  try {
    const salt = "YoNIggaThisIsASalt";
    if (!req.headers.cookie) return next();
    const id = Jwt.verify(req.headers.cookie.split("=")[1], salt);

    req.userr = await user.findOne({ _id: id });
    next();
  } catch (error: any) {
    next();
  }
};
//@ts-ignore
addUserToReq.unless = unless;

export default addUserToReq;
