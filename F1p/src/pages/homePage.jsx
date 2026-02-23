import NavBar from '../components/NavBar.jsx'
import {useEffect, useState} from "react";
import {getPrevAndNextRace} from "../Apis/apis.js";

function HomePage(){
    const [races, setRaces] = useState({ prevRace: {}, nextRace: {} });

    useEffect(() => {
        async function getData(){
            const data = await getPrevAndNextRace()
            setRaces(data)
        }
        getData()
    }, []);

    return (
        <>
            <div className="bg-gray-900 p-2">
                <div className='bg-gray-800 rounded-t-xl'>

                    <NavBar/>

                    <div>
                        <br></br>
                        <h1 className='text-center mx-30 font-mono text-3xl text-white bg-gray-900 rounded italic'>
                            F1 2026</h1>
                        <br></br>
                        <div className='font-mono p-2'>
                            <div className='bg-gray-400 text-center m-2 rounded'>
                                <h1>Prev Race</h1>
                                <div className='grid grid-cols-2'>
                                    <div>
                                        <img src={races.prevRace?.img || "/placeholder.png"} alt="Previous Race" />
                                    </div>
                                    <div>RaceInfo</div>
                                </div>
                            </div>

                            <div className='bg-gray-400 text-center m-2 rounded'>
                                <h1>Next Race</h1>
                                <div className='grid grid-cols-2 p-4 bg-white m-20'>
                                    <div className=''>
                                        <img src={races.nextRace?.img || "/placeholder.png"} alt="Next Race" />
                                    </div>
                                    <div className='grid grid-cols-2 p-2 mt-30 mr-40'>
                                        <div className="text-right mr-5">
                                            <h1>Race Name  :</h1>
                                            <h1>Circuit :</h1>
                                            <h1>Round :</h1>
                                            <h1>Date :</h1>
                                            <h1>Time :</h1>
                                        </div>
                                        <div className='text-left'>
                                            <h1> {races.nextRace.raceName}</h1>
                                            <h1> {races.nextRace.circuit}</h1>
                                            <h1> {races.nextRace.round}</h1>
                                            <h1> {races.nextRace.date}</h1>
                                            <h1> {races.nextRace.time}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default HomePage;