const http = require("http")

const server = http.createServer((request,response)=>{
    const pathName = request.url

    switch(pathName){
        case "/":
        case "/dashboard":
            response.end("We are in the dashboard")
            break;
        case "/product":
            response.end("We are in products page")
            break;
        default : {
            response.writeHead(404,{
                "Content-type" : "text/html",
                "my-header" : "custom-header"
            })
            response.end("<h1>Page not found</h1>")
        }
    }
})

server.listen(8002,"127.0.0.1",()=>{
    console.log("Listening to the server")
})