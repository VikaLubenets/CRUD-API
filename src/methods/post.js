import AddUser from '../services/addUser.js';
import validateBody from '../services/validateBody.js';

export default function POST(req, res) {
    switch (req.url) {
        case "/users":
            const newUser = req.body;
            if (validateBody(newUser)) {
                const user = AddUser(req, newUser);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                res.write(JSON.stringify(user));
                res.end();
            } else {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Body does not contain required fields or they have invalid values');
                return;
            }
            break;
        
        default:
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Route is not found');
    }
}
