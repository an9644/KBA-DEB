import express,{json} from 'express'
import { adminRouter } from './ROUTER/adminrouter.js';

const app=express()
app.use(json());
app.use('/',adminRouter)

const port =3000

app.listen(port,()=>{
    console.log(`Server running in port ${port}`)
})