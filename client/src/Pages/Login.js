import React, { useState } from "react";
import './../style.css'
import logo from '../img/logo.png'
import { Link } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import Usar from "../component/Usar";
import Usdi from "../component/Usdi";
import Logform from "../component/Logform";

const Login = () => {
  const [title3, setTitle3] = useState("Select College");

  return (
    <>
      <div className="login-bg">
        <div className="login-inner">
          <div className="login-left">
            <h2 className="login-h2">Hello Student</h2>
            <h1 className='login-h1'>Welcome</h1>
          </div>
          <div className="login-right">
            <div className="right-inner container m-4 d-flex flex-column justify-content-center">
              <img className='logo m-auto' src={logo} alt="logo" />
              <div className="login-form container">
              {/* <p className="login-text m-4 pt-2">Univeristy School of Automation and Robotics</p> */}

              <Dropdown className="py-2" id="cllg">
                  <Dropdown.Toggle className="dropdownBox" id="dropdown-basic">
                    {title3}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setTitle3("University School of Automation & Robotics")}>University School of Automation & Robotics</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTitle3("University School of Design & Innovation")}>University School of Design & Innovation</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <div>
                {title3 == "University School of Automation & Robotics"
                ? <Usar/>
                : <Usdi/>
                }
                </div>
                
                <Logform/>


              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
