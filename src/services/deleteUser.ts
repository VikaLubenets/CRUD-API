import { IncomingMessage } from "node:http"

export default function DeleteUser(req: IncomingMessage, userIndex: number){
    if (!req.users) {
        req.users = [];
        return
    }
    req.users.splice(userIndex, 1)
    return
}