import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";

const server = http.createServer();

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  console.log(request.url);
  const array = [];
  request.on("data", (chunk) => {
    array.push(chunk);
  });
  request.on("end", () => {
    const body = Buffer.concat(array).toString();
    console.log("body");
    console.log(body);

    response.statusCode = 202;
    response.setHeader("x-token", "cc1sdaooq");

    response.write("1\n");
    response.write("2\n");
    response.write("3\n");
    response.write("4\n");
    response.end();
  });
});

server.listen(8888);
