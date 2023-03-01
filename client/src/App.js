import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Attendance from "./Pages/Attendance";
import About from "./Pages/About";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {token && <Route path="/dashboard" element={<Dashboard />} />}
          {token && <Route path="/attendance" element={<Attendance />} />}
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Navigate replace to="/" />} />
          <Route path="/attendance" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
