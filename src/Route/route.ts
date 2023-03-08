import Express from "express";
import {
  addMembersToCompany,
  createCompany,
  getComapny,
  getComapnyById,
  updateCompanyById,
} from "../Controllers/companiesController";
import {
  createDummydata,
  createGuestUser,
} from "../Controllers/GuestController";
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
  getDailyUpadetTask,
  getTaskByIds,
  updateTaskToCompleted,
} from "../Controllers/taskController";
import {
  createUser,
  deletUserById,
  getAllUser,
  getUserById,
  getUsersByIds,
  passwordChange,
  signInUser,
  signOut,
  updateUser,
} from "../Controllers/userController";
import isUserLoggedIn from "../middleware/isUserLoggedIn";

const router = Express.Router();
/// route for user ...
// router.route("/user/:uid").delete(deletUserById);
router.route("/user").get(getAllUser);
router.route("/user/signup").post(isUserLoggedIn, createUser);
router.route("/user/signin").post(isUserLoggedIn, signInUser);
router.route("/user/logOut").post(signOut);
router.route("/user/currUser").get(getUserById);
router.route("/user/update").put(updateUser);
router.route("/user/getByids").post(getUsersByIds);
router.route("/user/passwordChange").post(passwordChange);
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

router
  .route("/tasks")
  .get(getAllTask)
  .post(createTask)
  .put(updateTaskToCompleted);
router.route("/tasks/byIds").post(getTaskByIds);
router.route("/tasks/:id").post(addWorkedTime);
router.route("/task/getTodaysTask").post(getDailyUpadetTask);

/////////////////////////////////////////////////////////////////////////////////////
///route for meetings //////////////////////////////////////////////////////////////

router.route("/meetings").get(getAllMeeting).post(createMeetings);
router.route("/meetings/:date").get(getMeetingByDate);

//////////////////////////////////////////////////////
router.route("/guest").post(createGuestUser);
router.route("/guest/create").post(createDummydata);

export default router;
