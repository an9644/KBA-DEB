const filesystem=require('fs')

filesystem.readFile('example.text','utf-8',(err,data)=>{
    if(err) throw err;
    console.log(data);
})

//2 valuene  error 1 para 
//error undel throw cheyyum ellel consol verum