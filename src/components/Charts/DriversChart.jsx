import {useEffect, useState} from "react";
import {FetchDriverResults, FetchRaceName, RaceData} from "../../APIs/ergastApi.js";
import "./DriverChart.css"

import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

function DriversChart({driverId,color,driverName}) {
    const [raceNames, setRaceNames] = useState([]);
    const [points, setPoints] = useState([]);




    useEffect(() => {
       async function loadData() {
           const raceName = await FetchRaceName(2025);

           const racedata = await RaceData();
           const racedate = racedata.date;
           const today = new Date();
           const formattedDate = today.toISOString().split('T')[0];
           const pastIndexes = racedate
               .map((date, index) => (date < formattedDate ? index : null))
               .filter(index => index !== null);


           const points = await FetchDriverResults(2025,driverId);



           setPoints(points);
           setRaceNames(pastIndexes.map(i => raceName[i]));

       }
       loadData();
    },[])


        const data = {
            labels: raceNames,
            datasets: [
                {
                    label: `Points per Race (${driverName})`,
                    data: points,
                    borderColor: color,
                    backgroundColor: "black",
                    tension: 0,
                    fill: true,
                    pointRadius: 4,
                    pointHoverRadius: 10,

                }
            ]
        };

        const options = {
            responsive: true,
            plugins: {
                legend: {position: "top"},
                tooltip: {mode: "index", intersect: false}
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {display: true, text: "Points",},
                },
                x: {
                    title: {display: true, text: "Race"}
                }
            }
        };




    return(
        <>
            <h1 className="Dc-h1">Points Chart 2025</h1>
            <Line data={data} options={options}/>
        </>
    )
}
export default DriversChart;
