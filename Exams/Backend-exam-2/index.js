import express,{json} from 'express';
import adminRoute from './routes/adminroute.js'
import dotenv from 'dotenv';

dotenv.config()
const app = express();
const port =process.env.Port

app.use(json());
app.use('/',adminRoute);

app.listen(port, ()=>{
    console.log(`server running on ${port}`);    
})

