import AddUser from '../services/addUser.js';
import validateBody from '../services/validateBody.js';

export default function POST(req, res) {
    const pathname = req.query.pathname;
    const pathParts = pathname.split('/');

    if (pathParts[2] === "users") {
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
        
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
}
