const fs = require("fs")

const inputAsyncText = fs.readFile("./input.txt",'utf-8',(error,data)=>{
    console.log("Data is ",data)
})