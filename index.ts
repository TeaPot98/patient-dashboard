import dotenv from "dotenv";
dotenv.config();

import http from "http";

import app from "app";
import { PORT } from "utils";

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
