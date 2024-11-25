import {Router} from 'express'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const adminRoute=Router();
const secretKey='hiii'

const userSchema=new mongoose.Schema({
    name:String,
    username:{type:String,unique:true},
    password:String,
    userType:String
})
const User=mongoose.model('User Details',userSchema)
const bookingSchema= new mongoose.Schema({
    roomno:{type:String,unique:true},
    name:String,
    checkindt:String,
    checkoutdt:String
})
const Booking=mongoose.model('Booking-Details',bookingSchema)

mongoose.connect("mongodb://localhost:27017/Hotel-Booking")

adminRoute.post('/signup',async(req,res)=>{
    try {
        const {Name,Username,Password,userType}=req.body

        const newp=await bcrypt.hash(Password,10)
        const newuser=await User.findOne({username:Username})  
        if(newuser){
            return res.status(400).json({message:"User Alredy exist !!"})
        }else{
             const newuser=new User({
                username:Username,
                name:Name,
                password:newp,
                userType:userType
             })
             await newuser.save()
             res.status(200).json({message:"User Created Successfully!!"})
        }
    } catch (error) {
        res.status(500).json({message:error.message})        
    }
})
adminRoute.post('/login',async(req,res)=>{
    try {
    const {Username,Password}= req.body
    
    const result=await User.findOne({username:Username})
    if(result){
    const valid=await bcrypt.compare(Password,result.password)
    
    if(valid){
    const token=jwt.sign({Username:result.username,userType:result.userType},secretKey,{expiresIn:'1 h'});
    res.cookie('Authtoken',token,{httpOnly:true});
    console.log(token)
    return res.status(200).json({token})
    
    }
    }
    } catch (error) {
    res.status(500).json({message:error.message})
    console.log(error);
    
    }
    })
adminRoute.post('/booking',async(req,res)=>{
    try {
        const {Roomno,Name,Checkindt,Checkoutdt}=req.body
        console.log(Name)
        const result= await Booking.findOne({roomno:Roomno})
        if(result){
            return res.status(400).json({message:"This room is Booked,try another one!!"})
        }else{
            const newBooking=new Booking({
                roomno:Roomno,
                name:Name,
                checkindt:Checkindt,
                checkoutdt:Checkoutdt
            })
            await newBooking.save();
            return res.status(200).json({message:"Booking was Successfull"})
        }
    } catch (error) {
        console.log("Internal server Error")
        return res.status(500).json({message:"Internal server error"})
    }
})
adminRoute.put('/update',async(req,res)=>{
    try {
        const {Roomno,newName,newCheckindt,newCheckoutdt}=req.body
        console.log(newName)

        const result=await Booking.findOne({roomno:Roomno})
        if(!result){
            res.status(400).json({message:"Booking details cant find"})
        }else{
            result.name=newName || result.name
            result.checkindt=newCheckindt || result.checkindt
            result.checkoutdt=newCheckoutdt || result.checkoutdt

            await result.save()
            return res.status(200).json({message:"Booking Updated Successfully"})
        }        
    } catch (error) {
        console.log("Internal server Error")
        return res.status(500).json({message:"Internal server error"})  
    }
})
adminRoute.get('/getbooking',async(req,res)=>{
    try {
        const search= req.query.checkindt
        const result=await Booking.findOne({checkindt:search})
        if(!result){
            res.status(400).json({message:"No booking in that day"})
        }else{
            res.status(200).json(result)
        }
    } catch (error) {
        console.log("Internal server Error")
        return res.status(500).json({message:"Internal server error"})  
    }
})
adminRoute.delete('/delete',async(req,res)=>{
    try {
        const search=req.query.Roomno
        const result=await Booking.deleteOne({roomno:search})
        if(!result){
            res.status(400).json({message:"Booking dont exist"})
        }else{
            res.status(200).json({message:"Booking deleted successfully"})
        }
    } catch (error) {
        console.log("Internal server Error")
        return res.status(500).json({message:"Internal server error"})   
    }
})
adminRoute.get('/viewallbooking',async(req,res)=>{
    try {
        const viewallbooking=await Booking.find()

        if(!viewallbooking){
            res.status(400).json({message:"No Booking Found"})
        }else{
            res.status(200).json(viewallbooking)
        }
        
    } catch (error) {
        
    }
})

export default adminRoute