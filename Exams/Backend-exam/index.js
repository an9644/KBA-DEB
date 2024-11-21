import express,{json} from 'express'
import dotenv from 'dotenv'
import { adminrouter } from './Router/adminrouter.js'


dotenv.config()
const app=express()
const port =process.env.Port

app.use(json());
app.use('/',adminrouter)


app.listen(port,()=>{
    console.log(`Server running on ${port}`);
    
})
