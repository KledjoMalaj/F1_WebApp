import {useState} from "react";
import ConstructorsStandingsCard from "./ConstructorsStandingsCard.jsx";
import "./ConstructorsPage.css"
import ConstructorsChart from "./Charts/ConstructorsChart.jsx";


function ConstructorsPage({constructer}){
    const [page, setPage] = useState("CP");


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

    const backgroundColor = teamColors[constructer.name] || "#FFFFFF";

    return(
        <>
        {page === "CP" &&
        <>
            <div className="DP-CloseBtn">
                <h1>Constructors Page</h1>
                <button onClick={() => (setPage("CSH"))}>CLOSE</button>
            </div>

            <div className="CP-Body" style={{backgroundColor: backgroundColor}}>
                <li className="CAR-IMG" dangerouslySetInnerHTML={{__html:constructer.carIMG}} />

                <div className="CP-INFO">
                    <li><a>NAME</a><br></br><br></br>        {constructer.name}</li>
                    <li><a>POINTS</a><br></br><br></br>      {constructer.points}</li>
                    <li><a>WINS</a><br></br><br></br>        {constructer.wins}</li>
                    <li><a>NATIONALITY</a><br></br><br></br> {constructer.nationality}</li>
                    <li><a>DRIVER 1</a><br></br><br></br>    {constructer.FirstDriver}</li>
                    <li><a>DRIVER 2</a><br></br><br></br>    {constructer.SecondDriver}</li>
                    <ul className="CP-D1" dangerouslySetInnerHTML={{__html:constructer.firstDriverIMG}} />
                    <ul className="CP-D2" dangerouslySetInnerHTML={{__html:constructer.secondDriverIMG}} />
                </div>

            </div>
            <div className="chart-div" style={{backgroundColor: backgroundColor,padding:"1px"}}>
                <div className="chart" style={{paddingRight:"75px" ,width: '80%', margin: '2rem auto',borderRadius: "5px",backgroundColor:"#242424"}} >
                    <ConstructorsChart id={constructer.id} color={backgroundColor}/>
                </div>
            </div>
        </>
        }
        {page === "CSH" &&
        <ConstructorsStandingsCard />
        }
        </>
    )
}
export default ConstructorsPage;
