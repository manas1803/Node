const http = require("http");
const fs = require("fs");
const url = require("url");

const htmlPage = fs.readFileSync("./index.html", "utf-8");
const workItemPage = fs.readFileSync("./work-item.html", "utf-8");
const apiData = fs.readFileSync("./data.json", "utf-8");
const apiDataObj = JSON.parse(apiData)

const replaceTemplate = (template, element) => {
  let output = template.replaceAll("{%ITEM_ID%}", element.id);
  output = output.replaceAll("{%ITEM_TITLE%}", element.title);
  return output;
};

const server = http.createServer((request, response) => {
  const { pathname, query } = url.parse(request.url, true);
  switch (pathname) {
    case "/":
    case "/dashboard":
      const output = apiDataObj
        .map((element) => replaceTemplate(htmlPage, element))
        .join("");
      response.writeHead(200, {
        "Content-type": "text/html",
      });
      response.end(output);

      break;
    case "/product":
      response.writeHead(200, {
        "Content-type": "text/html",
      });
      
      const item = (query.id) ? apiDataObj[query.id] : apiDataObj[0];
      const outputProducts = replaceTemplate(workItemPage, item);
      response.end(outputProducts);
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
