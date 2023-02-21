import user from "../Models/users";
import * as Jwt from "jsonwebtoken";
import { unless } from "express-unless";
const addUserToReq: Controller = async (req, res, next) => {
  try {
    const salt = "YoNIggaThisIsASalt";
    if (!req.headers.cookie) return res.status(404).send("User not found");
    const id = Jwt.verify(req.headers.cookie.split("=")[1], salt);
    //@ts-ignore
    const use = await user.findOne({ _id: id.id });
    if (!use) return res.status(404).send("User not Found");
    req.userr = use;
    next();
  } catch (error: any) {
    res.status(501).send("Internal error");
  }
};
//@ts-ignore
addUserToReq.unless = unless;

export default addUserToReq;
