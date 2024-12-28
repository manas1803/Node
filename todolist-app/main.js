const http = require("http");
const fs = require("fs");

const htmlPage = fs.readFileSync("./index.html", "utf-8");
const apiData = fs.readFileSync("./data.json", "utf-8");

const replaceTemplate = (template, element) => {
  let output = template.replace("{%ITEM_ID%}", element.id);
  output = output.replace("{%ITEM_TITLE%}", element.title);
  return output;
};

const server = http.createServer((request, response) => {
  const pathName = request.url;

  switch (pathName) {
    case "/":
    case "/dashboard":
      const output = JSON.parse(apiData)
        .map((element) => replaceTemplate(htmlPage, element))
        .join("");
      response.writeHead(200, {
        "Content-type": "text/html",
      });
      response.end(output);

      break;
    case "/product":
      response.end("We are in products page");
      break;
    case "/api":
      response.writeHead(200, {
        "Content-type": "application/json",
      });
      response.end(apiData);
      break;
    default: {
      response.writeHead(404, {
        "Content-type": "text/html",
        "my-header": "custom-header",
      });
      response.end("<h1>Page not found</h1>");
    }
  }
});

server.listen(8002, "127.0.0.1", (error, data) => {
  console.log("We are listening");
});
