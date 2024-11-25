import jwt from 'jsonwebtoken'
import dotnev  from 'dotenv'

dotnev.config();
const secretkey=process.env.Secretkey

function verifyToken(req,res,next){
    const token=req.cookies.Authtoken;
    if(!token) return res.status(400).json({ error: "Access denied" })
        try{
            const decode=jwt.verify(token,secretkey)
            req.userType=decode.userType
            next();
        }catch(error){
            res.status(400).json({ error: "Invalid token" })
        }
}
module.exports=verifyToken