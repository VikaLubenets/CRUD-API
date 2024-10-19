import { IncomingMessage } from "node:http";
import { User } from "../types";

export default function UpdateUser(req: IncomingMessage, userIndex: number) {
    const updatedUserData = req.body as Partial<User>;

    if (updatedUserData.age) {
        const parsedAge = Number(updatedUserData.age);

        if (!isNaN(parsedAge)) {
            updatedUserData.age = parsedAge;
        }
    }

    req.users[userIndex] = {
        ...req.users[userIndex],
        ...updatedUserData,
    };

    return req.users[userIndex];
}
