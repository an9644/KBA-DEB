import { Router } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { authenticate } from "../Middleware/auth.js";
import dotenv from 'dotenv';
 
dotenv.config();
const adminrouter=Router()
const user= new Map()
const secretkey=process.env.Secretkey


adminrouter.get('/', (req,res)=>{ // 1 / means home page or index
    res.send("Hello World")
})

adminrouter.post('/signup',async(req,res)=>{
    try{
     //mapping        
        const data =req.body
        const {Fname,Lname,Username,Password,Role}=data;
        // console.log(Lname)
    //password hashing
        const newp=await bcrypt.hash(Password,10)

    //map start
    if(user.has(Username)){
        res.status(500).json({message:"User Already Exist"})
        console.log("User Already Exist")
    }else{
        console.log(newp)
        user.set(Username,{Fname,Lname,Password:newp,Role})
        console.log(user.get(Username))
        console.log("User added Successfully")
        res.status(201).json({message:"User added Successfully"})
    }}
     catch(error){
         res.status(500).json(error)
     }
})

adminrouter.post('/login',async(req,res)=>{
    const {Username,Password}=req.body
    const result= user.get(Username)
    console.log(result)

    if(!result){ 
        res.status(404).json({message:"User not found"})
    }else{
        const valid =await bcrypt.compare(Password,result.Password)
        console.log(valid)

        if(valid){
            const token =jwt.sign({Username:Username,Role:result.Role},secretkey,{expiresIn:"1 h"})
            res.cookie('authToken',token,{ httpOnly:true })
            res.status(200).json({token})
            console.log(token)
        }
    }
})

adminrouter.post('/issuecerti',authenticate,(req,res)=>{

    const certi=new Map()
    const {Course,Certiid,Name,Grade,Issuedt}=req.body

    if(req.Role == 'admin'){
        console.log("Admin Logged in Successful")
        try {
            if(certi.has(Certiid)){
                res.status(400).json({message:"Invalid Credential"})
                console.log("Invalid Credential");
            }else{
                certi.set(Certiid,{Course,Name,Grade,Issuedt})
                console.log(certi.get(Certiid));  
                console.log("Certificate issued successfully")          
                res.status(200).json({message:"Certificate issued successfully"})
    
            }
            
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
            console.log("Invalid Credential")
    }

    
})
adminrouter.post('/logout',(req,res)=>{
    res.clearCookie('authtoken');
    res.send('logout successfully');
    console.log('logout successfully');
})



export {adminrouter}