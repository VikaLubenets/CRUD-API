export default function DeleteUser(req, userIndex){
    req.users.splice(userIndex, 1)
    return
}