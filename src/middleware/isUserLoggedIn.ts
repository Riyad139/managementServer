import * as Jwt from "jsonwebtoken";
import user from "../Models/users";
const isUserLoggedIn: Controller = async (req, res, next) => {
  try {
    const salt = "YoNIggaThisIsASalt";
    if (!req.headers.cookie) return next();
    const id = Jwt.verify(req.headers.cookie.split("=")[1], salt);
    //@ts-ignore
    const use = await user.findOne({ _id: id.id });
    if (!use) return next();

    res.status(200).send("user is already logged in");
  } catch (error: any) {
    return next();
  }
};

export default isUserLoggedIn;
