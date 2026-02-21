import {fetchDrivers} from "../Apis/apis.js" 
import React, {useEffect, useState} from "react";

function DriverPage() {
  const [drivers, setDrivers] = useState([])

  useEffect(() => {
    async function getData(){
      const drivers = await fetchDrivers()
      setDrivers(drivers)
    }
    getData()
  }, [])

  return(
    <>
      <h1>Drivers Page</h1>
      <div>
        {drivers.map(driver => (
        <div key={driver.position} className='bg-gray-400 m-3 p-3 flex justify-between'>
            <h1 key={driver.position}>{driver.position}</h1>
            <h1 key={driver.position}>{driver.name}</h1>
            <h1 key={driver.position}>{driver.lastName}</h1>
            <h1 key={driver.position}>{driver.points}</h1>
            <h1 key={driver.position}>{driver.wins}</h1>
            <h1 key={driver.postition}>{driver.constructor}</h1>
        </div>
        ))}
      </div>
    </>
  )
}

export default DriverPage
