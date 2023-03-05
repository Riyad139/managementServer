import Express from "express";
import user from "../Models/users";
const router = Express.Router();

router.route("/user").get(async (req, res, next) => {
  const data = await user.find({});
  res.send(data);
});

export default router;
