import http = require("http");
import express = require("express");

import { Server } from "socket.io";
require("dotenv").config();

const initializeEnvironment = async () => {
  return true;
};

console.log("#####################################");
console.log("###          HTTP WORKER          ###");
console.log("#####################################");
console.log("");
initializeEnvironment().then(() => {
  //Initialize express app
  console.log("Initializing Application");
  console.log("  - Creating express app");
  const app = express();
  console.log("  - Creating webserver");
  const server = http.createServer(app);

  //Initialize socket.io
  console.log("  - Creating websocket server");
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  //GET request on index
  app.get("/", (req, res) => {
    res.json({ message: "Hello, World" });
  });

  io.on("connection", (socket) => {
    console.log(`user ${socket.id} connected`);

    socket.on("disconnect", () => {
      console.log(`user ${socket.id} disconnected`);
    });
  });

  //Start server
  const PORT = process.env.PORT || 3003;
  server.listen(PORT, () => {
    console.log(`  - Done. Server listening on port ${PORT}`);
  });
});
