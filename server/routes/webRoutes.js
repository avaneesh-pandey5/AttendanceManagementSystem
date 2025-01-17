const express = require("express");
const {
  login,
  getStats,
  allStudents,
  subjectinfo,
  getWebClasses,
} = require("../controllers/webControllers.js");
const router = express.Router();

const { isWebAuthenticated } = require("../middlewares/Auth.js");

router.route("/login").post(login);

router.route("/getStats/:subjectCode").get(isWebAuthenticated, getStats);

router.route("/calendar").get(isWebAuthenticated, subjectinfo);

router.route("/demo").get(isWebAuthenticated, allStudents);

router.route("/getWebClasses").get(isWebAuthenticated, getWebClasses);

module.exports = router;
