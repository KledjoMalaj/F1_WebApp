import {useEffect, useState} from "react";
import {FetchPractices, FetchQualifying, RaceData, ResultData} from "../APIs/ergastApi.js";
import "./HomePage.css"
import HomePageChart from "./Charts/HomePageChart.jsx";



function HomePage(){
    const [indexFuture, setIndexFuture] = useState(null);
    const [indexPast, setIndexPast] = useState(null);
    const [pastDate, setpastDate] = useState(null);
    const [qualifying, setqualifying] = useState([]);

    const [practice, setPractice] = useState({
        first: [],
        second: [],
        third: []
    });

    const [winner, setwinner] = useState({
        position: [],
        name: [],
        number: [],
        constructors: [],
        time: []
    });

    const [raceDate, setRaceDate] = useState([]);
    const [raceName, setRaceName] = useState([]);
    const [raceRound, setRaceRound] = useState([]);
    const [raceImage, setRaceImage] = useState([]);
    const [raceCountry, setRaceCountry] = useState([]);
    const [raceCity, setRaceCity] = useState([]);



   useEffect(() => {
       async  function load(){
           const racedata = await RaceData();

           const date = racedata.date;
           const today = new Date();
           const formattedDate = today.toISOString().split('T')[0];
           const futureRace = (date.filter(i => i>formattedDate).map(date => date)[0])
           const indexofFuture = date.indexOf(futureRace);

           const pastRace = (date.filter(i => i<=formattedDate));
           const pastRaceDate = pastRace.map(date => date)[pastRace.length-1];
           const indexofPast = date.indexOf(pastRaceDate);

           const resultData = await ResultData(racedata.round[indexofPast]);

           const practices = await FetchPractices(indexofFuture+1);
           const qualifying = await FetchQualifying(indexofFuture+1);
           console.log(qualifying);


           setRaceDate(futureRace);
           setRaceName(racedata.name);
           setRaceRound(racedata.round);
           setRaceImage(racedata.image);
           setRaceCountry(racedata.country);
           setRaceCity(racedata.city);

           setIndexFuture(indexofFuture)

           setpastDate(pastRaceDate);
           setIndexPast(indexofPast)

           setwinner(resultData)
           setPractice(practices)
           setqualifying(qualifying)
       }
       load();
   },[])


    return (
        <>
            <h1>NEXT RACE</h1>
            <div className="NextRace">
                <div className="HP-Card">
                    <a>Circuit</a><br></br><br></br>
                <div className="HP-IMG" dangerouslySetInnerHTML={{__html: raceImage[indexFuture]}} />

                <div className="HP-Race-Info">
                    <li><a>ROUND :</a>       {raceRound[indexFuture]}</li>    <br></br>
                    <li><a>NAME :</a>        {raceName[indexFuture]}</li>     <br></br>
                    <li><a>DATE :</a>        {raceDate}</li>                  <br></br>
                    <li><a>COUNTRY :</a>     {raceCountry[indexFuture]}</li>  <br></br>
                    <li><a>CITY :</a>        {raceCity[indexFuture]}</li>
                </div>

                </div>
                <div className="HP-Race-Stats">
                    <br></br>
                    <a>Practice :</a><br></br>

                    <div className="HP-Race-Practice">

                        <ul className="FirstP">
                            <li><strong>First Practice</strong></li>
                            <li>Date: {practice.first[0]?.date}</li>
                            <li>Time: {practice.first[0]?.time}</li>
                        </ul>

                        <ul className="SecondP">
                            <li><strong>Second Practice</strong></li>
                            <li>Date: {practice.second[0]?.date}</li>
                            <li>Time: {practice.second[0]?.time}</li>
                        </ul>

                        <ul className="ThirdP">
                            <li><strong>Third Practice</strong></li>
                            <li>Date: {practice.third[0]?.date}</li>
                            <li>Time: {practice.third[0]?.time}</li>
                        </ul>

                    </div><br></br>

                    <a>Qualifying :</a>
                    <div className="Qualifying">
                        <li>Date : {qualifying.date}</li>
                        <li>Time : {qualifying.time}</li>
                    </div>

                </div>

            </div>

            <h1>LAST RACE</h1>
            <div className="LastRace">
                <div className="HP-Card">
                    <a>Circuit</a><br></br><br></br>
                    <div className="HP-IMG2" dangerouslySetInnerHTML={{__html: raceImage[indexPast]}} />
                    <div className="HP-Race-Info">
                        <li><a>ROUND :</a>       {raceRound[indexPast]}</li>     <br></br>
                        <li><a>NAME :</a>        {raceName[indexPast]}</li>      <br></br>
                        <li><a>DATE :</a>        {pastDate}</li>                 <br></br>
                        <li><a>COUNTRY :</a>     {raceCountry[indexPast]}</li>   <br></br>
                        <li><a>CITY :</a>        {raceCity[indexPast]}</li>
                    </div>
                </div>

                <div className="HP-Winers">
                    <a>Top 5 Results :</a>
                    <br></br>

                    <ul className="HP-Winers-labels">
                        <li>POSITION</li>
                        <li>CODE</li>
                        <li>TIME</li>
                        <li>CONSTRUCTORS</li>
                    </ul>

                    <ul className="HP-Winers-firs">
                        <li>{winner.position[0]}</li>
                        <li>{winner.name[0]}</li>
                        <li>{winner.time[0]}</li>
                        <li>{winner.constructors[0]}</li>
                    </ul>

                    <ul className="HP-Winers-second">
                        <li>{winner.position[1]}</li>
                        <li>{winner.name[1]}</li>
                        <li>{winner.time[1]}</li>
                        <li>{winner.constructors[1]}</li>
                    </ul>

                    <ul className="HP-Winers-third">
                        <li>{winner.position[2]}</li>
                        <li>{winner.name[2]}</li>
                        <li>{winner.time[2]}</li>
                        <li>{winner.constructors[2]}</li>
                    </ul>

                    <ul className="HP-Winers-fourth">
                        <li>{winner.position[3]}</li>
                        <li>{winner.name[3]}</li>
                        <li>{winner.time[3]}</li>
                        <li>{winner.constructors[3]}</li>
                    </ul>

                    <ul className="HP-Winers-fifth">
                        <li>{winner.position[4]}</li>
                        <li>{winner.name[4]}</li>
                        <li>{winner.time[4]}</li>
                        <li>{winner.constructors[4]}</li>
                    </ul>
                </div>

            </div>

            <div className="HP-Chart">
                <div>
                <HomePageChart/>
                </div>
            </div>

        </>
    );
}
export default HomePage;