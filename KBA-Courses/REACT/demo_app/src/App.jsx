import React from 'react'
import Card from './Card'
import Demo from './demo'

export const App = () => {

  return (
   <>
        <Demo />
        <Card customClasses="bg-yellow-100"/>
        <Card customClasses="bg-green-200"/>
        <Card customClasses="bg-blue-300" />


    </>
  )
}

export default App

