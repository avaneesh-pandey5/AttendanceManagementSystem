const express = require("express");
const {
  login,
  getStats,
  allStudents,
  subjectinfo,
} = require("../controllers/webControllers.js");
const router = express.Router();

const { isWebAuthenticated } = require("../middlewares/Auth.js");

router.route("/login").post(login);

router.route("/getStats/:subjectCode").get(isWebAuthenticated, getStats);

router.route("/calendar/:batch_id/:date").get(isWebAuthenticated ,subjectinfo);

router.route("/demo").get(isWebAuthenticated, allStudents);

module.exports = router;
