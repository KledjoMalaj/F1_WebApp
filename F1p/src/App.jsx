import { useState } from 'react'
import {Router, Routes, Route, Link} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HomePage from './pages/homePage.jsx'
import DriverPage from './pages/Driverpage.jsx'
import './App.css'

function App() {

  return (
    <>
        <div>
          <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/drivers" element={<DriverPage/>} />
          </Routes>
        </div>
    </>
  )
}

export default App
