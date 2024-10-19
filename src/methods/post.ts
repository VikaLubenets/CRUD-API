import { IncomingMessage, ServerResponse } from 'node:http';
import AddUser from '../services/addUser';
import validateBody from '../services/validateBody';
import { User } from '../types.js';

export default function POST(req: IncomingMessage, res: ServerResponse, query: URL, body: string) {
    const pathname = query.pathname;
    const pathParts = pathname.split('/');

    if (pathParts[2] === "users") {
        const newUser = body as unknown as User;
        if (validateBody(newUser)) {
            const user = AddUser(newUser);
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
