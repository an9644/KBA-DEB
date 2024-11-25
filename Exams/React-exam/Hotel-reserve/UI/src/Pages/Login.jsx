import React, { useState } from 'react'
import  {Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [Username,setUsername]=useState('')
    const [Password,setPassword]=useState('')
    const navigate=useNavigate()

    const handleLogin =async (e)=>{
        e.preventDefault();
        
        const newuser={Username,Password}
        console.log(Username,Password);
        
        const res= await fetch("http://localhost:4500/login",{
            method:'POST',
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(newuser),
            credentials:'include'
        })
        console.log(res);
        if(res.ok){
            alert("Login Sucessfull")
            navigate('/home')
          }
      
    }


  return (
    <>
        <div className='bg-purple-300 w-96 h-auto mt-12 ml-12 p-4 rounded-md'>
            <form onSubmit={handleLogin}>
                 <label htmlFor="">Username:</label>
                <input className='mt-2' type="text" name="username" id="username" value={Username} onChange={(e)=>setUsername(e.target.value)} /> <br />
                <label className='mt-2' htmlFor="">Password:</label>
                <input className='mt-2' type="password" name="password" id="password" value={Password} onChange={(e)=>setPassword(e.target.value)}/> <br />
                <button type='submit ' className='mt-2 bg-fuchsia-800 p-2 text-white'>Login</button>
                <p>Dont have an account? <Link to='/signup'>Signup</Link></p>                
            </form>
        </div>
    </>
  )
}

export default Login