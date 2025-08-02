import React, {useEffect, useState} from 'react';
import {
    FetchCircuits,
    FetchRaceCity,
    FetchRaceCountry,
    FetchRaceDate,
    FetchRaceName,
    FetchRaceRound,
    FetchResultConstructors,
    FetchResultNum,
    FetchResultPoints,
    FetchResultPosition,
    FetchResults,
    FetchResultTimes
} from '../APIs/ergastApi.js';
import './CircuitsCard.css'
import ResultPupUp from "./ResultPupUp.jsx";

function CircuitsCard() {
    const [showModal, setShowModal] = useState(false);
    const [results, setResults] = useState(null);
    const [ResultTimes, setResultTimes] = useState(null);
    const [resultNum, setResultNum] = useState(null);
    const [resultPoints, setResultPoints] = useState(null);
    const [resultPositions, setResultPosition] = useState(null);
    const [resultConstructors, setResultConstructors] = useState(null);


    const [circuits, setCircuits] = useState([]);
    const [raceNames, setRaceNames] = useState([]);
    const [raceRound, setRaceRound] = useState([]);
    const [raceDate, setRaceDate] = useState([]);
    const [raceCountry, setRaceCountry] = useState([]);
    const [raceCity, setRaceCity] = useState([]);

    useEffect(() => {
        async function fetchData() {

            const images = await FetchCircuits();
            const names = await FetchRaceName();
            const round = await FetchRaceRound();
            const date = await FetchRaceDate();
            const country = await FetchRaceCountry();
            const city = await FetchRaceCity();


            setCircuits(images);
            setRaceNames(names);
            setRaceRound(round);
            setRaceDate(date);
            setRaceCountry(country);
            setRaceCity(city);
        }
        fetchData();
    }, []);

    async function load(index) {

        const result = await FetchResults(index + 1);
        const times = await FetchResultTimes(index + 1)
        const number = await FetchResultNum(index + 1)
        const points = await FetchResultPoints(index + 1)
        const positions = await FetchResultPosition(index + 1)
        const constructors = await FetchResultConstructors(index + 1)


        setResultNum(number)
        setResultTimes(times)
        setResults(result);
        setResultPoints(points)
        setResultPosition(positions)
        setResultConstructors(constructors)
        setShowModal(true);
    }


    return (
        <div id="raceMap">
            <div id="Map">

                {circuits.map((code, index) => (
                    <div key={index} id={`race-${index}`}>
                        <div dangerouslySetInnerHTML={{ __html: code }} />

                        <a>{raceNames[index]}</a><br /><br />

                        <div id="prov">
                            <li>Round : {raceRound[index]}</li>
                            <li>Date : {raceDate[index]}</li>
                            <li>Locality : {raceCountry[index]} / {raceCity[index]}</li>

                            <button type="button" onClick={() => load(index)}>View Result</button>
                        </div>
                    </div>
                ))}


            </div>
            <div className="PupUp">
            {showModal && (
                <a>
                <ResultPupUp results={results} positions={resultPositions} points={resultPoints} number={resultNum} times={ResultTimes} constructors={resultConstructors}
                             onClose={() => setShowModal(false)} />
                </a>
            )}
            </div>
        </div>
    );
}

export default CircuitsCard ;
