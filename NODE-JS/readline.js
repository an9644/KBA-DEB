const readline=require('readline'); //import readline module

const ri= readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function askName(){
    ri.question("what is your name? ",function(name){ // callback function (function ullil vere oru function) ee function avde type cheyyunna data ahnu edkkunnath next line print akkinnathum
        console.log(`Hello , ${name}!`)
        askFavoriteLanguage()
    })
}
function askFavoriteLanguage(){
    ri.question("What is your Favorite Programming language?", function (language){// callback function (function ullil vere oru function)
        console.log(`${language} is a great choice !`)                         //  ee function avde type cheyyunna data ahnu edkkunnath next line print akkinnathum
        ri.close()
    })
}
//start prompt
console.log('Welcome to simple interface using readline')
askName()