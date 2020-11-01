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
  console.log(url.parse(path));
  // response.setHeader("Content-Type", "text/html; chartset=utf-8");
  // /index.html => index.html
  const fileName = pathname.substr(1);
  fs.readFile(p.resolve(publicDir, fileName), (error, data) => {
    if (error) {
      response.statusCode = 404;
      response.end(`你要的文件不存在`);
    } else {
      response.end(data.toString());
    }
  });
});

server.listen(8888);
