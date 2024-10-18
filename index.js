import * as http from 'node:http'
import Get from './src/methods/get.js';
import POST from './src/methods/post.js';
import Put from './src/methods/put.js';
import Delete from './src/methods/delete.js';
import usersUUID from './src/data/data.js';
import ParseBody from './src/services/parseBody.js'

const port = process.env.PORT ?? 3000;

const server = http.createServer((req, res) => {
    req.users = usersUUID;
    req.query = new URL(req.url, `http://${req.headers.host}`);

    switch (req.method) {
        case "GET":
            Get(req, res);
            break;
        
        case "POST":
            ParseBody(req, res, POST);
            break;
        
        case "PUT":
            ParseBody(req, res, Put);
            break;
        
        case "DELETE":
            Delete(req, res);
            break;
        
        default:
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Page not found');
    }
});

server.listen(port, () => {
    console.log(`Server is listening on ${port} port`);
});