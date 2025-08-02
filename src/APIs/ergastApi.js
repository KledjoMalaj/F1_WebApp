export const BaseUrl = "https://api.jolpi.ca/ergast/f1/"

async function FetchDriverStandings1(year) {
    try {
        const res = await fetch(`${BaseUrl}${year}/driverstandings`)
        const data = await res.json();
        return data.MRData.StandingsTable.StandingsLists[0].DriverStandings
    }catch(err) {
        console.error("Failed to fetch DriverStandings:", err.message);
        return [];
    }
}

async function FetchConstructorsStandings(Cyear) {
    try {
        const res = await fetch(`${BaseUrl}${Cyear}/constructorstandings/`)
        const data = await res.json();
        return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
    }catch(err) {
        console.error("Failed to fetchConstructorsStandings", err.message);
        return [];
    }
}
async function FetchRaces(){
    try {
        const res = await fetch(`${BaseUrl}/2025/races/`)
        const data = await res.json();
        return data.MRData.RaceTable.Races
    }catch (err) {
        console.error("Failed to fetchRaces", err.message);
        return [];
    }
}
async function FetchResults1(round){
    try {
        const res = await fetch(`${BaseUrl}/2025/${round}/results/`)
        const data = await res.json();
        return data.MRData.RaceTable.Races;
    }catch (err){
        console.error("Failed to fetch Races", err.message);
        return [];
    }
}

export async function FetchDrivers() {
    try {
        const res = await fetch(`${BaseUrl}2025/drivers/`)
        const data = await res.json();
        const drivers = data.MRData.DriverTable.Drivers;
        return drivers.map(drivers => drivers.givenName)
    }catch(err) {
        console.error("Failed to fetch Drivers", err.message);
        return [];
    }
}

export async function FetchDriverPosition(year) {
    try {
        const driver = await FetchDriverStandings1(year);
        return driver.map(driver => driver.position)
    }catch(err) {
        console.error("Failed to fetch Drivers", err.message);
        return [];
    }
}

export async function FetchDriverByName(year){
    try {
        const drivers = await FetchDriverStandings1(year);
        return drivers.map(driver => driver.Driver.givenName)
    }catch(err) {
        console.error("Failed to fetch Drivers Name", err.message);
        return [];
    }
}
export async function FetchDriverLastname(year){
    try {
        const drivers = await FetchDriverStandings1(year);
        return drivers.map(driver => driver.Driver.familyName)
    }catch (err){
        console.error("Failed to fetch Drivers Lastname", err.message);
        return [];
    }
}

export async function FetchDriverStandings(year) {
    try {
        const drivers = await FetchDriverStandings1(year);
        return drivers.map(driver => driver.Driver.code)
    }catch(err) {
        console.error("Failed to fetch Drivers Code", err.message);
        return [];
    }
}

export async function FetchPoints(year) {
    try {
        const drivers = await FetchDriverStandings1(year)
        return drivers.map(driver => driver.points)
    }catch(err) {
        console.error("Failed to fetch Drivers Points", err.message);
    }
}
export async function FetchWins(year) {
    try {
        const drivers = await FetchDriverStandings1(year)
        return drivers.map(driver => driver.wins)
    }catch(err) {
        console.error("Failed to fetch Drivers Wins", err.message);
        return [];
    }
}

export async function FetchConstructorsD(year) {
    try {
        const drivers = await FetchDriverStandings1(year)
        return drivers.map(driver => driver.Constructors[0].name)
    }catch(err) {
        console.error("Failed to fetch ConstructorsDrivers", err.message);
        return [];
    }
}

export async function FetchDnumber(year) {
    try {
        const drivers = await FetchDriverStandings1(year)
        return drivers.map(driver => driver.Driver.permanentNumber)
    }catch(err) {
        console.error("Failed to fetch DriverNumber", err.message);
        return [];
    }
}

export async function FetchConstructors(Cyear) {
    try {
        const constructors = await FetchConstructorsStandings(Cyear)
        return constructors.map(constructors => constructors.Constructor.name)
    }catch(err) {
        console.error("Failed to fetchConstructors", err.message);
        return []
    }
}

