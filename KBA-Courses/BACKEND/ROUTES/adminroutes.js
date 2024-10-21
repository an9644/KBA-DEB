import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
 
const adminRoute=Router();
const user=new Map(); 
const secretkey="hi"

adminRoute.get('/',(req,res)=>{ //callbk func // eth index page venditt matgarm 
    res.send("Hello World") 
})


adminRoute.post('/signup',async(req,res)=>{ 
    try{
    console.log('Hiii');
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

        if(valid){
            const token=jwt.sign({UserName:UserName,Role:result.Role},secretkey,{expiresIn:'1h'}) //function({para1 : athokke venm token genarate chyn,seceretkey kodukkumbol anu eth work aunne}, 1 houe time ulle ath kazhinja veendum login cheyynm)
            res.cookie('authToken',token,{ httpOnly:true });                                     // eth store avunnath browser cookie
            res.status(200).json({token})
            console.log(token)

        }
    }
    

})  

adminRoute.post('/addcourse',(req,res)=>{
    res.status(201).json({message:"Hiii"})
    console.log("hiii")
})

export {adminRoute} ;