import React from 'react'
import Hero from '../components/Hero'
import TopCourse from '../components/TopCourse'
import CourseGrid from '../components/CourseGrid'
import ViewAllCoursesButton from '../components/ViewAllCoursesButton.jsx'

const Home = () => {
  return (
    <>
      <Hero/>
      <TopCourse/>
      <CourseGrid isHome={true}/>
      <ViewAllCoursesButton/>

    </>
  )
}

export default Home