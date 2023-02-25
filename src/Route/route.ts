import Express from "express";
import {
  addMembersToCompany,
  createCompany,
  getComapny,
  getComapnyById,
  updateCompanyById,
} from "../Controllers/companiesController";
import {
  createMeetings,
  getAllMeeting,
  getMeetingByDate,
} from "../Controllers/meetingsController";
import {
  createProject,
  deleteProjectById,
  getAllProject,
  getProjectByIds,
  updateProjectById,
} from "../Controllers/projectsController";
import {
  addWorkedTime,
  createTask,
  getAllTask,
  getTaskByIds,
} from "../Controllers/taskController";
import {
  createUser,
  deletUserById,
  getAllUser,
  getUserById,
  getUsersByIds,
  signInUser,
  signOut,
  updateUserById,
} from "../Controllers/userController";

const router = Express.Router();
/// route for user ...
// router.route("/user/:uid").delete(deletUserById);
router.route("/user").get(getAllUser);
router.route("/user/signup").post(createUser);
router.route("/user/signin").post(signInUser);
router.route("/user/logOut").post(signOut);
router.route("/user/currUser").get(getUserById);
router.route("/user/update").put(updateUserById);
router.route("/user/getByids").post(getUsersByIds);
////////////////////////////////////////////////////////////////////////////////////////
///route for comapnies /////////////////////////////////////////////////////////////////
router.route("/company/addmembers/:id").post(addMembersToCompany);
router.route("/company/:id").get(getComapnyById).put(updateCompanyById);
router.route("/company").get(getComapny).post(createCompany);

///////////////////////////////////////////////////////////////////////////////////////
///route for projects//////////////////////////////////////////////////////////////////

router.route("/projects").get(getAllProject).post(createProject);
router.route("/projects/byIds").post(getProjectByIds);

router.route("/projects/:id").delete(deleteProjectById).put(updateProjectById);

///////////////////////////////////////////////////////////////////////////////////////
//route for tasks ////////////////////////////////////////////////////////////////////

router.route("/tasks").get(getAllTask).post(createTask);
router.route("/tasks/byIds").post(getTaskByIds);
router.route("/tasks/:id").post(addWorkedTime);

/////////////////////////////////////////////////////////////////////////////////////
///route for meetings //////////////////////////////////////////////////////////////

router.route("/meetings").get(getAllMeeting).post(createMeetings);
router.route("/meetings/:date").get(getMeetingByDate);

export default router;
