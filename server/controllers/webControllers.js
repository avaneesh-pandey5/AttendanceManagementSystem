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

exports.getWebClasses = async (req, res) => {
  try {
    const user = req.user;
    const course = user.course;
    const stream = user.stream;
    const semester = user.semester;

    db.query(
      `SELECT batch_id FROM ggsipu_attendance.batch_allocation WHERE course = ? AND stream = ? AND semster = ? `,
      [course, stream, semester],
      (error, result) => {
        if (error) {
          throw error;
        } else if (result[0] == null) {
          return res
            .status(400)
            .json({ success: false, message: "No batch ID found!" });
        } else {
          const batch_id = result[0];
          db.query(
            `SELECT subject_code ggsipu_attendance.subject_allocation WHERE batch_id = ?`,
            [batch_id],
            (error, result) => {
              if (error) {
                throw error;
              } else {
                res.status(200).json({ success: true, batchId: result });
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

const getPeriodId = (date, batch_id) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT period_id FROM period_id WHERE batch_ID = '${batch_id}' AND stamp LIKE '${date}%';`;
      db.query(sql, (err, result) => {
        if (err) {
          console.error("Error fetching data from MySQL:", err);
          reject({ statusCode: 500, message: "Internal Server Error" });
        } else {
          const periodIds = result.map((item) => item.period_id);
          resolve(periodIds);
          console.log(periodIds);
        }
      });
    } catch (error) {
      console.error("Error:", error);
      reject({ statusCode: 500, message: "Internal Server Error" });
    }
  });
};


const getPA = (enrollment_no) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(enrollment_no)
      const sql = `SELECT PA FROM attendance WHERE enrollment_no = '${enrollment_no}';`;
      db.query(sql, (err, result) => {
        if (err) {
          console.error("Error fetching data from MySQL:", err);
          reject({ statusCode: 500, message: "Internal Server Error" });
        } else {
          resolve(result);
          console.log(result);
        }
      });
    } catch (error) {
      console.error("Error:", error);
      reject({ statusCode: 500, message: "Internal Server Error" });
    }
  });
};

async function findCommonPeriodIds(enrollment_no, date, batch_id) {
  const periodIds = await getPeriodId(date, batch_id);
  const paData = await getPA(enrollment_no);
  const combinedPeriodIds = paData[0]?.PA || "";
  
  const combinedPeriodIdsArray = combinedPeriodIds.split(/EMP\d{5}[A-Z]{3} \d{7}\/\d{1,2}\/\d{4} \d{1,2}:\d{1,2}:\d{1,2} [ap]m/).filter(Boolean);
  const paPeriodIdsArray = paData[0]?.PA.match(/EMP\d{5}[A-Z]{3} \d{7}\/\d{1,2}\/\d{4} \d{1,2}:\d{1,2}:\d{1,2} [ap]m/g) || [];
  
  const commonPeriodIds = periodIds.filter(id => combinedPeriodIdsArray.includes(id) || paPeriodIdsArray.includes(id));
  console.log(commonPeriodIds);
  return commonPeriodIds;
}

const getPeriodData = (period_id) => {
  return new Promise((resolve, reject) => {
    try {
      const sql = `SELECT subject_code FROM period_id WHERE period_id = '${period_id}';`;
      db.query(sql, (err, result) => {
        if (err) {
          console.error("Error fetching data from MySQL:", err);
          reject({ statusCode: 500, message: "Internal Server Error" });
        } else {
          resolve(result);
          console.log(result);
        }
      });
    } catch (error) {
      console.error("Error:", error);
      reject({ statusCode: 500, message: "Internal Server Error" });
    }
  });
};



async function getSubjectCodesFromPeriodIds(periodIds) {
  try {
    const subjectCodes = await Promise.all(periodIds.map(async (id) => {
      const periodData = await getPeriodData(id);
      return periodData[0].subject_code;
    }));
    return subjectCodes.reduce((acc, val) => acc.concat(val), []);
  } catch (error) {
    console.error(error);
    throw new Error("Error getting subject codes from period ids");
  }
}



exports.getSubjectCodes = async (req, res) => {
  const user = req.user;
  //const enrollment_no = user.enroll;
  const { date, batch_id, enrollment_no } = req.body;

  try {
    const attendedPeriodIds = await findCommonPeriodIds(enrollment_no, date, batch_id);
    console.log('attendedPeriodIds:', attendedPeriodIds);
    const subjectCodes = await getSubjectCodesFromPeriodIds(attendedPeriodIds);
    console.log('subjectCodes:', subjectCodes);

    res.status(200).json({ success: true, subjectCodes });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
