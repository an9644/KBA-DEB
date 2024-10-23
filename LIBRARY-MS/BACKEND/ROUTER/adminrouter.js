import { json, Router } from "express"
import bcrypt from 'bcrypt'
import { authenticate } from "../../../KBA-Courses/BACKEND/Middleware/auth";

const adminRouter=Router()
const library=new Map();
const secretkey ="hi"

adminRouter.get('/',(req,res)=>{
    res.send("Hello World")
})
adminRouter.post('/signup',async(req,res)=>{
    try{
    const data=req.body
    const {Fname,Lname,Username,Password,Role}=data
    // console.log(data)

        const newp=await bcrypt.hash(Password,10)

        if(library.has(Username)){
            console.log("User Already Exist!!")
            res.status(400).json({meassage:"User Already Exist!!"})
        }else{
            library.set(Username,{Fname,Lname,Password:newp,Role})
            console.log(library.get(Username))
            console.log("User Added Successfully")
            res.status(201).json({meassage:"User Added Successfully"})

        } }catch(error){
        res.status(500).json(error)
    }})

    adminRouter.post('/login',async(rq,res)=>{
        const {Username,Password}=req.body
        const result=(library.get(Username))

        const newp=await bcrypt.hash(Password,10)

        if(!result){
            res.status(404),json({meassage:"Invalid Crendial!!"})


        }

    })
    adminRouter('/addcourse',authenticate,(req,res)=>{
        const {title,bookid,author,genre,description,price}=re.body
        
    })

export {adminRouter}