import {Router, Routes, Route, Link} from 'react-router-dom'
import HomePage from './pages/homePage.jsx'
import DriverPage from './pages/Driverpage.jsx'
import ConstructorPage from './pages/ConstructorPage.jsx'
import RacesPage from './pages/RacesPage.jsx'
import './App.css'

function App() {

  return (
    <>
        <div>
          <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/drivers" element={<DriverPage/>} />
              <Route path='/constructors' element={<ConstructorPage/>} />
              <Route path='/races' element={<RacesPage/>} />
          </Routes>
        </div>
    </>
  )
}

export default App
