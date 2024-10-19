import { IncomingMessage } from "node:http";
import { User } from "../types";
import usersUUID from '../data/data';

export default function UpdateUser(req: IncomingMessage, userIndex: number, body: Partial<User>) {
    const updatedUserData = body;

    if (updatedUserData.age !== undefined) {
        if (typeof updatedUserData.age === 'string') {
            const parsedAge = Number(updatedUserData.age);
            if (!isNaN(parsedAge)) {
                updatedUserData.age = parsedAge;
            }
        }
    }

    usersUUID[userIndex] = {
        ...usersUUID[userIndex],
        ...updatedUserData,
    } as User;

    return usersUUID[userIndex];
}


