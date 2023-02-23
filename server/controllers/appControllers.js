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

exports.generatePID = async (req, res) => {
  try {
    const user = req.user;
    const id = user.instructor_id;
    const subject_code = req.body.code;
    const batch_id = req.body.batchId;

    const stamp =
      new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();

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

exports.markingAttendance = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
