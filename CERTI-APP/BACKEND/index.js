import express,{json} from 'express';
import { adminrouter } from './ROUTER/adminrouter.js';

const app=express();
app.use(json());
app.use('/',adminrouter)

const port=5000

app.listen(port,()=>{
    console.log(`Server running on ${port}`)
})
