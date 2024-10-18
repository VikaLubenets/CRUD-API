export default function Put(req, res){
    switch (req.url) {
        
        
        default:
            res.writeHead(400, { 'Content-Type': 'text/plain' })
            res.end('Route is not found')
      }
}