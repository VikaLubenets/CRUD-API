import { v4 } from 'uuid';
import { User } from '../types';
import { IncomingMessage } from 'node:http';

export default function AddUser(req: IncomingMessage, user: User) {
    if (!req.users) {
        req.users = [];
    }
    
    const updatedUser = {
        ...user,
        id: v4()
    };

    req.users.push(updatedUser);
    return updatedUser;
}