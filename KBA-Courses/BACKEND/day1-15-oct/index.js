import express from 'express'; // express file import cheyyth edkunva

//listen = express value ahanu

const app = express(); //intsance create cheyth
const port =4000   //
// listen cheyyumbol 2 para kodknm 1. port a( ath port ahnu work akunne)
// 2. athengilum oru function  here using arrow function
app.listen(port,()=>{
    console.log(`Serevr is Listening to ${port} `)
})
