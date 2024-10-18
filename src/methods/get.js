export default function Get(req, res){
    switch (req.url) {
        case "/users":
            if (req.query.searchParams.get("id")){
                const id = request.query.searchParams.get("id")
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.write(JSON.stringify(req.users.find((user) => user.id === id)))
                res.end()
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.write(JSON.stringify(req.users))
                res.end()
            }
            break

        
        default:
            res.writeHead(400, { 'Content-Type': 'text/plain' })
            res.end('Route is not found')
      }
}