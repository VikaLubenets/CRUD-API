import { IncomingMessage, ServerResponse } from "node:http";
import { User } from "../types";

export default function ParseBody<T>(
  req: IncomingMessage,
  res: ServerResponse,
  fn: (req: IncomingMessage, res: ServerResponse, query: URL, body: T) => void,
  query: URL,
) {
  let bodyData: Buffer[] = [];

  req.on("data", (chunk) => {
    bodyData.push(chunk);
  });

  req.on("end", () => {
    let body = Buffer.concat(bodyData).toString();
    let parsedBody: Partial<User> = {};

    if (req.headers["content-type"] === "application/json") {
      try {
        parsedBody = JSON.parse(body);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Invalid JSON");
        return;
      }
    }

    fn(req, res, query, parsedBody as T);
  });
}
