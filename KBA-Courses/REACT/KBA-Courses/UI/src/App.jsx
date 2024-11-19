import React from 'react'
import {
  createBrowserRouter, // eth main ethinullil ahnu element koddukkunne
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import Home from './Pages/Home'
import Courses from './Pages/Courses'
import Contact from './Pages/Contact'
import AddCourse from './Pages/AddCourse'
import UpdateCourse from './Pages/UpdateCourse'
import CoursePage ,{courseLoader} from './Pages/CoursePage'
import NotFound from './Pages/NotFound'


const App = () => {

  const router=createBrowserRouter( // roter declareing
      // firts authentication vendatha routes
      createRoutesFromElements(
        <>
        {/* {PublicRoutes} */}
        <Route path='/' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />

        {/* {protected Routes have authentication}  need a token to work */}
        <Route element={<AuthLayout />} >
          <Route element={<MainLayout />} >
          <Route path='/home' element={<Home />} />
          <Route path='/courses' element={<Courses />}/>
          <Route path='/contact' element={<Contact />} />
          <Route path='addcourse' element={<AddCourse />}/>
          <Route
            path='/updatecourse/:id'
            element={<UpdateCourse /> }
            loader={courseLoader}
          />
          <Route 
            path='/course/:id'
            element={<CoursePage />}
            loader={courseLoader}
          />
          </Route>
        </Route>
      <Route path='*' element={<NotFound />} />
        </>

      )
  )
  return (
    <RouterProvider router={router} />
  )
}

export default App