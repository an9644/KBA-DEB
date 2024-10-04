try{
    //code that might throw an error
    //execute avanda code 
    let result= riskyoperation()
    console.log(result)
} catch(error){
    //code that find the error and handling them
    console.log(`An error occured: `+ error.message);
}finally{
    //code that run regardless of an error  
    // execute finally 
    console.log(`this will always run!`)

}

function riskyoperation(){
    let obj;
    obj.property; // this will throw an error
}
