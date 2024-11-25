import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'

import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Home from './Pages/Home'
import AddReservation from './Pages/AddReservation'
import ViewReservation from './Pages/viewReservation'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
       <Route path='/' element={<Login />}/>
       <Route path='/signup' element={<Signup />}/>
      <Route path='/home' element={<Home />}/>
      <Route path='/booking' element={<AddReservation />} />
      <Route path='/view' element={<ViewReservation />} />
      </>

    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App
     