export async function FetchConstructorsPoints(Cyear) {
    try {
        const constructors = await FetchConstructorsStandings(Cyear)
        return constructors.map(constructors => constructors.points)
    }catch(err) {
        console.error("Failed to fetchConstructorsPoints", err.message);
        return [];
    }
}
export async function FetchConstructorsWins(Cyear) {
    try {
        const constructors = await FetchConstructorsStandings(Cyear);
        return constructors.map(c => c.wins)
    }catch(err) {
        console.error("Failed to fetchConstructors Wins", err.message);
        return [];
    }
}

export async function FetchCircuits(){
    try {
        const races = await FetchRaces()
        const ret = races.map(races => races.raceName)
        const images = []
        for (let i = 0; i < ret.length; i++) {
            images.push(`<img src="src/assets/map/${ret[i]}.png" alt="name"/>`)
        }
        return images
    }catch(err) {
        console.error("Failed to fetchCircuits IMG", err.message);
        return [];
    }
}

export async function FetchDriverIMG(year){
    try {
        const drivers = await FetchDriverStandings1(year);
        const names = drivers.map(driver => driver.Driver.givenName)
        const images = []
        for (let i = 0; i < 20; i++) {
            images.push(`<img src="src/assets/Drivers/${names[i]}.png" alt="name"/>`)
        }
        return images
    }catch(err) {
        console.error("Failed to fetchDriverIMG", err.message);
        return [];
    }
}
export async function FetchConstructorsIMG(Cyear){
    try {
        const constructors = await FetchConstructorsStandings(Cyear);
        const names = constructors.map(c => c.Constructor.name)
        const images = []
        for (let i = 0; i < names.length; i++) {
            images.push(`<img src="src/assets/Cars/${names[i]}.png" alt="name"/>`)
        }
        return images;
    }catch(err) {
        console.error("Failed to fetchConstructorsIMG", err.message);
        return [];
    }
}

export async function FetchDriverIMG2(team){
    try {
        const drivers = await fetch(`https://api.jolpi.ca/ergast/f1/2025/constructors/${team}/drivers/`);
        const res = await drivers.json();
        const result = res.MRData.DriverTable.Drivers;
        const names = result.map(drivers => drivers.givenName)
        const images = []
        for (let i = 0; i < 20; i++) {
            images.push(`<img src="src/assets/Drivers/${names[i]}.png" alt="name"/>`)
        }
        return images
    }catch (err){
        console.error("Failed to fetchDriverIMG2", err.message);
        return [];
    }
}

export async function FetchConstructorsPosition(Cyear){
    try {
        const constructors = await FetchConstructorsStandings(Cyear);
        return constructors.map(constructors => constructors.position)
    }catch(err) {
        console.error("Failed to fetchConstructorsPosition", err.message);
        return [];
    }
}

export async function FetchRaceName(){
    try {
        const races = await FetchRaces()
        return races.map(races => races.raceName)
    }catch(err) {
        console.error("Failed to fetchRaceName", err.message);
        return [];
    }
}

export async function FetchRaceRound(){
    try {
        const races = await FetchRaces()
        return races.map(races => races.round)
    }catch(err) {
        console.error("Failed to fetchRaceRound", err.message);
        return [];
    }
}
export async function FetchRaceDate(){
    try {
        const races = await FetchRaces();
        return races.map(races => races.date)
    }catch(err) {
        console.error("Failed to fetchRaceDate", err.message);
        return [];
    }
}
export async function FetchRaceCountry(){
    try {
        const races = await FetchRaces();
        return races.map(races => races.Circuit.Location.country)
    }catch(err) {
        console.error("Failed to fetchRaceCountry", err.message);
        return [];
    }
}
export async function FetchRaceCity(){
    try {
        const races = await FetchRaces();
        return races.map(races => races.Circuit.Location.locality)
    }catch(err) {
        console.error("Failed to fetchRaceCity", err.message);
        return [];
    }
}

