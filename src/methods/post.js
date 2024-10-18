export default function POST(req, res){
    switch (req.url) {
        case "/users":
            req.users.push(req.body);
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.write(JSON.stringify(req.users))
            res.end()
            break;
        
        default:
            res.writeHead(400, { 'Content-Type': 'text/plain' })
            res.end('Route is not found')
      }
}