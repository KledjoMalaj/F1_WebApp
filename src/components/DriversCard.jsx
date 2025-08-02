import { useRef, useEffect } from "react";
import './DriverCard.css';
import {
    FetchConstructorsD,
    FetchDnumber,
    FetchDriverStandings,
    FetchPoints,
    FetchWins
} from "../APIs/ergastApi.js";

function DriversCard() {

    const year1 = useRef(null);
    const btnLoad = useRef(null);
    const drivers = useRef(null);
    const number = useRef(null);
    const points = useRef(null);
    const wins = useRef(null);
    const constructors = useRef(null);

    useEffect(() => {
        const btn = btnLoad.current;

        const handleClick = async () => {
            const year = year1.current.value;

            if (!year) {
                alert("Please enter a year!");
                return;
            }

            const driverStanding = await FetchDriverStandings(year);
            const driverPoints = await FetchPoints(year);
            const driverWins = await FetchWins(year);
            const driverConstructors = await FetchConstructorsD(year);
            const driverNumber = await FetchDnumber(year);



            drivers.current.innerHTML = "";
            number.current.innerHTML = "";
            points.current.innerHTML = "";
            wins.current.innerHTML = "";
            constructors.current.innerHTML = "";


            driverStanding.forEach(code => {
                const li = document.createElement("li");
                li.textContent = code;
                drivers.current.appendChild(li);
            });

            driverNumber.forEach(code => {
                const li = document.createElement("li");
                li.textContent = code;
                number.current.appendChild(li);
            });

            driverPoints.forEach(code => {
                const li = document.createElement("li");
                li.textContent = code;
                points.current.appendChild(li);
            });

            driverWins.forEach(code => {
                const li = document.createElement("li");
                li.textContent = code;
                wins.current.appendChild(li);
            });

            driverConstructors.forEach(code => {
                const li = document.createElement("li");
                li.textContent = code;
                constructors.current.appendChild(li);
            });
        };

        btn.addEventListener("click", handleClick);

        return () => {
            btn.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <>
            <div className="driverstandings">

                <div className="inputs">
                    <a>Driver Standings</a>
                    <input id="year" ref={year1} type="number" placeholder="Enter Year"/>
                    <button type="submit" id="Btnload" ref={btnLoad}>Load</button>
                    <br/>
                </div>

                <div className="heading">
                    <li>Name</li>
                    <li>Number</li>
                    <li>Points</li>
                    <li>Wins</li>
                    <li>Constructors</li>
                </div><br/>

                <div className="listdiv">
                    <li id="drivers" ref={drivers}></li>
                    <li id="number" ref={number}></li>
                    <li id="points" ref={points}></li>
                    <li id="wins" ref={wins}></li>
                    <li id="constructors" ref={constructors}></li>
                </div>

            </div>
        </>
    );
}

export default DriversCard;
