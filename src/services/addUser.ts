import { v4 } from 'uuid';

export default function AddUser(req, user) {
    const updatedUser = {
        ...user,
        id: v4()
    };

    req.users.push(updatedUser);
    return updatedUser;
}