import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom'

import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'
import Home from './Pages/Home'
import Courses from './Pages/Courses'
import Contact from './Pages/Contact'
import UpdateCourse from './Pages/UpdateCourse'
import CoursePage, {courseLoader} from './Pages/CoursePage'
import NotFound from './Pages/NotFound'
import AddCourse from './Pages/AddCourse'

const App = () => {
    const router = createBrowserRouter(
      createRoutesFromElements(
        <>
        {/*Public Routes*/}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        {/*Protected Routes*/}
        <Route element ={<AuthLayout />}>
          <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/addcourse" element={<AddCourse />} />
          <Route
            path="/updatecourse/:id"
            element={<UpdateCourse />}
            loader={courseLoader} 
            />
            <Route 
              path = "/course/:id"
              element={<CoursePage />}
              loader={courseLoader}
              />
              </Route>
              </Route>
              {/* Not found route*/}
              <Route path="*" element ={<NotFound />} />
        </>
      )
    );
  return (
    <RouterProvider router={router} />
  )
}

export default App