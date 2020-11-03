import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
import * as fs from "fs";
import * as p from "path";
import * as url from "url";
// __dirname 表示当前文件所在目录

const server = http.createServer();
const publicDir = p.resolve(__dirname, "public");
// path.resolve() 传入路径或路径片段，解析为绝对路径
let catchAge = 3600 * 24 * 365;

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  const { method, url: path, headers } = request;
  const { pathname, search } = url.parse(path);

  // 处理非GET请求，因为是静态服务器，直接不允许访问了
  if (method !== "GET") {
    response.statusCode = 405;
    response.end();
    return;
  }

  // response.setHeader("Content-Type", "text/html; chartset=utf-8");
  // /index.html => index.html
  let fileName = pathname.substr(1);
  if (fileName === "") {
    fileName = "index.html";
  }
  fs.readFile(p.resolve(publicDir, fileName), (error, data) => {
    if (error) {
      if (error.errno === -4058) {
        response.statusCode = 404;
        fs.readFile(p.resolve(publicDir, "404.html"), (error, data) => {
          response.end(data);
        });
        response.end(`你要的文件不存在`);
      } else if (error.errno === -4068) {
        response.statusCode = 403;
        response.end("无权查看目录内容");
      } else {
        response.statusCode = 500;
        response.end(`服务器繁忙，请稍后重试`);
      }
    } else {
      // 返回文件内容
      // 缓存文件内容 + 时长：31536000s
      // 浏览器是不会帮你缓存首页的，即使你设置了缓存
      response.setHeader("Cache-Control", `public, max-age=${catchAge}`);
      response.end(data.toString());
    }
  });
});

server.listen(8888);
