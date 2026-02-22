import {fetchConstructors} from "../Apis/apis.js"
import React, {useEffect,useState} from "react"

function ConstructorPage(){
  const [teams , setTeams] = useState([]) 

  useEffect(()=>{
    async function getData(){
      const constructors = await fetchConstructors()
      setTeams(constructors)
    }
    getData()
  },[])

  return(
    <>
      <div className='bg-gray-800 p-2 font-mono'>
      <h1 className='text-white text-center font-mono'>Constructors Page</h1>
        <div className='bg-gray-500 grid grid-cols-5 m-2 p-3 rounded italic'>
          <h1 className='text-center'>Position</h1>
          <h1 className='text-center'>Name</h1>
          <h1 className='text-center'>Nationality</h1>
          <h1 className='text-center'>Points</h1>
          <h1 className='text-center'>Wins</h1>
        </div>
      <div>
        {teams.map(team => (
          <div key={team.id} className="bg-gray-400 m-2 p-3 rounded grid grid-cols-5 hover:bg-gray-200 cursor-pointer">
            <h1 key={team.id} className='text-center'>{team.position}</h1>
            <h1 key={team.id} className='text-center'>{team.name}</h1>
            <h1 key={team.id} className='text-center'>{team.nationality}</h1>
            <h1 key={team.id} className='text-center'>{team.points}</h1>
            <h1 key={team.id} className='text-center'>{team.wins}</h1>
          </div>
        ))}
      </div>
      </div>
    </>
  )
}

export default ConstructorPage
