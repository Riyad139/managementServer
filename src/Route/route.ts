import Express, { Router, Request, Response, NextFunction } from "express";
import {
  addMembersToCompany,
  createCompany,
  getComapny,
  getComapnyById,
  updateCompanyById,
} from "../Controllers/companiesController";
import {
  createProject,
  deleteProjectById,
  getAllProject,
  getProjectById,
  updateProjectById,
} from "../Controllers/projectsController";
import { createTask, getAllTask } from "../Controllers/taskController";
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
router.route("/company/:id").get(getComapnyById).put(updateCompanyById);
router.route("/company").get(getComapny).post(createCompany);

///////////////////////////////////////////////////////////////////////////////////////
///route for projects//////////////////////////////////////////////////////////////////

router.route("/projects").get(getAllProject).post(createProject);
router
  .route("/projects/:id")
  .get(getProjectById)
  .delete(deleteProjectById)
  .put(updateProjectById);

///////////////////////////////////////////////////////////////////////////////////////
//route for tasks ////////////////////////////////////////////////////////////////////

router.route("/tasks").get(getAllTask).post(createTask);

export default router;
