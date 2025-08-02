export const BaseUrl = "https://api.jolpi.ca/ergast/f1/"

async function FetchDriverStandings1(year) {
    const res = await fetch(`${BaseUrl}${year}/driverstandings/`)
    const data = await res.json();
    return data.MRData.StandingsTable.StandingsLists[0].DriverStandings
}
async function FetchConstructorsStandings(Cyear) {
    const res = await fetch(`${BaseUrl}${Cyear}/constructorstandings/`)
    const data = await res.json();
    return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
}
async function FetchRaces(){
    const res = await fetch(`${BaseUrl}/2025/races/`)
    const data = await res.json();
    return data.MRData.RaceTable.Races
}
async function FetchResults1(round){
    const res = await fetch(`${BaseUrl}/2025/${round}/results/`)
    const data = await res.json();
    return data.MRData.RaceTable.Races;
}

export async function FetchDrivers() {
    const res = await fetch(`${BaseUrl}2025/drivers/`)
    const data = await res.json();
    const drivers = data.MRData.DriverTable.Drivers;
    return drivers.map(drivers => drivers.givenName)
}
export async function FetchDriverPosition(year) {
    const driver = await FetchDriverStandings1(year);
    return driver.map(driver => driver.position)

}
export async function FetchDriverByName(year){
    const drivers = await FetchDriverStandings1(year);
    return drivers.map(driver => driver.Driver.givenName)
}
export async function FetchDriverLastname(year){
    const drivers = await FetchDriverStandings1(year);
    return drivers.map(driver => driver.Driver.familyName)
}

export async function FetchDriverStandings(year) {
    const drivers = await FetchDriverStandings1(year);
    return drivers.map(driver => driver.Driver.code)
}

export async function FetchPoints(year) {
    const drivers = await FetchDriverStandings1(year)
    return drivers.map(driver => driver.points)
}
export async function FetchWins(year) {
    const drivers = await FetchDriverStandings1(year)
    return drivers.map(driver => driver.wins)
}

export async function FetchConstructorsD(year) {
    const drivers = await FetchDriverStandings1(year)
    return drivers.map(driver => driver.Constructors[0].name)
}

export async function FetchDnumber(year) {
    const drivers = await FetchDriverStandings1(year)
    return drivers.map(driver => driver.Driver.permanentNumber)
}

export async function FetchConstructors(Cyear) {
    const constructors = await FetchConstructorsStandings(Cyear)
    return constructors.map(constructors => constructors.Constructor.name)

}
export async function FetchConstructorsPoints(Cyear) {
    const constructors = await FetchConstructorsStandings(Cyear)
    return constructors.map(constructors => constructors.points)
}
export async function FetchConstructorsWins(Cyear) {
    const constructors = await FetchConstructorsStandings(Cyear);
    return constructors.map(c => c.wins)
}

export async function FetchCircuits(){
    const races = await FetchRaces()
    const ret =  races.map(races => races.raceName)
    const images = []
    for(let i=0;i<ret.length;i++){
        images.push(`<img src="src/assets/map/${ret[i]}.png" alt="name"/>`)
    }
    return images
}

export async function FetchDriverIMG(year){
    const drivers = await FetchDriverStandings1(year);
    const names = drivers.map(driver => driver.Driver.givenName)
    const images = []
    for(let i=0;i<20;i++){
        images.push(`<img src="src/assets/Drivers/${names[i]}.png" alt="name"/>`)
    }
    return images
}
export async function FetchConstructorsIMG(Cyear){
    const constructors = await FetchConstructorsStandings(Cyear);
    const names = constructors.map(c => c.Constructor.name)
    const images = []
    for(let i=0;i<names.length;i++){
        images.push(`<img src="src/assets/Cars/${names[i]}.png" alt="name"/>`)
    }
    return images;
}

export async function FetchDriverIMG2(team){
    const drivers = await fetch(`https://api.jolpi.ca/ergast/f1/2025/constructors/${team}/drivers/`);
    const res = await drivers.json();
    const result =  res.MRData.DriverTable.Drivers;
    const names = result.map(drivers => drivers.givenName)
    const images = []
    for(let i=0;i<20;i++){
        images.push(`<img src="src/assets/Drivers/${names[i]}.png" alt="name"/>`)
    }
    return images
}

