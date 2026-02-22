import React ,{useEffect,useState} from 'react'
import {fetchRaces,fetchRaceImg} from '../Apis/apis.js'

function RacesPage(){
  const [races, setRaces] = useState([])

  useEffect(() => {
    async function getData(){
      const races = await fetchRaces()
      const raceImg = await fetchRaceImg()

      setRaces(raceImg)
    }
    getData()
  }, [])


  return (
    <>
      <div className='bg-gray-800 font-mono p-3'>
        <h1 className='text-center font-mono text-3xl text-white'>Races Page</h1>

        <div className='bg-gray-500 p-3 m-2 grid grid-cols-6 text-center rounded italic'>
          <h1></h1>
          <h1>Round</h1>
          <h1>Race Name</h1>
          <h1>Location</h1>
          <h1>Date</h1>
          <h1>circuit</h1>
        </div>

        <div>
          {races.map(race => (
            <div className='bg-gray-400 p-5 m-2 rounded grid grid-cols-6 text-center hover:bg-gray-200 cursor-pointer'>
              <div className="w-60 h-60 ">
                <img src={race.img}></img>
              </div>
              <h1 className='mt-25'>{race.round}</h1>
              <h1 className='mt-25'>{race.raceName}</h1>
              <h1 className='mt-25'>{race.location}</h1>
              <h1 className='mt-25'>{race.date}</h1>
              <h1 className='mt-25'>{race.circuit}</h1>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
export default RacesPage
