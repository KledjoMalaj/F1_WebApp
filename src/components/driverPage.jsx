import { useState} from "react";
import DriverStandingsCard from "./DriverStandingsCard.jsx";
import "./DriverPage.css"
import DriversChart from "./Charts/DriversChart.jsx";


function DriverPage({driver}) {

    const [page, setPage] = useState("DP");


    const teamColors = {
        "Red Bull": "#1E41FF",
        "Ferrari": "#DC0000",
        "Mercedes": "#00D2BE",
        "McLaren": "#FF8700",
        "Aston Martin": "#006F62",
        "Alpine F1 Team": "#0090FF",
        "Williams": "#005AFF",
        "Sauber": "#52E252",
        "RB F1 Team": "#6692FF",
        "Haas F1 Team": "#B6BABD"
    };

    const backgroundColor = teamColors[driver.constructor] || "#FFFFFF";


    return(
        <>
        {page === "DP"  &&
         <>
         <div className="DP-CloseBtn">
         <h1>Driver Page</h1>
         <button onClick={() => (setPage("DS"))}>CLOSE</button>
         </div>

         <div className="Driver-div" style={{backgroundColor: backgroundColor,borderRadius: "5px"}} >
             <div className="Driver-div2">
                <div className="Driver-Info">
                    <li className="driverIMG" dangerouslySetInnerHTML={{__html:driver.image}} />
                    <li><a>NAME</a><br></br><br></br>            {driver.name} {driver.lastname}</li>
                    <li><a>NUMBER</a><br></br><br></br>          {driver.number}</li>
                    <li><a>POINTS</a><br></br><br></br>          {driver.points}</li>
                    <li><a>WINS</a><br></br><br></br>            {driver.wins}</li>
                    <li><a>BIRTHDAY</a><br></br><br></br>        {driver.birthday}</li>
                    <li><a>NATIONALITY</a><br></br><br></br>     {driver.nationality}</li>
                    <li><a>CONSTRUCTORS</a><br></br><br></br>    {driver.constructor}</li>
                </div>

             <li className="carIMG" dangerouslySetInnerHTML={{__html:driver.carImage}} />
             </div>
         </div>

             <div className="chart-div" style={{backgroundColor: backgroundColor,padding:"10px"}}>
             <div className="chart" style={{paddingRight:"75px", width: '80%', margin: '2rem auto',borderRadius: "5px",backgroundColor:"#242424"}} >
                 <DriversChart driverId={driver.id} color={backgroundColor} driverName={driver.name} />
             </div>
             </div>

         </>
        }

        {page === "DS" &&
        <DriverStandingsCard/>
        }
        </>
    )
}
export default DriverPage;