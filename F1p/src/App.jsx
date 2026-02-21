import { useState } from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HomePage from './pages/homePage.jsx'
import './App.css'

function App() {

  return (
    <>
      <div>
        <nav>
          <Link to='/'><HomePage/></Link>
        </nav>

        <Routes>
          <Route path='/' element={HomePage}/>
        </Routes>
      </div>
    </>
  )
}

export default App
