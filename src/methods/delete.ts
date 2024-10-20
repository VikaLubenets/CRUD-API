import { validate as isUUID } from "uuid";
import DeleteUser from "../services/deleteUser";
import { IncomingMessage, ServerResponse } from "node:http";
import usersUUID from "../data/data";

export default function Delete(
  req: IncomingMessage,
  res: ServerResponse,
  query: URL,
) {
  const pathname = query.pathname;
  const pathParts = pathname.split("/");

  if (pathParts[2] === "users") {
    const userId = pathParts[3];

    if (userId) {
      if (!isUUID(userId)) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("userId is invalid");
        return;
      }

      const userIndex = usersUUID.findIndex((user) => user.id === userId);

      if (userIndex !== -1) {
        DeleteUser(userIndex);
        res.writeHead(204);
        res.end('User is deleted');
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("record with id === userId doesn't exist");
      }
    } else {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("userId is not provided in the path");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route not found");
  }
}
