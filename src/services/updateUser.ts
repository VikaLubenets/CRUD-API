import { IncomingMessage } from "node:http";

export default function UpdateUser(req: IncomingMessage, userIndex: number) {
    const updatedUserData = req.users;

    req.users[userIndex] = {
        ...req.users[userIndex],
        ...updatedUserData,
    };

    return req.users[userIndex];
}
