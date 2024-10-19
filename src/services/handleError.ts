import { ServerResponse } from "node:http";

export default function handleError(error: Error, res: ServerResponse){
    console.log(error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'Internal server error' }))
    res.end();
}