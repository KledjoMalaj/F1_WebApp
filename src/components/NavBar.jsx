import './NavBar.css'
import {useState} from "react";
import DriversCard from "./DriversCard.jsx";
import ConstructorsCard from "./ConstructorsCard.jsx";
import CircuitsCard from "./CircuitsCard.jsx";
import DriverStandingsCard from "./DriverStandingsCard.jsx";
import ConstructorsStandingsCard from "./ConstructorsStandingsCard.jsx";
import HomePage from "./HomePage.jsx";

function NavBar(){


    const [page, setPage] = useState("HP");

    return(
        <>
            <div className="nav-bar">

                <li onClick={() => setPage("HP")} ><a>Home Page</a></li>
                <li onClick={() => setPage("DS")} ><a>Driver Standings</a></li>
                <li onClick={() => setPage("CS")} ><a>Constructors Standings</a></li>
                <li onClick={() => setPage("CC")}><a>Races</a></li>
            </div>
            {page === "HP" &&
                <HomePage/>
            }
            {page === "DS" &&
                <DriverStandingsCard/>
            }
            {page === "CS" &&
               <ConstructorsStandingsCard/>
            }
            {page === "CC" &&
            <CircuitsCard/>
            }
        </>
    );
}
export default NavBar;