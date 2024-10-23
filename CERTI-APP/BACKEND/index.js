import express,{json} from 'express';
import { adminrouter } from './ROUTER/adminrouter.js';
import dotenv from 'dotenv';
 
dotenv.config();
const app=express();
app.use(json());
app.use('/',adminrouter)

const port=process.env.Port

app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})
