const http = require("http")

const server = http.createServer((req,res)=>{
    res.end("My first Server")
})

server.listen(8001,"127.0.0.1",()=>{
    console.log("Listening")
})