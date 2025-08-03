import { useEffect, useState } from "react";
import "./ConstructersChart.css"
import {
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

function ConstructorsChart({ id, color }) {
    const [raceLabels, setRaceLabels] = useState([]);
    const [points, setPoints] = useState([]);

    useEffect(() => {
        async function loadData() {
            const raceName = await FetchRaceName(2025);
            const racedata = await RaceData();

            const racedate = racedata.date;
            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];
            const pastIndexes = racedate
                .map((date, index) => (date <= formattedDate ? index : null))
                .filter(index => index !== null);

            const pointsData = await FetchConstructorsResults(2025, id);

            setPoints(pastIndexes.map(i => pointsData[i]));
            setRaceLabels(pastIndexes.map(i => raceName[i]));
        }

        loadData();
    }, [id]);

    const chartData = {
        labels: raceLabels,
        datasets: [
            {
                label: `Constructor Points - ${id}`,
                data: points,
                borderColor: color,
                backgroundColor: 'black',
                tension: 0,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 10
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            tooltip: {
                mode: 'index',
                intersect: false
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return(
        <>
            <h1 className="Cc-h1">Points Chart 2025</h1>
            <Line data={chartData} options={chartOptions} />
        </>
    )
}

export default ConstructorsChart;
