import { Router } from "express"
import bcrypt from 'bcrypt'
import { authenticate } from "../Middleware/auth.js";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config();
const adminRouter=Router()
const library=new Map();
const secretkey =process.env.Secretkey

adminRouter.get('/',(req,res)=>{
    res.send("Hello World")
})
adminRouter.post('/signup',async(req,res)=>{
    try{
    const {Name,Email,Username,Password,Role}=req.body

        const newp=await bcrypt.hash(Password,10)

        if(library.has(Username)){
            console.log("User Already Exist!!")
            res.status(400).json({message:"User Already Exist!!"})
        }else{
            library.set(Username,{Name,Email,Password:newp,Role})
            console.log(library.get(Username))
            console.log("User Added Successfully")
            res.status(201).json({message:"User Added Successfully"})

        } }catch(error){
        res.status(500).json(error)
    }})

    adminRouter.post('/login',async(req,res)=>{
       try {
        const {Username,Password}=req.body
        const result=(library.get(Username))

        const newp=await bcrypt.hash(Password,10)

        if(!result){
            res.status(404).json({message:"Invalid Crendial!!"})
        }else{

            const valid= await bcrypt.compare(Password,result.Password)
            console.log(valid)

            if(valid){
                const token=jwt.sign({Username : result.Username , Role:result.Role},secretkey,{expiresIn:'1h'})
                res.cookie('libraray',token,{httpOnly:true})
                console.log({token})
                return res.status(200).json({token})
            }
        }
        
       } catch (error) {
            console.log(error)
       }

    })
         
    const books =new Map();
    adminRouter.post('/addbook',authenticate,(req,res)=>{
        try {
            const {title,bookid,author,genre,description,price}=req.body

            if(req.Role=='Admin'){
                console.log("Admin login success")

                if(books.has(bookid)){
                    res.status(400).json({message:"Book already present"})
                    console.log("Book already Present")
                }else{
                    books.set(bookid,{title,author,genre,description,price})
                    res.status(200).json({message:"Book Added Successfully"})
                    console.log("Book Added Successfully")
                }
            }else{
                console.log("Unothorized")
            }
        } catch (error) {
            console.log(error)            
        }
    })
    adminRouter.put('/update',authenticate,async(req,res)=>{
        try {
            const {newtitle,bookid,newauthor,newgenre,newdescription,newprice}=req.body

            if(req.Role =='Admin'){
                console.log("Admin login succees");

                if(books.has(bookid)){

                    const existingbook=books.get(bookid)

                    existingbook.title=newtitle || existingbook.title
                    existingbook.author=newauthor || existingbook.author
                    existingbook.genre=newgenre || existingbook.genre
                    existingbook.description=newdescription || existingbook.description
                    existingbook.price=newprice || existingbook.price

                    books.set(bookid,existingbook)
                    console.log(books.get(bookid))

                    res.status(400).json({message:"Book Updated Successfully"})
                    console.log("Book Updated Successfully")
                }else{
                    res.status(400).json({message:"Book not found"})
                    console.log("Book not found")
                }                
            }else{
                console.log("Unothorized");                
            }
        } catch (error) {
            console.log(error);            
        }
    })
    adminRouter.get('/getbook',(req,res)=>{
        // console.log(req.query.Courseid)
        const result=req.query.bookid
        try {
            if(books.has(result)){
                console.log(books.get(result));
                res.status(200).json({message:books.get(result)})
            } 
            else{
                res.status(400).json({message:'No such Book'})
                console.log("No such Book")
            }
            
        } catch (error) {
            res.status(500).json({message:'Internal server error'})    
        }       
       })

       adminRouter.delete('/deletebook',authenticate,(req,res)=>{
        if(req.Role=='Admin'){
            console.log(req.query.bookid)
        const result=req.query.bookid
        if(books.has(result)){
            console.log(books.delete(result))
            console.log("Book removed")
            res.status(200).json({message:'Book removed'})            
        } else{
            console.log("no item found");            
        }
        }else{
            console.log("Unothorize");
            res.status(400).json({message:'Unothorize'})                       
        }
   })
   adminRouter.get('/logout', authenticate, (req, res) => {
    try {
        if (req.Role) {
            res.clearCookie('libraray');
            res.status(200).json({ message: "Logout successfull" });
            alert("Logout successfull")
        } else {
            res.status(404).json({ message: "No user found!" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" })
    }

});
adminRouter.get('/viewbook', async(req,res)=>{
    try{
        console.log(books.size);

        if(books.size!=0){
           
            
        res.send(Array.from(books.entries()))
    }
else{
    res.status(404).json({message:'Not Found'});
}}
    catch{
        res.status(404).json({message:"Internal error"})
    }
})


 adminRouter.get('/viewuser',authenticate,(req,res)=>{
        try{
        const user=req.Role;
        res.json({user});}
        catch{
            res.status(404).json({message:'user not authorized'});
        }
    })

export {adminRouter}
