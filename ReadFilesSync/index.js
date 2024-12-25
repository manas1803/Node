const fs = require("fs")

const inputText = fs.readFileSync("./input.txt","utf-8")

const outputText = `${inputText} Now we are trying to write the text as well`

fs.writeFileSync('./output.txt',outputText,'utf-8')