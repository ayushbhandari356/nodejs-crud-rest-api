const http=require("http")
const getReq=require("./methods/get-request")
const postReq=require("./methods/post-request")
const putReq=require("./methods/put-request")
const deleteReq=require("./methods/delete-request")
let movies=require("./data/movies.json")

require("dotenv").config();
// const PORT=process.env.PORT || 5001;
const PORT=5001;
// to use env variables
require ("dotenv").config()

// creating an http server
const server=http.createServer((req,res)=>{  
    req.movies=movies;
    switch(req.method){
        case "GET":
            getReq(req,res);
            break;  
        case "POST":
            postReq(req,res);
            break;  
        case "PUT":
            putReq(req,res);
            break;  
        case "DELETE":
            deleteReq(req,res);
            break;  
        default: 
        res.statusCode = 404;
        res.writeHead(404, { 'Content-Type': 'text/plain' }); // Correct usage
        res.write(JSON.stringify({title:"Not Found",message: "Poute not found"}));
        res.end()
    }
})
server.listen(PORT,()=>{
    // console.log("Server started on the port",PORT);
    console.log(`Server started on the port : ${PORT}`);
    
})