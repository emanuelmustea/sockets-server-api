const { createServer } = require("http");
const express = require("express");
const app = express();

const server = createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const bulbs = {
  bulb1: 0,
  bulb2: 0,
  bulb3: 0,
};

io.on("connection", (socket) => {
  console.log("Connected");
  socket.on("toggle", async (msg) => {
    console.log(msg);
    if (bulbs[msg]) {
      bulbs[msg] += bulbs[msg] === 0 ? 1 : -1;
    }
    // const sockets = await io.fetchSockets();
    io.emit("toggle", msg);
  });
});

server.listen(8080, () => {
  console.log("Server App started on port *:8080");
});
