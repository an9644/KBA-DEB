import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <>
            <div className='bg-purple-300 p-4 space-x-5'>
            <Link to='/home'>Home</Link>
            <Link to='/booking'>Add Reservation</Link>
            <Link to='/view'>View Reservation</Link>
            </div>
    </>
  )
}

export default Navbar