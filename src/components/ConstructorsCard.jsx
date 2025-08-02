import { useRef, useEffect } from "react";
import './ConstructorsCard.css';
import {
    FetchConstructors,
    FetchConstructorsPoints, FetchConstructorsPosition,
    FetchConstructorsWins
} from "../APIs/ergastApi.js";

function ConstructorsCard() {
    const year = useRef(null);
    const btnLoad = useRef(null);
    const nameC = useRef(null);
    const points = useRef(null);
    const wins = useRef(null);
    const positions = useRef(null);

    useEffect(() => {
        const btn = btnLoad.current;

        const handleClick = async () => {
            const Cyear = year.current.value;
            if (!Cyear) {
                alert("Please enter a year!");
                return;
            }

            const constructorsName = await FetchConstructors(Cyear);
            const constructorsPoints = await FetchConstructorsPoints(Cyear);
            const constructorsWins = await FetchConstructorsWins(Cyear);
            const position = await FetchConstructorsPosition(Cyear);

            console.log(constructorsName, constructorsPoints, constructorsWins, position);

            nameC.current.innerHTML = "";
            points.current.innerHTML = "";
            wins.current.innerHTML = "";
            positions.current.innerHTML = "";

            constructorsName.forEach(code => {
                const li = document.createElement("li");
                li.textContent = code;
                nameC.current.appendChild(li);
            });

            constructorsPoints.forEach(code => {
                const li = document.createElement("li");
                li.textContent = code;
                points.current.appendChild(li);
            });

            constructorsWins.forEach(code => {
                const li = document.createElement("li");
                li.textContent = code;
                wins.current.appendChild(li);
            });
            position.forEach(code => {
                const li = document.createElement("li");
                li.textContent = code;
                positions.current.appendChild(li);
            })
        };

        btn.addEventListener("click", handleClick);

        return () => {
            btn.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <>
            <div className="ConstuctorsStandings">

                <div className="inputsC">
                    <a>Constructors Standings</a>
                    <input id="Cyear" type="number" ref={year} placeholder="Enter year" />
                    <button type="submit" id="CBtnload" ref={btnLoad}>Load</button>
                    <br /><br />
                </div>

                <div className="headingC">
                    <li>Position</li>
                    <li>Name</li>
                    <li>Points</li>
                    <li>Wins</li>
                </div>
                <br />

                <div className="ListC">
                    <li id="Position" ref={positions}></li>
                    <li id="Name" ref={nameC}></li>
                    <li id="Points" ref={points}></li>
                    <li id="Wins" ref={wins}></li>
                </div>

            </div>
        </>
    );
}

export default ConstructorsCard;
