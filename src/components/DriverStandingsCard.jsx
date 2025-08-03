import DriversCard from "./DriversCard.jsx";
import React, {useEffect, useState} from "react";
import "./DriverStandingsCard.css"
import {
    FetchConstructorsD,
    FetchDriverByName,
    FetchDriverStandings,
    FetchDriverIMG,
    FetchPoints,
    FetchWins,
    FetchDriverPosition,
    FetchDriverLastname,
    FetchDnumber,
    FetchDriversBirthday,
    FetchDriversNationality,
    FetchDriversID,
} from "../APIs/ergastApi.js";
import DriverPage from "./driverPage.jsx";


function DriverStandingsCard(){
    const [page, setPage] = useState("DS");
    const [selectedDriver, setSelectedDriver] = useState(null);

    const [ drivers, setDrivers] = useState([]);
    const [ points, setPoints] = useState([]);
    const [ wins, setWins] = useState([]);
    const [ constructors, setConstructors] = useState([]);
    const [ names, setNames] = useState([]);
    const [ lastnames, setLastnames] = useState([]);
    const [ position, setPosition] = useState([]);
    const [ number,setNumber] = useState([]);
    const [ images, setImages] = useState([]);
    const [ C_images, setC_images] = useState([]);
    const [ birthday, setBirthday] = useState([]);
    const [ nationality, setNationality] = useState([]);
    const [ driverId, setDriverId] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const drivers = await FetchDriverStandings(2025);
            const points = await FetchPoints(2025)
            const wins = await FetchWins(2025)
            const constructors = await FetchConstructorsD(2025)
            const name = await FetchDriverByName(2025)
            const lastname = await FetchDriverLastname(2025)
            const number = await FetchDnumber(2025)
            const position = await FetchDriverPosition(2025)
            const images = await FetchDriverIMG(2025)
            const birthday = await FetchDriversBirthday(2025)
            const nationality = await FetchDriversNationality(2025)
            const id = await FetchDriversID(2025);


            function GetCImg(){
                const img = [];
                for(let i=0; i<20; i++){
                    img.push(`<img src="/Cars/${constructors[i]}.png" alt="name"/>`);
                }
                return img;
            }


            const C_images = GetCImg();
            setNationality(nationality)
            setBirthday(birthday);
            setDrivers(drivers);
            setPoints(points);
            setWins(wins);
            setConstructors(constructors);
            setNames(name);
            setLastnames(lastname);
            setNumber(number)
            setPosition(position);
            setImages(images);
            setC_images(C_images);
            setDriverId(id);
        }
        fetchData();
    }, []);


    function handleDriverClick(index){
        const driverData = {
            image: images[index],
            position: position[index],
            name: names[index],
            lastname: lastnames[index],
            number: number[index],
            code: drivers[index],
            points: points[index],
            wins: wins[index],
            constructor: constructors[index],
            carImage: C_images[index],
            birthday: birthday[index],
            nationality: nationality[index],
            id : driverId[index],
        };

        setSelectedDriver(driverData);
    }

    if (selectedDriver) {
        return <DriverPage driver={selectedDriver} />;
    }



    return(
      <>
          <div className="heading2">
          <div className="DSH-input">
          <li className="DSH-Btn" onClick={() => setPage("DSH")} >Driver Standing History</li>
          <li className="DHS-CloseBtn" onClick={() => setPage("DS")}>Close</li>
          </div>
          </div>
          {page === "DSH" &&
              <>
              <h1>Driver Standings History</h1>
              <DriversCard/>
              </>
          }
          {page === "DS" &&
              <>
                  <h1>Driver Standings 2025</h1>

                  <div className="DriverData">
                      <li className="D-img">
                          {images.map((image, index) => (
                              <>
                                  <div className="lists">
                              <ul onClick={() => handleDriverClick(index)} dangerouslySetInnerHTML={{ __html: image }} />
                              <li> <a>POSITION</a><br></br><br></br> {position[index]}</li>
                              <li> <a>NAME</a><br></br><br></br> {names[index]} {lastnames[index]}</li>
                              <li> <a>NUMBER</a><br></br><br></br> {number[index]}</li>
                              <li> <a>CODE</a><br></br><br></br>  {drivers[index]}</li>
                              <li> <a>POINTS</a><br></br><br></br> {points[index]}</li>
                              <li> <a>WINS</a><br></br><br></br> {wins[index]}</li>
                              <li> <a>CONSTRUCTORS</a><br></br><br></br> {constructors[index]}</li>
                              <li className="CAR" dangerouslySetInnerHTML={{ __html: C_images[index]}} />
                                  </div>
                              </>
                          ))}
                      </li>
                  </div>
              </>
          }
      </>
    );
}
export default DriverStandingsCard;