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


// calendar controller functions.

exports.getPeriodId = (date, batch_id) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT period_id FROM period_id WHERE batch_ID = '${batch_id}' AND stamp LIKE '${date}%';`;
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error fetching data from MySQL:', err);
          reject({statusCode: 500, message: 'Internal Server Error'});
        } else {
          resolve(result);
        }
      });
    } catch (error) {
      console.error('Error:', error);
      reject({statusCode: 500, message: 'Internal Server Error'});
    }
  });
};

exports.getPA = (enrollment_no, date) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT PA FROM attendance WHERE enrollment_no = '${enrollment_no}' AND PA LIKE '%${date}%';`;
      db.query(sql, (err, result) => {
        if (err) {
          console.error('Error fetching data from MySQL:', err);
          reject({statusCode: 500, message: 'Internal Server Error'});
        } else {
          resolve(result);
        }
      });
    } catch (error) {
      console.error('Error:', error);
      reject({statusCode: 500, message: 'Internal Server Error'});
    }
  });
};


exports.intersection = (period_id, PA) => {
  const attended = period_id.filter(value => PA.includes(value));
  return attended;
};

exports.uncommonitem = (period_id, PA) => {
  const unattended = new Set(period_id.concat(PA).filter(v => !period_id.includes(v) || !PA.includes(v)));
  return Array.from(unattended);
};

exports.periodID_to_Subjects = (attended) => {
  const subjectcode = attended.map(value => value.slice(8, 14));
  return subjectcode;
};

// only this function will be used by api

exports.subjectinfo = async (req, res) => {
  try {
    const user = req.user;
    const { batch_id } = req.params;
    const { date } = req.params;
    const { enrollment_no } = req.params;

    const [period_id, PA] = await Promise.all([exports.getPeriodId(date, batch_id), exports.getPA(enrollment_no, date)]);

    const Present = exports.periodID_to_Subjects(exports.intersection(period_id.map(value => value.period_id), PA.map(value_1 => value_1.PA)));

    const notPresent = exports.periodID_to_Subjects(exports.uncommonitem(period_id.map(value_2 => value_2.period_id), PA.map(value_3 => value_3.PA)));

    const Final = `Attended Subjects: ${Present}, Unattended Subjects: ${notPresent}`;

    return Final;
  
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
