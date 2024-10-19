import { ServerResponse, IncomingMessage } from 'node:http';
import { validate } from 'uuid';

export default function Get(req: IncomingMessage, res: ServerResponse) {
    const pathname = req.query.pathname;
    const pathParts = pathname.split('/');

    if (pathParts[2] === "users") {
        const userId = pathParts[3];

        if (userId) {
            if (!validate(userId)) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('userId is invalid');
                return;
            }

            const user = req.users.find((user) => user.id === userId);

            if (user) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(user));
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end("record with id === userId doesn't exist");
            }
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(req.users));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Route not found');
    }
}
