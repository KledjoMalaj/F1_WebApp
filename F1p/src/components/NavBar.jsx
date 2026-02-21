function NavBar() {
  return (
    <>
      <div className='bg-gray-300 px-1 py-1 mx-50 rounded-b-xl m-2 flex justify-between list-none font-mono'>
        <li className='navBarElm' >Drivers</li>
        <li className='navBarElm'>Constructors</li>
        <li className='navBarElm'>Races</li>
      </div>
    </>
  )
}

export default NavBar;
