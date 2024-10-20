import { IncomingMessage } from "node:http";
import usersUUID from "../data/data";

export default function DeleteUser(userIndex: number) {
  usersUUID.splice(userIndex, 1);
  return;
}
