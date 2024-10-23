import express,{json} from 'express'; // express file import cheyyth edkunva';
import { adminRoute } from './ROUTES/adminroutes.js';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();
const app=express();
app.use(cors({
    orgin:'*' //http//:127.0.0.1:8000
}))
app.use(json()) // json function appil use cheyynm annale json file ullath aych kodthale backnd manasilaku  app instance use cheyynm annu json=function
app.use('/',adminRoute)

const port =process.env.Port;   

app.listen(port,()=>{
    console.log(`Serevr is Listening to ${port} `)
});
// listen cheyyumbol 2 para kodknm 1. port a( ath port ahnu work akunne)
// 2. athengilum oru function  here using arrow function

//instanceof.which api method
