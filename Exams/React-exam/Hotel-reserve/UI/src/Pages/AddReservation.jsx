import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'

const AddReservation = () => {
    const [Roomno,setRoomno]=useState('')
    const [Name,setName]=useState('')
    const [Checkindt,setCheckindt]=useState('')
    const [Checkoutdt,setCheckoutdt]=useState('')
    const navigate=useNavigate()

    const handleSubmit =async (e) => {
        e.preventDefault();
        const newbooking={Roomno,Name,Checkindt,Checkoutdt}
        console.log(Roomno,Name,Checkindt,Checkoutdt);
        

        const res=await fetch('http://localhost:4500/booking',{
            method:'POSt',
            credentials:'include',
            headers:{"Content-Type":"application"},
            body:JSON.stringify(newbooking)
    })
    console.log(res);
    if (res.ok){
        alert("Reserved Successfully")
        navigate('/home')      
    }else{
        navigate('/booking')
        alert("Failed to Reserve")
        res.status(400).json({message:error})
        
    }
    }

  return (
        <>
        <Navbar />
        <div className='bg-purple-400 mt-24 w-[500px] h-[400px] ml-[700px] flex justify-center p-12'>
            <form onSubmit={handleSubmit} >
            <h1 className='text-xl font-bold text-center mb-4'>Add Reservation</h1>
            <label htmlFor="">Room No:</label>
            <input className='mt-6' type="text" name="roomno" id="roomno" value={Roomno} onChange={(e)=>setRoomno(e.target.value)} /> <br />
            <label htmlFor="">Name:</label>
            <input className='mt-6'type="text" name="name" id="name" value={Name} onChange={(e)=>setName(e.target.value)} /> <br />
            <label htmlFor="">Check In Date:</label>
            <input className='mt-6' type="date" name="indt" id="indt" value={Checkindt} onChange={(e)=>setCheckindt(e.target.value)} /> <br />
            <label htmlFor="">Check Out Date:</label>
            <input className='mt-6' type="date" name="outdt" id="outdt" value={Checkoutdt} onChange={(e)=>setCheckoutdt(e.target.value)} /> <br />
            <button className='mt-6 bg-fuchsia-800 text-white p-3 ml-32' type='submit'>Add Reservation</button>
            
            </form>
        </div>
        </>
  )
}

export default AddReservation