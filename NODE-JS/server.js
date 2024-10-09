const http=require('http')
//This line imports the http module, which provides functionality for creating an HTTP server.


const server = http.createServer((req,res)=>{//request-nml cheyyunnth responce-avaru tharunnath
    //This line creates an HTTP server using the createServer method. The callback function passed to createServer is called whenever a new request is received.
    res.statusCode=200; //sets the HTTP status code to 200 (OK).
    res.setHeader('Content-Type','text/plain')//that the response body contains plain text.
    res.end('Hello from Server! \n') // print cheyyunnth
});
server.listen(3001,'127.0.0.1',()=>{ //(ethilu ullath ip address)
    console.log('Server running at the http://127.0.0.1:3001/');
                    //Port: 3001
                //Host: 127.0.0.1 (localhost)
});