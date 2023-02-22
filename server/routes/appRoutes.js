const express = require("express");
const { loginApp } = require("../controllers/appControllers.js");
const router = express.Router();
const db = require("../database.js");

router.route("/loginApp").post(loginApp);

router.post("/api/login", (req, res) => {
  const id = req.body.id;
  const password = req.body.password;

  try {
    db.query(
      `SELECT name FROM employee where instructor_id = ?`,
      [id],
      function (err, result) {
        if (err) {
          throw err;
        } else if (result[0] == null) {
          res.status(400).send({ message: "User doesn't exist" });
        } else {
          db.query(
            `SELECT name, designation, date_of_joining FROM employee WHERE instructor_id = ? AND password = ?`,
            [id, password],
            function (error, result) {
              if (error) {
                throw error;
              } else {
                if (result[0] == null) {
                  res
                    .status(400)
                    .send({ message: "Wrong user Id or password" });
                } else {
                  res.send({ message: "Successfully logedin", result: result });
                }
              }
            }
          );
        }
      }
    );
  } catch {
    res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/api/classes", (req, res) => {
  const id = req.body.id;

  try {
    db.query(
      `SELECT batch_id, subject_name, subject_code, type FROM subject_allocation WHERE instructor_id = ?`,
      [id],
      function (error, result) {
        if (error) {
          throw error;
        } else {
          res.send(result);
        }
      }
    );
  } catch {
    res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/api/addingStudents", (req, res) => {
  const batch = req.body.batch_id;

  try {
    db.query(
      `SELECT enrollment_no, name from student where  student.course IN 
        (select batch_allocation.course from batch_allocation where batch_id = ?) 
        AND  
        student.stream IN (select batch_allocation.stream from batch_allocation where batch_id = ?);`,
      [batch, batch],
      function (error, result) {
        if (error) {
          throw error;
        } else {
          res.json({ message: "Succesfully added students" });
        }
      }
    );
  } catch (e) {
    res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/api/generatePId", (req, res) => {
  const instructor_id = req.body.instructor_id;
  const subject_code = req.body.code;
  const batch_id = req.body.batchId;
  const stamp = req.body.stamp;

  try {
    db.query(
      `INSERT INTO period_id (instructor_id, subject_code, batch_id, stamp) VALUES (?, ?, ?, ?)`,
      [instructor_id, subject_code, batch_id, stamp],
      function (error, result) {
        if (error) {
          throw error;
        } else {
          res.send({ message: "Period details added" });
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: "Internal server error" });
  }
});

router.post("/api/markingAttendace", (req, res) => {
  const PId = req.body.id;
  const enroll = req.body.enroll;
  const attendanceStatus = req.body.status;
  try {
    if (attendanceStatus === 1) {
      db.query(
        `UPDATE attendance SET PA=CONCAT(?, PA) WHERE enrollment_no = ? `,
        [PId, enroll],
        function (error) {
          if (error) {
            throw error;
          } else {
            res.send({ message: "Marked present" });
          }
        }
      );
    } else if (attendanceStatus === 0) {
      db.query(
        `UPDATE attendance SET PA=CONCAT(0, PA) WHERE enrollment_no = ? `,
        [enroll],
        function (error) {
          if (error) {
            throw error;
          } else {
            res.send({ message: "Marked absent" });
          }
        }
      );
    }
  } catch (e) {
    res.status(500).send({ message: "Internal server error!" });
  }
});

module.exports = router;
