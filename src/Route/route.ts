import Express, { Router, Request, Response, NextFunction } from "express";
import {
  createUser,
  deletUserById,
  getAllUser,
  getUserById,
  updateUserById,
} from "../Controllers/userController";

const router = Express.Router();

router
  .route("/user/:uid")
  .get(getUserById)
  .delete(deletUserById)
  .put(updateUserById);
router.route("/user").get(getAllUser).post(createUser);

export default router;
