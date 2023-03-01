import React, { useEffect, useState } from "react";
import "./../style.css";
import Profile from "../img/user.png";
import Navbar from "../component/Navbar";
import App from "../component/Calendar/App";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  // async function populateDashboard() {

  //     const classesData = await fetch("http://localhost:8080/api/v1/get")
  // }
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    setUser(userData);
    // populateDashboard();
  }, []);

  return (
    <>
      <div className="cont">
        <Navbar />

        <div className="main">
          <div className="main-top">
            <h1>STUDENT DASHBOARD</h1>
            {/* <i className="fas fa-user-cog px-4 fa-lg"></i> */}
          </div>
          <hr className="hrstyle" />
          <div className="users">
            <div className="card mt-4 justify-content-center">
              <img className="container my-3" src={Profile} alt="" />
              {user && <h2>{user[0].name}</h2>}
              {user && <h5>{user[0].enrollment_no}</h5>}
              {user && <p>{user[0].stream}</p>}

              <div className="per">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <span>85%</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Sem</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-center">
                {/* <Link className='pageLink' to="/about">
                <Button className='profile-btn w-100' variant="outline-light" size="md">View Profile
              </Button>
              </Link> */}
              </div>
            </div>

            <div className="calendar z-1">
              <App />
            </div>
          </div>
          <div className="attendance">
            <div className="attendance-list">
              <table className="table">
                <thead>
                  <tr>
                    <th>Semester</th>
                    <th>Subject Code</th>
                    <th>Subject </th>
                    <th>Teacher</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>03</td>
                    <td>016</td>
                    <td>DSA</td>
                    <td>Dr.Neetu</td>
                  </tr>
                  <tr>
                    <td>03</td>
                    <td>310</td>
                    <td>DBMS</td>
                    <td>Dr.Geetanshi</td>
                  </tr>
                  <tr>
                    <td>03</td>
                    <td>110</td>
                    <td>Comp-Networks</td>
                    <td>Dr.Rahul</td>
                  </tr>
                  <tr>
                    <td>03</td>
                    <td>071</td>
                    <td>Intro to AI</td>
                    <td>Dr.Divya</td>
                  </tr>
                  <tr>
                    <td>03</td>
                    <td>101</td>
                    <td>Mathematics</td>
                    <td>Dr.Sheena</td>
                  </tr>
                  <tr>
                    <td>03</td>
                    <td>016</td>
                    <td>English</td>
                    <td>Dr.Sukriti</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
