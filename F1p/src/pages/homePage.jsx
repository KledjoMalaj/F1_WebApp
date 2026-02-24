import NavBar from '../components/NavBar.jsx'
import {useEffect, useState} from "react";
import {getPrevAndNextRace, getResults} from "../Apis/apis.js";

function HomePage(){
    const [races, setRaces] = useState({ prevRace: {}, nextRace: {} });
    const [results, setResults] = useState([])

    useEffect(() => {
        async function getData(){
            const data = await getPrevAndNextRace()

            setRaces(data)
        }
        getData()
    }, []);

    useEffect(()=>{
        async function getData(){
            const results = await getResults(races.prevRace.round)

            setResults(results)
        }
        getData()
    },[races])


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
                                <h1 className='pt-3 text-3xl'>Prev Race</h1>
                                <div className='grid grid-cols-2 p-4'>
                                    <div className='bg-white m-2 rounded flex items-center justify-center h-62'>
                                        <img className='w-80' src={races.prevRace?.img || "/placeholder.png"} alt="Previous Race" />
                                    </div>
                                    <div className='p-2'>
                                        {results && results.length > 0 ? (
                                            <div className="text-left text-xl h-62 ml-10 bg-gray-900 text-gray-300 p-5 rounded italic">
                                                <h1 className='text-center pb-2'>{races.prevRace.raceName} / Round {races.prevRace.round}</h1>
                                                <h1 className='p-1'>1 - {results[0].firstName} {results[0].lastName} - {results[0].time}</h1>
                                                <hr/>
                                                <h1 className='p-1'>2 - {results[1].firstName} {results[1].lastName} - {results[1].time}</h1>
                                                <hr/>
                                                <h1 className='p-1'>3 - {results[2].firstName} {results[2].lastName} - {results[2].time}</h1>
                                                <hr/>
                                                <h1 className='p-1'>4 - {results[3].firstName} {results[3].lastName} - {results[3].time}</h1>
                                                <hr/>
                                                <h1 className='p-1'>5 - {results[4].firstName} {results[4].lastName} - {results[4].time}</h1>
                                            </div>
                                        ) : (
                                            <div className="text-left text-xl h-62 ml-10 bg-gray-900 text-gray-300 p-5 rounded italic flex items-center justify-center">
                                                <p>Loading results...</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className='bg-gray-400 text-center m-2 rounded'>
                                <h1 className='pt-3  text-3xl'>Next Race</h1>
                                <div className='grid grid-cols-2 p-4 '>
                                    <div className='bg-white m-2 rounded flex items-center justify-center h-62'>
                                        <img className='w-80' src={races.nextRace?.img || "/placeholder.png"} alt="Next Race" />
                                    </div>
                                    <div className='p-2'>
                                        <div className='text-left text-xl h-62 ml-10 bg-gray-900 text-gray-300 p-5 rounded italic'>
                                            <br></br>
                                            <h1>Race Name : {races.nextRace.raceName}</h1>
                                            <h1>Circuit : {races.nextRace.circuit}</h1>
                                            <h1>Round : {races.nextRace.round}</h1>
                                            <h1>Date : {races.nextRace.date}</h1>
                                            <h1>Time : {races.nextRace.time}</h1>
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