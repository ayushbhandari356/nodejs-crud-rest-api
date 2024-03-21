const requestBodyParser = require('../utils/body-parser')
const writeToFile = require("../utils/write-to-file")
const crypto = require("crypto")
module.exports = async (req,res)=>{
    if(req.url==="/api/movies"){
        try {
            let body=await requestBodyParser(req)
            console.log('request.body:',body);  
            body.id=crypto.randomUUID()
            req.movies.push(body)
            writeToFile(req.movies)
            res.writeHead(201,{"content-type": "application/json"})
            res.end()
        } catch (error) {
            console.log(error)
                res.writeHead(404,{"Content-Type": "application/json"})               
                res.end(JSON.stringify({title:"validation falid",message: "request body is not valid"}))
        }
    }
    else{
        res.writeHead(404,{"Content-Type": "application/json"});
        res.end(JSON.stringify({title:"Not Found",message: "Route not found"}))
    }
};