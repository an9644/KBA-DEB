import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const [Name,setName]=useState('')
    const [Username,setUsername]=useState('')
    const [Password,setPassword]=useState('')
    const [userType,setuserType]=useState('admin')
    const navigate=useNavigate()

    const handleSignup =async (e)=>{
        e.preventDefault();
        const newuser={Name,Username,Password,userType}
        console.log(Name,Username,Password,userType);
        
        const res= await fetch("http://localhost:4500/signup",{
            method:'POST',
            headers: {"Content-Type":"application/json"},
            body:JSON.stringify(newuser)
        })
        console.log(res);        
        if(res.ok){
            navigate('/')
        }
    }


  return (
    <>
        <div className='bg-fuchsia-300 mt-12 ml-12 w-96 h-auto  rounded-xl p-4'>
            <form onSubmit={handleSignup}>
                <label className='mt-2' htmlFor="">Name:</label>
                <input className='mt-2' type="text" name="name" id="name" value={Name} onChange={(e)=>setName(e.target.value)} /> <br />
                <label className='mt-2' htmlFor="">Username:</label>
                <input className='mt-2' type="text" name="username" id="username" value={Username} onChange={(e)=>setUsername(e.target.value)} /> <br />
                <label className='mt-2' htmlFor="">Password:</label>
                <input className='mt-2' type="password" name="password" id="password" value={Password} onChange={(e)=>setPassword(e.target.value)}/> <br />
                <label className='mt-2' htmlFor="">Role:</label>
                <select name="userType" id="userType" value={userType} onChange={(e)=>setuserType(e.target.value)}>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </select><br />
                <button className='mt-2 bg-fuchsia-800 p-2 text-white' type='submit'>Signup</button>
                <p>Already have an account <Link to='/'>Login</Link></p>
                
            </form>
        </div>
    </>
  )
}

export default Signup