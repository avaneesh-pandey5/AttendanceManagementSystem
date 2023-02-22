const db = require("../database.js");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { enroll } = req.body;

    db.query(
      `SELECT * FROM student WHERE enrollment_no=?`,
      [enroll],
      (error, result) => {
        if (error) {
          throw error;
        } else if (result == null) {
          res.status(404).json({
            success: false,
            message: "Student doesn't exist!",
          });
        } else {
          const user = { enroll: result[0].enrollment_no };

          const token = generateToken(user);

          const options = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
          };

          res.status(200).cookie("token", token, options).json({
            success: true,
            result,
            token,
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

    // To get all classes of loged in user
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getStats = async (req, res) => {
  try {
    const user = req.user;

    const { subjectCode } = req.params;

    var totalClasses = 0;
    var attendedClasses = 0;

    //Counting total classes for that subject code
    db.query(
      `SELECT COUNT(*) AS count FROM ggsipu_attendance.period_id WHERE subject_code = ?`,
      [subjectCode],
      (error, result) => {
        if (error) {
          throw error;
        } else {
          totalClasses = result[0].count;
        }
      }
    );

    //Counting total no. of attended classes for that subject code
    db.query(
      `SELECT (LENGTH(PA) - LENGTH(REPLACE(PA, ?, ''))) / LENGTH(?) AS count
    FROM ggsipu_attendance.attendance
    WHERE PA LIKE '%${subjectCode}%' AND name = ?`,
      [subjectCode, subjectCode, user.name],
      (error, result) => {
        if (error) {
          throw error;
        } else if (result[0] == null) {
          attendedClasses = 0;
          const percentage = (attendedClasses / totalClasses) * 100;

          return res.status(200).json({ success: true, percentage });
        } else {
          attendedClasses = result[0].count;
          const percentage = (attendedClasses / totalClasses) * 100;

          return res.status(200).json({ success: true, percentage });
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

exports.allStudents = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
