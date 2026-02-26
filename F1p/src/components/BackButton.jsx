import {useNavigate} from "react-router-dom";

function BackButton(){
    const navigate = useNavigate()

    function changePage(){
        navigate("/")
    }
    return (
        <>
            <div className="text-left mt-1 font font-mono">
                <button onClick={()=>changePage()} className="bg-gray-400 px-8 py-1  rounded-2xl cursor-pointer hover:bg-white transition duration-300 ease-in-out">Back</button>
            </div>
        </>
    )
}

export default BackButton