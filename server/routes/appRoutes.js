const express = require("express");
const {
  loginApp,
  getClasses,
  generatePID,
} = require("../controllers/appControllers.js");
const router = express.Router();

const { isAppAuthenticated } = require("../middlewares/Auth.js");

router.route("/loginApp").post(loginApp);

router.route("/getClasses").get(isAppAuthenticated, getClasses);

router.route("/generatePID").post(isAppAuthenticated, generatePID);

router.route("/getstudents/:batch_ID").get(isAppAuthenticated, getstudents);

// router.post("/api/markingAttendace", (req, res) => {
//   const PId = req.body.id;
//   const enroll = req.body.enroll;
//   const attendanceStatus = req.body.status;
//   try {
//     if (attendanceStatus === 1) {
//       db.query(
//         `UPDATE attendance SET PA=CONCAT(?, PA) WHERE enrollment_no = ? `,
//         [PId, enroll],
//         function (error) {
//           if (error) {
//             throw error;
//           } else {
//             res.send({ message: "Marked present" });
//           }
//         }
//       );
//     } else if (attendanceStatus === 0) {
//       db.query(
//         `UPDATE attendance SET PA=CONCAT(0, PA) WHERE enrollment_no = ? `,
//         [enroll],
//         function (error) {
//           if (error) {
//             throw error;
//           } else {
//             res.send({ message: "Marked absent" });
//           }
//         }
//       );
//     }
//   } catch (e) {
//     res.status(500).send({ message: "Internal server error!" });
//   }
// });

module.exports = router;
