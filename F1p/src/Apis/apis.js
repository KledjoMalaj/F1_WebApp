const year = "2025"

const baseUrl = "https://api.jolpi.ca/ergast/f1"

export async function fetchDrivers(){
  try {
  const res = await fetch(`${baseUrl}/${year}/driverstandings/`)
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
