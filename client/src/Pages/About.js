import React from "react";
import "./../style.css";

import Profile from "../img/profile.jpg";

const About = () => {
  return (
    <>
      <div className="main">
        <div className="main-top">
          <h1>STUDENT PROFILE</h1>
          <i className="fas fa-user-cog"></i>
        </div>
        <div className="student">
          <div className="card d-flex justify-content-center">
            <img className="container" src={Profile} />
          </div>

          <table className="table1">
            <table class="table table-bordered">
              <tbody>
                <tr>
                  <th scope="row">FIRST NAME:</th>
                  <td>*****</td>
                </tr>
                <tr>
                  <th scope="row">LAST NAME :</th>
                  <td>*****</td>
                </tr>
                <tr>
                  <th scope="row">UNIVERSITY:</th>
                  <td>Guru Gobind Singh Indraprastha University</td>
                </tr>

                <tr>
                  <th scope="row">SCHOOL:</th>
                  <td>University School Of Automation & Robotics</td>
                </tr>

                <tr>
                  <th scope="row">ENROLLMENT NUMBER:</th>
                  <td>**************</td>
                </tr>

                <tr>
                  <th scope="row">PROGRAM:</th>
                  <td>Btech</td>
                </tr>

                <tr>
                  <th scope="row">COURSE TENURE:</th>
                  <td>2021-2025</td>
                </tr>

                <tr>
                  <th scope="row">BRANCH:</th>
                  <td>******</td>
                </tr>

                <tr>
                  <th scope="row">BATCH:</th>
                  <td>*</td>
                </tr>
              </tbody>
            </table>
          </table>
        </div>
      </div>
    </>
  );
};

export default About;
