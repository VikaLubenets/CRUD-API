import * as http from 'node:http'

const port = process.env.PORT ?? 3000;

const server = http.createServer((req, res) => {
    const url = req.url;

    if(url === '/'){
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to the page');
    }
    else if(url === '/users'){
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to the users page');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Page not found');
    }
})

server.listen(port, () => {
    console.log(`Server is listening on ${port} port`)
})