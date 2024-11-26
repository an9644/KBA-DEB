import Router from 'express'
import mongoose from 'mongoose'

const adminRoute=Router()

const movieSchema=new mongoose.Schema({
    id:{type:String,unique:true},
    name:String,
    mname:String,
    date:String,
    seat:String
})
const Movie= mongoose.model('Movie Booking',movieSchema)

mongoose.connect("mongodb://localhost:27017/Movie-Details")

adminRoute.post('/booking',async(req,res)=>{
    try {
        const {Id,Name,Mname,Date,Seat} =req.body
        const result= await Movie.findOne({id:Id})
        if(result){
            res.send({message:"Booking Already exist"})
        }else{
            const newbooking=new Movie({
                id:Id,
                name:Name,
                mname:Mname,
                date:Date,
                seat:Seat
            })
            await newbooking.save()
           return res.send({message:"Booking Successfull"})
        } 
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})
adminRoute.put('/update',async(req,res)=>{
    try {
        const {Id,newName,newMname,newDate,newSeat}= req.body

        const result=await Movie.findOne({id:Id})        
        if(!result){
            res.status(400).json({message:"Cannot find booking!!"})
        }else{
            result.name=newName || result.name
            result.mname=newMname || result.mname
            result.date=newDate || result.date
            result.seat=newSeat || result.seat           
           
            await result.save();
            return res.send({message:"Booking Updated"})
        }
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})
adminRoute.get('/getbooking',async(req,res)=>{
        try {
            const search=req.query.mname
            const result=await Movie.find({mname:search})
            if(result){
                res.status(200).json(result)
            }else{
                res.status(400).json({message:"Booking cannot find"})
            }
        } catch (error) {
            res.status(500).json({message:"Internal server error"})
        }
})
adminRoute.delete('/deletebooking',async(req,res)=>{
    try {
        const  search=req.query.id
        const result=await Movie.deleteOne({id:search})

        if(result){
            res.status(200).json({message:"Booking deleted"})
        }else{
            res.status(400).json({message:"Booking doesnt exist"})
        }

    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})
adminRoute.get('/viewallbooking',async(req,res)=>{
    try {
        const result= await Movie.find()
        if(result){
            res.status(200).json({message:result})
        }else{
            res.status(400).json({message:"No booking found"})
        }
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
    }
})

export default adminRoute