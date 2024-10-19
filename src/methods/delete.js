import { validate as isUUID } from 'uuid';
import DeleteUser from '../services/deleteUser.js';

export default function Delete(req, res) {
    const pathname = req.query.pathname;
    const pathParts = pathname.split('/');

    if (pathParts[1] === "users") {
        const userId = pathParts[2];

        if (userId) {
            if (!isUUID(userId)) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('userId is invalid');
                return;
            }

            const userIndex = req.users.findIndex((user) => user.id === userId);

            if (userIndex !== -1) {
                DeleteUser(req, userIndex);
                res.writeHead(204);
                res.end();
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end("record with id === userId doesn't exist");
            }
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end("userId is not provided in the path");
        }
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Route is not found');
    }
}
