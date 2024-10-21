import * as dotenv from "dotenv";
import { createServerInstance } from "./server";

dotenv.config();

const port = process.env.PORT || 3000;

export const server = createServerInstance();

server.listen(port, () => {
  console.log(`Server is listening on ${port} port`);
});
