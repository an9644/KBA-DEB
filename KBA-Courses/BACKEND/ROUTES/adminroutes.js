import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticate } from "../Middleware/auth.js";
import dotenv from 'dotenv';
 
dotenv.config();
const adminRoute=Router();
const user=new Map(); 
const secretkey=process.env.Secretkey

adminRoute.get('/',(req,res)=>{ //callbk func // eth index page venditt matgarm 
    res.send("Hello World") 
})

//signup

adminRoute.post('/signup',async(req,res)=>{ 
    try{
    // console.log('Hiii');
    const data =req.body
    console.log(req.body); 
    console.log(data.FirstName);
    const fname=data.FirstName  //storing individually
        const {FirstName,LastName,UserName,Password,Role}=data // storing using mappimg method 
        console.log(LastName)
        const newP=await bcrypt.hash(Password,10) //used for security of password they show the exact password 
    //map start    
    if(user.has(UserName)){
        res.status(400).json({meassage:"User already exist!"})
    }else{
        console.log(newP)
        user.set(UserName, {
            FirstName,LastName,Password:newP,Role });
            console.log(user.get(UserName))
            res.status(201).json({Meassage:"data Added successfully"})
        }
    }  
    catch(error){
    res.status(500).json(error)
}
    
});

//login

adminRoute.post('/login',async(req,res)=>{//callbak function
    const { UserName,Password } =req.body;
    console.log(UserName)
    const result =user.get(UserName)  //.get vannath username le valuene ahnu read  cheyyunne atha
    console.log(result)

    // cheching if the password is corect 
    if(!result){
        res.status(404).json({message:"User does not exist"})
    }else{

        const valid =await bcrypt.compare(Password,result.Password)
        console.log(valid)
        // res.status(201).json({message:"Succesfully Logged in "})

        if(valid){ // toekns are created by usernameand role
            const token=jwt.sign({UserName:UserName,Role:result.Role},secretkey,{expiresIn:'1h'}) //function({para1 : athokke venm token genarate chyn,seceretkey kodukkumbol anu eth work aunne}, 1 houe time ulle ath kazhinja veendum login cheyynm)
            res.cookie('authToken',token,{ httpOnly:true });                                     // eth store avunnath browser cookie
            res.status(200).json({token})
            console.log(token)

        }
    }
    

})  

//addcourse

const course=new Map() // map declaring ourside updte and add course can use the same map

adminRoute.post('/addcourse',authenticate,(req,res)=>{
    res.status(201).json({message:"Hiii"})
    console.log(req.UserName)
    console.log(req.Role)

        if(req.Role=='admin'){         

            console.log("Admin login success")
            try{
                const data=req.body
                const {Coursename,Courseid,Coursetype,Description,Price}=data
                // console.log(data)
                        
                if(course.has(Courseid)){
                    res.status(400).json({message:"Course Already Exist!!"})
                    console.log("Course Already Exist!!")
                }else{
                    course.set(Courseid,{Coursename,Coursetype,Description,Price})
                    console.log(course.get(Courseid))
                }

            }catch(error){
                res.status(500).json(error)
            }

        }else{
            console.log("Invalid Crendentials")
        }


    })

//UPDATE COURSE
//using put
adminRoute.put('/update',authenticate,(req,res)=>{

            if(req.Role=='admin'){
                console.log("Admin login successfull")
                try {
                    const {newCoursename,Courseid,newCoursetype,newDescription,newPrice}=req.body

                    if(course.has(Courseid)){     
                         
                       const  data=course.get(Courseid)    
                        data.Coursename= newCoursename || data.Coursename
                        data.Coursetype= newCoursetype || data.Coursetype
                        data.Description= newDescription || data.Description
                        data.Price = newPrice || data.Price
    
                        course.set(Courseid,data)
                        console.log(course.get(Courseid))          
                
                        console.log("Course updated successfully")
                        res.status(400).json({message:"Course updated successfully!!"})                    
                    }
                    }catch(error) {
                        res.status(500).json(error)
                    }                    
            }else{   
                console.log("Invalid Crendential")
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
   adminRoute.get('/getcourse',(req,res)=>{
    try {
        
    } catch (error) {
        
    }
    console.log(req.query.Courseid)
    const result=req.query.Courseid
    if(course.has(result)){
        console.log(course.get(result));
        
    } 
   })




export {adminRoute} ;


//delete course
//logout


