module.exports = (req,res)=>{

    let baseUrl=req.url.substring(0, req.url.lastIndexOf('/')+1)
    console.log(baseUrl)
    let id=req.url.split("/")[3]
    console.log(id)

    const regexV4=new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    );

    if(req.url==="/api/movies"){
        res.statusCode=200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(req.movies))
        res.end()
    }
    else if(!regexV4.test(id)){
        res.writeHead(404,{"Content-Type": "application/json"});
        res.end(JSON.stringify({title:"validation falid",message: "uuid is not valid"}))
    }
    else{
        res.writeHead(404,{"Content-Type": "application/json"});
        res.end(JSON.stringify({title:"Not Found",message: "Route not found"}))
    }
};