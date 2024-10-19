import { IncomingMessage, ServerResponse } from "node:http";

export default function ParseBody(
    req: IncomingMessage, 
    res: ServerResponse,
    fn: (req: IncomingMessage, res: ServerResponse) => void
) {
    let bodyData: Buffer[] = [];

    req.on("data", chunk => {
        bodyData.push(chunk);
    });

    req.on("end", () => {
        req.body = Buffer.concat(bodyData).toString();
        if (req.headers["content-type"] === "application/json") {
            req.body = JSON.parse(req.body);
        }
        fn(req, res);
    });
}
