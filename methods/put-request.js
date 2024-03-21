const requestBodyParser = require('../utils/body-parser')
const writeToFile = require("../utils/write-to-file")
module.exports = async(req,res)=>{
    let baseUrl=req.url.substring(0, req.url.lastIndexOf('/')+1)
    console.log(baseUrl)
    let id=req.url.split("/")[3]
    console.log(id)
    const regexV4=new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    if(!regexV4.test(id)){
        res.writeHead(404,{"Content-Type": "application/json"});
        res.end(JSON.stringify({title:"validation falid",message: "uuid is not valid"}))
    }
    else if(baseUrl==="/api/movies/"&& regexV4.test(id)){
        try {
            let body=await requestBodyParser(req)
            const index=req.movies.findIndex((movie)=>{
                return movie.id===id
            })
            if(index===-1){
                res.statusCode=404;
                res.write(JSON.stringify({title:"Not Found",message: "Movie not found"}))
                res.end()
            }
            else{
                req.movies[index]={id,...body}
                writeToFile(req.movies)
                res.writeHead(200,{"Content-Type": "application/json"})     
                res.end(JSON.stringify(req.movies[index])); 
            } 
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