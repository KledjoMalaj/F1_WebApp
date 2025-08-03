import { useEffect, useState } from "react";
import {
    FetchCID,
    FetchConstructorsResults,
    FetchRaceName,
    RaceData
} from "../../APIs/ergastApi.js";

import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

function HomePageChart() {
    const [raceLabels, setRaceLabels] = useState([]);
    const [allPoints, setAllPoints] = useState([]);
    const [constructorIds, setConstructorIds] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const ids = await FetchCID(2025);
            const raceNames = await FetchRaceName(2025);
            const racedata = await RaceData();
            const racedate = racedata.date;

            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];

            const pastIndexes = racedate
                .map((date, index) => (date <= formattedDate ? index : null))
                .filter(index => index !== null);

            const allConstructorPoints = await Promise.all(
                ids.map(async (constructorId) => {
                    const points = await FetchConstructorsResults(2025, constructorId);
                    return pastIndexes.map(i => points[i]);
                })
            );

            setConstructorIds(ids);
            setAllPoints(allConstructorPoints);
            setRaceLabels(pastIndexes.map(i => raceNames[i]));
        }

        fetchData();
    }, []);

    const teamColors = {
        "red_bull": "#1E41FF",
        "ferrari": "#DC0000",
        "mercedes": "#00D2BE",
        "mclaren": "#FF8700",
        "aston_martin": "#006F62",
        "alpine": "#0090FF",
        "williams": "#005AFF",
        "sauber": "#52E252",
        "rb": "#6692FF",
        "haas": "#B6BABD"
    };

    function getColorById(id, alpha = 1) {
        const hex = teamColors[id] || "#999999"; // default gray
        const bigint = parseInt(hex.replace("#", ""), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    const chartData = {
        labels: raceLabels,
        datasets: constructorIds.map((id, index) => ({
            label: id,
            data: allPoints[index],
            borderColor: getColorById(id),
            backgroundColor: "black",
            tension: 0,
            fill: false,
            pointRadius: 3.5,
            pointHoverRadius: 10,
        }))
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                align: "end",
                labels: {
                    padding: 35,
                }
            },
            tooltip: {
                mode: "index",
                intersect: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Points"
                }
            },
            x: {
                title: {
                    display: true,
                    text: "Races"
                }
            }
        }
    };

    return (
        <div style={{paddingRight:"75px", width: '90%', margin: 'auto',borderRadius: "5px",backgroundColor:"#242424"}} >
            <h2 style={{ textAlign: "center"}}>Constructor Points Per Race - 2025</h2>
            <Line data={chartData} options={chartOptions} />
        </div>
    );
}

export default HomePageChart;

