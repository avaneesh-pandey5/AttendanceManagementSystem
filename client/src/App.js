import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import Attendance from './Pages/Attendance'
import About from './Pages/About'

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/attendance' element={<Attendance/>} />
        <Route path='/about' element={<About/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
