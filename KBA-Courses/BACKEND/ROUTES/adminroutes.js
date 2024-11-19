import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from "../Middleware/auth.js";
import dotenv from 'dotenv';
import mongoose from 'mongoose'

 
dotenv.config();
const adminRoute=Router();
// const user=new Map(); 
const secretkey=process.env.Secretkey
//define user schema(designing) for signin  and login
const userSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    userName:{type:String,unique:true},
    password:String,
    role:String
})
const User =mongoose.model('Userdetails',userSchema)

 // create model for addcourse
 const courseSchema= new mongoose.Schema({
    courseName:String,
    courseId:{type:String,unique:true},
    courseType:String,
    description:String,
    price:String
})
const Course =mongoose.model('courses',courseSchema)

mongoose.connect("mongodb://localhost:27017/KBA-Courses")

adminRoute.get('/',(req,res)=>{ //callbk func // eth index page venditt matgarm 
    res.send("Hello World") 
})

//signup

adminRoute.post('/signup',async(req,res)=>{ 
    try{
    const data =req.body
    console.log(req.body); 
    const fname=data.FirstName  //storing individually
        const {FirstName,LastName,UserName,Password,Role}=data // storing using mappimg method 
        const newPassword=await bcrypt.hash(Password,10) //used for security of password they show the exact password 
    //map start    
    const existingUser=await User.findOne({userName:UserName})
    if(existingUser){
        res.status(400).json({message:"User already exist!"})
    }else{
        //creating new user
        const newUser=new User({
            firstName:FirstName,
            lastName:LastName,
            userName: UserName,
            password:newPassword,
            role:Role
        })     

        await newUser.save();
            res.status(201).json({message:"data Added successfully"})
        }
    }  
    catch(error){
    res.status(500).json(error)
}
    
});

//login

adminRoute.post('/login', async (req,res)=>{//callbak function
    const { UserName,Password } =req.body;
    console.log(UserName)
    const result =await User.findOne({userName:UserName})  //mongo
    console.log(result)

    // cheching if the password is corect 
    if(!result){
        res.status(404).json({message:"User does not exist"})
    }else{
        const valid = await bcrypt.compare(Password,result.password)
        console.log(valid)

        if(valid){ // toekns are created by usernameand role
            const token=jwt.sign({UserName:result.userName,Role:result.role},secretkey,{expiresIn:'1h'}) //function({para1 : athokke venm token genarate chyn,seceretkey kodukkumbol anu eth work aunne}, 1 houe time ulle ath kazhinja veendum login cheyynm)
            res.cookie('authToken',token,{ httpOnly:true });                                     // eth store avunnath browser cookie
            console.log(token)       
            return res.status(200).json({ token })

        }else{
            res.status(400).json({meassage:"invalid password"})
        }
    }
    

})  

//addcourse

// const course=new Map() // map declaring ourside updte and add course can use the same map

adminRoute.post('/addcourse',authenticate,async(req,res)=>{    

            try{
                if(req.Role=='admin'){      
                    console.log("Admin login success")   

                 const {CourseName,CourseId,CourseType,Description,Price}=req.body                     

                const existingCourse= await Course.findOne({courseId : CourseId})                        
                if(existingCourse){
                    console.log("Course Already Exist!!")
                    return res.status(400).json({message:"Course Already Exist!!"})
                 }                         
                
                    //creating new course
                    const newCourse=new Course({
                    courseName:CourseName,
                    courseId: CourseId,
                    courseType:CourseType,
                    description:Description,
                    price:parseInt(Price)
                    })

                    //save course  to mongo
                    await newCourse.save()
                    console.log("Course Addedd Successfully!!")
                     return res.status(201).json({message:"Course Addedd Successfully!!"})
                    // alert("Course Addedd Successfully!!")
                }else{
                console.log("You dont have permission ")
                return res.status(403).json({ message: "You don't have permission" });
                }
            }catch(error){
                console.error(error.message);
                res.status(500).json({message: "Internal Server Error" })
            }
        })

//UPDATE COURSE
//using put
adminRoute.put('/update',authenticate,async(req,res)=>{
            
                try {

                    const {CourseName,CourseId,CourseType,Description,Price}=req.body                     
                     const existingCourse= await Course.findOne({courseId : CourseId})           
            

                    if(!existingCourse){   
                        // console.log("Course does not exist")
                       return  res.status(400).json({message:"Course does not exist!!"})     
                    }
                    if (req.Role !== 'admin') {
                        console.log("You dont have permission ");
                        return res.status(403).json({ message: "You don't have permission" });
                      }
                   
                        existingCourse.courseName= CourseName || existingCourse.courseName
                        existingCourse.courseType= CourseType || existingCourse.courseType
                        existingCourse.description= Description || existingCourse.description
                        existingCourse.price = Price || existingCourse.price

                        await existingCourse.save()
                        console.log("Course updated successfully")
                        res.status(200).json({message:"Course updated successfully!!",existingCourse})                
                      
                    }catch(error) {
                        res.status(500).json({message:"Internal server error"})
                    }                    
            })

        // GETCOURSE

        //using param
//   adminRoute.get('/getcourse/:id',authenticate,(req,res)=>{
//     console.log(req.params.id)
//     const result=req.params.id
//     if(course.has(result)){
//         console.log(course.get(result));
        
//     }
//   })

   //ussing query
   adminRoute.get('/getcourse',async(req,res)=>{
    // console.log(req.query.Courseid) //maping method
    
    try {
        const search=req.query.CourseId
        console.log(search);   
        const result=await Course.findOne({courseId:search});
        if(result){
            res.status(200).send(result)
        } 
        else{
            res.status(400).json({message:'No such course'})
            // console.log("No such course")
        }
        
    } catch (error) {
        res.status(500).json({message:'Internal server error'})     

    }
    
    
   })

   adminRoute.delete('/deletecourse',authenticate,async(req,res)=>{
            try {
                const result=req.query.courseId
                    const course  = await Course.deleteOne(result)

                    if(course){
                    // console.log(course.delete(result))
                    console.log("Course removed")
                    return res.status(200).json({meassage:"Course removed"})                    
                } else{
                    console.log("no item found");    
                    return res.status(200).json({meassage:"no item found"})      
                }                
            } catch (error) {
                console.error(error.message);
                return res.status(500).json({meassage:"Internal server Error"})            
            }
                

        })
   


adminRoute.get('/viewuser',authenticate,(req,res)=>{
    try{
    const user=req.Role;
    res.json({user});}
    catch{
        res.status(404).json({message:'user not authorized'});
    }
})

adminRoute.get('/viewcourse', async(req,res)=>{
    try{

        const viewallcourse=await Course.find()

        if(viewallcourse){                    
        res.send(Array.from(viewallcourse.entries()))
    }else{
    res.status(404).json({message:'Not Found'});
}}
    catch{
        res.status(500).json({message:"Internal error"})
    }
})

adminRoute.post('/logout',(req,res)=>{
    res.clearCookie('authtoken');
    res.send('logout successfully');
    console.log('logout successfully');
})


export {adminRoute} ;


//delete course
//logout


