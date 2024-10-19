import * as http from 'node:http'
import Get from './methods/get.js';
import POST from './methods/post.js';
import Put from './methods/put.js';
import Delete from './methods/delete.js';
import usersUUID from './data/data.js';
import ParseBody from './services/parseBody.js';
import handleError from './services/handleError.js';

const port = process.env.PORT ?? 3000;

const server = http.createServer((req, res) => {
    try {
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
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Intenal server error');
        }
    } catch(e){
        handleError(e, res)
    }
});

server.listen(port, () => {
    console.log(`Server is listening on ${port} port`);
});