import images from "./images.json"
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
    const imageObj = images.find(img => img.driverId === driver.driverId)
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
