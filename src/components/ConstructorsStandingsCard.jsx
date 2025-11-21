import React, {useEffect, useState} from "react";
import ConstructorsCard from "./ConstructorsCard.jsx";
import ConstructorsPage from "./ConstructorsPage.jsx";
import "./ConstructorsStandingsCard.css"
import {
    FetchCID,
    FetchConstructors,
    FetchConstructorsIMG, FetchConstructorsNationality,
    FetchConstructorsPoints,
    FetchConstructorsPosition,
    FetchConstructorsWins,
    FetchDriverIMG2,
    FetchDriversLastNameOf,
    FetchDriversOf
} from "../APIs/ergastApi.js";


function ConstructorsStandingsCard() {
    const [ page, setPage] = useState("CS");

    const [ SelectedConstructor, setSelectedConstructor ] = useState(null);

    const [ images, setImages] = useState([]);
    const [ name, setName] = useState([]);
    const [ position, setPosition] = useState([]);
    const [ points, setPoints] = useState([])
    const [ wins, setWins] = useState([])
    const [ drivers, setDrivers] = useState([])
    const [ driversLN,setDriversLN] = useState([])
    const [ driversIMG, setDriversIMG] = useState([])
    const [ nationality, setNationality] = useState([])
    const [ cId, setCId] = useState([])


    useEffect(() => {
        async function fetchData() {
            const name = await FetchConstructors(2025);
            const images = await FetchConstructorsIMG(2025)
            const position = await FetchConstructorsPosition(2025);
            const points = await FetchConstructorsPoints(2025);
            const wins = await FetchConstructorsWins(2025);
            const ID = await FetchCID(2025)
            const nationality = await FetchConstructorsNationality(2025);

            const allDrivers = await Promise.all(
                ID.map(async (team) => {
                    return await FetchDriversOf(team);
                })
            );
            const DriversLastName = await Promise.all(
                ID.map(async (team) => {
                    return await FetchDriversLastNameOf(team);
                })
            )


            const DriversIMGs = await Promise.all(
                ID.map(async (team) => {
                    return await FetchDriverIMG2(team);
                })
            )


            if (allDrivers[2] && allDrivers[2].length > 2) {
                allDrivers[2] = allDrivers[2].slice(1, 3);
                DriversLastName[2] = DriversLastName[2].slice(1, 3);

                if (DriversIMGs[2] && DriversIMGs[2].length > 2) {
                    DriversIMGs[2] = DriversIMGs[2].slice(1,3);
                }

            }

            if (allDrivers[9] && allDrivers[9].length >= 3) {
                allDrivers[9] = [allDrivers[9][0], allDrivers[9][2]];
                DriversLastName[9] = [DriversLastName[9][0], DriversLastName[9][2]];

                if (DriversIMGs[9] && DriversIMGs[9].length >= 3) {
                    DriversIMGs[9] = [DriversIMGs[9][0], DriversIMGs[9][2]];
                }

            }

            setDriversIMG(DriversIMGs)
            setDriversLN(DriversLastName);
            setDrivers(allDrivers);
            setName(name);
            setImages(images);
            setPosition(position);
            setPoints(points);
            setWins(wins);
            setNationality(nationality);
            setCId(ID)
        }
      fetchData()
    },[])

    function handleConstructorsClick(index){
        const constructorsData = {
            carIMG: images[index],
            name: name[index],
            points: points[index],
            wins: wins[index],
            FirstDriver: [drivers[index][0]," ",driversLN[index][0]],
            SecondDriver: [drivers[index][1]," ",driversLN[index][1]],
            firstDriverIMG: driversIMG[index][0],
            secondDriverIMG: driversIMG[index][1],
            nationality: nationality[index],
            id: cId[index]
        }
        setSelectedConstructor(constructorsData);
    }
    if (SelectedConstructor) {
        return <ConstructorsPage constructer={SelectedConstructor} />;
    }

    return(

        <>
            <div className="CSH-input">
            <li className="CSH-Btn" onClick={() => setPage("CSH")}>Constructors Standings History</li>
            <li className="CSH-CloseBtn" onClick={() => setPage("CS")}>Close</li>
            </div>

            {page === "CSH" &&
            <>
            <h1>Constructors Standings History</h1>
            <ConstructorsCard/>
            </>
            }

            {page === "CS" &&
            <>
            <h1>Constructors Standings 2025</h1>

                {images.map((image, index) => (
                    <>
                        <div className="CSH-lists">
                            <ul onClick={() => handleConstructorsClick(index)} dangerouslySetInnerHTML={{ __html: image }} />
                            <li><a>POSITION</a><br></br><br></br> {position[index]}</li>
                            <li><a>NAME</a><br></br><br></br>     {name[index]}</li>
                            <li><a>POINTS</a><br></br><br></br>   {points[index]}</li>
                            <li><a>WINS</a><br></br><br></br>     {wins[index]}</li>

                        <div className="CSH-Drivers">
                            <li><a>DRIVER 1</a><br></br>
                                <span dangerouslySetInnerHTML={{ __html: driversIMG[index][0] }} /><br></br>
                                {drivers[index][0]} {driversLN[index][0]}
                            </li>
                            <li><a>DRIVER 2</a><br></br>
                                <span dangerouslySetInnerHTML={{ __html: driversIMG[index][1] }} /><br></br>
                                {drivers[index][1]} {driversLN[index][1]}
                            </li>
                        </div>

                        </div>
                    </>
                ))}

            </>
            }
        </>
    )
}
export default ConstructorsStandingsCard;