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
      <h1>Constructors Page</h1>
      <div>
        {teams.map(team => (
          <div key={team.id} className="bg-gray-400 m-3 p-3 flex justify-between">
            <h1 key={team.id}>{team.position}</h1>
            <h1 key={team.id}>{team.name}</h1>
            <h1 key={team.id}>{team.nationality}</h1>
            <h1 key={team.id}>{team.points}</h1>
            <h1 key={team.id}>{team.wins}</h1>
          </div>
        ))}
      </div>
    </>
  )
}

export default ConstructorPage
