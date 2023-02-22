const express = require("express");
const {
  loginApp,
  getClasses,
  generatePID,
} = require("../controllers/appControllers.js");
const router = express.Router();
const db = require("../database.js");

router.route("/loginApp").post(loginApp);

router.route("/getClasses").get(getClasses);

router.route("/generatePID").post(generatePID);

// router.post("/api/addingStudents", (req, res) => {
//   const batch = req.body.batch_id;

//   try {
//     db.query(
//       `SELECT enrollment_no, name from student where  student.course IN
//         (select batch_allocation.course from batch_allocation where batch_id = ?)
//         AND
//         student.stream IN (select batch_allocation.stream from batch_allocation where batch_id = ?);`,
//       [batch, batch],
//       function (error, result) {
//         if (error) {
//           throw error;
//         } else {
//           res.json({ message: "Succesfully added students" });
//         }
//       }
//     );
//   } catch (e) {
//     res.status(500).send({ message: "Internal server error" });
//   }
// });

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
