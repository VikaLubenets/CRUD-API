import * as http from "node:http";
import Get from "./methods/get";
import POST from "./methods/post";
import Put from "./methods/put";
import Delete from "./methods/delete";
import ParseBody from "./services/parseBody";
import handleError from "./services/handleError";
import * as dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;

export const server = http.createServer((req, res) => {
  try {
    const query = new URL(req.url ?? "", `http://${req.headers.host}`);

    switch (req.method) {
      case "GET":
        Get(req, res, query);
        break;

      case "POST":
        ParseBody(req, res, POST, query);
        break;

      case "PUT":
        ParseBody(req, res, Put, query);
        break;

      case "DELETE":
        Delete(req, res, query);
        break;

      default:
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Intenal server error");
    }
  } catch (err) {
    handleError(err as Error, res);
  }
});

server.listen(port, () => {
  console.log(`Server is listening on ${port} port`);
});
