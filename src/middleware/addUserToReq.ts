import user from "../Models/users";
import * as Jwt from "jsonwebtoken";
import { unless } from "express-unless";
const addUserToReq: Controller = async (req, res, next) => {
  try {
    if (
      (req.path == process.env.SIGNUPPATH ||
        req.path == process.env.SIGNINPATH) &&
      req.method == "POST"
    )
      return next();

    if (!req.headers.cookie) return res.status(404).send("User not found");
    
    const id = Jwt.verify(
      req.headers.cookie.split("=")[1],
      process.env.SALT as string
    );
    
    if (!id) return res.status(404).send("User not found");
    //@ts-ignore
    const use = await user.findOne({ _id: id.id });
    if (!use) return res.status(404).send("User not Found");
    req.userr = use;
    next();
  } catch (error: any) {
    res.status(404).send("user not found");
  }
};
//@ts-ignore
addUserToReq.unless = unless;

export default addUserToReq;
