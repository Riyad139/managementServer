import Express, { Router, Request, Response, NextFunction } from "express";

const userController = require("./../Controllers/userController");

const router = Express.Router();

router
  .route("/user/:uid")
  .get(userController.getUserById)
  .delete(userController.deletUserById)
  .put(userController.updateUserById);
router
  .route("/user")
  .get(userController.getAllUser)
  .post(userController.createUser);

module.exports = router;
