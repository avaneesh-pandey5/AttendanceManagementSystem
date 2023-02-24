const express = require("express");
const {
  loginApp,
  getClasses,
  generatePID,
  getstudents,
  markingAttendance  
} = require("../controllers/appControllers.js");
const router = express.Router();

const { isAppAuthenticated } = require("../middlewares/Auth.js");

router.route("/loginApp").post(loginApp);

router.route("/getClasses").get(isAppAuthenticated, getClasses);

router.route("/generatePID").post(isAppAuthenticated, generatePID);

router.route("/getstudents/:batch_ID").get(isAppAuthenticated, getstudents);

router.route("/markingattendance/:enroll").post(isAppAuthenticated, markingAttendance);

module.exports = router;
