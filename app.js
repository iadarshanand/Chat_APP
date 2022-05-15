const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);

const users = {};

app.use("/", express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  socket.on("username", (data) => {
    users[socket.id] = data;

    // console.log(`a user is connected with username- ${users[socket.id]}`);
  });

  socket.on("disconnect", () => {
    // console.log("user disconnected");
  });

  socket.on("send_msg", (data) => {
    // console.log(data);
    io.emit("receive_msg", {
      // console.log("emitted..");
      username: users[socket.id],
      msg: data,
    });
  });
});

// http server not expess server
// express is used for request handling only
// so server.listen not app.listen
server.listen(3000, () => {
  console.log("Server is listening");
});
