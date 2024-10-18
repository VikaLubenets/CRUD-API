import * as http from 'node:http'
import Get from './src/methods/get';
import POST from './src/methods/post';
import Put from './src/methods/put';
import Delete from './src/methods/delete';
import users from './src/data/users.json';

const port = process.env.PORT ?? 3000;

const server = http.createServer((req, res) => {

    req.users = users;
    req.query = new URL(req.url, `http://${req.headers.host}`)

    switch (req.method) {
        case "GET":
        Get(req, res)
        break
        
    case "POST":
        POST(req, res)
        break
        
    case "PUT":
        Put(req, res)
        break
        
    case "DELETE":
        Delete(req, res)
        break
        
    default:
        res.writeHead(400, { 'Content-Type': 'text/plain' })
        res.end('Page not found')
    }
})

server.listen(port, () => {
    console.log(`Server is listening on ${port} port`)
})