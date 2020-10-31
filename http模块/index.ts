import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
import * as fs from "fs";
import * as p from "path";
import * as url from "url";
// __dirname 表示当前文件所在目录

const server = http.createServer();
const publicDir = p.resolve(__dirname, "public");
// path.resolve() 传入路径或路径片段，解析为绝对路径

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  const { method, url: path, headers } = request;
  const { pathname, search } = url.parse(path);
  switch (pathname) {
    case "/index.html":
      response.setHeader("Content-Type", "text/html; chartset=utf-8");
      fs.readFile(p.resolve(publicDir, "index.html"), (error, data) => {
        if (error) throw error;
        response.end(data.toString());
      });
      break;
    case "/style.css":
      response.setHeader("Content-Type", "text/css; charset=utf-8");
      fs.readFile(p.resolve(publicDir, "style.css"), (error, data) => {
        if (error) throw error;
        response.end(data.toString());
      });
      break;
    case "/main.js":
      response.setHeader("Content-Type", "text/javascript; charset=utf-8");
      fs.readFile(p.resolve(publicDir, "main.js"), (error, data) => {
        if (error) throw error;
        response.end(data.toString());
      });
      break;
    default:
      response.statusCode = 404;
      response.end();
  }
});

server.listen(8888);
