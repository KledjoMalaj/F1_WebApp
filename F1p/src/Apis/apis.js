import driversFile from "./driversData.json"
import teamsFile from "./teamsData.json"
import raceFile from "./racesData.json"

const year = "2025"

const baseUrl = "https://api.jolpi.ca/ergast/f1"

export async function fetchDrivers(){
  try {
  const res = await fetch(`${baseUrl}/${year}/driverstandings`)
  const data = await res.json()

  let driversArr = []

  data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(driver => {
      let drivers = {
        driverId:driver.Driver.driverId,
        name:driver.Driver.givenName,
        lastName:driver.Driver.familyName,
        constructor:driver.Constructors[0].name,
        wins:driver.wins,
        position:driver.position,
        points:driver.points,
      }
      driversArr.push(drivers)
    })

    return driversArr
  } catch (err) {
    return []
  }
}

export async function fetchImg(){
  const data = await fetchDrivers()
  const drivers = data.map(driver => {
    const imageObj = driversFile.find(img => img.driverId === driver.driverId)
  return {
    ...driver,
    img:imageObj ? imageObj.img : null
    }
  })
  return drivers
}

export async function fetchConstructors(){
  try{
    const res = await fetch(`${baseUrl}/${year}/constructorstandings`)
    const data = await res.json()

    let constructorArr = []

    data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map(team => {
      let constructors = {
        id:team.Constructor.constructorId,
        name:team.Constructor.name,
        nationality:team.Constructor.nationality,
        points:team.points,
        position:team.position,
        wins:team.wins,
      }

      constructorArr.push(constructors)
    })

    return constructorArr
  }catch (err){
    return []
  }
}

export async function fetchTeamsImg(){
  const teams = await fetchConstructors()
  const data = teams.map(team => {
    const imgObj = teamsFile.find(img => img.teamId === team.id)
    return {
      ...team,
      img:imgObj ? imgObj.img : null
    }
  })
  return data
}

export async function fetchRaces(){
  try{
  const res = await fetch(`${baseUrl}/${year}/races`)
  const data = await res.json()
  let racesArr = []

  data.MRData.RaceTable.Races.map(race => {
    let raceObj = {
      round:race.round,
      raceId:race.Circuit.circuitId,
      raceName:race.raceName,
      location:race.Circuit.Location.country,
      circuit:race.Circuit.circuitName,
      date:race.date,
      time:race.time
    }
    racesArr.push(raceObj)
  })

  return racesArr

  }catch (err){
    return []
  }
}

export async function fetchRaceImg(){
  const races = await fetchRaces()
  const data = races.map(race => {
    const imgObj = raceFile.find(img => race.raceId === img.raceId)
    return {
      ...race,
      img:imgObj ? imgObj.img : null
    }
  })

  return data
}