export async function FetchConstructorsPosition(Cyear){
    const constructors = await FetchConstructorsStandings(Cyear);
    return constructors.map(constructors => constructors.position)
}

export async function FetchRaceName(){
    const races = await FetchRaces()
    return races.map(races => races.raceName)
}

export async function FetchRaceRound(){
    const races = await FetchRaces()
    return races.map(races => races.round)
}
export async function FetchRaceDate(){
    const races = await FetchRaces();
    return races.map(races => races.date)
}
export async function FetchRaceCountry(){
    const races = await FetchRaces();
    return races.map(races => races.Circuit.Location.country)
}
export async function FetchRaceCity(){
    const races = await FetchRaces();
    return races.map(races => races.Circuit.Location.locality)
}

export async function FetchResults(round){
    const races = await FetchResults1(round)
    const results = races[0].Results;
    return results.map(r => r.Driver.code);
}

export async function FetchResultTimes(round) {
    const races = await FetchResults1(round);
    if (!races || races.length === 0 || !races[0].Results) {
        console.error("No race results found for round:", round);
        return [];
    }
    return races[0].Results.map(result => result.Time?.time || "N/A");
}

export async function FetchResultNum(round){
    const races = await FetchResults1(round);
    const results = races[0].Results;
    return results.map(r => r.number)
}
export async function FetchResultPoints(round){
    const races = await FetchResults1(round)
    const results = races[0].Results;
    return results.map(races => races.points);
}
export async function FetchResultPosition(round){
    const races = await FetchResults1(round)
    const results = races[0].Results;
    return results.map(races => races.position)
}
export async function FetchResultConstructors(round){
    const races = await FetchResults1(round)
    const results = races[0].Results;
    return results.map(races => races.Constructor.name);
}
export async function FetchCID(Cyear){
    const constructors = await FetchConstructorsStandings(Cyear)
    return  constructors.map(constructors => constructors.Constructor.constructorId)
}
export async function FetchDriversOf(team){
    const drivers = await fetch(`https://api.jolpi.ca/ergast/f1/2025/constructors/${team}/drivers/`);
    const res = await drivers.json();
    const result =  res.MRData.DriverTable.Drivers;
    return result.map(drivers => drivers.givenName)
}
export async function FetchDriversLastNameOf(team){
    const drivers = await fetch(`https://api.jolpi.ca/ergast/f1/2025/constructors/${team}/drivers/`);
    const res = await drivers.json();
    const result =  res.MRData.DriverTable.Drivers;
    return result.map(drivers => drivers.familyName)
}
export async function FetchDriversBirthday(year){
    const driver = await FetchDriverStandings1(year);
    return driver.map(i=>i.Driver.dateOfBirth);
}
export async function FetchDriversNationality(year){
    const driver = await FetchDriverStandings1(year);
    return driver.map(i=>i.Driver.nationality)
}
export async function FetchDriversID(year){
    const driver = await FetchDriverStandings1(year);
    return driver.map(i=>i.Driver.driverId)
}
export async function FetchConstructorsNationality(Cyear){
    const constructors = await FetchConstructorsStandings(Cyear);
    return constructors.map(i=>i.Constructor.nationality)
}
export async function RaceData(){
    return {
        name: await FetchRaceName(),
        round: await FetchRaceRound(),
        date: await FetchRaceDate(),
        country: await FetchRaceCountry(),
        city: await FetchRaceCity(),
        image: await FetchCircuits()
    };
}
export async function ResultData(round){
    return {
        name : await FetchResults(round),
        position : await FetchResultPosition(round),
        number : await FetchResultNum(round),
        constructors : await FetchResultConstructors(round),
        time : await FetchResultTimes(round),
    }
}

export async function FetchDriverResults(year, driverId) {
    const res = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/drivers/${driverId}/results/`);
    const data = await res.json();
    const races = data.MRData.RaceTable.Races;
    const points = races.map(race => parseFloat(race.Results[0].points));
    return points;
}

export async function FetchConstructorsResults(year, constructorId) {
    const res = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/constructors/${constructorId}/results/`);
    const data = await res.json();
    const races = data.MRData.RaceTable.Races;
    const points = races.map(race => race.Results.reduce((sum, result) => sum + parseFloat(result.points), 0));
    return points;
}

