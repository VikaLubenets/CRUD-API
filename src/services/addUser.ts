import { v4 } from 'uuid';
import { User } from '../types';
import { IncomingMessage } from 'node:http';
import usersUUID from '../data/data';

export default function AddUser(user: User) {
    const updatedUser = {
        ...user,
        age: Number(user.age),
        id: v4()
    };

    usersUUID.push(updatedUser);
    return updatedUser;
}