export async function FetchResults(round){
    try {
        const races = await FetchResults1(round)
        const results = races[0].Results;
        return results.map(r => r.Driver.code);
    }catch(err) {
        console.error("Failed to fetchResults", err.message);
        return [];
    }
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
    try {
        const races = await FetchResults1(round);
        const results = races[0].Results;
        return results.map(r => r.number)
    }catch(err) {
        console.error("Failed to fetchResultNum", err.message);
        return [];
    }
}
export async function FetchResultPoints(round){
    try {
        const races = await FetchResults1(round)
        const results = races[0].Results;
        return results.map(races => races.points);
    }catch(err) {
        console.error("Failed to fetchResultPoints", err.message);
        return [];
    }
}
export async function FetchResultPosition(round){
    try {
        const races = await FetchResults1(round)
        const results = races[0].Results;
        return results.map(races => races.position)
    }catch(err) {
        console.error("Failed to fetchResultPosition", err.message);
        return [];
    }
}
export async function FetchResultConstructors(round){
    try {
        const races = await FetchResults1(round)
        const results = races[0].Results;
        return results.map(races => races.Constructor.name);
    }catch (err){
        console.error("Failed to fetchResultConstructors", err.message);
        return [];
    }
}
export async function FetchCID(Cyear){
    try {
        const constructors = await FetchConstructorsStandings(Cyear)
        return constructors.map(constructors => constructors.Constructor.constructorId)
    }catch(err) {
        console.error("Failed to fetchCID", err.message);
        return [];
    }
}
export async function FetchDriversOf(team){
    try {
        const drivers = await fetch(`https://api.jolpi.ca/ergast/f1/2025/constructors/${team}/drivers/`);
        const res = await drivers.json();
        const result = res.MRData.DriverTable.Drivers;
        return result.map(drivers => drivers.givenName)
    }catch(err) {
        console.error("Failed to fetchDrivers", err.message);
        return [];
    }
}
export async function FetchDriversLastNameOf(team){
    try {
        const drivers = await fetch(`https://api.jolpi.ca/ergast/f1/2025/constructors/${team}/drivers/`);
        const res = await drivers.json();
        const result = res.MRData.DriverTable.Drivers;
        return result.map(drivers => drivers.familyName)
    }catch(err) {
        console.error("Failed to fetchDriversLastName", err.message);
        return [];
    }
}
export async function FetchDriversBirthday(year){
    try {
        const driver = await FetchDriverStandings1(year);
        return driver.map(i => i.Driver.dateOfBirth);
    }catch(err) {
        console.error("Failed to fetchDriversBirthday", err.message);
        return [];
    }
}
export async function FetchDriversNationality(year){
    try {
        const driver = await FetchDriverStandings1(year);
        return driver.map(i => i.Driver.nationality)
    }catch(err) {
        console.error("Failed to fetchDriversNationality", err.message);
        return [];
    }
}
export async function FetchDriversID(year){
    try {
        const driver = await FetchDriverStandings1(year);
        return driver.map(i => i.Driver.driverId)
    }catch(err) {
        console.error("Failed to fetchDriversID", err.message);
        return [];
    }
}
export async function FetchConstructorsNationality(Cyear){
    try {
        const constructors = await FetchConstructorsStandings(Cyear);
        return constructors.map(i => i.Constructor.nationality)
    }catch(err) {
        console.error("Failed to fetchConstructorsNationality", err.message);
        return [];
    }
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
    try {
        const res = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/drivers/${driverId}/results/`);
        const data = await res.json();
        const races = data.MRData.RaceTable.Races;
        const points = races.map(race => parseFloat(race.Results[0].points));
        return points;
    }catch (err){
        console.error("Failed to fetchDriverResults", err.message);
        return [];
    }
}

export async function FetchConstructorsResults(year, constructorId) {
    try {
        const res = await fetch(`https://api.jolpi.ca/ergast/f1/${year}/constructors/${constructorId}/results/`);
        const data = await res.json();
        const races = data.MRData.RaceTable.Races;
        const points = races.map(race => race.Results.reduce((sum, result) => sum + parseFloat(result.points), 0));
        return points;
    }catch(err){
        console.errot("Failed to fetchConstructorsResults", err.message);
        return [];
    }
}