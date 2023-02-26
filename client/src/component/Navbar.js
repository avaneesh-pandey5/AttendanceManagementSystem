import React, { useState } from 'react';
import './../style.css'
import Logo from "../img/logo-dark.png"
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }
  return (
    <>
    <nav>
    <div className="menu-icon" onClick={handleShowNavbar}>
    <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="butt" stroke-linejoin="arcs"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </div>

    <div className={`navbar ${showNavbar && 'active'}`}>
        <ul>
          <li className='pb-4 logo-li my-2'><a className="logo nav-first">
            <img src={Logo} />
            <span className="nav-item">STUDENT</span>
          </a></li>
          <li><Link className='pageLink' to="/dashboard">
            <i className="fas fa-menorah"></i>
            <span className="nav-item">Dashboard</span>
          </Link></li>

          <li><Link className='pageLink' to="/attendance">
            <i className="fas fa-chart-bar"></i>
            <span className="nav-item">Attendance</span>
          </Link>
          </li>

          {/* <li className='my-auto'><a href="#">
              <i className="fas fa-clock"></i>
              <span className="nav-item">TimeTable</span>
            </a>
            </li> */}

          {/* <li><Link className='pageLink' to="/calender">
              <i className="fas fa-clock"></i>
              <span className="nav-item">Calendar</span>
            </Link></li> */}


          {/* <li><a href="#">
              <i className="fas fa-cog"></i>
              <span className="nav-item">Setting</span>
            </a></li> */}

          <li className='logout mb-3'>
            <Link className='pageLink w-200' to="/"><i className="fas fa-sign-out-alt"></i>
              <span className="logout-text w-100"> Logout</span>
            </Link>
          </li>
        </ul>
        {/* <button className='nav-btn nav-close-btn' onClick={showNavbar}>
            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="butt" stroke-linejoin="arcs">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
            </button>

        <button className='nav-btn' onClick={showNavbar}>
            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="butt" stroke-linejoin="arcs"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
        </nav> */}

      </div>
    </nav>
      
    </>
  )
}

export default Navbar