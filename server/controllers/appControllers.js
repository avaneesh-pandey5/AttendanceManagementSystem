const db = require("../database.js");
const jwt = require("jsonwebtoken");

exports.loginApp = async (req, res) => {
  try {
    const { instructor_id, password } = req.body;

    db.query(
      `SELECT * FROM ggsipu_attendance.employee WHERE instructor_id = ? AND password = ?`,
      [instructor_id, password],
      (error, result) => {
        if (error) {
          throw error;
        } else if (result.length === 0) {
          res.status(404).json({
            success: false,
            message: "Employee not found",
          });
        } else {
          const user = { id: result[0].instructor_id };
          const token = generateToken(user);

          const options = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
          };

          res.status(200).cookie("token", token, options).json({
            success: true,
            token,
            result,
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

function generateToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}

exports.getClasses = async (req, res) => {
  try {
    const user = req.user;
    const id = user.instructor_id;

    db.query(
      `SELECT batch_id FROM ggsipu_attendance.subject_allocation WHERE instructor_id = ?`,
      [id],
      (error, result) => {
        if (error) {
          throw error;
        } else {
          var batch_id = result[0].batch_id;

          db.query(
            `SELECT * FROM ggsipu_attendance.batch_allocation WHERE batch_id = ?`,
            [batch_id],
            (error, result) => {
              if (error) {
                throw error;
              } else {
                res.status(200).json({
                  success: true,
                  result: result[0],
                });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

let globalStamp;

exports.generatePID = async (req, res) => {
  try {
    const user = req.user;
    const id = user.instructor_id;
    const subject_code = req.body.code;
    const batch_id = req.body.batchId;

    const stamp =
      new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();

    globalStamp = stamp;

    db.query(
      `INSERT INTO period_id (instructor_id, subject_code, batch_id, stamp) VALUES (?, ?, ?, ?)`,
      [id, subject_code, batch_id, stamp],
      (error) => {
        if (error) {
          throw error;
        } else {
          res.status(201).json({
            success: true,
            message: "Period ID generated!",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getstudents = async (req, res) => {
  try {
    const batch_id = req.body.batchId;
    db.query(
      `SELECT enrollment_no, name from student where student.course IN
      (select batch_allocation.course from batch_allocation where batch_id = ?)
        AND student.stream IN (select batch_allocation.stream from batch_allocation where batch_id = ?);`,
      [batch_id, batch_id],
      function (error, result) {
        if (error) {
          throw error;
        } else {
          res.json({
            success: true,
            message: "Successfully found students",
            result: result,
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.markingAttendance = async (req, res) => {
  try {
    const { data } = req.body;
    const stamp = globalStamp;
    console.log(stamp);

    const PId = await new Promise((resolve, reject) => {
      db.query(
        `SELECT period_id FROM ggsipu_attendance.period_id WHERE stamp = ?`,
        [stamp],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            if (result.length > 0) {
              resolve(result[0].period_id);
            } else {
              reject(new Error("Period ID not found"));
            }
          }
        }
      );
    });
    console.log(PId)
  

    for (const { enrollment_no, attendancestatus } of data) {
      if (attendancestatus === 1) {
        db.query(
          `UPDATE attendance SET PA=CONCAT(?, PA) WHERE enrollment_no = ?;`,
          [PId, enrollment_no]
        );
      } else if (attendancestatus === 0) {
        db.query(
          `UPDATE attendance SET PA=CONCAT(0, PA) WHERE enrollment_no = ?;`,
          [enrollment_no]
        );
      }
    }
    res.send({ message: "Attendance marked" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
