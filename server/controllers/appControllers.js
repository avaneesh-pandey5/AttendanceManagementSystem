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

          res.status(200).json({
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
