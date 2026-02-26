import {fetchDrivers,fetchImg} from "../Apis/apis.js" 
import React, {useEffect, useState} from "react";
import BackButton from "../components/BackButton.jsx";

function DriverPage() {
  const [drivers, setDrivers] = useState([])

  useEffect(() => {
    async function getData(){
      const drivers = await fetchImg()

      setDrivers(drivers)
    }
    getData()
  }, [])

  return(
    <>
      <div className='bg-gray-800 p-2'>
        <div className="grid grid-cols-3 m-3">
          <BackButton/>
          <h1 className='text-white font-mono text-center text-3xl'>Drivers Page</h1>
          <br></br>
        </div>

        <div className='font-mono'>
          <div className='grid grid-cols-7 bg-gray-500 mx-2 my-2 p-3 rounded italic text-xl'>
            <h1></h1>
            <h1 className='text-center'>Position</h1>
            <h1 className='text-center'>Name</h1>
            <h1 className='text-center'>LastName</h1>
            <h1 className='text-center'>Points</h1>
            <h1 className='text-center'>Wins</h1>
            <h1 className='text-center'>Constructors</h1>
        </div>

        {drivers.map(driver => (
        <div key={driver.position} className='bg-gray-400 mx-2 my-2 p-3 rounded grid grid-cols-7 hover:bg-gray-200 cursor-pointer text-xl italic hover:mx-5 transition duration-300 ease-in-out'>

              <div className="w-30 h-32 overflow-hidden mx-auto">
              <img className="w-full h-full object-cover object-top" src={driver.img}></img>
              </div>

            <h1 key={driver.driverId} className='text-center mt-12'>{driver.position}</h1>
            <h1 key={driver.driverId} className='text-center mt-12'>{driver.name}</h1>
            <h1 key={driver.driverId} className='text-center mt-12'>{driver.lastName}</h1>
            <h1 key={driver.driverId} className='text-center mt-12'>{driver.points}</h1>
            <h1 key={driver.driverId} className="text-center mt-12">{driver.wins}</h1>
            <h1 key={driver.driverId} className="text-center mt-12">{driver.constructor}</h1>
        </div>
        ))}

        </div>
      </div>
    </>
  )
}

export default DriverPage
