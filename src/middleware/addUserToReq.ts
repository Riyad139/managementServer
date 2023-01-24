import user from "../Models/users";

const addUserToReq: Controller = async (req, res, next) => {
  try {
    req.userr = await user.findOne({ _id: req.header("x-Auth") });
    next();
  } catch (error: any) {
    res.send(error.message);
  }
};

export default addUserToReq;
