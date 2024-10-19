import UpdateUser from '../services/updateUser.js'
import { validate } from 'uuid';

export default function Put(req, res) {
    const pathname = req.query.pathname;
    const pathParts = pathname.split('/');

    if (pathParts.length === 3 && pathParts[1] === "users") {
        const userId = pathParts[2];

        if (!validate(userId)) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('userId is invalid');
            return;
        }

        const userIndex = req.users.findIndex((user) => user.id === userId);

        if (userIndex !== -1) {
            const updatedUser = UpdateUser(req, userIndex);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(updatedUser));
            res.end();
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end("record with id === userId doesn't exist");
        }
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Route is not found');
    }
}
