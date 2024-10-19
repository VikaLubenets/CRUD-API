export default function UpdateUser(req, userIndex) {
    const updatedUserData = req.body;

    req.users[userIndex] = {
        ...req.users[userIndex],
        ...updatedUserData,
    };

    return req.users[userIndex];
}
