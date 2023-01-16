import Express, { Router, Request, Response, NextFunction } from "express";
import {
  addMembersToCompany,
  createCompany,
  getComapny,
  getComapnyById,
} from "../Controllers/companiesController";
import {
  createUser,
  deletUserById,
  getAllUser,
  getUserById,
  updateUserById,
} from "../Controllers/userController";

const router = Express.Router();
/// route for user ...
router
  .route("/user/:uid")
  .get(getUserById)
  .delete(deletUserById)
  .put(updateUserById);
router.route("/user").get(getAllUser).post(createUser);
////////////////////////////////////////////////////////////////////////////////////////
///route for comapnies /////////////////////////////////////////////////////////////////
router.route("/company/addmembers/:id").post(addMembersToCompany);
router.route("/company/:id").get(getComapnyById);
router.route("/company").get(getComapny).post(createCompany);

///////////////////////////////////////////////////////////////////////////////////////

export default router;
