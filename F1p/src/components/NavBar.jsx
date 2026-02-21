import {useNavigate} from 'react-router-dom'

function NavBar() {
  const navigate = useNavigate()

  function changePage(page){
    navigate(`/${page}`)
  }

  return (
    <>
      <div className='bg-gray-300 px-1 py-1 mx-50 rounded-b-xl m-2 flex justify-between list-none font-mono'>
        <li className='navBarElm' onClick={()=> changePage("drivers")}>Drivers</li>
        <li className='navBarElm' onClick={()=> changePage("constructors")}>Constructors</li>
        <li className='navBarElm' onClick={()=> changePage("races")}>Races</li>
      </div>
    </>
  )
}

export default NavBar;
