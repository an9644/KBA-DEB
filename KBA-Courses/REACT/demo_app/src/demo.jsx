import React from 'react'

export const Demo = () => {
    const name='anju'
    const x=10;
    const y=20;
    const names=['anju','hari','sneha','sarah'];
    const loggedIn=false
  return (
    <>
    <div className='text-5xl font-bold underline'>App</div>
    <p>Hello  {name}</p>
    <p>the sum of {x} and {y} is {x+y}.</p>
    <ul>
      {
        names.map((name,index)=>(
          <li key={index}>{name}</li>
        ))
      }
    </ul>
    {loggedIn ? <h1>Hello Member</h1>:<h1>Hello Guest</h1>} 
    </>
  )
}

export default Demo
